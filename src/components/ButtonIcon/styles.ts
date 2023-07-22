import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type ButtonIconStyleTypeProps = 'ADD' | 'REMOVE';

type Props = {
  type: ButtonIconStyleTypeProps;
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === 'ADD' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_700,
}))``;
