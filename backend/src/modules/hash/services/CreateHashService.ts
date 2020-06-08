import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import IHashRepository from '@modules/hash/repositories/IHashRepository';
import authConfig from '@config/auth';
import Hash from '../infra/typeorm/schemas/Hash';

interface IRequest {
  player_1: string;
}

interface IResponse {
  hash: Hash;
  token: string;
}

@injectable()
class CreateHashService {
  constructor(
    @inject('hashRepository')
    private hahsRepository: IHashRepository,
  ) {}

  public async execute({ player_1 }: IRequest): Promise<IResponse> {
    const hash = await this.hahsRepository.create({ player_1 });

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: player_1,
      expiresIn,
    });

    return { hash, token };
  }
}

export default CreateHashService;
