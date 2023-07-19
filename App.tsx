import { ThemeProvider } from 'styled-components';
import { Tables } from '@screens/Tables';

import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Tables />
    </ThemeProvider>
  );
}
