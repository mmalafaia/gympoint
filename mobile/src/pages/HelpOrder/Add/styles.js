import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f2f2f2;
`;

export const Box = styled.View`
  background: #fff;
  margin: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 5px 15px;
  height: 300px;
`;

export const TInput = styled.TextInput``;

export const AddButton = styled(Button)`
  margin: 0px 20px;
`;
