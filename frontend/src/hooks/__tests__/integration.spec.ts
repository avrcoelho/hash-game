import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { useIntegration, IntegrationProvider } from '../integration';

const apiMock = new MockAdapter(api);

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

    result.current.initGame({
      player_1: 'johndoe',
    });

    await waitForNextUpdate();

    expect(result.current.hash.player_1).toBe('johndoe');
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      '@HashGame:token',
      '123',
    );
  });

  it('should ble able to error in init game', async () => {
    apiMock.onPost('hash').reply(400);

    const spyToast = jest.spyOn(toast, 'error');

    const { result, waitForNextUpdate } = renderHook(() => useIntegration(), {
      wrapper: IntegrationProvider,
    });

    result.current.initGame({
      player_1: 'johndoe',
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

  // it('should be able to signout', () => {
  //   jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
  //     switch (key) {
  //       case '@GoBarber:token':
  //         return '1234';
  //       case '@GoBarber:user':
  //         return JSON.stringify({
  //           id: '123',
  //           name: 'Jonh Doe',
  //           email: 'johndoe@test.com',
  //         });
  //       default:
  //         return null;
  //     }
  //   });

  //   const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: AuthProvider,
  //   });

  //   act(() => {
  //     result.current.signOut();
  //   });

  //   expect(removeItemSpy).toHaveBeenCalledTimes(2);
  //   expect(result.current.user).toBeUndefined();
  // });

  // it('should be able update data', () => {
  //   const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: AuthProvider,
  //   });

  //   const user = {
  //     id: '123',
  //     name: 'Jonh Doe',
  //     email: 'johndoe@test.com',
  //     avatar_url: 'image.jpg',
  //   };

  //   act(() => {
  //     result.current.updateUser(user);
  //   });

  //   expect(setItemSpy).toHaveBeenCalledWith(
  //     '@GoBarber:user',
  //     JSON.stringify(user),
  //   );
  //   expect(result.current.user).toEqual(user);
  // });
});
