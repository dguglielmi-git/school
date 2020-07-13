import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './EditDialog.css'


export default class EditDialog extends Component {

    constructor() {
        super();
        this.state = {
            display: false,
            alumnoSeleccionado: null,
            idAlumno: null,
        };
        this.onHide = this.onHide.bind(this);
        this.onClick = this.onClick.bind(this);
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
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={() => this.onHide(name)} />
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)}
                    className="p-button-secondary" />
            </div>
        );
    }


    render() {
        return (
            <div className="dialog-demo">
                <Button
                    type="button"
                    icon="pi pi-cog"
                    className="p-button-secondary"
                    onClick={() => this.onClick('display')}
                />
                <Dialog header="Godfather I" visible={this.state.display} style={{ width: '50vw' }} onHide={() => this.onHide('display')} footer={this.renderFooter('display')}>
                    <p>{this.state.idAlumno} </p>
                </Dialog>
            </div>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<EditDialog />, rootElement);