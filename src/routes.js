import { postHandler, getHandler, defaultHandler } from './controller.js';

export const routes = (request, response) => {
  const reqURL = request.url;
  const reqMethod = request.method;

  switch (reqMethod) {
    case "POST": {
      if (reqURL === "/users") {
        postHandler(request, response);
      }
      break;
    }
    case "GET": {
      if (reqURL === "/users") {
        getHandler(request, response);
      }
      break;
    }
    default: {
      defaultHandler(request, response);
    }
  }
};
