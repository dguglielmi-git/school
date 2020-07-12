import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import ApiController from "../service/ApiController";
import { CustomerService } from "../service/CustomerService";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./TableAlumno.css";

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
    };

    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "XuXue Feng", image: "xuxuefeng.png" },
    ];

    this.customerService = new CustomerService();

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
  }

  loadAlumnos(datos) {
    this.setState((state) => ({
      ...this.state,
      customers: datos,
    }));
  }

  componentDidMount() {
    ApiController.getAlumnos(this.loadAlumnos);
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

  actionBodyTemplate() {
    return (
      <Button
        type="button"
        icon="pi pi-cog"
        className="p-button-secondary"
      ></Button>
    );
  }

  representativeBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {rowData.titularData[0].fullName}
        </span>
      </React.Fragment>
    );
  }

  renderRepresentativeFilter() {
    return (
      <MultiSelect
        className="p-column-filter"
        value={this.state.selectedRepresentatives}
        options={this.representatives}
        onChange={this.onRepresentativeFilterChange}
        itemTemplate={this.representativeItemTemplate}
        placeholder="All"
        optionLabel="name"
        optionValue="name"
      />
    );
  }

  representativeItemTemplate(option) {
    return (
      <div className="p-multiselect-representative-option">
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {option.fullName}
        </span>
      </div>
    );
  }

  onRepresentativeFilterChange(event) {
    this.dt.filter(event.value, "representative.name", "in");
    this.setState({ selectedRepresentatives: event.value });
  }

  render() {
    const header = this.renderHeader();
    const representativeFilter = this.renderRepresentativeFilter();

    return (
      <div className="datatable-doc-demo">
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
          onSelectionChange={(e) =>
            this.setState({ selectedCustomers: e.value })
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
            sortField="fullName"
            filterField="fullName"
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
        </DataTable>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TableAlumno />, rootElement);
