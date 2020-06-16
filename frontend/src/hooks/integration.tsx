import React, { createContext, useCallback, useState, useContext } from 'react';
import { toast } from 'react-toastify';

import api from '../services/api';

interface HashData {
  player_1: string;
  player_2: string;
}

interface IntegrationState {
  token: string;
  hash: HashData;
  loading: boolean;
}

interface ResponseInitGameData {
  token: string;
  hash: HashData;
}

interface IntegrationContextData {
  hash: HashData;
  loading: boolean;
  initGame(data: Pick<HashData, 'player_1'>): Promise<void>;
  insertPlay2(data: Pick<HashData, 'player_2'>): Promise<void>;
}

// as IntegrationContext)
const IntegrationContext = createContext<IntegrationContextData>(
  {} as IntegrationContextData,
);

export const IntegrationProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IntegrationState>(() => {
    const token = sessionStorage.getItem('@HashGame:token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, loading: false } as IntegrationState;
    }

    return { loading: false } as IntegrationState;
  });

  const initGame = useCallback(
    async ({ player_1 }: Pick<HashData, 'player_1'>) => {
      setData(state => ({ ...state, loading: true }));

      try {
        const response = await api.post<ResponseInitGameData>('hash', {
          player_1,
        });

        const { token, hash } = response.data;

        sessionStorage.setItem('@HashGame:token', token);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData(state => ({ ...state, token, hash }));
      } catch {
        toast.error('Houve uma falha ao acessar o jogo. Tente mais tarde');
      } finally {
        setData(state => ({ ...state, loading: false }));
      }
    },
    [],
  );

  const insertPlay2 = useCallback(
    async ({ player_2 }: Pick<HashData, 'player_2'>) => {
      setData(state => ({ ...state, loading: true }));

      try {
        const response = await api.patch<ResponseInitGameData>('hash', {
          player_2,
        });

        const { token, hash } = response.data;

        sessionStorage.setItem('@HashGame:token', token);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData(state => ({ ...state, token, hash }));
      } catch {
        alert(1);
      } finally {
        setData(state => ({ ...state, loading: false }));
      }
    },
    [],
  );

  return (
    <IntegrationContext.Provider
      value={{ hash: data.hash, loading: data.loading, initGame, insertPlay2 }}
    >
      {children}
    </IntegrationContext.Provider>
  );
};

export function useIntegration(): IntegrationContextData {
  const context = useContext(IntegrationContext);

  if (!context) {
    throw new Error(
      'useIntegration must be used within an IntegrationProvider',
    );
  }

  return context;
}
