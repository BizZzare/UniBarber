import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { getService } from '../../services/Api';

export class ServiceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: null
        };
    }

    async componentDidMount() {
        let service = await getService();
        this.setState({ ...this.state, service })
    }

    render() {
        if (this.state.service === null) {
            return <div>Loading...</div>
        }

        const columns = [
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'price', headerName: 'Price', width: 150 }
        ];

        const rows = this.state.service.map(service => {
            return {
                id: service.id,
                name: service.name,
                price: service.currentPrice
            }
        });

        return <div>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>

            <button onClick={() => this.handleAddUserClick()}>Add Customer</button>

            <br />
            <button onClick={() => this.props.clearViewSelection()}>Back</button>
        </div>
    }
}