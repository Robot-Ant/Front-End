import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import LineChart2 from '../components/LineChart2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DataTable from '../components/DataTable';
//import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Page1() {
  const [running, setRunning] = useState(false); // 실행 중
  const [total, setTotal] = useState(49999999); //총 보유 자산
  const [rate, setRate] = useState(5.5); // 수익률
  // (단위변환).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        {running === true ?
          <Alert severity="success">자동매매가 실행 중입니다.</Alert>
          :
          <Alert severity="warning">자동매매가 꺼져 있습니다.</Alert>
        }
      </div>

      <Container>
        <Box>
          <PaperContainer>
            <PaperBox style={{overflow:'hidden'}}>
              <FontBox style={{fontSize:'1.2vw', color:'gray', marginBottom:'2.0%'}}>총 보유 자산</FontBox>
              <FontBox> {total} 원</FontBox>
              {rate>=0 ? <FontBox style={{color:'blue'}}>+{rate}%</FontBox> : <FontBox style={{color:'red'}}>{rate}%</FontBox>}
            </PaperBox>

            <PaperBox>
              <FontBox style={{fontSize:'1.2vw', color:'gray', marginBottom:'2.0%'}}>주식 평가 금액</FontBox>
              <FontBox> {total} 원</FontBox>
              {rate>=0 ? <FontBox style={{color:'blue'}}>+{rate}%</FontBox> : <FontBox style={{color:'red'}}>{rate}%</FontBox>}
            </PaperBox>
          </PaperContainer>
        </Box>

        <Box>
          <ChartBox>
            <LineChart2></LineChart2>
          </ChartBox>
        </Box>
      </Container>

      <TradeContainer>
        <div style={{ overflow: 'hidden' }} >
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="info" onClick={() => { alert('자동매매 전략을 변경했습니다.'); }}> 변동성 돌파매매 </Button>
            <Button variant="contained" color="success" onClick={() => { alert('자동매매 전략을 변경했습니다.'); }}> 이평선 괴리율 스윙 </Button>
            <Button variant="contained" color="warning" onClick={() => { alert('자동매매 전략을 변경했습니다.'); }}> 체결강도 매매 </Button>
          </Stack>
        </div>

        <div style={{ height: "80%", width: "100%", marginTop: "1.5%" }}>
          <DataTable />
        </div>
      </TradeContainer>
    </div>
  );
}

export default Page1;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5%;
  height: 50vh;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
    height: 60vh;
  }
`

const Box = styled.div`
  display:flex;
  width: 50%;
  height: 100%;
  margin:1.5px;
  background-color: white;
  border: 2px solid;
  border-color: rgba(95, 93, 93, 0.438);
  border-radius: 8px;

  @media only screen and (max-width: 720px) {
    width: 100%;
    height: 50%;
  }
`

const ChartBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 720px) {
    overflow: scroll;
  }
`

const TradeContainer = styled.div`
  display: flex;
  margin-top: 3%;
  height: 55vh;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  background-color: white;
  border: 2px solid;
  border-color: rgba(95, 93, 93, 0.438);
  border-radius: 8px;
`

const PaperContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 2%;
  gap:5%;
`

const PaperBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 45%;
  background-color: white;
  border: 1.5px solid;
  border-color: rgba(95, 93, 93, 0.438);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 4px 6px;
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