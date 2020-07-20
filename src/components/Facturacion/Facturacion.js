import React, { Component } from "react";
import TableFac from "./TableFac";
import ApiController from "../../service/ApiController";

export class Facturacion extends Component {
  constructor() {
    super();

    this.state = {
      billData: {},
    };
  }

  componentDidMount(){
    // let data = ApiController.getBill();
    // this.setState({billData: data});
  }
  render() {
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Facturación</h1>
            <p>Pagina de Facturación.</p>
            <TableFac data={this.state.billData}/>
          </div>
        </div>
      </div>
    );
  }
}
