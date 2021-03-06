import React, { Component } from "react";
import { Growl } from "primereact/growl";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import { ListBox } from "primereact/listbox";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ApiController from "../../service/ApiController";
import EditEmpleado from "./EditEmpleado";
import { InputNumber } from "primereact/inputnumber";

export class Empleados extends Component {
  constructor() {
    super();

    this.state = {
      newForm: false,
      display: false,
      displayEdit: false,
      headerDialog: "",
      messageDialog: "",
      flagDialog: "",
      listado: [],
      listaEmpleado: null,
      listaEmpleados: [],
      editCandidate: null,
      iNombre: "",
      iApellido: "",
      iEmail: "",
      iDireccion: "",
      iProvincia: "",
      iPhone: "",
      iCuil: "",
      iDocumento: "",
      iPosition: "",
      iFechaAlta: "",
      dropdownPais: null,
      fechaAlta: null,
      salario:null,
      iCbu:null,
      paises: [
        { label: "País", value: null },
        { label: "Argentina", value: "Argentina" },
        { label: "Brasil", value: "Brasil" },
        { label: "Colombia", value: "Colombia" },
        { label: "Mexico", value: "Mexico" },
        { label: "Venezuela", value: "Venezuela" },
      ],
      dropdownPositions: null,
      positions: [
        { label: "Posición", value: null },
        { label: "Profesor Titular", value: "Profesor Titular" },
        { label: "Profesor Suplente", value: "Profesor Suplente" },
        { label: "Director", value: "Director" },
        { label: "Asistente Profesor", value: "Asistente Profesor" },
      ],
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.newClient = this.newClient.bind(this);
    this.loadEmpleados = this.loadEmpleados.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  showSuccess() {
    let msg = {
      severity: "success",
      summary: "Alta de Empleado",
      detail: "El Empleado ha sido ingresado en el Sistema.",
    };
    this.growl.show(msg);
    this.cleanForm();
  }

  componentDidMount() {
    ApiController.getEmpleados(this.loadEmpleados);
  }

  notNulls(value) {
    return value === null || value === undefined ? "" : value;
  }

  loadEmpleados(lista) {
    let structure = [];
    lista.forEach((tit) => {
      structure.push({
        label: this.notNulls(tit.fullName),
        value: this.notNulls(tit._id),
      });
    });

    this.setState((state) => ({
      ...this.state,
      listaEmpleados: structure,
      listado: lista,
    }));
  }

  loadEmpleados__(lista) {
    let structure = [];
    lista.forEach((tit) => {
      structure.push({
        label: this.notNulls(tit.fullName),
        value: this.notNulls(tit.documentNumber),
      });
    });

    this.setState((state) => ({
      ...this.state,
      listaEmpleados: structure,
    }));
  }
  closeEdit() {
    this.setState({ displayEdit: false });
  }

  getData(id) {
    let res = "";
    this.state.listado.forEach((tit) => {
      if (tit._id === id) {
        res = tit;
      }
    });
    return res;
  }

  editContact() {
    const resul = this.getData(this.state.listaEmpleado);
    this.setState({
      displayEdit: true,
      editCandidate: resul,
      iNombre: resul.fullName,
    });
  }

  guardarEmpleado() {
    const _fullName = this.state.iNombre + " " + this.state.iApellido;
    const _email = this.notNulls(this.state.iEmail);
    const _address =
      this.state.iDireccion +
      ", " +
      this.state.iProvincia +
      ", " +
      this.state.dropdownPais;
    const _phoneNumber = this.notNulls(this.state.iPhone);
    const _cuil = this.notNulls(this.state.iCuil);
    const _documentNumber = this.notNulls(this.state.iDocumento);
    const _startDate =
      this.state.fechaAlta === null ? "11/11/1111" : this.state.fechaAlta;
    const _position = this.notNulls(this.state.dropdownPositions);
    const _salary = this.notNulls(this.state.salario)
    const _icbu = this.notNulls(this.state.iCbu)

    ApiController.insertEmpleado(
      {
        fullName: _fullName,
        email: _email,
        address: _address,
        phoneNumber: _phoneNumber,
        cuil: _cuil,
        documentNumber: _documentNumber,
        position: _position,
        startDate: _startDate,
        salary: _salary,
        accountNumber: _icbu
      },
      this.loadEmpleados,
      this.showSuccess
    );
  }

  handleChange(event, nombre) {
    let _state = {
      [`${nombre}`]: event.target.value,
    };

    this.setState(_state);
  }

  newClient() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Alta de Empleados",
      messageDialog: "¿Desea dar de Alta un nuevo Empleado?",
      flagDialog: "newClient",
      display: true,
    }));
  }

  cancelNewClient() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Cancelar Alta de Empleados",
      messageDialog: "¿Desea cancelar el alta del nuevo Empleado?",
      flagDialog: "cancelDialog",
      display: true,
    }));
  }

  saveEmpleado() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Alta de Empleado",
      messageDialog:
        "¿Desea guardar los cambios y proceder con el Alta del Empleado?",
      flagDialog: "newEmpleado",
      display: true,
    }));
  }

  cleanForm() {
    this.setState({
      iNombre: null,
      iApellido: null,
      iEmail: null,
      iDireccion: null,
      iProvincia: null,
      iPhone: null,
      iCuil: null,
      iDocumento: null,
      dropdownPais: null,
      newForm: false,
      iFechaAlta: null,
      iPosition: null,
      salario:null,
      iCbu: null
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
        case "newEmpleado":
          this.guardarEmpleado();
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
            <h1>Administración de Empleados</h1>
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

            <div className="p-col-12 p-md-4">
              <p>Listado de Empleados</p>
              <ListBox
                value={this.state.listaEmpleado}
                options={this.state.listaEmpleados}
                listStyle={{ height: 150 }}
                style={{ width: "300px" }}
                onChange={(event) =>
                  this.setState({ listaEmpleado: event.value })
                }
                filter={true}
              />
              <EditEmpleado
                display={this.state.displayEdit}
                closeEdit={this.closeEdit}
                showSuccess={this.showSuccess}
                editCandidate={this.state.editCandidate}
              />
              <Button
                label="Editar"
                icon="pi pi-user-edit"
                style={{ marginRight: ".25em" }}
                onClick={() => this.editContact()}
              />
            </div>
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
              <h1>Alta nuevo Empleado</h1>
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
                  <InputText
                    placeholder="E-mail"
                    value={this.state.iEmail}
                    style={{ width: "300px" }}
                    onChange={(e) => this.handleChange(e, "iEmail")}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="DNI"
                    value={this.state.iDocumento}
                    style={{ width: "115px" }}
                    onChange={(e) => this.handleChange(e, "iDocumento")}
                  />
                  <InputText
                    placeholder="CUIL"
                    value={this.state.iCuil}
                    style={{ width: "115px", marginLeft: "20px" }}
                    onChange={(e) => this.handleChange(e, "iCuil")}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Telefono"
                    value={this.state.iPhone}
                    style={{ width: "250px" }}
                    onChange={(e) => this.handleChange(e, "iPhone")}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Dirección"
                    value={this.state.iDireccion}
                    style={{ width: "300px" }}
                    onChange={(e) => this.handleChange(e, "iDireccion")}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Provincia"
                    value={this.state.iProvincia}
                    style={{ width: "250px" }}
                    onChange={(e) => this.handleChange(e, "iProvincia")}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <Dropdown
                    style={{ width: "250px" }}
                    options={this.state.paises}
                    value={this.state.dropdownPais}
                    onChange={(event) =>
                      this.setState({ dropdownPais: event.value })
                    }
                    autoWidth={false}
                  />
                </div>

                <div className="p-col-12 p-md-4">
                  <Dropdown
                    style={{ width: "300px" }}
                    options={this.state.positions}
                    value={this.state.dropdownPositions}
                    onChange={(event) =>
                      this.setState({ dropdownPositions: event.value })
                    }
                    autoWidth={false}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <Calendar
                    placeholder="Fecha de Alta"
                    style={{ width: "250px" }}
                    value={this.state.fechaAlta}
                    onChange={(e) => this.setState({ fechaAlta: e.value })}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputNumber
                  style={{width:'250px'}}
                    value={this.state.salario}
                    onChange={(e) => this.setState({ salario: e.value })}
                    mode="currency"
                    placeholder="Salario"
                    currency="USD"
                    locale="en-US"
                  />
                </div>

                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="CBU"
                    value={this.state.iCbu}
                    style={{ width: "300px" }}
                    onChange={(e) => this.handleChange(e, "iCbu")}
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
                  onClick={() => this.saveEmpleado()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
