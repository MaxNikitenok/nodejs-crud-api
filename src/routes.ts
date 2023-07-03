import { defaultHandler } from './controller/defaultHandler';
import { IncomingMessage, ServerResponse } from 'http';
import { postHandler } from './controller/postHandler';
import { getByIdHandler, getHandler } from './controller/getHandler';
import { putHandler } from './controller/putHandler';
import { deleteHandler } from './controller/deleteHandler';

export const routes = (request: IncomingMessage, response: ServerResponse) => {
  const reqURL = request.url;
  const reqMethod = request.method;

  switch (reqMethod) {
    case 'POST': {
      if (reqURL === '/api/users') {
        postHandler(request, response);
      } else {
        defaultHandler(request, response);
      }
      break;
    }
    case 'GET': {
      if (
        reqURL?.startsWith('/api/users') &&
        reqURL.split('/').length > 3 &&
        reqURL.split('/').at(-1) !== ''
      ) {
        getByIdHandler(request, response);
      } else if (
        reqURL?.startsWith('/api/users') &&
        reqURL.split('/').length < 5
      ) {
        getHandler(request, response);
      } else {
        defaultHandler(request, response);
      }
      break;
    }
    case 'PUT': {
      if (reqURL?.startsWith('/api/users/')) {
        putHandler(request, response);
      } else {
        defaultHandler(request, response);
      }
      break;
    }
    case 'DELETE': {
      if (reqURL?.startsWith('/api/users/')) {
        deleteHandler(request, response);
      } else {
        defaultHandler(request, response);
      }
      break;
    }
    default: {
      defaultHandler(request, response);
    }
  }
};
