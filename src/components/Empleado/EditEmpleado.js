import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './EditEmpleado.css'
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ApiController from "../../service/ApiController";


export default function EditEmpleado({
    display,
    closeEdit,
    showSuccess,
    editCandidate,
}) {
    const [iId, setIid] = useState('');
    const [iNombre, setINombre] = useState('');
    const [iApellido, setIApellido] = useState('');
    const [iEmail, setIEmail] = useState('');
    const [iDireccion, setIDireccion] = useState('');
    const [iProvincia, setIProvincia] = useState('');
    const [iPhone, setIPhone] = useState('');
    const [iCuil, setICuil] = useState('');
    const [iDocumento, setIDocumento] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [dropdownPais, setDropdownPais] = useState(null);
    const [dropdownPositions, setDropdownPositions] = useState(null);
    const [positions, setPositions] = useState([
        { label: "Posición", value: null },
        { label: "Profesor Titular", value: "Profesor Titular" },
        { label: "Profesor Suplente", value: "Profesor Suplente" },
        { label: "Director", value: "Director" },
        { label: "Asistente Profesor", value: "Asistente Profesor" },
    ]);
    const [paises, setPaises] = useState([
        { label: "País", value: null },
        { label: "Argentina", value: "Argentina" },
        { label: "Brasil", value: "Brasil" },
        { label: "Colombia", value: "Colombia" },
        { label: "Mexico", value: "Mexico" },
        { label: "Venezuela", value: "Venezuela" },
    ]);

    useEffect(() => {
        loadData();
    }, [editCandidate])


    const renderFooter = (name) => {
        return (
            <div>
                <Button
                    label="Guardar"
                    icon="pi pi-save"
                    onClick={() => guardarTitular()}
                />
                <Button
                    label="Cerrar"
                    icon="pi pi-times"
                    onClick={() => closeEdit()}
                    className="p-button-secondary"
                />
            </div>
        );
    }

    const notNulls = (value) => {
        return value === null || value === undefined ? "" : value;
    }

    const loadData = () => {
        let candidate = editCandidate

        if (candidate) {
            let _fullname = candidate.fullName.split(' ');
            let _address = candidate.address.split(',');
            setIid(candidate._id);
            setINombre(_fullname[0])
            setIApellido(_fullname[1])
            setIEmail(candidate.email)
            setIDireccion(_address[0])
            setIProvincia(_address[1])
            setDropdownPais(_address[2].trim())
            setICuil(candidate.cuil)
            setIDocumento(candidate.documentNumber)
            setIPhone(candidate.phoneNumber)
        }
    }

    const guardarTitular = () => {
        const _id = iId;
        const _fullName = iNombre + " " + iApellido;
        const _email = notNulls(iEmail);
        const _address =
            iDireccion +
            ", " +
            iProvincia +
            ", " +
            dropdownPais;
        const _phoneNumber = notNulls(iPhone);
        const _cuil = notNulls(iCuil);
        const _documentNumber = notNulls(iDocumento);

        ApiController.updateTitular(
            {
                _id: _id,
                fullName: _fullName,
                email: _email,
                address: _address,
                phoneNumber: _phoneNumber,
                cuil: _cuil,
                documentNumber: _documentNumber,
            },
            showSuccess
        );
    }

    return (
        <div className="dialog-demo">
            <Dialog header="Editar Titular"
                visible={display} style={{ width: '70vw' }}
                onHide={() => closeEdit()}
                footer={renderFooter('display')}
            >
                <div className="p-grid">
                    <div className="p-col-12 p-md-4">
                        <InputText
                            placeholder="Nombre"
                            value={iNombre}
                            style={{ width: "250px" }}
                            onChange={(e) => setINombre(e.target.value)}
                        />
                    </div>
                    <div className="p-col-12 p-md-4">
                        <InputText
                            placeholder="Apellido"
                            value={iApellido}
                            style={{ width: "250px" }}
                            onChange={(e) => setIApellido(e.target.value)}
                        />
                    </div>
                    <div className="p-col-12 p-md-4">
                        <InputText
                            placeholder="E-mail"
                            value={iEmail}
                            style={{ width: "300px" }}
                            onChange={(e) => setIEmail(e.target.value)}
                        />
                    </div>
                    <div className="p-col-12 p-md-4">
                        <InputText
                            placeholder="DNI"
                            value={iDocumento}
                            style={{ width: "115px" }}
                            onChange={(e) => setIDocumento(e.target.value)}
                        />
                        <InputText
                            placeholder="CUIL"
                            value={iCuil}
                            style={{ width: "115px", marginLeft: "20px" }}
                            onChange={(e) => setICuil(e.target.value)}
                        />
                    </div>
                    <div className="p-col-12 p-md-4">
                        <InputText
                            placeholder="Telefono"
                            value={iPhone}
                            style={{ width: "250px" }}
                            onChange={(e) => setIPhone(e.target.value)}
                        />
                    </div>
                    <div className="p-col-12 p-md-4">
                        <InputText
                            placeholder="Dirección"
                            value={iDireccion}
                            style={{ width: "300px" }}
                            onChange={(e) => setIDireccion(e.target.value)}
                        />
                    </div>
                    <div className="p-col-12 p-md-4">
                        <InputText
                            placeholder="Provincia"
                            value={iProvincia}
                            style={{ width: "250px" }}
                            onChange={(e) => setIProvincia.e.target.value}
                        />
                    </div>

                    <div className="p-col-12 p-md-4">
                        <Dropdown
                            style={{ width: "250px" }}
                            options={paises}
                            value={dropdownPais}
                            onChange={(event) =>
                                setDropdownPais(event.value)
                            }
                            autoWidth={false}
                        />
                    </div>
                    <div className="p-col-12 p-md-4">
                        <Dropdown
                            style={{ width: "300px" }}
                            options={positions}
                            value={dropdownPositions}
                            onChange={(event) =>
                                setDropdownPositions(event.value)
                            }
                            autoWidth={false}
                        />
                    </div>
                    <div className="p-col-12 p-md-4">
                        <Calendar
                            placeholder="Fecha de Alta"
                            style={{ width: "250px" }}
                            value={fechaAlta}
                            onChange={(e) => setFechaAlta(e.value)}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}