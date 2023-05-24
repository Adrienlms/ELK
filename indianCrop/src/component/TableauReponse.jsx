import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function TableauReponse({data}) {    
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Area</TableCell>
            <TableCell>Crop</TableCell>
            <TableCell>District</TableCell>
            <TableCell>Production</TableCell>
            <TableCell>Season</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Yield</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            data.map((x) => (
              <TableRow key={x._id}>
                <TableCell>{x._id}</TableCell>
                <TableCell>{x._source.Area}</TableCell>
                <TableCell>{x._source.Crop}</TableCell>
                <TableCell>{x._source.District}</TableCell>
                <TableCell>{x._source.Production}</TableCell>
                <TableCell>{x._source.Season}</TableCell>
                <TableCell>{x._source.State}</TableCell>
                <TableCell>{x._source.Year}</TableCell>
                <TableCell>{x._source.Yield}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}