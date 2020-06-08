import FakeHashRepository from '@modules/hash/repositories/fakes/FakeHashRepository';
import ShowHashService from '../ShowHashService';
import AppError from '../../../../shared/errors/AppError';

let fakeHashRepository: FakeHashRepository;
let showHashService: ShowHashService;

describe('ShowHashService', () => {
  beforeEach(() => {
    fakeHashRepository = new FakeHashRepository();

    showHashService = new ShowHashService(fakeHashRepository);
  });

  it('should be able don´t find hash', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
    });

    await expect(
      showHashService.execute({
        hash_id: 'invalid',
        player: 'Tests',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find hash', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
    });

    const hashData = await showHashService.execute({
      hash_id: String(hash.id),
      player: 'Tester',
    });

    expect(hashData).toHaveProperty('id');
  });
});
