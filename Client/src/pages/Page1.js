/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import LineChart from '../components/LineChart';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DataTable from '../components/DataTable';
import axios from 'axios';
import 'antd/dist/antd.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useSWR from 'swr'
import { message, Input, Modal} from 'antd';

function Page1() {
  const [running, setRunning] = useState(''); // 실행 중인 전략
  const [asset, setAsset] = useState({});
  const [assetvolatility, setAssetvolatility] = useState({});
  const [isRun, setIsRun] = useState(''); //임시
  const [disabled, setDisabled] = useState(false);

  //실행 여부
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/strat/exeinfo')
      .then(res => setRunning(res.data))
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const getRunning = () => {
    axios.get('http://127.0.0.1:5000/strat/exeinfo')
      .then(res => setRunning(res.data))
      .catch(function (error) {
        console.log(error);
      })
  }

  //button 전략실행
  const stop = () => {
    axios.get('http://127.0.0.1:5000/strat/stop')
      .then(res => setIsRun(res.data))
      .then(setRunning('False'))
      .catch(function (error) {
        console.log(error);
      })
  };

  const runVoal = () => {
    axios.get('http://127.0.0.1:5000/strat/vola')
      .then(res => setIsRun(res.data))
      .then(getRunning)
      .catch(function (error) {
        console.log(error);
      })
  };

  const runRebal = () => {
    axios.get('http://127.0.0.1:5000/strat/rebal')
      .then(res => setIsRun(res.data))
      .then(getRunning)
      .catch(function (error) {
        console.log(error);
      })
  };

  const runVp = () => {
    axios.get('http://127.0.0.1:5000/strat/vp')
      .then(res => setIsRun(res.data))
      .then(getRunning)
      .catch(function (error) {
        console.log(error);
      })
  };

  const runMas = () => {
    axios.get('http://127.0.0.1:5000/strat/mas')
      .then(res => setIsRun(res.data))
      .then(getRunning)
      .catch(function (error) {
        console.log(error);
      })
  };

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
  const handleInputValue = (e) => {
    setInputValue(e.target.value)
  }
  const success = () => {
    message.success('매매전략을 변경했습니다.');
  };
  const successStop = () => {
    message.success('자동매매를 종료합니다.');
  };

  //데이터테이블 Swr
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSWR('http://127.0.0.1:5000/info/tabledata', fetcher, { refreshInterval: 3000 })

  //axios 요청
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/info/stock')
      .then(res => setAsset(res.data))
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/chart/assetvolatility')
      .then(res => setAssetvolatility(res.data))
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        {running !== 'False' ?
          <Alert severity="success"> <span style={{ color: "blue" }}> {running} </span> 자동매매가 실행 중입니다. </Alert>
          :
          <Alert severity="warning">자동매매가 꺼져 있습니다.</Alert>
        }
        <Button type="primary" onClick={showModal}> <HelpOutlineIcon />나의 수익이 궁금하다면?</Button>
      </div>
      <Container>
        <Box>
          <PaperContainer>
            <PaperBox style={{ overflow: 'hidden' }}>
              <FontBox style={{ fontSize: '1.2vw', color: 'gray', marginBottom: '2.0%' }}>총 보유 자산</FontBox>

              <Modal title="자동매매 수익 시뮬레이터" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="자산을 입력하세요" onChange={handleInputValue} />
                <p style={{ marginTop: '5%' }}>21년 8월 ~ 22년 8월 수익률 기준</p>
                <p>변동성 돌파 : {inputValue && Number(inputValue) + (inputValue * 0.073) +' (+7.3%)'}</p>
                <p>이평선 괴리율 스윙 : {inputValue && Number(inputValue) + (inputValue * -0.186) +' (-18.6%)'}</p>
                <p>체결강도 : {inputValue && Number(inputValue) + (inputValue * 0.00)+' (0%)'}</p>
                <p>평균 복원 : {inputValue && Number(inputValue) + (inputValue * 0.0129)+' (+1.3%)'}</p>

                <p style={{ color: 'gray', fontSize: '5%' }}>
                  투자의 책임은 투자자 본인에게 있습니다. 백테스트에 기반한 예측일 뿐이며, <br /> 원금이나 수익이 보장되지 않습니다.
                </p>
              </Modal>

              {asset ? <FontBox> {asset['total_asset']} 원</FontBox> : <FontBox> { } 원</FontBox>}
              {asset ?
                (
                  asset['asst_icdc'] >= 0 ?
                    <FontBox style={{ color: 'blue' }}>+{asset['asst_icdc']}%</FontBox>
                    :
                    <FontBox style={{ color: 'red' }}> {asset['asst_icdc']}%</FontBox>
                )
                : <FontBox> 0.0% </FontBox>}
            </PaperBox>

            <PaperBox>
              <FontBox style={{ fontSize: '1.2vw', color: 'gray', marginBottom: '2.0%' }}>주식 평가 금액</FontBox>
              {asset ? <FontBox> {asset['evlu_amt']} 원</FontBox> : <FontBox> { } 원</FontBox>}
              {asset ?
                (
                  asset['evlu_ratio'] >= 0 ?
                    <FontBox style={{ color: 'blue' }}>+{asset['evlu_ratio']}%</FontBox>
                    :
                    <FontBox style={{ color: 'red' }}> {asset['evlu_ratio']}%</FontBox>
                )
                : <FontBox> 0.0% </FontBox>}

            </PaperBox>
          </PaperContainer>
        </Box>

        <Box>
          <ChartBox>
            <LineChart items={assetvolatility}></LineChart>
          </ChartBox>
        </Box>
      </Container>

      <TradeContainer>
        <div style={{ overflow: 'hidden' }} >
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="info" onClick={() => {
              runVoal()
              success()
            }}> 변동성 돌파 </Button>

            <Button variant="contained" color="success" onClick={() => {
              runMas()
              success()
            }} > 이평선 괴리율 스윙 </Button>

            <Button variant="contained" color="warning" onClick={() => {
              runVp()
              success()
            }}> 체결강도 </Button>

            <Button variant="contained" color="secondary" onClick={() => {
              runRebal()
              success()
            }}> 평균 복원 </Button>

            <Button variant="contained" color="error" onClick={() => {
              stop()
              successStop()
            }}> 정지 </Button>
          </Stack>
        </div>

        <div style={{ height: "80%", width: "100%", marginTop: "1.5%" }}>
          {data ? <DataTable items={data} /> : <DataTable></DataTable>}
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