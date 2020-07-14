import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(fullName, titular, total) {
  return {
    fullName,
    titular,
    total,
    history: [
      { name: "Media Jornada", categoria: "Escolaridad", precio: 2500 },
      { name: "Almuerzo", categoria: "Comedor", precio: 2000 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.fullName}
        </TableCell>
        <TableCell align="right">{row.titular}</TableCell>
        <TableCell align="right">${row.total}</TableCell>
        <TableCell align="right">
        <Button variant="outlined" color="primary">cobrar</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle Factura
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Item</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Categoría
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Precio
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>{historyRow.categoria}</TableCell>
                      <TableCell align="right">${historyRow.precio}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Ariel Sandor", 159, 2806.0),
  createData("Mariano Martino", 237, 2909.0),
  createData("Mateo Teves", 262, 2416.0),
  createData("Analia Sabatino", 305, 2773.7),
  createData("Daniel Guglielmi", 356, 2616.0),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{ backgroundColor: "#E1EAFE" }}>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: "bold" }}>Alumno</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Titular
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Importe Total Factura
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Opciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.fullName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
