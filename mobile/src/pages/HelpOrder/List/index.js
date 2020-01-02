import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Header from '~/components/Header';
import {
  Container,
  AddButton,
  QuestionsList,
  Line,
  LineTop,
  QuestionState,
  QuestionDate,
  QuestionText,
} from './styles';

export default function List({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const id = useSelector(state => state.user.profile.id);

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get(`/students/${id}/help-orders`);

      const data = response.data.map(resp => ({
        ...resp,
        formattedDate: formatRelative(parseISO(resp.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }));

      setQuestions(data);
    }
    loadQuestions();
  }, [id]);

  return (
    <Container>
      <Header />
      <AddButton onPress={() => navigation.navigate('Add')}>
        Novo pedido de auxílio
      </AddButton>
      <QuestionsList
        data={questions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item: helpOrder }) => (
          <Line onPress={() => navigation.navigate('Show', { helpOrder })}>
            <LineTop>
              <QuestionState answered={helpOrder.answer}>
                Respondido
              </QuestionState>
              <QuestionDate>{helpOrder.formattedDate}</QuestionDate>
            </LineTop>
            <QuestionText>{helpOrder.question}</QuestionText>
          </Line>
        )}
      />
    </Container>
  );
}

List.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
