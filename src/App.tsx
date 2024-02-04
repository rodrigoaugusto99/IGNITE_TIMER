
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { CycleContextProvider } from './contexts/CyclesContext';


export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CycleContextProvider>
          <Router/>
        </CycleContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
    
  )
}


