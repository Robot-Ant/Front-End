import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ResponsiveAppBar from './components/AppBar';
import BasicTabs from './pages/Tabs';

function App() {
  return (
    <Container fixed>
      <ResponsiveAppBar></ResponsiveAppBar>
      <BasicTabs></BasicTabs>

    </Container>
  );
}

export default App;

