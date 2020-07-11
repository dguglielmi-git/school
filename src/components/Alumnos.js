import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ListBox } from "primereact/listbox";

export class Alumnos extends Component {
  constructor() {
    super();
    this.state = {
      newForm: false,
      display: false,
      headerDialog: "",
      messageDialog: "",
      flagDialog: "",
      listBoxCity: null,
      listBoxCities: [
        { label: "Guglielmi Daniel", value: "1093961" },
        { label: "Martino Mariano", value: "111" },
        { label: "Sabatino Analia", value: "10" },
        { label: "Sandor Ariel", value: "12" },
        { label: "Teves Mateo", value: "13" },
      ],
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.newClient = this.newClient.bind(this);
 
  }

 

  newClient() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Alta de Empleado",
      messageDialog: "¿Desea dar de Alta un nuevo Empleado?",
      flagDialog: "newClient",
      display: true,
    }));
  }

  cancelNewClient() {
    this.setState((state) => ({
      ...this.state,
      headerDialog: "Cancear Alta de Empleado",
      messageDialog: "¿Desea cancelar el alta del nuevo Empleado?",
      flagDialog: "cancelDialog",
      display: true,
    }));
  }

  toggleDialog(selec) {
    if (selec) {
      this.setState((state) => ({
        ...this.state,
        newForm: state.flagDialog === "cancelDialog" ? !selec : selec,
        display: false,
      }));
    } else {
      this.setState((state) => ({
        ...this.state,
        newForm: state.flagDialog === "cancelDialog" ? state.newForm : selec,
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
            <h1>Alumnos</h1>
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
                <Button
                  label="Guardar"
                  icon="pi pi-check"
                  className="p-button-warning"
                  style={{ marginRight: ".25em" }}
                />
              </div>
              {this.state.newForm && (
                <div className="p-toolbar-group-right">
                  <Button
                    icon="pi pi-times"
                    className="p-button-danger"
                    onClick={() => this.cancelNewClient()}
                  />
                </div>
              )}
            </Toolbar>
            <p>
              <strong>Administración de Alumnos </strong>
            </p>

            <div className="p-col-12 p-md-4" style={{display:'flex'}}>
              <ListBox
                value={this.state.listBoxCity}
                options={this.state.listBoxCities}
                listStyle={{ height: 150 }}
                style={{ width: "300px" }}
                onChange={(event) =>
                  this.setState({ listBoxCity: event.value })
                }
                filter={true}
              />
            
            </div>
           
          </div>
          {this.state.newForm && (
            <div className="card card-w-title">
              <h1>Alta nuevo Empleado</h1>
              <div className="p-grid">
                <div className="p-col-12 p-md-4">
                  <InputText placeholder="Nombre" style={{ width: "250px" }} />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Apellido"
                    style={{ width: "250px" }}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText placeholder="DNI" style={{ width: "250px" }} />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText placeholder="E-mail" style={{ width: "300px" }} />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Telefono"
                    style={{ width: "250px" }}
                  />
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    placeholder="Dirección"
                    style={{ width: "250px" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
