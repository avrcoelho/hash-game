import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateHashService from '@modules/hash/services/CreateHashService';
import ShowHashService from '@modules/hash/services/ShowHashService';
import InsertPlay2Service from '@modules/hash/services/InsertPlay2Service';

class HashController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showHashService = container.resolve(ShowHashService);

    const { id: hash_id } = request.params;
    const { player } = request;

    const hash = await showHashService.execute({ hash_id, player });

    return response.json(hash);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const createHashService = container.resolve(CreateHashService);

    const { player_1 } = request.body;

    const hash = await createHashService.execute({ player_1 });

    return response.json(hash);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const insertPlay2Service = container.resolve(InsertPlay2Service);

    const { player_2 } = request.body;
    const { id } = request.params;

    const hash = await insertPlay2Service.execute({ id, player_2 });

    request.io.in(id).emit('player2Entered', { ...hash.hash });

    return response.json(hash);
  }
}

export default HashController;
