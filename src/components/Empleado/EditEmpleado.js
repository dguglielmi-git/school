import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./EditEmpleado.css";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ApiController from "../../service/ApiController";
import { InputNumber } from "primereact/inputnumber";
import { Growl } from "primereact/growl";

export default function EditEmpleado({
  display,
  closeEdit,
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
  const [fechaAlta, setFechaAlta] = useState("");
  const [dropdownPais, setDropdownPais] = useState(null);
  const [iSalario, setISalario] = useState(null);
  const [iCbu, setICbu] = useState(null);
  const [dropdownPositions, setDropdownPositions] = useState(null);
  const [positions, setPositions] = useState([
    { label: "Posición", value: null },
    { label: "Profesor Titular", value: "Profesor Titular" },
    { label: "Profesor Suplente", value: "Profesor Suplente" },
    { label: "Profesor Ayudante", value: "Profesor Ayudante" },
    { label: "Director", value: "Director" },
    { label: "Asistente Profesor", value: "Asistente Profesor" },
  ]);
  const [paises, setPaises] = useState([
    { label: "País", value: null },
    { label: "Argentina", value: "Argentina" },
    { label: "Brasil", value: "Brasil" },
    { label: "Colombia", value: "Colombia" },
    { label: "Mexico", value: "Mexico" },
    { label: "Venezuela", value: "Venezuela" },
  ]);
  const refGrowl = useRef();
  useEffect(() => {
    loadData();
  }, [editCandidate]);

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Guardar"
          icon="pi pi-save"
          onClick={() => guardarEmployee()}
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

 
  const notNulls = (value) => {
    return value === null || value === undefined ? "" : value;
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
      setDropdownPositions(candidate.position.trim())
      setICuil(candidate.cuil);
      setIDocumento(candidate.documentNumber);
      setIPhone(candidate.phoneNumber);
      setISalario(candidate.salary);
      setICbu(candidate.accountNumber);
    }
  };

  const showSuccess = () => {
    let msg = {
      severity: "success",
      summary: "Actualización de Empleado",
      detail: "El Empleado ha sido actualizado en el Sistema.",
    };
    refGrowl.current.show(msg);
    closeEdit();
  }

  const guardarEmployee = () => {
    const __id = iId;
    const _fullName = iNombre + " " + iApellido;
    const _email = notNulls(iEmail);
    const _address =
      iDireccion +
      ", " +
      iProvincia +
      ", " +
      dropdownPais;
    const _phoneNumber = notNulls(iPhone);
    const _cuil = notNulls(iCuil);
    const _documentNumber = notNulls(iDocumento);
    const _startDate =
      fechaAlta === null ? "11/11/1111" : fechaAlta;
    const _position = notNulls(dropdownPositions);
    const _salary = notNulls(iSalario);
    const _accountNumber = iCbu;

    ApiController.updateEmployee(
      {
        _id: __id,
        fullName: _fullName,
        email: _email,
        address: _address,
        phoneNumber: _phoneNumber,
        cuil: _cuil,
        documentNumber: _documentNumber,
        position: _position,
        salary: _salary,
        accountNumber: _accountNumber,
      },
      showSuccess
    );
  };

  return (
    <div className="dialog-demo">
      <Growl ref={refGrowl} style={{ marginTop: "75px" }} />
      <Dialog
        header="Editar Empleado"
        visible={display}
        style={{ width: "70vw" }}
        onHide={() => closeEdit()}
        footer={renderFooter("display")}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            height:'250px'
          }}
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
              placeholder="E-mail"
              value={iEmail}
              style={{ width: "300px" }}
              onChange={(e) => setIEmail(e.target.value)}
            />
          </div>
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="DNI"
              value={iDocumento}
              style={{ width: "115px" }}
              onChange={(e) => setIDocumento(e.target.value)}
            />
            <InputText
              placeholder="CUIL"
              value={iCuil}
              style={{ width: "115px", marginLeft: "20px" }}
              onChange={(e) => setICuil(e.target.value)}
            />
          </div>
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="Telefono"
              value={iPhone}
              style={{ width: "250px" }}
              onChange={(e) => setIPhone(e.target.value)}
            />
          </div>
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="Dirección"
              value={iDireccion}
              style={{ width: "300px" }}
              onChange={(e) => setIDireccion(e.target.value)}
            />
          </div>
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="Provincia"
              value={iProvincia}
              style={{ width: "250px" }}
              onChange={(e) => setIProvincia.e.target.value}
            />
          </div>

          <div className="p-col-12 p-md-4">
            <Dropdown
              style={{ width: "250px" }}
              options={paises}
              value={dropdownPais}
              onChange={(event) => setDropdownPais(event.value)}
              autoWidth={false}
              scrollHeight='110px'
            />
          </div>
          <div className="p-col-12 p-md-4">
            <Dropdown
              style={{ width: "300px" }}
              options={positions}
              value={dropdownPositions}
              onChange={(event) => setDropdownPositions(event.value)}
              autoWidth={false}
              scrollHeight='110px'
            />
          </div>
          <div className="p-col-12 p-md-4">
            <InputNumber
              style={{ width: "250px" }}
              value={iSalario}
              onChange={(e) => setISalario(e.value)}
              mode="currency"
              placeholder="Salario"
              currency="USD"
              locale="en-US"
            />
          </div>
          <div className="p-col-12 p-md-4">
            <InputText
              placeholder="CBU"
              value={iCbu}
              style={{ width: "250px" }}
              onChange={(e) => setICbu(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
