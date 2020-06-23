import FakeHashRepository from '@modules/hash/repositories/fakes/FakeHashRepository';
import PlayAgainService from '../PlayAgainService';
import AppError from '../../../../shared/errors/AppError';

let fakeHashRepository: FakeHashRepository;
let playAgainService: PlayAgainService;

describe('PlayAgainService', () => {
  beforeEach(() => {
    fakeHashRepository = new FakeHashRepository();

    playAgainService = new PlayAgainService(fakeHashRepository);
  });

  it('should be able to invalid id', async () => {
    await expect(playAgainService.execute('inválid')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to reset game', async () => {
    let hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
    });

    hash = await playAgainService.execute(String(hash.id));

    expect(hash.game).toEqual([]);
    expect(hash.winningMode).toEqual(null);
    expect(hash.winner).toEqual(null);
  });

  it('should be able to player 2 like player init', async () => {
    const hash = await fakeHashRepository.create({
      player_1: 'Tester',
    });

    await fakeHashRepository.save({
      ...hash,
      player_2: 'Tester 2',
      numMatches: 1,
    });

    const hashUpdated = await playAgainService.execute(String(hash.id));

    expect(hashUpdated.playerInit).toBe('Tester 2');
    expect(hashUpdated.nextPlayer).toBe(null);
  });
});
