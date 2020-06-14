import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationError';

import {
  Container,
  Content,
  LogoContainer,
  LogoText,
  FormContainer,
} from './styles';

interface FormDataProps {
  player_1: string;
}

const Access: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleOnSubmit = useCallback(async (data: FormDataProps) => {
    try {
      // Remove all previous errors
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        player_1: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      console.log(data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <LogoContainer>
          <LogoText>Jogo da Velha</LogoText>
        </LogoContainer>
        <FormContainer>
          <Form ref={formRef} onSubmit={handleOnSubmit}>
            <Input
              name="player_1"
              icon={FiUser}
              placeholder="Nome do jogador"
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Acessar
            </Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default Access;
