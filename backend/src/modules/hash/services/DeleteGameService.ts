import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashRepository from '@modules/hash/repositories/IHashRepository';
import Hash from '../infra/typeorm/schemas/Hash';

@injectable()
class DeleteGameService {
  constructor(
    @inject('HashRepository')
    private hahsRepository: IHashRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.hahsRepository.delete(id);
  }
}

export default DeleteGameService;
