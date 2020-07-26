import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./ModalCobro.css";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";

export default function FormDebit() {
  const [inputtextValue, setInputtextValue] = useState("");
  const [dniValue, setDniValue] = useState("");
  const [maskValue, setMaskValue] = useState(null);

  return (
    <div>
      <p>Ingrese el número de cuenta Bancaria para efectuar el Pago:</p>
      <div className="p-grid p-fluid mainDiv">
        <div className="p-col-12 p-md-4 secondDiv">
          <span className="p-float-label spanSt">
            <InputMask
              id="float-mask"
              mask="9999-9999-9999-9999-99"
              value={maskValue}
              onChange={(e) => setMaskValue(e.value)}
            />
            <label htmlFor="float-mask">Número de Cuenta</label>
          </span>
        </div>
      </div>
    </div>
  );
}
