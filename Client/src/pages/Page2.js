import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Button from '@mui/material/Button';
import FinanceLineChart from '../components/FinanceLineChart';

function Page2() {
  const [value, setValue] = useState('');
  const [financeList, setFinanceList] = useState([]);
  const [financeData, setFinanceData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/finance/list')
      .then(res => setFinanceList(res.data))
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  function getFinanceData(){
    console.log(value)
    if(value){
      axios.get('http://localhost:5000/finance/data', {
      params: {
        id: value
      }
      })
      .then(res => setFinanceData(res.data))
      .catch(function (error) {
        console.log(error);
      })
    }
  }

  return (
    <Container>
      <AutocompleteBox>
        <br />
        <Autocomplete style={{backgroundColor:'white', borderRadius:3}}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          id="controllable-states-demo"
          options= {['카카오']}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="주식 검색" />}
        />
        <Button style={{marginLeft:'1.5%'}}variant="contained" onClick={getFinanceData}>검색</Button>
      </AutocompleteBox>

      <TradeContainer>
        <ChartBox>
          <FinanceLineChart items = {financeData}></FinanceLineChart>
        </ChartBox>
      </TradeContainer>
    </Container>
  );
}

export default Page2;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5%;
  height: 70vh;

  @media only screen and (max-width: 900px) {
    height: 70vh;
  }
`

const AutocompleteBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%; 
  height: 10%; 
  @media only screen and (min-width: 900px) {
  }
`

const TradeContainer = styled.div`
  display: flex;
  margin-top: 3%;
  width: 100%;
  height: 60vh;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  background-color: white;
  border: 2px solid;
  border-color: rgba(95, 93, 93, 0.438);
  border-radius: 8px;
`

const ChartBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media only screen and (max-width: 720px) {
  overflow: scroll;
  }

  @media only screen and (min-width: 1200px) {
  width: 66%;
  }
`