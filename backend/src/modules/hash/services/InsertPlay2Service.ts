import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IHashRepository from '@modules/hash/repositories/IHashRepository';
import Hash from '../infra/typeorm/schemas/Hash';

interface IRequest {
  id: string;
  player_2: string;
}

interface IResponse {
  hash: Hash;
  token: string;
}

@injectable()
class InsertPlay2Service {
  constructor(
    @inject('HashRepository')
    private hahsRepository: IHashRepository,
  ) {}

  public async execute({ id, player_2 }: IRequest): Promise<IResponse> {
    let hash = await this.hahsRepository.findById(id);

    if (!hash) {
      throw new AppError('Jogo não encontrado');
    }

    if (hash.player_2) {
      throw new AppError('Jogo não disponível');
    }

    if (hash.player_1 === player_2) {
      throw new AppError('Escolha um nome diferente do jogador 1');
    }

    hash.player_2 = player_2;

    hash = await this.hahsRepository.save(hash);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: player_2,
      expiresIn,
    });

    return { hash, token };
  }
}

export default InsertPlay2Service;
