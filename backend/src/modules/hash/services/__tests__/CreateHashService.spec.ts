import FakeHashRepository from '@modules/hash/repositories/fakes/FakeHashRepository';
import CreateHashService from '../CreateHashService';

let fakeHashRepository: FakeHashRepository;
let createHashService: CreateHashService;

describe('CreateHshService', () => {
  beforeEach(() => {
    fakeHashRepository = new FakeHashRepository();

    createHashService = new CreateHashService(fakeHashRepository);
  });

  it('should be able to create a new hash', async () => {
    const hash = await createHashService.execute({
      player_1: 'Tester',
    });

    expect(hash).toHaveProperty('token');
    expect(hash.hash).toHaveProperty('id');
    expect(hash.hash.player_1).toBe('Tester');
  });
});
