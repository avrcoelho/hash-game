import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CloseGameService from '@modules/hash/services/CloseGameService';

class CloseGameController {
  public async update(request: Request, response: Response): Promise<Response> {
    const closeGameService = container.resolve(CloseGameService);

    const { id } = request.params;

    const hash = await closeGameService.execute(id);

    request.io.in(id).emit('closeGame', hash);

    return response.json(hash);
  }
}

export default CloseGameController;
