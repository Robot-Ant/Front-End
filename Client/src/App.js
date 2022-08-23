/* eslint-disable */
import * as React from 'react';
//import Container from '@mui/material/Container';
import ResponsiveAppBar from './components/AppBar';
import BasicTabs from './pages/Tabs';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <ResponsiveAppBar></ResponsiveAppBar>
      <BasicTabs></BasicTabs>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: auto;
  height: auto;
  max-width: 1280px;
  margin:auto;
`
