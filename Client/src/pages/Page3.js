import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import LineChart from '../components/LineChart';
import axios from 'axios';

function Page3(props) {
    return (
        <Container>
            <ChartContainer>
                <Box>
                    <ChartBox>

                    </ChartBox>
                </Box>
                <Box>
                    <ChartBox>

                    </ChartBox>
                </Box>
            </ChartContainer>

            <ChartContainer style={{marginTop:'15px'}}>
                <Box>
                    <ChartBox>

                    </ChartBox>
                </Box>
                <Box>
                    <ChartBox>

                    </ChartBox>
                </Box>
            </ChartContainer>

            <ChartContainer style={{marginTop:'15px'}}>
                <Box>
                    <ChartBox>

                    </ChartBox>
                </Box>
                <Box>
                    <ChartBox>

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
  flex-direction: column;
`

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 1.5%;
  width: 100%;
  height: 50vh;

  @media only screen and (max-width: 720px) {
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

  @media only screen and (max-width: 720px) {
    width: 100%;
    height: 50%;
    margin-bottom: 6px;
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