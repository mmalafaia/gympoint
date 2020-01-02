import React from 'react';

import Header from '~/components/Header';
import { Container, Box, LineTop, Title, Memo, When } from './styles';

export default function Show({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Container>
      <Header />
      <Box>
        <LineTop>
          <Title>PERGUNTA</Title>
          <When>{helpOrder.formattedDate}</When>
        </LineTop>
        <Memo>{helpOrder.question}</Memo>
        <Title>RESPOSTA</Title>
        <Memo>{helpOrder.answer}</Memo>
      </Box>
    </Container>
  );
}
