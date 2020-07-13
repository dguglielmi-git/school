import React, { Component } from "react";
import { Growl } from "primereact/growl";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import EditTitulares from './EditTitulares';
import { ListBox } from "primereact/listbox";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ApiController from "../service/ApiController";


export class Titulares extends Component {
  constructor() {
    super();

    this.state = {
      newForm: false,
      display: false,
      displayEdit: false,
      headerDialog: "",
      messageDialog: "",
      flagDialog: "",
      listaTitular: null,
      listaTitulares: [],
      listado: [],
      iNombre: "",
      iApellido: "",
      iEmail: "",
      iDireccion: "",
      iProvincia: "",
      iPhone: "",
      iCuil: "",
      iDocumento: "",
      editCandidate: null,
      dropdownPais: null,
      paises: [
        { label: "País", value: null },
        { label: "Argentina", value: "Argentina" },
        { label: "Brasil", value: "Brasil" },
        { label: "Colombia", value: "Colombia" },
        { label: "Mexico", value: "Mexico" },
        { label: "Venezuela", value: "Venezuela" },
      ],
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.newClient = this.newClient.bind(this);
    this.loadTitulares = this.loadTitulares.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  showSuccess() {
    let msg = {
      severity: "success",
      summary: "Alta de Titular",
      detail: "El Titular ha sido ingresado en el Sistema.",
    };
    this.growl.show(msg);
    this.cleanForm();
  }

  componentDidMount() {
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
      listado: lista,
    }));
  }

  guardarTitular() {
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

    ApiController.insertTitular(
      {
        fullName: _fullName,
        email: _email,
        address: _address,
        phoneNumber: _phoneNumber,
        cuil: _cuil,
        documentNumber: _documentNumber,
      },
      this.loadTitulares,
      this.showSuccess
    );
  }

  handleChange(event, nombre) {
    let _state = {
      [`${nombre}`]: event.target.value
    };

    this.setState(_state)
  }

  newClient() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Alta de Titulares",
      messageDialog: "¿Desea dar de Alta un nuevo Titular?",
      flagDialog: "newClient",
      display: true,
    }));
  }

  cancelNewClient() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Cancelar Alta de Titulares",
      messageDialog: "¿Desea cancelar el alta del nuevo Titular?",
      flagDialog: "cancelDialog",
      display: true,
    }));
  }

  saveTitular() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Alta de Titulares",
      messageDialog:
        "¿Desea guardar los cambios y proceder con el Alta del Titular?",
      flagDialog: "newTitular",
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
      editCandidate: null,
    });
  }

  getData(id) {
    let res = "";
    this.state.listado.forEach((tit) => {
      if (tit._id === id) {
        res = tit;
      }
    })
    return res;
  }

  closeEdit() {
    this.setState({ displayEdit: false })
  }

  editContact() {
    const resul = this.getData(this.state.listaTitular)
    this.setState({ displayEdit: true, editCandidate: resul, iNombre: resul.fullName })
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
        case "newTitular":
          this.guardarTitular();
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
            <h1>Administración de Titulares</h1>
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
              <p>Listado de Titulares</p>
              <ListBox
                value={this.state.listaTitular}
                options={this.state.listaTitulares}
                listStyle={{ height: 150 }}
                style={{ width: "300px" }}
                onChange={(event) =>
                  this.setState({ listaTitular: event.value })
                }
                filter={true}
              />
              <EditTitulares
                display={this.state.displayEdit}
                closeEdit={this.closeEdit} 
                showSuccess={this.showSuccess}
                editCandidate={this.state.editCandidate}
              />
              <Button
                label="Editar"
                icon="pi pi-plus"
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
              <h1>Alta nuevo Titular</h1>
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
                  onClick={() => this.saveTitular()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
