import { Platform } from 'react-native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  return (
    <Container
      enabled={Platform.OS === 'ios' ? true : false}
      behavior="padding"
    >
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title='New Group'
          subtitle='Create a group to add your friends'
        />

        <Input
          placeholder='Group name'
        />

        <Button
          title='Create'
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
