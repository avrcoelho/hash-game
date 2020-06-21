import React, { useEffect, useCallback, useMemo } from 'react';
import { useClipboard } from '@react-native-community/hooks';
import { useParams, useHistory } from 'react-router-dom';
import { FiCopy } from 'react-icons/fi';
import socketio from 'socket.io-client';

import { useIntegration } from '../../hooks/integration';

import {
  Container,
  LogoText,
  Info,
  LinkContainer,
  Link,
  CopyButton,
} from './styles';

interface Params {
  id: string;
}

interface GameData {
  player_2: string;
}

const Invite: React.FC = () => {
  const { id } = useParams<Params>();
  const { showGame, error } = useIntegration();
  const history = useHistory();
  const [, setString] = useClipboard();

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

  const copyToClipboard = useCallback(() => {
    setString(`${process.env.REACT_APP_URL}/player2/${id}`);
  }, [id, setString]);

  const socket = useMemo(
    () => socketio(process.env.REACT_APP_API || 'http://localhost:3333'),
    [],
  );

  useEffect(() => {
    socket.emit('connectRoom', id);

    socket.on('player2Entered', (gameData: GameData) => {
      if (gameData.player_2) {
        history.push(`/game/${id}`);
      }
    });
  }, [socket, history, id]);

  return (
    <Container>
      <LogoText>Jogo da velha</LogoText>
      <Info>Envie o link para alguem e aguarde a sua entreada</Info>
      <LinkContainer>
        <Link>{`${process.env.REACT_APP_URL}/player2/${id}`}</Link>
        <CopyButton onPress={copyToClipboard} testID="button-copy">
          <FiCopy size={15} color="#efefef" />
        </CopyButton>
      </LinkContainer>
    </Container>
  );
};

export default Invite;
