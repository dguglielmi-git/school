import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./ModalCobro.css";
import React from "react";
import { InputNumber } from "primereact/inputnumber";
export default function FormDebit({
  bankAccount,
  setBankAccount
}) {

  return (
    <div>
      <p>Ingrese el número de cuenta Bancaria para efectuar el Pago:</p>
      <div className="p-grid p-fluid mainDiv">
        <div className="p-col-12 p-md-4 secondDiv">
          <span className="p-float-label spanSt">
            
            <InputNumber
                    placeholder="Número de Cuenta"
                    value={bankAccount}
                    style={{ width: "250px" }}
                    onChange={(e) => setBankAccount(e.value)}
                  />
          </span>
        </div>
      </div>
    </div>
  );
}
