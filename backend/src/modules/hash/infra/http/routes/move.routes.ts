import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import MoveController from '../controllers/MoveController';

import { validationStore } from '../validations/move';

const moveRouter = Router();
const moveController = new MoveController();

moveRouter.use(ensureAuthenticated);

moveRouter.post('/:id', validationStore, moveController.store);

export default moveRouter;
