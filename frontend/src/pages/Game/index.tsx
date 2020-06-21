import React, { useEffect, useMemo, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import socketio from 'socket.io-client';

import { useIntegration, GameData, HashData } from '../../hooks/integration';
import ItemGame from '../../components/ItemGame';

import { Container, Header, Player, Turn, GameList, Loader } from './styles';

interface Params {
  id: string;
}

const positions: GameData[] = [
  {
    position: 1,
  },
  {
    position: 2,
  },
  {
    position: 3,
  },
  {
    position: 4,
  },
  {
    position: 5,
  },
  {
    position: 6,
  },
  {
    position: 7,
  },
  {
    position: 8,
  },
  {
    position: 9,
  },
];

const Game: React.FC = () => {
  const {
    showGame,
    moveGame,
    updateData,
    error,
    loading,
    hash,
  } = useIntegration();
  const { id } = useParams<Params>();
  const history = useHistory();

  const socket = useMemo(
    () => socketio(process.env.REACT_APP_API || 'http://localhost:3333'),
    [],
  );

  useEffect(() => {
    socket.emit('connectRoom', id);

    socket.on('hashUpdated', (gameData: HashData) => {
      console.log(gameData);
      if (gameData) {
        updateData(gameData);
      }
    });
  }, [socket, updateData, id]);

  useEffect(() => {
    async function getGame() {
      await showGame(id);
    }

    getGame();
  }, [id, showGame]);

  useEffect(() => {
    if (error) {
      history.push('/');
    }
  }, [error, history]);

  const handleMove = useCallback(
    async (position: number) => {
      await moveGame({ id, position });
    },
    [id, moveGame],
  );

  const positionGame = useMemo(() => {
    if (hash) {
      return positions.map(position => {
        const findPosition = hash.game.find(
          game => game.position === position.position,
        );

        if (findPosition) {
          return findPosition;
        }

        return position;
      });
    }

    return positions;
  }, [hash]);

  const opponent = useMemo(() => {
    if (hash && hash.you !== hash.player_1) {
      return hash.player_1;
    }
    if (hash && hash.you !== hash.player_2) {
      return hash.player_2;
    }

    return '';
  }, [hash]);

  if (!hash || loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header>
        <Player>{hash.player_1}</Player>
        {
          <Turn>
            {hash.playerInit || hash.nextPlayer
              ? 'Sua vez'
              : `Vez de ${opponent}`}
          </Turn>
        }
        <Player>{hash.player_2}</Player>
      </Header>
      <GameList
        numColumns={3}
        data={positionGame}
        keyExtractor={item => String(item.position)}
        renderItem={({ item }) => (
          <ItemGame
            onPress={() => handleMove(item.position)}
            disabled={!(hash.playerInit || hash.nextPlayer)}
          >
            {String(item.type || '')}
          </ItemGame>
        )}
      />
    </Container>
  );
};

export default Game;
