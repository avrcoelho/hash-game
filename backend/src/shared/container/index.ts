import { container } from 'tsyringe';

import IHashRepository from '@modules/hash/repositories//IHashRepository';
import HashRepository from '@modules/hash/infra/typeorm/repositories/HashRepository';

container.registerSingleton<IHashRepository>('HashRepository', HashRepository);
