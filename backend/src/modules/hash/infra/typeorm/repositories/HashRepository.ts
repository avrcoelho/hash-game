import { getMongoRepository, MongoRepository } from 'typeorm';

import IHashRepository from '@modules/hash/repositories/IHashRepository';
import ICreateHashDTO from '@modules/hash/dtos/ICreateHashDTO';

import Hash from '../schemas/Hash';

class HashRespository implements IHashRepository {
  private ormRepository: MongoRepository<Hash>;

  constructor() {
    this.ormRepository = getMongoRepository(Hash);
  }

  public async create({ player_1 }: ICreateHashDTO): Promise<Hash> {
    const hash = this.ormRepository.create({ player_1 });

    await this.ormRepository.save(hash);

    return hash;
  }

  public async findById(id: string): Promise<Hash | undefined> {
    const hash = await this.ormRepository.findOne(id);

    return hash;
  }

  public async save(hash: Hash): Promise<Hash> {
    return this.ormRepository.save(hash);
  }
}

export default HashRespository;
