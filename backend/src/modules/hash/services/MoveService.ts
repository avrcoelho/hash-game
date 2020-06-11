import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashRepository from '@modules/hash/repositories/IHashRepository';
import Hash from '../infra/typeorm/schemas/Hash';

interface IRequest {
  id: string;
  player: string;
  position: number;
}

@injectable()
class MoveService {
  constructor(
    @inject('HashRepository')
    private hahsRepository: IHashRepository,
  ) {}

  public async execute({ id, player, position }: IRequest): Promise<Hash> {
    const hash = await this.hahsRepository.findById(id);

    if (!hash) {
      throw new AppError('Hash not found');
    }

    if (hash.winner) {
      throw new AppError('Hash don´t available');
    }

    if (!hash.player_2) {
      throw new AppError('Don´t have player 2');
    }

    const occupiedPosition = hash.game.find(game => game.position === position);

    if (occupiedPosition) {
      throw new AppError('Occupied position');
    }

    let type: 'x' | 'o' = 'x';

    if (player === hash.player_2) {
      type = 'o';
    }

    const lastMove = hash.game[hash.game.length - 1];

    if (lastMove && (lastMove.player === player || lastMove.type === type)) {
      throw new AppError('play not allowed');
    }

    hash.game.push({ player, position, type });

    const winningMoves = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    const filteredGame = hash.game.filter(game => game.type === type);

    const ordedGame = filteredGame.sort((a, b) => a.position - b.position);

    let isWinner;

    winningMoves.every(move => {
      const [move1, move2, move3] = move;

      const filteredMove = ordedGame.filter(
        game =>
          game.position === move1 ||
          game.position === move2 ||
          game.position === move3,
      );

      if (filteredMove.length === 3) {
        isWinner = [move1, move2, move3];

        return false;
      }

      return true;
    });

    if (isWinner) {
      hash.winner = player;
      hash.winningMode = isWinner;
    }

    return await this.hahsRepository.save(hash);
  }
}

export default MoveService;
