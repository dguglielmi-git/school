import "./ModalRecibo.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/nova-light/theme.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import React, { useState } from "react";
import TableRecibo from "./TableRecibo";

export default function ModalRecibo({
  displayBasic,
  setDisplayBasic,
  clientSelected,
  row,
}) {
  const onHide = (stateMethod) => {
    stateMethod(false);
  };

  const renderFooter = (stateMethod) => {
    return (
      <div>
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
    <div className="dialog-demo">
      {clientSelected.studentData &&
        console.log(clientSelected.studentData[0].fullName)}
      <Dialog
        header="Recibo Detallado"
        visible={displayBasic}
        style={{ width: "60vw" }}
        onHide={() => onHide(setDisplayBasic)}
        footer={renderFooter(setDisplayBasic)}
      >
        <TableRecibo row={row} />
      </Dialog>
    </div>
  );
}
