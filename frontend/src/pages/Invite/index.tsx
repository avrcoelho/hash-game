import React, { useEffect, useCallback } from 'react';
import { Clipboard } from 'react-native';
import { useParams, useHistory } from 'react-router-dom';
import { FiCopy } from 'react-icons/fi';

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

const Invite: React.FC = () => {
  const { id } = useParams<Params>();
  const { showGame, error } = useIntegration();
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

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(`${process.env.REACT_APP_API}/player2/${id}`);
  }, []);

  return (
    <Container>
      <LogoText>Jogo da velha</LogoText>
      <Info>Envie o link para alguem e aguarde a sua entreada</Info>
      <LinkContainer>
        <Link>{`${process.env.REACT_APP_API}/player2/${id}`}</Link>
        <CopyButton onPress={copyToClipboard}>
          <FiCopy size={15} color="#efefef" />
        </CopyButton>
      </LinkContainer>
    </Container>
  );
};

export default Invite;
