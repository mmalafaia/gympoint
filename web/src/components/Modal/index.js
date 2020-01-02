import React, { useState } from 'react';
import {
  Container,
  Card,
  Title,
  Question,
  Answer,
  ButtonAdd,
  ButtonCancel,
} from './styles';

export default function Modal({ handleAdd, handleClose, helpOrder }) {
  const [answer, setAnswer] = useState('');
  return (
    <Container>
      <Card>
        <Title>PERGUNTA DO ALUNO</Title>
        <Question>{helpOrder.question}</Question>
        <Title>SUA RESPOSTA</Title>
        <Answer
          placeholder="Digite aqui sua resposta"
          type="text"
          onChange={event => setAnswer(event.target.value)}
        />

        <ButtonAdd onClick={() => handleAdd(answer)}>Responder aluno</ButtonAdd>
        <ButtonCancel onClick={handleClose}>Voltar</ButtonCancel>
      </Card>
    </Container>
  );
}
