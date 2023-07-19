import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

import { Container } from './styles';

export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight
        title='Groups'
        subtitle='Play with your crew.'
      />
      <GroupCard title='Group One' />
    </Container>
  );
}
