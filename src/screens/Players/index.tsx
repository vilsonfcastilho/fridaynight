import { useState } from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const [ selectedTable, setSelectedTable ] = useState('MESA 1');
  const [ players, setPlayers ] = useState([{id: '1', name: 'Vilson'}, {id: '2', name: 'Lincon'}]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle='Add your friends and separate the tables'
      />

      <Form>
        <Input
          placeholder='Person name'
          autoCorrect={false}
        />

        <ButtonIcon
          icon='add'
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['MESA 1', 'MESA 2']}
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

      <FlatList
        data={players}
        keyExtractor={player => player.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => {}}
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

      <Button
        title='Remove Table'
        type='RED'
      />
    </Container>
  );
}
