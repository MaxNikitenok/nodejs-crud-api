import { readFile, writeFile } from "fs/promises";
import { IncomingMessage, ServerResponse } from "http";
import { uuidValidator } from "../helpers/uuidValidator";
import { IUser } from "../types";

export const deleteHandler = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
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
    const deletedUser = parsedDataBase.find((user: IUser) => user.id === id);

    const newDataBase = parsedDataBase.filter((user: IUser) => user.id !== id);

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