import React, { useRef, useCallback, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { FiUser, FiLoader } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationError';
import { useIntegration } from '../../hooks/integration';

import {
  Container,
  Content,
  LogoContainer,
  LogoText,
  FormContainer,
} from './styles';

interface FormDataProps {
  player_2: string;
}

interface Params {
  id: string;
}

const AccessPlayer2: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<Params>();
  const { loading, error, insertPlay2, showGame } = useIntegration();
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

  const handleOnSubmit = useCallback(
    async (data: FormDataProps) => {
      try {
        // Remove all previous errors
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          player_2: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const id = await insertPlay2(data);

        if (id) {
          history.push(`game/${id}`);
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationError(error);

          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [insertPlay2, history],
  );

  return (
    <Container>
      <Content>
        <LogoContainer>
          <LogoText>Jogo da Velha</LogoText>
        </LogoContainer>
        <FormContainer>
          <Form ref={formRef} onSubmit={handleOnSubmit}>
            <Input
              name="player_2"
              icon={FiUser}
              placeholder="Nome do jogador"
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              {loading ? (
                <FiLoader size={18} color="#312e38" className="spin" />
              ) : (
                'Acessar'
              )}
            </Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default AccessPlayer2;
