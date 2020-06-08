import { Router } from 'express';

const routes = Router();

routes.use('/', (request, response) => {
  return response.json({ message: 'hello world' });
});

export default routes;
