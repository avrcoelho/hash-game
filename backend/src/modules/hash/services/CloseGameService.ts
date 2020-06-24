import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashRepository from '@modules/hash/repositories/IHashRepository';
import Hash from '../infra/typeorm/schemas/Hash';

@injectable()
class CloseGameService {
  constructor(
    @inject('HashRepository')
    private hahsRepository: IHashRepository,
  ) {}

  public async execute(id: string): Promise<Hash> {
    const hash = await this.hahsRepository.findById(id);

    if (!hash) {
      throw new AppError('Jogo não encontrado');
    }

    hash.closed = true;

    return await this.hahsRepository.save(hash);
  }
}

export default CloseGameService;
