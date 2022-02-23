import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React, { Component } from 'react';
import { addVisit, getCustomers, getService } from '../../services/Api';

export class AddVisitView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: null,
            service: null,
            selectedCustomerId: "",
            selectedServiceId: "",
            calculatedPrice: 0
        };

        this.handleAddVisitClick = this.handleAddVisitClick.bind(this);
        this.tryCalculatePrice = this.tryCalculatePrice.bind(this);
        this.handleCustomersDD = this.handleCustomersDD.bind(this);
        this.handleServiceDD = this.handleServiceDD.bind(this);


    }


    handleCustomersDD(option) {
        
        this.setState({ ...this.state, selectedCustomerId: option.value })

    }



    handleServiceDD(option) {
        this.setState({ ...this.state, selectedServiceId: option.value })
    }


    tryCalculatePrice() {
        if (this.state.selectedCustomerId !== "" && this.state.selectedServiceId !== "") {
            let service = this.state.service.find(s => s.id === this.state.selectedServiceId);
            let customer = this.state.customers.find(c => c.id === this.state.selectedCustomerId);

            let price = service.currentPrice - (service.currentPrice * customer.discountPercentage / 100)

            return price;
        }

        return -1;
    }

    async handleAddVisitClick() {
        const visit = {
            customerId: this.state.selectedCustomerId,
            serviceId: this.state.selectedServiceId,
            branchId: this.props.branchId
        }

        let visits = await addVisit(visit);
        this.props.clearViewSelection();
    }

    async componentDidMount() {

        let services = await getService();
        let customers = await getCustomers();


        this.setState({ ...this.state, customers: customers, service: services })
    }

    render() {
        if (this.state.customers === null && this.state.service === null) {
            return <div>Loading...</div>
        }


        const customerNames = this.state.customers.map(customer => { return { value: customer.id, label: `${customer.name} ${customer.lastname}` } });
        const serviceNames = this.state.service.map(service => { return { value: service.id, label: service.name } });

        console.log(customerNames, serviceNames)

        const calcultationResult = this.tryCalculatePrice();
        
        return <div>

            <div >

                <Dropdown options={customerNames} onChange={this.handleCustomersDD} placeholder="Select a customer" />
                <Dropdown options={serviceNames} onChange={this.handleServiceDD} placeholder="Select a service" />
                Price: <input type="text" value={calcultationResult === -1 ? " " : calcultationResult} disabled />

            </div>

            <button onClick={this.handleAddVisitClick}>Add Customer</button>
            <br />
            <button onClick={this.props.clearViewSelection}>Back</button>
        </div>
    }

}