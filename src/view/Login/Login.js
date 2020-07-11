import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import styled from "styled-components";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import { createGlobalStyle } from "styled-components";
import "primereact/resources/themes/nova-light/theme.css";
import ApiController from "../../service/ApiController";

const GlobalStyles = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap");
`;
const RootLogin = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      60deg,
      rgba(214, 213, 226, 0.8),
      rgba(214, 213, 226, 0) 70.71%
    ),
    linear-gradient(
      210deg,
      rgba(184, 203, 253, 0.8),
      rgba(214, 213, 226, 0) 70.71%
    ),
    linear-gradient(
      340deg,
      rgba(90, 84, 197, 0.8),
      rgba(214, 213, 226, 0) 40.71%
    );
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Mainbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 10%;
  width: 370px;
  height: 300px;
  border-radius: 3px 60px 3px 60px;
  border: 0.1px;
  box-shadow: 0px 6px 42px -25px rgba(0, 0, 0, 0.95);
  background-color: white;
  justify-content: center;
`;
const Titulo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: "Arimo", sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #58575c;
  width: 100%;
`;
const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;
const InputUsuario = styled.div`
  margin-bottom: 10px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
`;

export default function Login(props) {
  const [listaUsuario, setListaUsuarios] = useState([]);

  const checkLogin = () => {
    // Function used to change Login state
     props.updateLogin();
   // testing();
  };

  const testing = async () => {
   ApiController.getTitulares(setListaUsuarios);
  };

  useEffect (() => {
    listaUsuario.forEach(m=> {
        console.log(m.fullName)
    })
  },[listaUsuario])
  

  return (
    <RootLogin>
      <GlobalStyles />
      <Container>
        <Mainbox>
          <Titulo>Escuela 666</Titulo>
          <InputContainer>
            <InputUsuario>
              <InputText placeholder="Usuario" style={{ width: "200px" }} />
            </InputUsuario>
            <div>
              <InputText
                placeholder="Password"
                type="password"
                style={{ width: "200px" }}
              />
            </div>
          </InputContainer>
          <ButtonContainer>
            <Button
              label="Login"
              style={{ width: "200px" }}
              onClick={() => checkLogin()}
            />
          </ButtonContainer>
        </Mainbox>
      </Container>
    </RootLogin>
  );
}
