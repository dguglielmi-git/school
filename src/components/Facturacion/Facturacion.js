import React, { Component } from "react";
import TableFac from "./TableFac";

export class Facturacion extends Component {
  render() {
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Facturación</h1>
            <p>Pagina de Facturación.</p>
            <TableFac />
          </div>
        </div>
      </div>
    );
  }
}
