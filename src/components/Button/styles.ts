import styled, { css } from 'styled-components/native';

import { TouchableOpacity } from 'react-native';

export type ButtonStyleTypeProps = 'GREEN' | 'RED';

type Props = {
  type: ButtonStyleTypeProps;
}

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme, type }) => type === 'GREEN'
    ? theme.COLORS.GREEN_700
    : theme.COLORS.RED_700
  };
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
  `};
`;
