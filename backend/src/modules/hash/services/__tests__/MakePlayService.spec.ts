import FakeHashRepository from '@modules/hash/repositories/fakes/FakeHashRepository';
import MakePlayService from '../MakePlayService';
import AppError from '../../../../shared/errors/AppError';

let fakeHashRepository: FakeHashRepository;
let makePlayService: MakePlayService;

describe('MakePlayService', () => {
  beforeEach(() => {
    fakeHashRepository = new FakeHashRepository();

    makePlayService = new MakePlayService(fakeHashRepository);
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
      makePlayService.execute({
        id: 'invalid',
        player: 'Tester 2',
        position: 1,
        type: 'o',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must not allow the same player', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
      type: 'o',
    });

    await expect(
      makePlayService.execute({
        id: String(hash.id),
        player: 'Tester 2',
        position: 3,
        type: 'o',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      makePlayService.execute({
        id: String(hash.id),
        player: 'Tester',
        position: 2,
        type: 'o',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to make play', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
      type: 'o',
    });

    expect(hash.game).toEqual(
      expect.arrayContaining([
        {
          player: 'Tester 2',
          position: 1,
          type: 'o',
        },
      ]),
    );
  });

  it('should be able to return winner and winning move', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
      type: 'o',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 4,
      type: 'x',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 2,
      type: 'o',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 5,
      type: 'x',
    });

    const hasWinner = await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 3,
      type: 'o',
    });

    expect(hasWinner.winner).toBe('Tester 2');
    expect(hasWinner.winningMode).toEqual(expect.arrayContaining([1, 2, 3]));
  });

  it('should be able to hash don´t available', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
      type: 'o',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 4,
      type: 'x',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 5,
      type: 'o',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 7,
      type: 'x',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 9,
      type: 'o',
    });

    await expect(
      makePlayService.execute({
        id: String(hash.id),
        player: 'Tester',
        position: 2,
        type: 'x',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to occupied position', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
      type: 'o',
    });

    await makePlayService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 2,
      type: 'x',
    });

    await expect(
      makePlayService.execute({
        id: String(hash.id),
        player: 'Tester 2',
        position: 1,
        type: 'o',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
