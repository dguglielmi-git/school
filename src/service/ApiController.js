import { Component } from "react";

const url = "https://distribuidas-school.herokuapp.com";

// Titular
const urlGetTitular = "/api/getTitular";
const urlInsertTitular = "/api/insertTitular";
const urlUpdateTitular = "/api/updateTitular";

// Student
const urlGetStudent = "/api/getStudent"; 
const urlInsertStudent = "/api/insertStudent";

//Employee
const urlGetEmployee = "/api/getEmployee"; 
const urlInsertEmployee = "/api/insertEmployee";
const urlUpdateEmployee = "/api/updateEmployee";

// Facturacion
const urlUpdatePaymentInfo = "/api/updatePaymentInfo";
const urlPayMonthlyBills = "/api/payMonthlyBills";
const urlSendEmployeeSalaries = "/api/sendEmployeeSalaries";

//Adicionales
const urlInsertAdditional = "/api/insertAdditional"; 

class ApiController extends Component {
  getTitulares(setListaTitulares) {
    const endpoint = `${url}${urlGetTitular}`;
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setListaTitulares(responseData);
      });
  }

  insertTitular(data, loadTitulares, showSuccess) {
    const endpoint = `${url}${urlInsertTitular}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      this.getTitulares(loadTitulares);
      showSuccess();
      return response.json();
    });
  }

  payMonthlyBills(data) {
    const endpoint = `${url}${urlPayMonthlyBills}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      return response.json();
    });
  }

  sendEmployeeSalaries() {
    const endpoint = `${url}${urlSendEmployeeSalaries}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response);
      return response.json();
    });
  }

  updateTitular(data, showSuccess) {
    const endpoint = `${url}${urlUpdateTitular}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      showSuccess();
      return response.json();
    });
  }

  updateFacturacion(data, showSuccess) {
    const endpoint = `${url}${urlUpdatePaymentInfo}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    });
  }

  getEmpleados(setListaEmpleados) {
    const endpoint = `${url}${urlGetEmployee}`;
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setListaEmpleados(responseData);
      });
  }

  insertEmpleado(data, loadEmpleados, showSuccess) {
    const endpoint = `${url}${urlInsertEmployee}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      this.getEmpleados(loadEmpleados);
      showSuccess();
      return response.json();
    });
  }

  updateEmployee(data, showSuccess) {
    const endpoint = `${url}${urlUpdateEmployee}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      showSuccess();
      return response.json();
    });
  }

  getAlumnos(setListaAlumnos) {
    const endpoint = `${url}${urlGetStudent}`;
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setListaAlumnos(responseData);
      });
  }

  insertAlumno(data, loadAlumnos, showSuccess) {
    const endpoint = `${url}${urlInsertStudent}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      this.getAlumnos(loadAlumnos);
      showSuccess();
      return response.json();
    });
  }

  insertAdditional(data, reLoadAdditional, showSuccess) {
    const endpoint = `${url}${urlInsertAdditional}`;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      showSuccess(
        "Alta de Adicional",
        "Se ha agregado el adicional correctamente"
      );
      reLoadAdditional();
      return response.json();
    });
  }
}
export default new ApiController();
