import { IncomingMessage, ServerResponse } from 'http';

export const defaultHandler = (
  request: IncomingMessage,
  response: ServerResponse
) => {
  try {
    response.writeHead(404, {
      'Content-Type': 'application/json',
    });
    response.write(
      JSON.stringify({
        message: `API not found at ${request.url}`,
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
