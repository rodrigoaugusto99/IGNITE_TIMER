import { Button} from "./components/Button";
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant='primary'/>
      <Button variant='secundary'/>
      <Button variant='danger'/>
      <Button variant='success'/>
      <Button/>
    </ThemeProvider>
  )
}


