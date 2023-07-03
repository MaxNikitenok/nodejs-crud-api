import { IncomingMessage, ServerResponse } from 'http';
import { userFieldsValidator } from '../helpers/userFieldsValidator';
import { readFile, writeFile } from 'fs/promises';
import { v4 } from 'uuid';

export const postHandler = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  try {
    let body = '';

    request.on('data', (chunk: { toString: () => string }) => {
      body = chunk.toString();

      if (userFieldsValidator(body)) {
        request.on('end', async () => {
          const newUser = (user: any) => {
            return { id: v4(), ...user };
          };
          const dataBase = await readFile('src/data.json');

          const createdUser = await newUser(JSON.parse(body));

          const parsedData = JSON.parse(dataBase.toString());
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
  } catch {
    response.writeHead(500, {
      'Content-Type': 'application/json',
    });
    response.write(
      JSON.stringify({
        message: 'Server error',
      })
    );
    response.end();
  }
};
