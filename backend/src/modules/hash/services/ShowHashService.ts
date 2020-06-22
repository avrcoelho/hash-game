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
  playerInit: null | string;
  nextPlayer: null | string;
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
      throw new AppError('Jogo não encontrado');
    }

    let playerInit: null | string = null;
    let nextPlayer: null | string = null;

    if (hash.player_1 === player && (!hash.game || !hash.game.length)) {
      playerInit = hash.player_1;
    }

    if (hash.game && hash.game.length) {
      const lastMove = hash.game[hash.game.length - 1];

      if (lastMove.player === hash.player_1) {
        nextPlayer = hash.player_2;
      } else {
        nextPlayer = hash.player_1;
      }
    }

    return { ...hash, playerInit, nextPlayer, you: player };
  }
}

export default ShowHashService;
