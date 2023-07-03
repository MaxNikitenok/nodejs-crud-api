import { IncomingMessage, ServerResponse } from 'http';
import { uuidValidator } from '../helpers/uuidValidator';
import { readFile } from 'fs/promises';
import { IUser } from '../types';

export const getHandler = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  try {
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

export const getByIdHandler = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  try {
    const dataBase = await readFile('src/data.json', 'utf-8');
    const id = (request.url as string).split('/').at(-1) as string;
    const parsedDataBase = JSON.parse(dataBase);

    if (uuidValidator(id)) {
      const user = parsedDataBase.find((user: IUser) => user.id === id);

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
