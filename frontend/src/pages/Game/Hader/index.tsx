import React, { useCallback, useMemo } from 'react';

import { HashData } from '../../../hooks/types';

import {
  Container,
  Player,
  ButtonsContainer,
  ButtonPlayAgain,
  ButtonPlayAgainText,
  ButtonClose,
  ButtonCloseText,
  Turn,
} from './styles';

interface Props {
  id: string;
  playAgainGame(id: string): Promise<void>;
  closeGame(id: string): Promise<void>;
  hash: HashData;
  idMobile: boolean;
}

const Header: React.FC<Props> = ({
  id,
  playAgainGame,
  closeGame,
  hash,
  idMobile,
}) => {
  const handlePlayAgain = useCallback(async () => {
    await playAgainGame(id);
  }, [id, playAgainGame]);

  const handleCloseGame = useCallback(async () => {
    await closeGame(id);
  }, [id, closeGame]);

  const opponent = useMemo(() => {
    if (hash && hash.you !== hash.player_1) {
      return hash.player_1;
    }
    if (hash && hash.you !== hash.player_2) {
      return hash.player_2;
    }

    return '';
  }, [hash]);

  return (
    <Container idMobile={idMobile}>
      <Player winner={hash?.winner === hash.player_1} testID="player1">
        {hash.player_1}
      </Player>
      {hash.winningMode || hash.game.length === 9 ? (
        <ButtonsContainer testID="buttons">
          <ButtonPlayAgain onPress={handlePlayAgain}>
            <ButtonPlayAgainText>Jogar novamente</ButtonPlayAgainText>
          </ButtonPlayAgain>
          <ButtonClose onPress={handleCloseGame}>
            <ButtonCloseText>Sair</ButtonCloseText>
          </ButtonClose>
        </ButtonsContainer>
      ) : (
        <Turn testID="turn">
          {hash.playerInit === hash.you || hash.nextPlayer === hash.you
            ? 'Sua vez'
            : `Vez de ${opponent}`}
        </Turn>
      )}
      <Player winner={hash?.winner === hash.player_2} testID="player2">
        {hash.player_2}
      </Player>
    </Container>
  );
};

export default Header;
