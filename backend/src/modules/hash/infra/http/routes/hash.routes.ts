import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import HashController from '../controllers/HashController';

import { validationStore, validationUpdate } from '../validations/hash';

const hashRouter = Router();
const hashController = new HashController();

hashRouter.post('/', validationStore, hashController.store);

hashRouter.use(ensureAuthenticated);

hashRouter.get('/:id', hashController.show);
hashRouter.patch('/:id', validationUpdate, hashController.update);

export default hashRouter;
