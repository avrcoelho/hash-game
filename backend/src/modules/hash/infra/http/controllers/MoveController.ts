import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MoveService from '@modules/hash/services/MoveService';

class MoveController {
  public async store(request: Request, response: Response) {
    const moveService = container.resolve(MoveService);

    const { player, position, type } = request.body;
    const { id } = request.params;

    const move = await moveService.execute({ id, player, position, type });

    return response.json(move);
  }
}

export default MoveController;
