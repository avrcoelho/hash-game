import React, { useEffect, useCallback } from 'react';
import { useClipboard } from '@react-native-community/hooks';
import { useParams, useHistory } from 'react-router-dom';
import { FiCopy } from 'react-icons/fi';
import socketio from 'socket.io-client';
import { useMediaQuery } from 'react-responsive';

import { useIntegration } from '../../hooks/integration';
import { HashData } from '../../hooks/types';

import {
  Container,
  LogoText,
  Info,
  InviteInfo,
  LinkContainer,
  Link,
  CopyButton,
} from './styles';

interface Params {
  id: string;
}

const Invite: React.FC = () => {
  const { id } = useParams<Params>();
  const { showGame, updateData } = useIntegration();
  const history = useHistory();
  const [, setString] = useClipboard();
  const isMobile = useMediaQuery({
    query: '(max-device-width: 470px)',
  });

  useEffect(() => {
    async function getGame() {
      await showGame(id);
    }

    getGame();
  }, [id, showGame]);

  const copyToClipboard = useCallback(() => {
    setString(`${process.env.REACT_APP_URL}/player2/${id}`);
  }, [id, setString]);

  useEffect(() => {
    const socket = socketio(
      process.env.REACT_APP_API || 'http://localhost:3333',
    );

    socket.emit('connectRoom', id);

    socket.on('player2Entered', (gameData: HashData) => {
      updateData(gameData);

      history.push(`/game/${id}`);
    });
  }, [history, id, updateData]);

  return (
    <Container>
      <LogoText>Jogo da velha</LogoText>
      <Info>Envie o link para alguém e aguarde a sua entrada</Info>
      <InviteInfo>
        <LinkContainer isMobile={isMobile}>
          <Link>{`${process.env.REACT_APP_URL}/player2/${id}`}</Link>
        </LinkContainer>
        <CopyButton onPress={copyToClipboard} testID="button-copy">
          <FiCopy size={15} color="#efefef" />
        </CopyButton>
      </InviteInfo>
    </Container>
  );
};

export default Invite;
