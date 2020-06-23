import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { useIntegration, IntegrationProvider } from '../integration';
import { HashData } from '../types';

const apiMock = new MockAdapter(api);
const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

describe('Integration hook', () => {
  it('should ble able to init game', async () => {
    const apiResponse = {
      hash: {
        game: [],
        player_1: 'johndoe',
        id: '123',
      },
      token: '123',
    };

    apiMock.onPost('hash').reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.initGame({
        player_1: 'johndoe',
      });
    });

    await waitForNextUpdate();

    expect(result.current.hash.player_1).toBe('johndoe');
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      '@HashGame:token',
      '123',
    );
  });

  it('should ble able to error in init game', async () => {
    apiMock.onPost('hash').reply(400, {});

    const spyToast = jest.spyOn(toast, 'error');

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.initGame({
        player_1: 'johndoe',
      });
    });

    await waitForNextUpdate();

    expect(spyToast).toHaveBeenCalled();
  });

  it('should restore saved data form storage when game inits', () => {
    jest.spyOn(sessionStorage, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@HashGame:token':
          return '123';
        default:
          return null;
      }
    });

    renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    expect(sessionStorage.getItem).toHaveBeenCalled();
  });

  it('should ble able to show data game', async () => {
    const apiResponse = {
      hash: {
        game: [],
        player_1: 'johndoe',
        id: '123',
      },
      token: '123',
    };

    apiMock.onGet(`hash/123`).reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.showGame('123');
    });

    await waitForNextUpdate();

    expect(result.current.hash).toEqual(apiResponse);
  });

  it('should ble able to error in show data game', async () => {
    apiMock.onGet('hash/123').reply(500, {});

    const spyToast = jest.spyOn(toast, 'error');

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.showGame('123');
    });

    await waitForNextUpdate();

    expect(spyToast).toHaveBeenCalled();
    expect(mockedHistoryPush).toHaveBeenCalledWith('/');
  });

  it('should ble able to insert player 2', async () => {
    const apiResponse = {
      hash: {
        game: [],
        player_1: 'johndoe',
        player_2: 'johntree',
        id: '123',
      },
      token: '123',
    };

    apiMock.onPatch('hash/123').reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.insertPlay2({
        player_2: 'johntree',
        id: '123',
      });
    });

    await waitForNextUpdate();

    expect(result.current.hash.player_2).toBe('johntree');
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      '@HashGame:token',
      '123',
    );
  });

  it('should ble able to error issert play 2', async () => {
    apiMock.onPatch('hash/123').reply(400);

    const spyToast = jest.spyOn(toast, 'error');

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.insertPlay2({
        player_2: 'johntree',
        id: '123',
      });
    });

    await waitForNextUpdate();

    expect(spyToast).toHaveBeenCalled();
  });

  it('should ble able to move', async () => {
    const apiResponse = {
      game: [
        {
          position: 1,
          player: 'johndoe',
          type: 'x',
        },
      ],
      player_1: 'johndoe',
      player_2: 'johntree',
      id: '123',
    } as HashData;

    apiMock.onPost('move/123', { position: 1 }).reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.moveGame({
        position: 1,
        id: '123',
      });
      result.current.updateData(apiResponse);
    });

    await waitForNextUpdate();

    expect(result.current.hash.game).toEqual(
      expect.arrayContaining([
        {
          position: 1,
          player: 'johndoe',
          type: 'x',
        },
      ]),
    );
  });

  it('should ble able to move', async () => {
    apiMock.onPost('move/123', { position: 1 }).reply(400, {});

    const spyToast = jest.spyOn(toast, 'error');

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.moveGame({
        position: 1,
        id: '123',
      });
    });

    await waitForNextUpdate();

    expect(spyToast).toHaveBeenCalled();
  });

  it('should ble able to update data', async () => {
    const data = {
      game: [
        {
          position: 1,
          player: 'johndoe',
          type: 'x',
        },
      ],
      player_1: 'johndoe',
      player_2: 'johntree',
      id: '123',
      nextPlayer: 'johntree',
      playerInit: null,
      you: 'johndoe',
    } as HashData;

    const apiResponse = {
      game: [],
      player_1: 'johndoe',
      id: '123',
    };

    apiMock.onGet(`hash/123`).reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    act(() => {
      result.current.showGame('123');
    });

    await waitForNextUpdate();

    act(() => {
      result.current.updateData(data);
    });

    expect(result.current.hash).toEqual(data);
  });
});
