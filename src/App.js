import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import myTheme from './components/UI/Theme';

import Header from './components/Header';

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
