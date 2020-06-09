import { Router } from 'express';

import hashRouter from '@modules/hash/infra/http/routes/hash.routes';
import moveRouter from '@modules/hash/infra/http/routes/move.routes';

const routes = Router();

routes.use('/hash', hashRouter);
routes.use('/move', moveRouter);

export default routes;
