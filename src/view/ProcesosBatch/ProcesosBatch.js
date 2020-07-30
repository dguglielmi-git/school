import React, { Component } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export class ProcesosBatch extends Component {
  constructor() {
    super();

    this.state = {
      dropdownMes: null,
      meses: [
        { label: "Mes", value: null },
        { label: "Enero", value: "Enero" },
        { label: "Febrero", value: "Febrero" },
        { label: "Marzo", value: "Marzo" },
        { label: "Abril", value: "Abril" },
        { label: "Mayo", value: "Mayo" },
        { label: "Junio", value: "Junio" },
        { label: "Julio", value: "Julio" },
        { label: "Agosto", value: "Agosto" },
        { label: "Septiembre", value: "Septiembre" },
        { label: "Octubre", value: "Octubre" },
        { label: "Noviembre", value: "Noviembre" },
        { label: "Diciembre", value: "Diciembre" },
      ],
    };
  }
  render() {
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Procesos Batch</h1>
            <p>Ejecución de Procesos..</p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "250px",
                }}
              >
                Efectuar cobros del mes seleccionado
              </div>
              <div>
                <Dropdown
                  style={{ width: "120px" }}
                  options={this.state.meses}
                  value={this.state.dropdownMes}
                  onChange={(event) =>
                    this.setState({ dropdownMes: event.value })
                  }
                  autoWidth={false}
                />
              </div>
              <div>
                <Button
                  label="Enviar"
                  className="p-button-rounded"
                  style={{ marginLeft: "20px" }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "250px",
                }}
              >
                Procesar Liquidación de Sueldos
              </div>              
              <div>
                <Button
                  label="Enviar"
                  className="p-button-rounded"
                  style={{ marginLeft: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
