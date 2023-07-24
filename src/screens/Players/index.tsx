import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AppError } from '@errors/AppError';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { PlayerStorageDTO } from '@storage/player/dtos/PlayerStorageDTO';
import { addPlayerByGroup } from '@storage/player/addPlayerByGroup';
import { getPlayersByGroupAndTable } from '@storage/player/getPlayersByGroupAndTable';
import { removePlayerByGroup } from '@storage/player/removePlayerByGroup';
import { deleteGroupByName } from '@storage/group/deleteGroupByName';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ selectedTable, setSelectedTable ] = useState('MESA 1');
  const [ newPlayerName, setNewPlayerName ] = useState('');
  const [ players, setPlayers ] = useState<PlayerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New player', 'Provide the name of the player.');
    }

    const newPlayer = {
      name: newPlayerName,
      table: selectedTable,
    };

    try {
      await addPlayerByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch(error) {
      if(error instanceof AppError) {
        Alert.alert('New player', error.message);
      } else {
        Alert.alert('New player', 'Unable to add the player.');
        console.log(error);
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch(error) {
      Alert.alert('Remove player', 'Uname to remove the player.');
      console.log(error);
    }
  }

  async function deleteGroup() {
    try {
      await deleteGroupByName(group);
      navigation.navigate('groups');
    } catch(error) {
      Alert.alert('Delete group', 'Unable to delete the group.');
      console.log(error);
    }
  }

  async function handleDeleteGroup() {
    Alert.alert(
      'Delete group',
      'Do you want to delete the group?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => deleteGroup() }
      ]
    );
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTable = await getPlayersByGroupAndTable(group, selectedTable);
      setPlayers(playersByTable);
    } catch(error) {
      Alert.alert('Players', 'Unable to load players from selected table.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [selectedTable]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle='Add your friends and separate the tables'
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Person name'
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='default'
        />

        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['TABLE 1']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === selectedTable}
              onPress={() => setSelectedTable(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {
        isLoading
        ? <Loading />
        : <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyList
              message='Register the first player'
            />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      }

      <Button
        title='Delete Group'
        type='RED'
        onPress={handleDeleteGroup}
      />
    </Container>
  );
}
