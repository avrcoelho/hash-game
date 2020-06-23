import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashRepository from '@modules/hash/repositories/IHashRepository';
import Hash from '../infra/typeorm/schemas/Hash';

interface IResponse extends Hash {
  playerInit: string;
  nextPlayer: null;
}

@injectable()
class PlayAgainService {
  constructor(
    @inject('HashRepository')
    private hahsRepository: IHashRepository,
  ) {}

  public async execute(id: string): Promise<IResponse> {
    let hash = await this.hahsRepository.findById(id);

    if (!hash) {
      throw new AppError('Jogo não encontrado');
    }

    hash = { ...hash, game: [], winner: null, winningMode: null };

    hash = await this.hahsRepository.save(hash);

    let playerInit = hash.player_1;

    if (hash.numMatches % 2 !== 0) {
      playerInit = hash.player_2;
    }

    return { ...hash, playerInit, nextPlayer: null };
  }
}

export default PlayAgainService;
