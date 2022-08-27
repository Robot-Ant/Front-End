/* eslint-disable */
import * as React from 'react';
//import Container from '@mui/material/Container';
import ResponsiveAppBar from './components/AppBar';
import styled from 'styled-components';
import BasicTabs from './pages/Tabs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Container>
      <ResponsiveAppBar></ResponsiveAppBar>

      <BrowserRouter>
				<Routes>
					<Route path="/" element={<BasicTabs />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
				</Routes>
			</BrowserRouter>

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
