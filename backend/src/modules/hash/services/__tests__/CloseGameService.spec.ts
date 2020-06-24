import FakeHashRepository from '@modules/hash/repositories/fakes/FakeHashRepository';
import CloseGameService from '../CloseGameService';
import CreateHashService from '../CreateHashService';
import AppError from '../../../../shared/errors/AppError';

let fakeHashRepository: FakeHashRepository;
let closeGameService: CloseGameService;
let createHashService: CreateHashService;

describe('CloseGameService', () => {
  beforeEach(() => {
    fakeHashRepository = new FakeHashRepository();

    closeGameService = new CloseGameService(fakeHashRepository);
    createHashService = new CreateHashService(fakeHashRepository);
  });

  it('should be able to close game', async () => {
    const hash = await createHashService.execute({
      player_1: 'Tester',
    });

    const hashClosed = await closeGameService.execute(String(hash.hash.id));

    expect(hashClosed.closed).toBe(true);
  });

  it('should be able to invalid id', async () => {
    await expect(closeGameService.execute('invalid')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
