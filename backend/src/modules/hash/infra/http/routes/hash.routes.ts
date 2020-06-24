import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import HashController from '../controllers/HashController';
import PlayAgainController from '../controllers/PlayAgainController';
import CloseGameController from '../controllers/CloseGameController';

import { validationStore, validationUpdate } from '../validations/hash';

const hashRouter = Router();
const hashController = new HashController();
const playAgainController = new PlayAgainController();
const closeGameController = new CloseGameController();

hashRouter.post('/', validationStore, hashController.store);
hashRouter.patch('/:id', validationUpdate, hashController.update);

hashRouter.use(ensureAuthenticated);

hashRouter.get('/:id', hashController.show);
hashRouter.put('/:id', playAgainController.update);
hashRouter.patch('/close/:id', closeGameController.update);

export default hashRouter;
