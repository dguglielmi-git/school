import { Component } from "react";

const url = "https://distribuidas-school.herokuapp.com";

// Users
const urlLogin = "/user/login";                     // Login de usuario (POST)
const urlGetUserList = "/User";                     // Lista de Usuarios (GET)
const urlUserUpdate = "/user/update";               // Update User (PATCH)
const urlUserRegistration = "/user/registration";   // Registro de Usuario (POST)

// Titular
const urlGetTitular = "/api/getTitular";            // Get Titular (GET)
const urlInsertTitular = "/api/insertTitular";      // Insert Titular (POST)
const urlUpdateTitular = "/api/updateTitular";      // Update Titular (POST)

// Student
const urlGetStudent = "/api/getStudent";            // Get Student (GET)
const urlInsertStudent = "/api/insertStudent";      // Insert Student (POST)

//Employee
const urlGetEmployee = "/api/getEmployee";          // Get Employee (GET)
const urlInsertEmployee = "/api/insertEmployee";    // Insert Employee (POST)


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
}
export default new ApiController();
