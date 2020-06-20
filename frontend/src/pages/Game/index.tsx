import React, { useEffect, useMemo, useCallback } from 'react';
import { useIntegration } from '../../hooks/integration';
import { useHistory, useParams } from 'react-router-dom';

import ItemGame from '../../components/ItemGame';

import { Container, Header, Player, Turn, GameList, Loader } from './styles';

interface Params {
  id: string;
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Game: React.FC = () => {
  const { showGame, error, loading, hash } = useIntegration();
  const { id } = useParams<Params>();
  const history = useHistory();

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

  const handleMove = useCallback(() => {}, []);

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
        data={data}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <ItemGame
            onPress={handleMove}
            disabled={!(hash.playerInit || hash.nextPlayer)}
          >
            {String(item)}
          </ItemGame>
        )}
      />
    </Container>
  );
};

export default Game;
