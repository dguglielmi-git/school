import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./ModalCobro.css";
import React, { useState, useEffect } from "react";
import { InputMask } from "primereact/inputmask";

export default function FormTarjeta({
  creditCardNumber,
  setCreditCardNumber,
  cvv,
  setCvv,
  expDate,
  setExpDate,
}) {
  return (
    <div>
      <div className="p-grid p-fluid mainDiv">
        <div className="p-col-12 p-md-4 secondDiv">
          <span className="p-float-label spanSt">
            <InputMask
              id="float-mask"
              mask="9999-9999-9999-9999"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.value)}
            />
            <label htmlFor="float-mask">Número de Tarjeta</label>
          </span>

          <span className="p-float-label spanSt">
            <InputMask
              id="float-mask"
              mask="9999"
              value={cvv}
              onChange={(e) => setCvv(e.value)}
            />
            <label htmlFor="float-mask">Código de Seguridad (999/9999)</label>
          </span>

          <span className="p-float-label spanSt">
            <InputMask
              id="float-mask"
              mask="99-99"
              value={expDate}
              onChange={(e) => setExpDate(e.value)}
            />
            <label htmlFor="float-mask">Fecha de Vencimiento MM-AA</label>
          </span>
        </div>
      </div>
    </div>
  );
}
