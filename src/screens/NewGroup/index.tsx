import { useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const [ group, setGroup ] = useState('');

  const navigation = useNavigation();

  function handleGoToPlayers() {
    navigation.navigate('players', { group });
  }

  return (
    <Container>
      <Header showBackButton />

      <Content
        enabled={Platform.OS === 'ios' ? true : false}
        behavior="padding"
      >
        <Icon />

        <Highlight
          title='New Group'
          subtitle='Create a group to add your friends'
        />

        <Input
          placeholder='Group name'
          onChangeText={setGroup}
        />

        <Button
          title='Create'
          style={{ marginTop: 20 }}
          onPress={handleGoToPlayers}
        />
      </Content>
    </Container>
  );
}
