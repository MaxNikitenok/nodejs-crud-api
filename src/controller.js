import { readFile, writeFile } from 'fs/promises';
import { v4 } from 'uuid';
import { uuidValidator } from './helpers/uuidValidator.js';
import { userFieldsValidator } from './helpers/userFieldsValidator.js';

export const postHandler = async (request, response) => {
  let body = '';

  request.on('data', (chunk) => {
    body = chunk.toString();

    if (userFieldsValidator(body)) {
      request.on('end', async () => {
        const newUser = (user) => {
          return { id: v4(), ...user };
        };

        const createdUser = await newUser(JSON.parse(body));

        const dataBase = await readFile('src/data.json');

        const parsedData = JSON.parse(dataBase);
        parsedData.push(createdUser);
        const data = JSON.stringify(parsedData);

        await writeFile('src/data.json', data);

        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.write(
          JSON.stringify({
            message: 'POST Successful',
            data: createdUser,
          })
        );

        response.end();
      });
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(
        JSON.stringify({
          message: 'Body does not contain required fields',
        })
      );
      response.end();
    }
  });
};

export const getHandler = async (request, response) => {
  const data = await readFile('src/data.json', 'utf-8');

  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
  response.write(
    JSON.stringify({
      message: 'GET Successful',
      data: JSON.parse(data),
    })
  );
  response.end();
};

export const getByIdHandler = async (request, response) => {
  const dataBase = await readFile('src/data.json', 'utf-8');
  const id = request.url.split('/').at(-1);
  const parsedDataBase = JSON.parse(dataBase);

  if (uuidValidator(id)) {
    const user = parsedDataBase.find((user) => user.id === id);

    if (!user) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.write(
        JSON.stringify({
          message: "User doesn't exist",
        })
      );

      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(
        JSON.stringify({
          message: 'GET by ID Successful',
          data: user,
        })
      );
    }
    response.end();
  } else {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write(
      JSON.stringify({
        message: 'UserId is invalid',
      })
    );

    response.end();
  }
};

export const putHandler = async (request, response) => {
  let body = '';

  request.on('data', (chunk) => {
    body = chunk.toString();
  });

  request.on('end', async () => {
    try {
      const newUser = await JSON.parse(body);
      const dataBase = await readFile('src/data.json', 'utf-8');

      const id = request.url.split('/').at(-1);

      const parsedDataBase = JSON.parse(dataBase);

      const newDataBase = parsedDataBase.map((user) => {
        if (user.id === id) {
          return { ...user, ...newUser };
        } else {
          return user;
        }
      });

      const data = JSON.stringify(newDataBase);

      await writeFile('src/data.json', data);

      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.write(
        JSON.stringify({
          message: 'PUT Successful',
        })
      );
      response.end();
    } catch (err) {
      console.log(err);
      response.statusCode = 404;
      response.end(
        JSON.stringify({
          message: 'Body does not contain required fields',
        })
      );
    }

    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
  });
};

export const deleteHandler = async (request, response) => {
  const dataBase = await readFile('src/data.json', 'utf-8');
  const id = request.url.split('/').at(-1);
  console.log(id);

  const parsedDataBase = JSON.parse(dataBase);

  const deletedUser = parsedDataBase.filter((user) => user.id === id);

  const newDataBase = parsedDataBase.filter((user) => user.id !== id);

  const data = JSON.stringify(newDataBase);

  await writeFile('src/data.json', data);

  response.writeHead(201, { 'Content-Type': 'application/json' });
  response.write(
    JSON.stringify({
      message: 'DELETE Successful',
      data: deletedUser,
    })
  );
  response.end();

  // console.log(err);
  // response.statusCode = 404;
  // response.end(
  //   JSON.stringify({
  //     message: 'Body does not contain required fields',
  //   })
  // );

  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
};

export const defaultHandler = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
  response.write(
    JSON.stringify({
      message: `API not found at ${request.url}`,
    })
  );
  response.end();
};
