import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Button from '@mui/material/Button';
import FinanceLineChart from '../components/FinanceLineChart';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Modal} from 'antd';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function Page2() {
  const [value, setValue] = useState('');
  const [financeList, setFinanceList] = useState([]);
  const [financeData, setFinanceData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/info/namelist')
      .then(res => setFinanceList(res.data))
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const getFinanceData = async () => {
    setLoading(true)
    try {
      if (value) {
        await axios.get('http://localhost:5000/info/financedata', {
          params: {
            id: value
          }
        })
          .then(res => setFinanceData(res.data))
          .catch(function (error) {
            console.log(error);
          })
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Container>

      <Modal title="정보 및 주의사항" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p style={{ marginTop: '1%' }}> eps(당기순이익/발행주식수)와 주가의 흐름을 비교해볼 수 있는 차트입니다. </p>
        <p>최근 6년도 데이터 중 상장일로부터 1년 이후의 데이터가 표시됩니다.</p>
        <br></br>
        <p>다트 API를 활용하여 데이터를 가져옵니다.</p>
        <p>"""</p>
        <p style={{color:'gray'}}>조회가 되지 않는 경우는 ‘IFRS XBRL 재무제표 작성기’를 사용하여 제출할 의무가 없는 회사입니다. (비상장회사 및 금융회사가 이에 해당)</p>
        <p style={{color:'gray'}}>또한, 제출회사가 제출의무가 있음에도 'IFRS XBRL 재무제표 작성기'를 이용하지 않고 제출하는 경우 재무정보 추출 및 제공이 어려운 부분이 있는 점 참고부탁드립니다.</p>
        <p>"""</p>
      </Modal>

      <AutocompleteBox>
        <br />
        <Button type="primary" onClick={showModal}> <HelpOutlineIcon /></Button>
        <Autocomplete style={{ backgroundColor: 'white', borderRadius: 3 }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          id="controllable-states-demo"
          options={financeList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="주식 검색" />}
        />
        <Button style={{ marginLeft: '1.5%' }} variant="contained" onClick={getFinanceData}>검색</Button>
      </AutocompleteBox>

      <TradeContainer>
        <ChartBox>
          <FinanceLineChart items={financeData}></FinanceLineChart>
        </ChartBox>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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