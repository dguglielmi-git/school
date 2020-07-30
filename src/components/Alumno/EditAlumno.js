import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./EditAlumno.css";
import { notNulls } from "./funciones";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ApiController from "../../service/ApiController";
import { SelectButton } from "primereact/selectbutton";
import { MultiSelect } from "primereact/multiselect";
import { getAdditionalbyType } from "../../service/ApiController2";

export default function EditAlumno({
  display,
  closeEdit,
  showSuccess,
  customers,
  idSeleccionado,
}) {
  const [iId, setIid] = useState("");
  const [iNombre, setINombre] = useState("");
  const [iApellido, setIApellido] = useState("");
  const [iDocumento, setIDocumento] = useState("");
  const [iLegajo, setILegajo] = useState("");
  const [listaTitulares, setListaTitulares] = useState([]);
  const [listaTitular, setListaTitular] = useState('');
  const [alumnos, setAlumnos] = useState([]);

  const [adicionales1, setAdicionales1] = useState([]);
  const [comedor1, setComedor1] = useState([]);
  const [adic, setAdic] = useState([]);
  const [comed, setComed] = useState([]);
  const [escolaridad, setEscolaridad] = useState(null);
  const [escol, setEscol] = useState(null);

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

  const loadAlumnos = (datos) => {
    let _data = [];

    datos.forEach((e) => {
      _data.push({
        ...e,
        titularNombre: e.titularData[0].fullName.trim(),
      });
    });

    setAlumnos(_data);
  };

  const getAlumnoSelected = async () => {
    let alumno = null;
    alumnos.forEach((al) => {
      if (al._id === idSeleccionado) {
        alumno = al;
      }
    })
    return alumno;
    
  }
  useEffect(() => {
    ApiController.getAlumnos(loadAlumnos);
    ApiController.getTitulares(loadTitulares);
    getAdditionalData();
  }, []);

  useEffect(() => {
    if (display) {
      loadData();
    }
  },[idSeleccionado,display])

  const getAdditionalData = async () => {
    let data1 = await getAdditionalbyType(1);
    let data2 = await getAdditionalbyType(2);
    let data3 = await getAdditionalbyType(3);
    let escol_ = [];
    let adic_ = [];
    let comed_ = [];
    data1.forEach((element) =>
      escol_.push({ label: element.name, value: element._id })
    );
    data2.forEach((element) =>
      adic_.push({ label: element.name, value: element._id })
    );
    data3.forEach((element) =>
      comed_.push({ label: element.name, value: element._id })
    );
    setAdic(adic_);
    setComed(comed_);
    setEscol(escol_);
    setEscolaridad(escol_[0].value);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Guardar"
          icon="pi pi-save"
          onClick={() => guardarAlumno()}
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

  const loadData = async () => {
    let candidate = await getAlumnoSelected();
    let _fullname = "";
    if (candidate) {
        _fullname =  candidate.fullName.split(" ");
      setINombre(_fullname[0]);
      setIApellido(_fullname[1]);
      setIDocumento(candidate.documentNumber);
      setILegajo(candidate.idNumber);
      setListaTitular(candidate.titularId);
      console.log(candidate.titularNombre)
    }
  };

  const guardarAlumno = () => {
    const _id = iId;
    const _fullName = iNombre + " " + iApellido;
    const _documentNumber = notNulls(iDocumento);

    ApiController.updateTitular(
      {
        _id: _id,
        fullName: _fullName,
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
        <div className="p-grid" style={{ display: "flex", flexWrap: "wrap" }}>
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
              style={{ width: "250px" }}
              onChange={(e) => setIDocumento(e.target.value)}
            />
          </div>

          <div className="p-col-12 p-md-4">
            <Dropdown
              style={{ width: "250px" }}
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
              value={iLegajo}
              style={{ width: "250px" }}
              onChange={(e) => setIDocumento(e.target.value)}
            />
          </div>

          <div
            className="p-col-12 p-md-4"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MultiSelect
              value={adicionales1}
              options={adic}
              onChange={(e) => setAdicionales1(e.value)}
              style={{ width: "100px", minWidth: "15em" }}
              filter={true}
              filterPlaceholder="Buscar"
              placeholder="Adicionales"
            />
            <Button
              icon="pi pi-cog"
              style={{ width: "27px", height: "27px", marginLeft: "10px" }}
            />
          </div>
          <div className="p-col-12 p-md-4">
            <MultiSelect
              value={comedor1}
              options={comed}
              onChange={(e) => setComedor1(e.value)}
              style={{ width: "250px", minWidth: "15em" }}
              filter={true}
              filterPlaceholder="Buscar"
              placeholder="Comedor"
            />
          </div>
          <div className="p-col-12 p-md-4">
            <div
              className="p-grid"
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                width: "250px",
                border: "0.4px solid lightgray",
                borderRadius: "3px",
                justifyContent: "center",
                textAlign: "center",
                paddingBottom: "5px",
              }}
            >
              <div>
                <h3>Escolaridad</h3>
                <SelectButton
                  value={escolaridad}
                  options={escol}
                  onChange={(e) => setEscolaridad(e.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
