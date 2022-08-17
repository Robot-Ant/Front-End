import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import BackTestLineChart from '../components/BackTestLineChart';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import RadarChart from '../components/RadarChart';
import PieChart from '../components/PieChart';

function Page3(props) {
  const [backData, setBackData] = useState({});
  const [loading, setLoading] = useState(false);

  const getBackData = async () => {
    setLoading(true)
    await axios.get('http://3.36.119.221:5000/info/backdata')
      .then(res => setBackData(res.data))
      .catch(function (error) {
        console.log(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    getBackData();
  }, [])

  return (
    <Container>
      <ChartContainer>
        <MainBox>
          <ChartBox2>
            <BackTestLineChart items={backData}></BackTestLineChart>
          </ChartBox2>
        </MainBox>
      </ChartContainer>

      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

      <ChartContainer style={{ marginTop: '15px' }}>
        <Box>
          <ChartBox>
            <RadarChart/>
          </ChartBox>
        </Box>
        <Box>
          <ChartBox>
            <PieChart/>
          </ChartBox>
        </Box>
      </ChartContainer>
    </Container>
  );
}

export default Page3;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 1.5%;
  width: 100%;
  height: 50vh;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
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

  @media only screen and (max-width: 900px) {
    width: 100%;
    height: 50%;
    margin-bottom: 4px;
  }
`

const MainBox = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid;
  border-color: rgba(95, 93, 93, 0.438);
  border-radius: 8px;

  @media only screen and (max-width: 720px) {
    width: 100%;
    height: 100%;
    margin-bottom: 6px;
  }

`

const ChartBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    overflow: scroll;
  }
`

const ChartBox2 = styled.div`
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