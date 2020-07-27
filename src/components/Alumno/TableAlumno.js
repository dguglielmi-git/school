import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import ApiController from "../../service/ApiController";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./TableAlumno.css";
import EditAlumno from "./EditAlumno";

export class TableAlumno extends Component {
  constructor() {
    super();
    this.state = {
      customers: null,
      selectedCustomers: null,
      globalFilter: null,
      selectedRepresentatives: null,
      dateFilter: null,
      selectedStatus: null,
      listaTitulares: [],
      display: false,
      selectedItem: {},
    };

    //body cells
    this.representativeBodyTemplate = this.representativeBodyTemplate.bind(
      this
    );

    //filters
    this.representativeItemTemplate = this.representativeItemTemplate.bind(
      this
    );

    this.onRepresentativeFilterChange = this.onRepresentativeFilterChange.bind(
      this
    );

    this.loadAlumnos = this.loadAlumnos.bind(this);
    this.loadTitulares = this.loadTitulares.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  loadAlumnos(datos) {
    let _data = [];

    datos.forEach((e) => {
      _data.push({
        ...e,
        titularNombre: e.titularData[0].fullName,
      });
    });

    this.setState((state) => ({
      ...this.state,
      customers: _data,
    }));
  }
  notNulls(value) {
    return value === null || value === undefined ? "" : value;
  }

  loadTitulares(lista) {
    let structure = [];
    lista.forEach((tit) => {
      structure.push({
        titularNombre: tit.fullName,
        value: tit._id,
      });
    });

    this.setState((state) => ({
      ...this.state,
      listaTitulares: structure,
    }));
  }

  componentDidMount() {
    ApiController.getAlumnos(this.loadAlumnos);
    ApiController.getTitulares(this.loadTitulares);
  }

  renderHeader() {
    return (
      <div>
        Lista de Alumnos
        <div className="p-datatable-globalfilter-container">
          <InputText
            type="search"
            onInput={(e) => this.setState({ globalFilter: e.target.value })}
            placeholder="Búsqueda General"
          />
        </div>
      </div>
    );
  }

  modifyPupil() {
    this.setState({ display: true });
  }

  actionBodyTemplate() {
    return (
      <Button
        type="button"
        icon="pi pi-cog"
        className="p-button-secondary"
        onClick={() => this.modifyPupil()}
      ></Button>
    );
  }

  representativeBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {rowData.titularNombre}
        </span>
      </React.Fragment>
    );
  }

  renderRepresentativeFilter() {
    return (
      <MultiSelect
        className="p-column-filter"
        value={this.state.selectedRepresentatives}
        options={this.state.listaTitulares}
        placeholder="Todos"
        optionLabel="titularNombre"
        optionValue="titularNombre"
        itemTemplate={this.representativeItemTemplate}
        onChange={this.onRepresentativeFilterChange}
      />
    );
  }

  closeEdit() {
    this.setState({ display: false });
  }

  representativeItemTemplate(option) {
    return (
      <div className="p-multiselect-representative-option">
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {option.titularNombre}
        </span>
      </div>
    );
  }

  onRepresentativeFilterChange(event) {
    this.dt.filter(event.value, "titularNombre", "in");
    this.setState({ selectedRepresentatives: event.value });
  }

  handleSelection(e) {
    this.setState({ selectedCustomers: e.value });
    console.log(e.value.fullName);
    this.setState({ selectedItem: e.value });
  }

  render() {
    const header = this.renderHeader();
    const representativeFilter = this.renderRepresentativeFilter();

    return (
      <div className="datatable-doc-demo">
        <EditAlumno
          display={this.state.display}
          closeEdit={this.closeEdit}
          showSuccess={this.showSuccess}
          editCandidate={this.state.editCandidate}
        />
        <DataTable
          ref={(el) => (this.dt = el)}
          value={this.state.customers}
          header={header}
          responsive
          className="p-datatable-customers"
          dataKey="_id"
          rowHover
          globalFilter={this.state.globalFilter}
          selection={this.state.selectedCustomers}
          onSelectionChange={
            (e) => this.handleSelection(e)
            // console.log('seleccionado: ' + e.value)
          }
          paginator
          rows={10}
          emptyMessage="No se encontraron alumnos."
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
        >
          <Column selectionMode="single" style={{ width: "3em" }} />
          <Column
            field="fullName"
            header="Nombre"
            sortable
            filter
            filterPlaceholder="Buscar por Nombre"
          />
          <Column
            field="documentNumber"
            header="DNI"
            sortable
            filter
            filterPlaceholder="Buscar por DNI"
          />
          <Column
            sortField="titularNombre"
            filterField="titularNombre"
            header="Titular"
            body={this.representativeBodyTemplate}
            sortable
            filter
            filterElement={representativeFilter}
          />
          <Column
            field="idNumber"
            header="Legajo"
            sortable
            filter
            filterPlaceholder="Buscar por Legajo"
          />
          <Column
            body={this.actionBodyTemplate}
            headerStyle={{ width: "8em", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
          />
        </DataTable>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TableAlumno />, rootElement);
