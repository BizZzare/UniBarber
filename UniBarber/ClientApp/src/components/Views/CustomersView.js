import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { addCustomer, getCustomers } from '../../services/Api';

export class CustomersView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: null,
            addingUserView: false,
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
    async handleSubmitAdding(event) {
        let customer = {
            name: this.state.nameValue,
            lastname: this.state.lastnameValue,
            phone: this.state.phoneValue,
            sex: parseInt(this.state.sexValue)
        }

        event.preventDefault();


        let customers = await addCustomer(customer);



        this.setState({
            ...this.state,
            addingUserView: false,
            customers: customers,
            nameValue: "",
            lastnameValue: "",
            phoneValue: "",
            sexValue: 0
        });

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
            let customers = await getCustomers();
            this.setState({ ...this.state, customers: customers })
    }


    render() {
        if (this.state.customers === null) {
            return <div>Loading...</div>
        }

        if (this.state.addingUserView) {
            return <div>
                <form onSubmit={this.handleSubmitAdding}>
                    <label>
                        Name:
                        <input type="text" value={this.state.nameValue} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Lastname:
                        <input type="text" value={this.state.lastnameValue} onChange={this.handleLastnameChange} />
                    </label>
                    <label>
                        Phone:
                        <input type="text" value={this.state.phoneValue} onChange={this.handlePhoneChange} />
                    </label>
                    <label>
                        Sex:
                        <div onChange={this.handleSexChange}>
                            <input type="radio" value="0" name="sex" /> Male
                            <input type="radio" value="1" name="sex" /> Female
                        </div>
                    </label>
                    <input type="submit" value="Add" />
                </form>

                <button onClick={() => this.setState({ ...this.state, addingUserView: false })}>Cancel</button>

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

            <button onClick={() => this.handleAddUserClick()}>Add Customer</button>

            <br />
            <button onClick={() => this.props.clearViewSelection()}>back</button>
        </div>
    }
}