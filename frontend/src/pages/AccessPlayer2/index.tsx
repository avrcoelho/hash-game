import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

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
  Loader,
} from './styles';

interface FormDataProps {
  player_2: string;
}

interface Params {
  id: string;
}

const AccessPlayer2: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { loading, insertPlay2 } = useIntegration();
  const { id } = useParams<Params>();

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

        await insertPlay2({ ...data, id });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationError(error);

          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [insertPlay2, id],
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
              {loading ? <Loader /> : 'Acessar'}
            </Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default AccessPlayer2;
