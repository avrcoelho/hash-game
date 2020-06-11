import FakeHashRepository from '@modules/hash/repositories/fakes/FakeHashRepository';
import MoveService from '../MoveService';
import AppError from '../../../../shared/errors/AppError';

let fakeHashRepository: FakeHashRepository;
let moveService: MoveService;

describe('MoveService', () => {
  beforeEach(() => {
    fakeHashRepository = new FakeHashRepository();

    moveService = new MoveService(fakeHashRepository);
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
      moveService.execute({
        id: 'invalid',
        player: 'Tester 2',
        position: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able don´t have player 2', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await expect(
      moveService.execute({
        id: String(hash.id),
        player: 'Tester',
        position: 1,
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

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
    });

    await expect(
      moveService.execute({
        id: String(hash.id),
        player: 'Tester 2',
        position: 3,
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

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
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

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
    });

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 4,
    });

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 2,
    });

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 5,
    });

    const hasWinner = await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 3,
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

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
    });

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 4,
    });

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 5,
    });

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 7,
    });

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 9,
    });

    await expect(
      moveService.execute({
        id: String(hash.id),
        player: 'Tester',
        position: 2,
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

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester 2',
      position: 1,
    });

    await moveService.execute({
      id: String(hash.id),
      player: 'Tester',
      position: 2,
    });

    await expect(
      moveService.execute({
        id: String(hash.id),
        player: 'Tester 2',
        position: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
