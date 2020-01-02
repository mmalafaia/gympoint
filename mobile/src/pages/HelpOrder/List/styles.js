import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f2f2f2;
`;

export const AddButton = styled(Button)`
  margin: 0 20px;
  margin-top: 20px;
`;

export const QuestionsList = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const Line = styled(TouchableOpacity)`
  flex: 1;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 20px;
`;

export const LineTop = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
`;

export const QuestionState = styled.Text`
  margin-left: 20px;
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const QuestionDate = styled.Text`
  font-size: 14px;
`;

export const QuestionText = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 14px;
`;
