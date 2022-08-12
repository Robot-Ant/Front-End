import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DataTable(props) {
  const rows = props.items

  return (
    <TableContainer component={Paper} style={{height:'100%',width:'100%', overflow: 'scroll'}} >
      <Table stickyHeader size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{width:'3%', fontWeight: 'bolder', whiteSpace:'nowrap'}}> 날짜 </TableCell>
            <TableCell align="center" style={{width:'10%', fontWeight: 'bolder', whiteSpace:'nowrap' }}> 시간 </TableCell>
            <TableCell align="center" style={{width:'10%', fontWeight: 'bolder', whiteSpace:'nowrap'}}> 0매수 1매도 </TableCell>
            <TableCell align="center" style={{width:'10%', fontWeight: 'bolder', whiteSpace:'nowrap'}}> 종목코드 </TableCell>
            <TableCell align="center" style={{width:'10%', fontWeight: 'bolder', whiteSpace:'nowrap'}}> 단가 </TableCell>
            <TableCell align="center" style={{width:'10%', fontWeight: 'bolder', whiteSpace:'nowrap'}}> 주식 수</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          { rows && rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center">{row.매수}</TableCell>
              <TableCell align="center">{row.code}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
