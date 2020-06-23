import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import HashController from '../controllers/HashController';
import PlayAgainController from '../controllers/PlayAgainController';

import { validationStore, validationUpdate } from '../validations/hash';

const hashRouter = Router();
const hashController = new HashController();
const playAgainController = new PlayAgainController();

hashRouter.post('/', validationStore, hashController.store);
hashRouter.patch('/:id', validationUpdate, hashController.update);

hashRouter.use(ensureAuthenticated);

hashRouter.get('/:id', hashController.show);
hashRouter.put('/:id', playAgainController.update);

export default hashRouter;
