import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Image = styled.Image`
  width: 36px;
  height: 18px;
`;

export const Text = styled.Text`
  color: #ee4e62;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
`;
