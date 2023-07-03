import {
  postHandler,
  getHandler,
  defaultHandler,
  putHandler,
  deleteHandler,
  getByIdHandler,
} from './controller.js';

export const routes = (request, response) => {
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
      if (reqURL.startsWith('/api/users') && reqURL.split('/').length > 3 && reqURL.split('/').at(-1) !== '') {
        getByIdHandler(request, response);
      } else if (reqURL.startsWith('/api/users') && reqURL.split('/').length < 5) {
        console.log(reqURL.split('/'))
        getHandler(request, response);
      } else {
        defaultHandler(request, response);
      }
      break;
    }
    case 'PUT': {
      if (reqURL.startsWith('/api/users/')) {
        putHandler(request, response);
      } else {
        defaultHandler(request, response);
      }
      break;
    }
    case 'DELETE': {
      if (reqURL.startsWith('/api/users/')) {
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
