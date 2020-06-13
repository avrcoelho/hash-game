import React, { useRef } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  LogoContainer,
  LogoText,
  FormContainer,
} from './styles';

const Access: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Content>
        <LogoContainer>
          <LogoText>Jogo da Velha</LogoText>
        </LogoContainer>
        <FormContainer>
          <Form ref={formRef} onSubmit={() => {}}>
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
