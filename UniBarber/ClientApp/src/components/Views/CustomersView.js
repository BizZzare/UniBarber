import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getCustomers } from '../../services/Api';

export class CustomersView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: null, addingUserView: false,
            nameValue: "",
            lastnameValue: "",
            phoneValue: "",
            sexValue: 0
        };

        this.handleAddUserClick = this.handleAddUserClick.bind(this);
        this.handleSubmitAdding = this.handleSubmitAdding.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
    }

    handleAddUserClick() {
        this.setState({ ...this.state, addingUserView: true });
    }
    handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
    }

    handleNameChange(event) {
        this.setState({ ...this.state, nameValue: event.target.value });
    }

    handleLastnameChange(event) {
        this.setState({ ...this.state, lastnameValue: event.target.value });
    }

    handlePhoneChange(event) {
        this.setState({ ...this.state, phoneValue: event.target.value });
    }

    handleSexChange(event) {
        this.setState({ ...this.state, sexValue: event.target.value });
    }

    async componentDidMount() {
        if (!this.state.customers) {
            let customers = await getCustomers();
            this.setState({ ...this.state, customers: customers })
        }
    }


    render() {
        if (this.state.customers === null) {
            return <div>Loading...</div>
        }

        if (this.state.addingUserView) {
            return <div>
                <div>
                    Name
                    <input type="text" />
                </div>
                <div>
                    Lastname
                    <input type="text" />
                </div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.nameValue} onChange={this.handleNameChange} />
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
        }

        const columns = [
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'phone', headerName: 'Phone', width: 150 },
            { field: 'sex', headerName: 'Sex', width: 150 },
            { field: 'discount', headerName: 'Discount', width: 150 },
        ];

        const rows = this.state.customers.map(customer => {
            return {
                id: customer.id,
                name: `${customer.name} ${customer.lastname}`,
                phone: customer.phone,
                sex: customer.sex === 0 ? "Male" : "Female",
                discount: customer.discountPercentage
            }
        });

        return <div>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>

            <button onClick={ }>Add Customer</button>

            <br />
            <button onClick={() => this.props.clearViewSelection()}>back</button>
        </div>
    }
}