import ICreateHashDTO from '../dtos/ICreateHashDTO';
import Hash from '../infra/typeorm/schemas/Hash';

export default interface IHashRepository {
  create(data: ICreateHashDTO): Promise<Hash>;
  findById(id: string): Promise<Hash | undefined>;
  save(user: Hash): Promise<Hash>;
  delete(id: string): Promise<void>;
}
