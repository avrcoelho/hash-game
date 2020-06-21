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

    request.io.in(id).emit('hashUpdated', { ...hash, nextPlayer: true });

    return response.json({ ...hash, playerInit: false, nextPlayer: false });
  }
}

export default MoveController;
