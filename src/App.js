import React, { Component } from "react";
import classNames from "classnames";
import { AppMenu } from "./components/app/AppMenu";
import { AppTopbar } from "./components/app/AppTopbar";
import { AppFooter } from "./components/app/AppFooter";
import { Route } from "react-router-dom";
import Login from "./view/Login/Login.js";
import { AppProfile } from "./components/app/AppProfile";
import { Principal } from "./components/Principal";
import { Titulares } from "./components/Titular/Titulares";
import { Empleados } from "./components/Empleado/Empleados";
import { Alumnos } from "./components/Alumno/Alumnos";
import { Facturacion } from "./components/Facturacion/Facturacion";
import {ProcesosBatch} from './view/ProcesosBatch/ProcesosBatch'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/core/main.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./layout/layout.scss";
import "./components/app/App.scss";
import {firebaseApp} from './service/firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      userLogged: false,
      userNameLogged: '',
    };

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.createMenu();
  }

  updateLogin(name) {
    this.setState((state) => ({
      ...this.state,
      userLogged: !state.userLogged,
      userNameLogged: name,
    }));
  }

  onWrapperClick(event) {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.state.layoutMode === "overlay") {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive,
        });
      } else if (this.state.layoutMode === "static") {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive,
        });
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive,
      });
    }

    event.preventDefault();
  }

  onSidebarClick(event) {
    this.menuClick = true;
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }
  }

  createMenu() {
    this.menu = [
      {
        label: "Admin. de Titulares",
        icon: "pi pi-fw pi-user",
        to: "/titulares",
      },
      {
        label: "Admin. de Alumnos",
        icon: "pi pi-fw pi-user-edit",
        to: "/alumnos",
      },
      {
        label: "Admin. de Empleados",
        icon: "pi pi-fw pi-users",
        to: "/empleados",
      },
      {
        label: "Facturación y Cobros",
        icon: "pi pi-fw pi-dollar",
        to: "/facturacion",
      },
      {
        label: "Procesos Batch",
        icon: "pi pi-fw pi-play",
        to: "/batch",
      },
    ];
  }

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  }

  render() {
    const logo =
      this.state.layoutColorMode === "dark"
        ? "assets/layout/images/logo-white.svg"
        : "assets/layout/images/logo.svg";

    const wrapperClass = classNames("layout-wrapper", {
      "layout-overlay": this.state.layoutMode === "overlay",
      "layout-static": this.state.layoutMode === "static",
      "layout-static-sidebar-inactive":
        this.state.staticMenuInactive && this.state.layoutMode === "static",
      "layout-overlay-sidebar-active":
        this.state.overlayMenuActive && this.state.layoutMode === "overlay",
      "layout-mobile-sidebar-active": this.state.mobileMenuActive,
    });

    const sidebarClassName = classNames("layout-sidebar", {
      "layout-sidebar-dark": this.state.layoutColorMode === "dark",
      "layout-sidebar-light": this.state.layoutColorMode === "light",
    });

    if (!this.state.userLogged) {
      return <Login updateLogin={this.updateLogin} />;
    }

    return (
      <div>
        <div className={wrapperClass} onClick={this.onWrapperClick}>
          <AppTopbar onToggleMenu={this.onToggleMenu} />

          <div
            ref={(el) => (this.sidebar = el)}
            className={sidebarClassName}
            onClick={this.onSidebarClick}
          >
            <div className="layout-logo">
              <img alt="Logo" src={logo} />
            </div>
            <AppProfile updateLogin={this.updateLogin} userNameLogged={this.userNameLogged} />
            <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
          </div>

          <div className="layout-main">
            <Route path="/" exact component={Principal} />
            <Route path="/facturacion" component={Facturacion} />
            <Route path="/titulares" component={Titulares} />
            <Route path="/empleados" component={Empleados} />
            <Route path="/alumnos" component={Alumnos} />
            <Route path="/batch" component={ProcesosBatch} />
          </div>

          <AppFooter />

          <div className="layout-mask"></div>
        </div>
      </div>
    );
  }
}

export default App;
