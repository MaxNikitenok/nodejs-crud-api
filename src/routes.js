import {
  postHandler,
  getHandler,
  defaultHandler,
  putHandler,
  deleteHandler,
} from './controller.js';

export const routes = (request, response) => {
  const reqURL = request.url;
  const reqMethod = request.method;

  switch (reqMethod) {
    case 'POST': {
      if (reqURL === '/api/users') {
        postHandler(request, response);
      }
      break;
    }
    case 'GET': {
      if (reqURL === '/api/users') {
        getHandler(request, response);
      }
      break;
    }
    case 'PUT': {
      if (reqURL.startsWith('/api/users/')) {
        putHandler(request, response);
      }
      break;
    }
    case 'DELETE': {
      if (reqURL === '/api/users') {
        deleteHandler(request, response);
      }
      break;
    }
    default: {
      defaultHandler(request, response);
    }
  }
};
