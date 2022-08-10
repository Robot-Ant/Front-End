import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

function Page2() {
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [financeList, setFinanceList] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/finance/list')
        .then(res => setFinanceList(res.data))
        .catch(function (error) {
          console.log(error);
        })
    }, [])
    
    return (
        <Container>
            <AutocompleteBox>
                <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
                <div>{`inputValue: '${inputValue}'`}</div>
                <br />
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options= {financeList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="주식 검색" />}
                />
            </AutocompleteBox>

            <TradeContainer>
                <p>선택한 주식을 파라미터로 다시 서버에 요청 > 영업이익 주가 차트</p>
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

const FontBox = styled.div`
  font-size: 1.3vw;

  @media only screen and (max-width: 720px) {
    font-size: 1em;
  }

  @media only screen and (min-width: 721px) {
    font-size: 1.5em;
  }
`