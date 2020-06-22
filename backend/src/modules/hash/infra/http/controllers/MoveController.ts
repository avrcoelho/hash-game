import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MoveService from '@modules/hash/services/MoveService';

class MoveController {
  public async store(request: Request, response: Response) {
    const moveService = container.resolve(MoveService);

    const { position } = request.body;
    const { id } = request.params;
    const { player } = request;

    const hash = await moveService.execute({ id, player, position });

    let nextPlayer = hash.player_1;

    if (player === hash.player_1) {
      nextPlayer = hash.player_2;
    }

    request.io
      .in(id)
      .emit('hashUpdated', { ...hash, playerInit: null, nextPlayer });

    return response.json({ ...hash, playerInit: null, nextPlayer });
  }
}

export default MoveController;
