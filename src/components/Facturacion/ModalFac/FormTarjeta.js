import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./ModalCobro.css";
import React, { useState } from "react";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function FormTarjeta({
  creditCardNumber,
  setCreditCardNumber,
  cvv,
  setCvv,
  expDate,
  setExpDate,
  clientSelected,
}) {
  const [prueba, setPrueba] = useState(11111);
  return (
    <div>
      <div className="p-grid p-fluid mainDiv">
        <div className="p-col-12 p-md-4 secondDiv">
          <span className="p-float-label spanSt">
            <InputMask
              id="float-mask"
              mask="9999999999999999"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.value)}
            />
            <label htmlFor="float-mask">Número de Tarjeta</label>
          </span>

          <span className="p-float-label spanSt">
          <InputMask
              id="float-mask"
              mask="999"
              value={cvv}
              onChange={(e) => setCvv(e.value)}
            />
            <label htmlFor="float-mask">Código de Seguridad</label>
          </span>

          <span className="p-float-label spanSt">
            <InputMask
              id="float-mask"
              mask="9999"
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
