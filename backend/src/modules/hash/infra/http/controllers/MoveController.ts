import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MoveService from '@modules/hash/services/MoveService';

class MoveController {
  public async store(request: Request, response: Response) {
    const moveService = container.resolve(MoveService);

    const { player, position, type } = request.body;
    const { id } = request.params;

    const hash = await moveService.execute({ id, player, position, type });

    request.io.to(id).emit('hashUpdated', hash);

    return response.json(hash);
  }
}

export default MoveController;
