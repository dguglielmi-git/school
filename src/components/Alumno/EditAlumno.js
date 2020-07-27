import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./EditAlumno.css";
import {notNulls} from './funciones'
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ApiController from "../../service/ApiController";

export default function EditAlumno({
  display,
  closeEdit,
  showSuccess,
  editCandidate,
}) {
  const [iId, setIid] = useState("");
  const [iNombre, setINombre] = useState("");
  const [iApellido, setIApellido] = useState("");
  const [iEmail, setIEmail] = useState("");
  const [iDireccion, setIDireccion] = useState("");
  const [iProvincia, setIProvincia] = useState("");
  const [iPhone, setIPhone] = useState("");
  const [iCuil, setICuil] = useState("");
  const [iDocumento, setIDocumento] = useState("");
  const [dropdownPais, setDropdownPais] = useState(null);
  const [listaTitulares, setListaTitulares] = useState([]);
  const [listaTitular, setListaTitular] = useState(null);

  const loadTitulares = (lista) => {
    let structure = [];
    lista.forEach((tit) => {
      structure.push({
        label: tit.fullName,
        value: tit._id,
      });
    });
    setListaTitulares(structure);
  };

  useEffect(() => {
    loadData();
    ApiController.getTitulares(loadTitulares);
  }, [editCandidate]);

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Guardar"
          icon="pi pi-save"
          onClick={() => guardarTitular()}
        />
        <Button
          label="Cerrar"
          icon="pi pi-times"
          onClick={() => closeEdit()}
          className="p-button-secondary"
        />
      </div>
    );
  };

  const loadData = () => {
    let candidate = editCandidate;

    if (candidate) {
      let _fullname = candidate.fullName.split(" ");
      let _address = candidate.address.split(",");
      setIid(candidate._id);
      setINombre(_fullname[0]);
      setIApellido(_fullname[1]);
      setIEmail(candidate.email);
      setIDireccion(_address[0]);
      setIProvincia(_address[1]);
      setDropdownPais(_address[2].trim());
      setICuil(candidate.cuil);
      setIDocumento(candidate.documentNumber);
      setIPhone(candidate.phoneNumber);
    }
  };

  const guardarTitular = () => {
    const _id = iId;
    const _fullName = iNombre + " " + iApellido;
    const _email = notNulls(iEmail);
    const _address = iDireccion + ", " + iProvincia + ", " + dropdownPais;
    const _phoneNumber = notNulls(iPhone);
    const _cuil = notNulls(iCuil);
    const _documentNumber = notNulls(iDocumento);

    ApiController.updateTitular(
      {
        _id: _id,
        fullName: _fullName,
        email: _email,
        address: _address,
        phoneNumber: _phoneNumber,
        cuil: _cuil,
        documentNumber: _documentNumber,
      },
      showSuccess
    );
  };

  return (
    <div className="dialog-demo">
      <Dialog
        header="Editar Alumno"
        visible={display}
        style={{ width: "70vw" }}
        onHide={() => closeEdit()}
        footer={renderFooter("display")}
      >
        <div
          className="p-grid"
          style={{ paddingBottom: "50px", paddingTop: "25px" }}
        >
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="Nombre"
              value={iNombre}
              style={{ width: "250px" }}
              onChange={(e) => setINombre(e.target.value)}
            />
          </div>
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="Apellido"
              value={iApellido}
              style={{ width: "250px" }}
              onChange={(e) => setIApellido(e.target.value)}
            />
          </div>
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="DNI"
              value={iDocumento}
              style={{ width: "115px" }}
              onChange={(e) => setIDocumento(e.target.value)}
            />
          </div>

          <div className="p-col-12 p-md-4">
            <Dropdown
              style={{ width: "300px" }}
              options={listaTitulares}
              value={listaTitular}
              placeholder="Titular"
              onChange={(event) => setListaTitular(event.value)}
              autoWidth={false}
            />
          </div>

          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="Legajo"
              value={iDocumento}
              style={{ width: "115px" }}
              onChange={(e) => setIDocumento(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
