import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashRepository from '@modules/hash/repositories/IHashRepository';
import Hash from '../infra/typeorm/schemas/Hash';

interface IRequest {
  id: string;
  player: string;
  position: number;
}

interface IResponse extends Hash {
  playerInit: null;
  nextPlayer: string;
}

@injectable()
class MoveService {
  constructor(
    @inject('HashRepository')
    private hahsRepository: IHashRepository,
  ) {}

  public async execute({ id, player, position }: IRequest): Promise<IResponse> {
    let hash = await this.hahsRepository.findById(id);

    if (!hash) {
      throw new AppError('Jogo não encontrado');
    }

    if (hash.winner) {
      throw new AppError('Jogo não disponível');
    }

    if (!hash.player_2) {
      throw new AppError('Não possui jogador 2');
    }

    const occupiedPosition = hash.game.find(game => game.position === position);

    if (occupiedPosition) {
      throw new AppError('Posição já esta ocupada');
    }

    let type: 'x' | 'o' = 'x';

    if (player === hash.player_2) {
      type = 'o';
    }

    const lastMove = hash.game[hash.game.length - 1];

    if (lastMove && (lastMove.player === player || lastMove.type === type)) {
      throw new AppError('Jogada não permitida');
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
      hash.numMatches += 1;
    }

    hash = await this.hahsRepository.save(hash);

    let nextPlayer = hash.player_1;

    if (player === hash.player_1) {
      nextPlayer = hash.player_2;
    }

    return { ...hash, playerInit: null, nextPlayer };
  }
}

export default MoveService;
