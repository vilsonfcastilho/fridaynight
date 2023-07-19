import { TouchableOpacityProps } from 'react-native';

import { ButtonStyleTypeProps, Container, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonStyleTypeProps;
}

export function Button({ title, type = 'GREEN', ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
