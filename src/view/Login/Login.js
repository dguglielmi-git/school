import React from "react";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Login.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function Login() {
  return (
    <div className="rootLogin">
      <div className="container">
        <div className="mainBox">
          <div className="titulo">Escuela 666</div>
          <div className="inputs">
            <div className="inputUsuario">
              <InputText placeholder="Usuario" className="itemStyle" />
            </div>
            <div>
              <InputText
                placeholder="Password"
                type="password"
                className="itemStyle"
              />
            </div>
          </div>
          <div className="botonLogin">
            <Button label="Login" className="itemStyle" />
          </div>
        </div>
      </div>
    </div>
  );
}
