import React, { Component } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import ApiController from "../../service/ApiController";

export class ProcesosBatch extends Component {
  constructor() {
    super();

    this.state = {
      dropdownMes: null,
      meses: [
        { label: "Mes", value: null },
        { label: "Enero", value: 1 },
        { label: "Febrero", value: 2 },
        { label: "Marzo", value: 3 },
        { label: "Abril", value: 4 },
        { label: "Mayo", value: 5 },
        { label: "Junio", value: 6 },
        { label: "Julio", value: 7 },
        { label: "Agosto", value: 8 },
        { label: "Septiembre", value: 9 },
        { label: "Octubre", value: 10 },
        { label: "Noviembre", value: 11 },
        { label: "Diciembre", value: 12 },
      ],
    };
  }
  runMonthly() {
    ApiController.runMonthly({ instalment: this.state.dropdownMes });
  }

  sendEmployeeSalaries() {
    ApiController.sendEmployeeSalaries();
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
                  onClick={() => this.runMonthly()}
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
                  onClick={() => this.sendEmployeeSalaries()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
