import React, { Component } from "react";
import classNames from "classnames";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export class AppProfile extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      display: false,
    };
    this.onClick = this.onClick.bind(this);
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
          <span className="username">Daniel Guglielmi</span>
          <i className="pi pi-fw pi-cog" />
        </button>
        <ul
          className={classNames({
            "layout-profile-expanded": this.state.expanded,
          })}
        >
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-user" />
              <span>Account</span>
            </button>
          </li>
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-inbox" />
              <span>Notifications</span>
              <span className="menuitem-badge">2</span>
            </button>
          </li>
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
