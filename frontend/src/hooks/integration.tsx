import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

export interface GameData {
  player?: string;
  position: number;
  type?: 'x' | 'o';
  positionWinner?: boolean;
}

export interface HashData {
  id: string;
  player_1: string;
  player_2: string;
  nextPlayer: null | string;
  playerInit: null | string;
  you: string;
  game: GameData[];
  winningMode?: number[];
  winner?: string;
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

interface MoveGameRequest {
  id: string;
  position: number;
}

interface IntegrationContextData {
  hash: HashData;
  loading: boolean;
  initGame(data: Pick<HashData, 'player_1'>): Promise<void>;
  insertPlay2(data: Pick<HashData, 'player_2' | 'id'>): Promise<void>;
  showGame(id: string): Promise<void>;
  moveGame(data: MoveGameRequest): Promise<void>;
  updateData(data: HashData): void;
}

// as IntegrationContext)
const IntegrationContext = createContext<IntegrationContextData>(
  {} as IntegrationContextData,
);

export const IntegrationProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState<IntegrationState>(() => {
    const token = sessionStorage.getItem('@HashGame:token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, loading: false } as IntegrationState;
    }

    return { loading: false } as IntegrationState;
  });

  useEffect(() => {});

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

        history.push(`invite/${hash.id}`);
      } catch {
        toast.error('Houve uma falha ao acessar o jogo. Tente mais tarde');
      } finally {
        setData(state => ({ ...state, loading: false }));
      }
    },
    [history],
  );

  const insertPlay2 = useCallback(
    async ({ player_2, id }: Pick<HashData, 'player_2' | 'id'>) => {
      setData(state => ({ ...state, loading: true }));

      try {
        const response = await api.patch<ResponseInitGameData>(`hash/${id}`, {
          player_2,
        });

        const { token, hash } = response.data;

        sessionStorage.setItem('@HashGame:token', token);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData(state => ({ ...state, token, hash }));

        history.push(`/game/${hash.id}`);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setData(state => ({ ...state, loading: false }));
      }
    },
    [history],
  );

  const showGame = useCallback(
    async (id: string) => {
      setData(state => ({ ...state, loading: true }));

      try {
        const { data: hash } = await api.get<HashData>(`hash/${id}`);

        setData(state => ({ ...state, hash }));
      } catch (error) {
        setData(state => ({ ...state }));

        toast.error(error.response.data.message);

        history.push('/');
      } finally {
        setData(state => ({ ...state, loading: false }));
      }
    },
    [history],
  );

  const moveGame = useCallback(async ({ id, position }: MoveGameRequest) => {
    setData(state => ({ ...state, loading: true }));

    try {
      await api.post<HashData>(`move/${id}`, { position });
    } catch (error) {
      setData(state => ({ ...state }));

      toast.error(error.response.data.message);
    } finally {
      setData(state => ({ ...state, loading: false }));
    }
  }, []);

  const updateData = useCallback((hash: HashData) => {
    setData(state => ({ ...state, hash: { ...state.hash, ...hash } }));
  }, []);

  return (
    <IntegrationContext.Provider
      value={{
        hash: data.hash,
        loading: data.loading,
        initGame,
        insertPlay2,
        showGame,
        moveGame,
        updateData,
      }}
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
