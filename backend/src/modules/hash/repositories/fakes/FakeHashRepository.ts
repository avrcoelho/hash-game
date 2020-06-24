import { ObjectID } from 'mongodb';

import IHashRepository from '@modules/hash/repositories/IHashRepository';
import ICreateHashDTO from '@modules/hash/dtos/ICreateHashDTO';

import Hash from '../../infra/typeorm/schemas/Hash';

class FakeHashRepository implements IHashRepository {
  private hashs: Hash[] = [];

  public async create({ player_1 }: ICreateHashDTO): Promise<Hash> {
    const hash = new Hash();

    Object.assign(hash, { id: new ObjectID(), player_1, game: [] });

    this.hashs.push(hash);

    return hash;
  }

  public async findById(id: string): Promise<Hash | undefined> {
    const findHash = this.hashs.find(hash => String(hash.id) === id);

    return findHash;
  }

  public async save(hash: Hash): Promise<Hash> {
    const findIndex = this.hashs.findIndex(
      findHash => findHash.id === new ObjectID(hash.id),
    );

    this.hashs[findIndex] = hash;

    return hash;
  }

  public async delete(id: string): Promise<void> {
    this.hashs = this.hashs.filter(
      findHash => findHash.id !== new ObjectID(id),
    );
  }
}

export default FakeHashRepository;
