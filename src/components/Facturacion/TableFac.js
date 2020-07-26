import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { getBill } from "../../service/ApiController2";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ModalCobro from "./ModalFac/ModalCobro";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [clientSelected, setClientSelected] = useState([]);
  const classes = useRowStyles();

  const openModal = (datos)=> {
    setDisplayBasic(true);
    setClientSelected(datos);
  }

  return (
    <React.Fragment>
      <ModalCobro
        displayBasic={displayBasic}
        setDisplayBasic={setDisplayBasic}
        clientSelected={clientSelected}
      />
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
          {row.studentData[0].fullName}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.instalment}
        </TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">${row.total}</TableCell>
        <TableCell align="right">{row.isPayed ? "Pagada" : "Impaga"}</TableCell>
        <TableCell align="right">
          <Button variant="outlined" color="primary" onClick={() => openModal(row)}>
            cobrar
          </Button>
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
                  {row.additionalData.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell align="right">${row.price}</TableCell>
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

export default function CollapsibleTable(props) {
  // const [rows, setRows] = useState([{'_id': 1, 'total': 23, 'history': [{'name': '', 'categoria': '', 'precio': ''}] }]);
  const [rows, setRows] = useState([]);
  const fetchBill = async () => {
    let data = await getBill();
    setRows(data);
    console.log("pirulo");
    console.log(rows);
  };
  useEffect(() => {
    fetchBill();

    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    // let rows = [
    //   createData("Ariel Sandor", 159, 2806.0),
    //   createData("Mariano Martino", 237, 2909.0),
    //   createData("Mateo Teves", 262, 2416.0),
    //   createData("Analia Sabatino", 305, 2773.7),
    //   createData("Daniel Guglielmi", 356, 2616.0),
    // ];
    // props.data.forEach((item, i) => rows.push(createData(item.studentData.fullName, item.studentData.idNumber, item.total)));
    // setRows(props.data);
    // console.log(props.data);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{ backgroundColor: "#E1EAFE" }}>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: "bold" }}>Nombre Alumno</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Cuota Nro
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Fecha Factura
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Importe Total
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Estado
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Opciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => <Row key={row._id} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
