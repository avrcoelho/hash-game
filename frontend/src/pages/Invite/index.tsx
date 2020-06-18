import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useIntegration } from '../../hooks/integration';

import { Container } from './styles';

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

  return <Container></Container>;
};

export default Invite;
