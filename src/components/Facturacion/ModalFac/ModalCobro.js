import "./ModalCobro.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/nova-light/theme.css";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import React, { useState } from "react";
import FormTarjeta from "./FormTarjeta";
import FormDebit from "./FormDebit";
import ApiController from "../../../service/ApiController";

export default function ModalCobro({
  displayBasic,
  setDisplayBasic,
  clientSelected,
}) {
  const [position, setPosition] = useState("center");
  const [activeIndex, setActiveIndex] = useState(0);

  // Credit Card
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expDate, setExpDate] = useState("");

  // Debit Payment
  const [bankAccount, setBankAccount] = useState("");

  const onClick = (stateMethod, position = "") => {
    stateMethod(true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (stateMethod) => {
    stateMethod(false);
  };

  const renderFooter = (stateMethod) => {
    return (
      <div>
        <Button
          label="Enviar"
          icon="pi pi-check"
          onClick={() => processPayment(stateMethod)}
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

  const debitBankAccount = () => {
    ApiController.updateFacturacion(
      {
        payWith: 3,
        accountNumber: bankAccount,
      },
      null
    );
  };

  const creditCardPayment = () => {
    ApiController.updateFacturacion(
      {
        payWith: 1,
        ccNumber: creditCardNumber,
        ccCVV: cvv,
        ccExpiry: expDate,
      },
      null
    );
  };

  const processPayment = (stateMethod) => {
    if (activeIndex === 0) {
      debitBankAccount();
    } else {
      creditCardPayment();
    }
    onHide(stateMethod);
  };

  return (
    <div className="dialog-demo">
      {clientSelected.studentData &&
        console.log(clientSelected.studentData[0].fullName)}
      <Dialog
        header="Cobro de Facturas"
        visible={displayBasic}
        style={{ width: "40vw" }}
        onHide={() => onHide(setDisplayBasic)}
        footer={renderFooter(setDisplayBasic)}
      >
        <p style={{ fontWeigth: "bold" }}>
          *** ATENCION: La modificacion del metodo de pago, modificara el metodo
          en TODAS las facturas impagas hasta la fecha
        </p>

        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Débito" leftIcon="pi pi-home">
            <p>
              Cliente:
              {clientSelected.studentData &&
                clientSelected.studentData[0].fullName}
            </p>
            <FormDebit
              bankAccount={bankAccount}
              setBankAccount={setBankAccount}
            />
          </TabPanel>

          <TabPanel header="Tarjeta de Crédito" rightIcon="pi pi-money-bill">
            Cliente:{" "}
            {clientSelected.studentData &&
              clientSelected.studentData[0].fullName}
            <FormTarjeta
              creditCardNumber={creditCardNumber}
              setCreditCardNumber={setCreditCardNumber}
              cvv={cvv}
              setCvv={setCvv}
              expDate={expDate}
              setExpDate={setExpDate}
            />
          </TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
}
