import React from 'react';

import { Container, Image, Text } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Container>
      <Image source={logo} />
      <Text>GYMPOINT</Text>
    </Container>
  );
}
