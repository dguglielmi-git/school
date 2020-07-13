import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './EditDialog.css'
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ApiController from "../service/ApiController";

export default class EditTitulares extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iNombre: this.props.iNombre,
            iApellido: "",
            iEmail: "",
            iDireccion: "",
            iProvincia: "",
            iPhone: "",
            iCuil: "",
            iDocumento: "",
            dropdownPais: null,
            paises: [
                { label: "País", value: null },
                { label: "Argentina", value: "Argentina" },
                { label: "Brasil", value: "Brasil" },
                { label: "Colombia", value: "Colombia" },
                { label: "Mexico", value: "Mexico" },
                { label: "Venezuela", value: "Venezuela" },
            ],
        }
        this.loadData = this.loadData.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadData();
    }

    handleChange(event, nombre) {
        let _state = {
            [`${nombre}`]: event.target.value
        };

        this.setState(_state)
    }

    onClick(name) {
        let valores = this.props.selectedCustomers;
        if (valores) {
            let state = {
                [`${name}`]: true,
                idAlumno: valores._id
            };

            this.setState(state);
        }
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
        this.props.closeEdit();
    }


    onSave() {

    }

    renderFooter(name) {
        return (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={() => this.onSave()} />
                <Button label="Cerrar" icon="pi pi-times" onClick={() => this.onHide(name)}
                    className="p-button-secondary" />
            </div>
        );
    }

    notNulls(value) {
        return value === null || value === undefined ? "" : value;
    }

    loadData() {
        let candidate = this.props.editCandidate

       /* iApellido: "",
        iEmail: "",
        iDireccion: "",
        iProvincia: "",
        iPhone: "",
        iCuil: "",
        iDocumento: "",
*/
        if (candidate) { 
            console.log(this.props.editCandidate) 
            let _fullname = candidate.fullName.split(' ');
            let _address = candidate.address.split(',');
            this.setState((state) => ({
                ...state,
                iNombre: _fullname[0],
                iApellido: _fullname[1],
                iEmail: candidate.email,
                iDireccion: _address[0],
                iProvincia: _address[1],
                dropdownPais: _address[2],
                iCuil: candidate.cuil,
                iDocumento: candidate.documentNumber,
                iPhone: candidate.phoneNumber
            }))
        }
    }

    guardarTitular() {
        const _fullName = this.state.iNombre + " " + this.state.iApellido;
        const _email = this.notNulls(this.state.iEmail);
        const _address =
            this.state.iDireccion +
            ", " +
            this.state.iProvincia +
            ", " +
            this.state.dropdownPais;
        const _phoneNumber = this.notNulls(this.state.iPhone);
        const _cuil = this.notNulls(this.state.iCuil);
        const _documentNumber = this.notNulls(this.state.iDocumento);

        ApiController.updateTitular(
            {
                fullName: _fullName,
                email: _email,
                address: _address,
                phoneNumber: _phoneNumber,
                cuil: _cuil,
                documentNumber: _documentNumber,
            },
            this.props.showSuccess
        );
    }


    render() {
        return (
            <div className="dialog-demo">
                <Dialog header="Editar Titular"
                    visible={this.props.display} style={{ width: '70vw' }}
                    onHide={() => this.onHide('display')}
                    footer={this.renderFooter('display')}
                >
                    <div className="p-grid" style={{ height: '150px' }}>
                        <div className="p-col-12 p-md-4">
                            <InputText
                                placeholder="Nombre"
                                value={this.state.iNombre}
                                style={{ width: "250px" }}
                                onChange={(e) => this.handleChange(e, "iNombre")}
                            />
                        </div>
                        <div className="p-col-12 p-md-4">
                            <InputText
                                placeholder="Apellido"
                                value={this.state.iApellido}
                                style={{ width: "250px" }}
                                onChange={(e) => this.handleChange(e, "iApellido")}
                            />
                        </div>
                        <div className="p-col-12 p-md-4">
                            <InputText
                                placeholder="E-mail"
                                value={this.state.iEmail}
                                style={{ width: "300px" }}
                                onChange={(e) => this.handleChange(e, "iEmail")}
                            />
                        </div>
                        <div className="p-col-12 p-md-4">
                            <InputText
                                placeholder="DNI"
                                value={this.state.iDocumento}
                                style={{ width: "115px" }}
                                onChange={(e) => this.handleChange(e, "iDocumento")}
                            />
                            <InputText
                                placeholder="CUIL"
                                value={this.state.iCuil}
                                style={{ width: "115px", marginLeft: "20px" }}
                                onChange={(e) => this.handleChange(e, "iCuil")}
                            />
                        </div>
                        <div className="p-col-12 p-md-4">
                            <InputText
                                placeholder="Telefono"
                                value={this.state.iPhone}
                                style={{ width: "250px" }}
                                onChange={(e) => this.handleChange(e, "iPhone")}
                            />
                        </div>
                        <div className="p-col-12 p-md-4">
                            <InputText
                                placeholder="Dirección"
                                value={this.state.iDireccion}
                                style={{ width: "300px" }}
                                onChange={(e) => this.handleChange(e, "iDireccion")}
                            />
                        </div>
                        <div className="p-col-12 p-md-4">
                            <InputText
                                placeholder="Provincia"
                                value={this.state.iProvincia}
                                style={{ width: "250px" }}
                                onChange={(e) => this.handleChange(e, "iProvincia")}
                            />
                        </div>

                        <div className="p-col-12 p-md-4">
                            <Dropdown
                                style={{ width: "250px" }}
                                options={this.state.paises}
                                value={this.state.dropdownPais}
                                onChange={(event) =>
                                    this.setState({ dropdownPais: event.value })
                                }
                                autoWidth={false}
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<EditTitulares />, rootElement);