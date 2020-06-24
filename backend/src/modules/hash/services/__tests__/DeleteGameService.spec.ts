import FakeHashRepository from '@modules/hash/repositories/fakes/FakeHashRepository';
import InsertPlay2Service from '../InsertPlay2Service';
import CreateHashService from '../CreateHashService';
import AppError from '../../../../shared/errors/AppError';

let fakeHashRepository: FakeHashRepository;
let insertPlay2Service: InsertPlay2Service;
let createHashService: CreateHashService;

describe('InsertPlay2Service', () => {
  beforeEach(() => {
    fakeHashRepository = new FakeHashRepository();

    insertPlay2Service = new InsertPlay2Service(fakeHashRepository);
    createHashService = new CreateHashService(fakeHashRepository);
  });

  it('should be able to insert player 2', async () => {
    let hash = await createHashService.execute({
      player_1: 'Tester',
    });

    hash = await insertPlay2Service.execute({
      id: String(hash.hash.id),
      player_2: 'Tester 2',
    });

    expect(hash).toHaveProperty('token');
    expect(hash.hash).toHaveProperty('id');
    expect(hash.hash.player_2).toBe('Tester 2');
  });

  it('should be able to invalid id', async () => {
    await expect(
      insertPlay2Service.execute({
        id: 'invalid',
        player_2: 'Tester 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to game don´t available', async () => {
    let hash = await createHashService.execute({
      player_1: 'Tester',
    });

    hash = await insertPlay2Service.execute({
      id: String(hash.hash.id),
      player_2: 'Tester 2',
    });

    await expect(
      insertPlay2Service.execute({
        id: String(hash.hash.id),
        player_2: 'Tester 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
