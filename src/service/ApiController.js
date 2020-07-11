import { Component } from "react";

const url = "https://distribuidas-school.herokuapp.com";

// Users
const urlGetUserList = "/User"; // Lista de Usuarios    (GET)
const urlUserRegistration = "/user/registration"; // Registro de Usuario (POST)
const urlLogin = "/user/login"; // Login de usuario (POST)
const urlUserUpdate = "/user/update"; // Update User  (PATCH)

// Titular
const urlInsertTitular = "/api/insertTitular"; // Insert Titular (POST)
const urlUpdateTitular = "/api/updateTitular"; // Update Titular (POST)
const urlGetTitular = "/api/getTitular"; // Get Titular (GET)

// Student
const urlInsertStudent = "/api/insertStudent"; // Insert Student (POST)
const urlGetStudent = "/api/getStudent"; // Get Student (GET)

//Employee
const urlInsertEmployee = "/api/insertEmployee"; // Insert Employee (POST)
const urlGetEmployee = "/api/getEmployee"; // Get Employee (GET)

class ApiController extends Component {
  getTitulares(setListaTitulares) {
    const endpoint = `${url}${urlGetTitular}`;
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setListaTitulares(responseData);
        // console.log(responseData)
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
}
export default new ApiController();
