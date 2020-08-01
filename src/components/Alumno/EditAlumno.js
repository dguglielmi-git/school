import React, { useState, useEffect, useRef } from "react";
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
import DialogAdicional from "./Dialog/AddAdicional";
import { Growl } from "primereact/growl";

export default function EditAlumno({
  display,
  closeEdit,
  showSuccess,
  idSeleccionado,
}) {
  const [iId, setIid] = useState("");
  const [iNombre, setINombre] = useState("");
  const [iApellido, setIApellido] = useState("");
  const [iDocumento, setIDocumento] = useState("");
  const [iLegajo, setILegajo] = useState("");
  const [listaTitulares, setListaTitulares] = useState([]);
  const [listaTitular, setListaTitular] = useState("");
  const [alumnos, setAlumnos] = useState([]);

  const [adicionales1, setAdicionales1] = useState([]);
  const [comedor1, setComedor1] = useState([]);
  const [adic, setAdic] = useState([]);
  const [comed, setComed] = useState([]);
  const [escolaridad, setEscolaridad] = useState(null);
  const [escol, setEscol] = useState([]);
  const [displayAdicional, setDisplayAdicional] = useState(false);

  const growlRef = useRef();

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

  const cerrar = () => {
    setAdicionales1([]);
    setComedor1([]);
    closeEdit();
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
    });
    return alumno;
  };

  useEffect(() => {
    ApiController.getAlumnos(loadAlumnos);
    ApiController.getTitulares(loadTitulares);
    getAdditionalData();
  }, []);

  useEffect(() => {
    if (display) {
      loadData();
    }
  }, [idSeleccionado, display]);

  const insertNewAdditional = (__nombre, __monto) => {
    try {
      let result = ApiController.insertAdditional(
        {
          name: __nombre,
          price: __monto,
          type: 2,
        },
        getAdditionalData,
        showSuccessGen
      );
      console.log("Resultado de ejecucion de insertNewAdditional: " + result);
    } catch (err) {
      console.log("Error al intentar Insertar Additional: " + err);
    }
  };

  /** DRY */
  const showSuccessGen = (_summary, _detail) => {
    let msg = {
      severity: "susccess",
      summary: _summary,
      detail: _detail,
    };
    growlRef.current.show(msg);
  };

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

  const pushAdds = (_type, _id) => {
    let aux = [];

    switch (_type) {
      case 1:
        setEscolaridad(_id);
        break;
      case 2:
        aux = adicionales1;
        aux.push(_id);
        break;
      case 3:
        aux = comedor1;
        aux.push(_id);
        break;
      default:
        break;
    }
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
          onClick={() => cerrar()}
          className="p-button-secondary"
        />
      </div>
    );
  };

  const loadData = async () => {
    let candidate = await getAlumnoSelected();
    let _fullname = "";
    if (candidate) {
      _fullname = candidate.fullName.split(" ");
      setINombre(_fullname[0]);
      setIApellido(_fullname[1]);
      setIDocumento(candidate.documentNumber);
      setILegajo(candidate.idNumber);
      setListaTitular(candidate.titularId);
      console.log(candidate.titularNombre);
      candidate.additionalData.map((ad) => {
        pushAdds(ad.type, ad._id);
      });
    }
  };

  const handleChangeAdicionales = (e) => {
    setAdicionales1(e);
  };

  const handleChangeEscolaridad = (val) => {
    setEscolaridad(val);
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

  const renderInput = (_placeholder, _value, _func) => {
    return (
      <div className="p-col-12 p-md-4">
        <InputText
          placeholder={_placeholder}
          value={_value}
          style={{ width: "250px" }}
          onChange={(e) => _func(e.target.value)}
        />
      </div>
    );
  };

  const renderMultiSelect = (
    _value,
    _options,
    _onChange,
    _filterPlaceholder,
    _placeholder
  ) => {
    return (
      <MultiSelect
        value={_value}
        options={_options}
        onChange={(e) => _onChange(e.value)}
        style={{ width: "100px", minWidth: "15em" }}
        filter={true}
        filterPlaceholder={_filterPlaceholder}
        placeholder={_placeholder}
      />
    );
  };

  return (
    <div className="dialog-demo">
      <Growl ref={growlRef} style={{ marginTop: "75px" }} />
      <Dialog
        header="Editar Alumno"
        visible={display}
        style={{ width: "70vw" }}
        onHide={() => closeEdit()}
        footer={renderFooter("display")}
      >
        <DialogAdicional
          display={displayAdicional}
          setDisplay={setDisplayAdicional}
          actualizar={insertNewAdditional}
        />
        <div className="p-grid" style={{ display: "flex", flexWrap: "wrap" }}>
          {renderInput("Nombre", iNombre, setINombre)}
          {renderInput("Apellido", iApellido, setIApellido)}
          {renderInput("DNI", iDocumento, setIDocumento)}

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
          {renderInput("Legajo", iLegajo, setILegajo)}

          <div
            className="p-col-12 p-md-4 adic"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {renderMultiSelect(
              adicionales1,
              adic,
              handleChangeAdicionales,
              "Buscar",
              "Adicionales"
            )}

            <Button
              icon="pi pi-plus"
              style={{ width: "27px", height: "27px", marginLeft: "10px" }}
              onClick={() => setDisplayAdicional(true)}
            />
          </div>
          <div className="p-col-12 p-md-4">
            {renderMultiSelect(
              comedor1,
              comed,
              setComedor1,
              "Buscar",
              "Comedor"
            )}
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
                  onChange={(e) => handleChangeEscolaridad(e.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
