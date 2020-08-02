import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from 'styled-components'

const Title = styled.div`

display: "flex", flexWrap: "wrap", justifyContent: "center"
`
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function SpanningTable({ row }) {
  const classes = useStyles();
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      <p style={{ fontWeight: "bold", fontSize: "16px" }}>
        COMPROBANTE DE PAGO DE FACTURA.
      </p>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead style={{ backgroundColor: "#E1EAFE" }}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Desc</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Categoria
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Precio
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.additionalData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">${ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell
                  style={{ fontWeight: "bold" }}
                  align="right"
                  colSpan={1}
                >
                  Total
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", color: "blue" }}
                  align="right"
                >
                  ${row.total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
