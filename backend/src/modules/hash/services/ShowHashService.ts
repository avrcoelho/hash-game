import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Hash from '../infra/typeorm/schemas/Hash';
import IHashRepository from '../repositories/IHashRepository';

interface IRequest {
  hash_id: string;
  player: string;
}

interface IResponse extends Hash {
  you: string;
}

@injectable()
class ShowHashService {
  constructor(
    @inject('HashRepository')
    private hashRepository: IHashRepository,
  ) {}

  public async execute({ hash_id, player }: IRequest): Promise<IResponse> {
    const hash = await this.hashRepository.findById(hash_id);

    if (!hash) {
      throw new AppError('Hash not found');
    }

    return { ...hash, you: player };
  }
}

export default ShowHashService;
