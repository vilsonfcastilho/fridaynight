import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { listGroups } from '@storage/group/listGroups';

import { Container } from './styles';
import { Loading } from '@components/Loading';

export function Groups() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ groups, setGroups ] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const storedGroups = await listGroups();
      setGroups(storedGroups);

      setIsLoading(false);
    } catch(error) {
      Alert.alert('Groups', 'Unable to load the groups.');
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight
        title='Groups'
        subtitle='Play with your crew'
      />

      {
        isLoading
        ? <Loading />
        : <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <EmptyList
              message='No groups have been registered yet.'
            />
          )}
        />
      }

      <Button
        title='Create Group'
        onPress={handleNewGroup}
      />
    </Container>
  );
}
