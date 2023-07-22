import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { Container } from './styles';

interface IGroup {
  id: string;
  name: string;
}

export function Groups() {
  const [ groups, setGroups ] = useState<IGroup[]>([]);

  return (
    <Container>
      <Header />
      <Highlight
        title='Groups'
        subtitle='Play with your crew'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GroupCard
            title={item.name}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyList
            message='No groups have been registered yet.'
          />
        )}
      />

      <Button
        title='Create new group'
      />
    </Container>
  );
}
