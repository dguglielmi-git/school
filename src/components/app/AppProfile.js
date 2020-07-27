import React, { Component } from "react";
import classNames from "classnames";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import * as firebase from "firebase";

export class AppProfile extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      display: false,
      userInfo: '',
      userNameLogged:'Anónimo',
    };
    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    const user = await firebase.auth().currentUser;
    console.log('*** usuario: '+ user.displayName);
    this.setState({userInfo: user});
    this.setState({userNameLogged: user.displayName});

    var ee = this.props.userNameLogged;
    console.log("Nombre: "+ee)
    console.log("Printing user")
    for (let i=0; i<user.lenght; i++) {
      console.log(user[i])
    }
  }

  onLogout() {
    this.props.updateLogin();
    this.setState({ display: false });
  }

  onClick(event) {
    this.setState({ expanded: !this.state.expanded });
    event.preventDefault();
  }

  render() {
    const dialogFooter = (
      <div>
        <Button
          icon="pi pi-check"
          onClick={() => this.onLogout()}
          label="Sí"
        />
        <Button
          icon="pi pi-times"
          onClick={() => this.setState({ display: false })}
          label="No"
          className="p-button-secondary"
        />
      </div>
    );
    return (
      <div className="layout-profile">
        <div>
          <img src="assets/layout/images/generic.png" alt="" />
        </div>
        <Dialog
          header="Cerrar Sesión"
          visible={this.state.display}
          modal={true}
          width="500px"
          footer={dialogFooter}
          onHide={() => this.setState({ display: false })}
        >
          <p>¿Desea Cerrar la sesión?</p>
        </Dialog>
        <button className="p-link layout-profile-link" onClick={this.onClick}>
          <span className="username"> {this.state.userNameLogged}</span>
          <i className="pi pi-fw pi-cog" />
        </button>
        <ul
          className={classNames({
            "layout-profile-expanded": this.state.expanded,
          })}
        >
         
          <li>
            <button
              className="p-link"
              onClick={() => this.setState({ display: true })}
            >
              <i className="pi pi-fw pi-power-off" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
