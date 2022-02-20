import './App.css';
import { Typography } from '@mui/material';
import logo from './ninja.png';
import Form from './components/form/form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography align='center' variant="h3" component="h1">
          NINJIFY
        </Typography>
      </header>
      <div className="App-body">
        <Typography align='center' variant="h3" component="h2">
          Get your Ninja Name!
        </Typography>
        <Typography align='center' variant="h5" component="h3">
          Enter tech words to get your ninja name.
        </Typography>
        <Form></Form>
      </div>
    </div>
  );
}

export default App;
