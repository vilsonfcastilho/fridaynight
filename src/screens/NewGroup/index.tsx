import { useState } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppError } from '@errors/AppError';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { createGroup } from '@storage/group/createGroup';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const [ group, setGroup ] = useState('');

  const navigation = useNavigation();

  async function handleCreateNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('New group', 'Provide the name of the group.');
      }

      await createGroup(group);
      navigation.navigate('players', { group });
    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert('New group', error.message);
      } else {
        Alert.alert('New group', 'Unable to create a new group.');
        console.log(error);
      }
    }
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
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  );
}
