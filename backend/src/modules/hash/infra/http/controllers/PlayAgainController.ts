import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PlayAgainService from '@modules/hash/services/PlayAgainService';

class PlayAgainController {
  public async update(request: Request, response: Response): Promise<Response> {
    const playAgainService = container.resolve(PlayAgainService);

    const { id } = request.params;

    const hash = await playAgainService.execute(id);

    request.io.in(id).emit('hashUpdated', hash);

    return response.json(hash);
  }
}

export default PlayAgainController;
