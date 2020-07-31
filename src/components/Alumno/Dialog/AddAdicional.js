import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./DialogAdic.css";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

const Marco = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 250px;
  margin-bottom: 20px;
`;
const Title = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 25px;
`;

export default function DialogAdicionales({ display, setDisplay, actualizar }) {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState(null);

  const onHide = (stateMethod) => {
    stateMethod(false);
  };

  const guardar =() => {
    if (nombre !== "" && monto !== "") {
    actualizar(nombre,monto);
    setDisplay(false);
    } else {
      alert('Debe ingresar valores en ambos campos para poder guardar')
    }
  }

  const renderFooter = (stateMethod) => {
    return (
      <div>
        <Button
          label="Guardar"
          icon="pi pi-save"
          onClick={() => guardar()}
        />
        <Button
          label="Cerrar"
          icon="pi pi-times"
          onClick={() => onHide(stateMethod)}
          className="p-button-secondary"
        />
      </div>
    );
  };

  return (
    <Dialog
      header="Alta de Adicionales"
      visible={display}
      style={{ width: "30vw" }}
      onHide={() => onHide(setDisplay)}
      position="top"
      blockScroll
      footer={renderFooter(setDisplay)}
    >
      <Marco>
        <Title>Ingrese nuevo Item Adicional</Title>
        <Box>
          <span className="p-float-label">
            <InputText
              id="float-input"
              type="text"
              size={30}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="float-input">Nombre/Descripción</label>
          </span>
        </Box>
        <Box>
          <span className="p-float-label">
            <InputText
              id="float-input"
              type="text"
              size={30}
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
            <label htmlFor="float-input">Monto $</label>
          </span>
        </Box>
      </Marco>
    </Dialog>
  );
}
