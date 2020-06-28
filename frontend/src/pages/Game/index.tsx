import React, { useEffect, useMemo, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import socketio from 'socket.io-client';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

import { GameData, HashData } from '../../hooks/types';
import { useIntegration } from '../../hooks/integration';
import ItemGame from './ItemGame';
import Header from './Hader';

import { Container, GameList, Loader } from './styles';

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
    playAgainGame,
    closeGame,
    hash,
    loadingMove,
  } = useIntegration();
  const { id } = useParams<Params>();
  const history = useHistory();
  const isMobileMedium = useMediaQuery({
    query: '(max-device-width: 670px)',
  });
  const isMobileSmall = useMediaQuery({
    query: '(max-device-width: 520px)',
  });

  useEffect(() => {
    const socket = socketio(
      process.env.REACT_APP_API || 'http://localhost:3333',
    );

    socket.emit('connectRoom', id);

    socket.on('hashUpdated', (gameData: HashData) => {
      updateData(gameData);
    });

    socket.on('closeGame', () => {
      toast.error('Jogo finalizado');

      history.push('/');
    });

    socket.on('error', () => {
      window.location.reload();
    });
    socket.on('disconnect', () => {
      window.location.reload();
    });
  }, [updateData, id, history]);

  useEffect(() => {
    async function getGame() {
      await showGame(id);
    }

    getGame();
  }, [id, showGame]);

  useEffect(() => {
    if (hash && hash.id && !hash.player_2) {
      toast.error('Sem adiversario');

      history.push('/');
    }
  }, [hash, history]);

  const handleMove = useCallback(
    async (position: number) => {
      await moveGame({ id, position });
    },
    [id, moveGame],
  );

  const positionGame = useMemo<GameData[]>(() => {
    if (hash) {
      return positions.map(position => {
        let findPosition = hash.game.find(
          game => game.position === position.position,
        );

        if (findPosition) {
          if (hash.winningMode) {
            if (hash.winningMode.includes(position.position)) {
              findPosition = { ...findPosition, positionWinner: true };
            }
          }

          return findPosition;
        }

        return position;
      });
    }

    return positions;
  }, [hash]);

  const disabledButton = useMemo<boolean>(() => {
    if (hash) {
      return (
        loadingMove ||
        (hash.playerInit !== hash.you && hash.nextPlayer !== hash.you) ||
        !!hash.winningMode ||
        hash.game.length === 9
      );
    }

    return false;
  }, [hash, loadingMove]);

  if (!hash) {
    return <Loader testID="loader" />;
  }

  return (
    <Container>
      <Header
        id={id}
        playAgainGame={playAgainGame}
        closeGame={closeGame}
        hash={hash}
        idMobile={isMobileMedium}
      />
      <GameList
        numColumns={3}
        data={positionGame}
        keyExtractor={item => String(item.position)}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <ItemGame
            onPress={() => handleMove(item.position)}
            disabled={disabledButton || !!item.type}
            positionWinner={!!item.positionWinner}
            testID="item-game"
            isMobileMedium={isMobileMedium}
            isMobileSmall={isMobileSmall}
          >
            {String(item.type || '')}
          </ItemGame>
        )}
      />
    </Container>
  );
};

export default Game;
