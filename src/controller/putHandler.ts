import { readFile, writeFile } from 'fs/promises';
import { IncomingMessage, ServerResponse } from 'http';
import { uuidValidator } from '../helpers/uuidValidator';
import { IUser } from '../types';

export const putHandler = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  try {
    let body = '';

    request.on('data', (chunk: { toString: () => string }) => {
      body = chunk.toString();
    });

    request.on('end', async () => {
      const updateForUser = await JSON.parse(body);
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
        }

        const dataBaseWithUpdatedUser = parsedDataBase.map((user: IUser) => {
          if (user.id === id) {
            return { ...user, ...updateForUser };
          } else {
            return user;
          }
        });

        const updatedUser = dataBaseWithUpdatedUser.find((user: IUser) => {
          return user.id === id;
        });

        const data = JSON.stringify(dataBaseWithUpdatedUser);

        await writeFile('src/data.json', data);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(
          JSON.stringify({
            message: 'Update recorded',
            data: updatedUser,
          })
        );

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
