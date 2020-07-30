import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable({ row }) {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexWrap:'wrap',justifyContent: "center" }}>
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
