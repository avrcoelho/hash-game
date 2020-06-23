import React, { useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
  const { showGame, moveGame, updateData, hash } = useIntegration();
  const { id } = useParams<Params>();

  useEffect(() => {
    const socket = socketio(
      process.env.REACT_APP_API || 'http://localhost:3333',
    );

    socket.emit('connectRoom', id);

    socket.on('hashUpdated', (gameData: HashData) => {
      updateData(gameData);
    });
  }, [updateData, id]);

  useEffect(() => {
    async function getGame() {
      await showGame(id);
    }

    getGame();
  }, [id, showGame]);

  const handleMove = useCallback(
    async (position: number) => {
      await moveGame({ id, position });
    },
    [id, moveGame],
  );

  const positionGame = useMemo(() => {
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

  const opponent = useMemo(() => {
    if (hash && hash.you !== hash.player_1) {
      return hash.player_1;
    }
    if (hash && hash.you !== hash.player_2) {
      return hash.player_2;
    }

    return '';
  }, [hash]);

  if (!hash) {
    return <Loader testID="loader" />;
  }

  return (
    <Container>
      <Header>
        <Player winner={hash?.winner === hash.player_1} testID="player1">
          {hash.player_1}
        </Player>
        {!hash.winningMode && (
          <Turn testID="turn">
            {hash.playerInit === hash.you || hash.nextPlayer === hash.you
              ? 'Sua vez'
              : `Vez de ${opponent}`}
          </Turn>
        )}
        <Player winner={hash?.winner === hash.player_2} testID="player2">
          {hash.player_2}
        </Player>
      </Header>
      <GameList
        numColumns={3}
        data={positionGame}
        keyExtractor={item => String(item.position)}
        renderItem={({ item }) => (
          <ItemGame
            onPress={() => handleMove(item.position)}
            disabled={
              (hash.playerInit !== hash.you && hash.nextPlayer !== hash.you) ||
              !!hash.winningMode
            }
            positionWinner={!!item.positionWinner}
            testID="item-game"
          >
            {String(item.type || '')}
          </ItemGame>
        )}
      />
    </Container>
  );
};

export default Game;
