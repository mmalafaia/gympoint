import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Checks from '~/components/Checks';
import Header from '~/components/Header';

import { Container, AddButton, List } from './styles';

function CheckIn({ isFocused }) {
  const [checkins, setCheckins] = useState([]);
  const id = useSelector(state => state.user.profile.id);

  async function loadCheckins() {
    const response = await api.get(`students/${id}/checking`);

    setCheckins(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused]);

  return (
    <Container>
      <Header />
      <AddButton>Novo check-in</AddButton>

      <List
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Checks data={item} />}
      />
    </Container>
  );
}

CheckIn.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

CheckIn.protoType = {
  isFocused: PropTypes.bool,
};

CheckIn.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(CheckIn);
