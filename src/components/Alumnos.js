import React, { Component } from "react";
import { Growl } from "primereact/growl";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TableAlumno } from "./TableAlumno";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ApiController from "../service/ApiController";

export class Alumnos extends Component {
  constructor() {
    super();

    this.state = {
      newForm: false,
      display: false,
      headerDialog: "",
      messageDialog: "",
      flagDialog: "",
      listaAlumno: null,
      listaAlumnos: [],
      listaTitular: null,
      listaTitulares: [],
      iNombre: "",
      iApellido: "",
      iDocumento: "",
      iLegajo: "",
      dropdownPais: null,
      fechaAlta: null,
    };

    this.newClient = this.newClient.bind(this);
    this.loadAlumnos = this.loadAlumnos.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadTitulares = this.loadTitulares.bind(this);
  }

  showSuccess() {
    let msg = {
      severity: "success",
      summary: "Alta de Alumno",
      detail: "El Alumno ha sido ingresado en el Sistema.",
    };
    this.growl.show(msg);
    this.cleanForm();
  }

  componentDidMount() {
    ApiController.getAlumnos(this.loadAlumnos);
    ApiController.getTitulares(this.loadTitulares);
  }

  notNulls(value) {
    return value === null || value === undefined ? "" : value;
  }

  loadTitulares(lista) {
    let structure = [];
    lista.forEach((tit) => {
      structure.push({
        label: this.notNulls(tit.fullName),
        value: this.notNulls(tit._id),
      });
    });

    this.setState((state) => ({
      ...this.state,
      listaTitulares: structure,
    }));
  }

  loadAlumnos(lista) {
    let structure = [];
    lista.forEach((tit) => {
      structure.push({
        label: this.notNulls(tit.fullName),
        value: this.notNulls(tit.documentNumber),
      });
    });

    this.setState((state) => ({
      ...this.state,
      listaAlumnos: structure,
    }));
    console.log("Alumnos cargados");
  }

  guardarAlumno() {
    const _fullName = this.state.iNombre + " " + this.state.iApellido;
    const _documentNumber = this.notNulls(this.state.iDocumento);
    const _idNumber = this.notNulls(this.state.iLegajo);
    const _idTitular = this.state.listaTitular;

    ApiController.insertAlumno(
      {
        fullName: _fullName,
        titularId: _idTitular,
        idNumber: _idNumber,
        documentNumber: _documentNumber,
      },
      this.loadAlumnos,
      this.showSuccess
    );
  }

  handleChange(event, nombre) {
    switch (nombre) {
      case "iNombre":
        this.setState({ iNombre: event.target.value });
        break;
      case "iApellido":
        this.setState({ iApellido: event.target.value });
        break;
      case "iLegajo":
        this.setState({ iLegajo: event.target.value });
        break;
      case "iDocumento":
        this.setState({ iDocumento: event.target.value });
        break;
      default:
        break;
    }
  }

  newClient() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Alta de Alumnos",
      messageDialog: "¿Desea dar de Alta un nuevo Alumno?",
      flagDialog: "newClient",
      display: true,
    }));
  }

  cancelNewClient() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Cancelar Alta de Alumnos",
      messageDialog: "¿Desea cancelar el alta del nuevo Alumno?",
      flagDialog: "cancelDialog",
      display: true,
    }));
  }

  saveAlumno() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Alta de Alumno",
      messageDialog:
        "¿Desea guardar los cambios y proceder con el Alta del Alumno?",
      flagDialog: "newAlumno",
      display: true,
    }));
  }

  cleanForm() {
    this.setState({
      iNombre: null,
      iApellido: null,
      iDocumento: null,
      iTitular: null,
      iLegajo: null,
      newForm: false,
    });
  }

  toggleDialog(selec) {
    if (selec) {
      switch (this.state.flagDialog) {
        case "cancelDialog":
          this.setState((state) => ({
            ...this.state,
            newForm: !selec,
            display: false,
          }));
          break;
        case "newClient":
          this.setState((state) => ({
            ...this.state,
            newForm: selec,
            display: false,
          }));
          break;
        case "newAlumno":
          this.guardarAlumno();
          this.setState((state) => ({
            ...this.state,
            display: false,
          }));
          break;
        default:
          break;
      }
    } else {
      this.setState((state) => ({
        ...this.state,
        display: false,
      }));
    }
  }

  render() {
    /**
     * Constant for Dialog
     */
    const dialogFooter = (
      <div>
        <Button
          icon="pi pi-check"
          onClick={() => this.toggleDialog(true)}
          label="Sí"
        />
        <Button
          icon="pi pi-times"
          onClick={() => this.toggleDialog(false)}
          label="No"
          className="p-button-secondary"
        />
      </div>
    );
    return (
      <div className="p-grid">
        <Growl ref={(el) => (this.growl = el)} style={{ marginTop: "75px" }} />
        <div className="p-col-12">
          <Dialog
            header={this.state.headerDialog}
            visible={this.state.display}
            modal={true}
            width="500px"
            footer={dialogFooter}
            onHide={() => this.setState({ display: false })}
          >
            <p>{this.state.messageDialog}</p>
          </Dialog>

          <div className="card">
            <h1>Administración de Alumnos</h1>
            <Toolbar>
              <div className="p-toolbar-group-left">
                <Button
                  label="Nuevo"
                  icon="pi pi-plus"
                  style={{ marginRight: ".25em" }}
                  onClick={() => this.newClient()}
                />
                <i
                  className="pi pi-bars p-toolbar-separator"
                  style={{ marginRight: ".25em" }}
                />
              </div>
            </Toolbar>
          </div>
          {this.state.newForm && (
            <div className="card card-w-title">
              <div className="p-toolbar-group-right">
                <Button
                  icon="pi pi-times"
                  className="p-button-danger"
                  onClick={() => this.cancelNewClient()}
                />
              </div>
              <h1>Alta nuevo Alumno</h1>
              <div className="p-grid">
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Nombre"
                    value={this.state.iNombre}
                    style={{ width: "250px" }}
                    onChange={(e) => this.handleChange(e, "iNombre")}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Apellido"
                    value={this.state.iApellido}
                    style={{ width: "250px" }}
                    onChange={(e) => this.handleChange(e, "iApellido")}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <Dropdown
                    style={{ width: "250px" }}
                    options={this.state.listaTitulares}
                    value={this.state.listaTitular}
                    placeholder="Titulares"
                    onChange={(event) =>
                      this.setState({ listaTitular: event.value })
                    }
                    autoWidth={false}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="DNI"
                    value={this.state.iDocumento}
                    style={{ width: "250px" }}
                    onChange={(e) => this.handleChange(e, "iDocumento")}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Legajo"
                    value={this.state.iLegajo}
                    style={{ width: "250px" }}
                    onChange={(e) => this.handleChange(e, "iLegajo")}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  label="Guardar"
                  icon="pi pi-check"
                  className="p-button-warning"
                  style={{ marginRight: ".25em" }}
                  onClick={() => this.saveAlumno()}
                />
              </div>
            </div>
          )}
          <TableAlumno />
        </div>
      </div>
    );
  }
}
