import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { getStatistics } from '../../services/Api';

export class StatisticsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statistics: null
        };
    }

    async componentDidMount() {
        let statistics = await getStatistics(this.props.branchId);
        this.setState({ ...this.state, statistics })
    }

    render() {
        if (this.state.statistics === null) {
            return <div>Loading...</div>
        }

        const columns = [
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'phone', headerName: 'Phone', width: 150 },
            { field: 'sex', headerName: 'Sex', width: 150 },
            { field: 'service', headerName: 'Last Service', width: 150 },
            { field: 'Sum', headerName: 'Spent Sum', width: 150 },
            { field: 'discount', headerName: 'Discount, %', width: 150 },
            { field: 'visits', headerName: 'Visits Count', width: 150 },
        ];

        const rows = this.state.statistics.map((statisticsInfo, index) => {
            return {
                id: index,
                name: statisticsInfo.name,
                phone: statisticsInfo.phone,
                sex: statisticsInfo.sex === 0 ? "Male" : "Female",
                service: statisticsInfo.Service,
                sum: statisticsInfo.sum,
                discount: statisticsInfo.discountPercentage,
                visits: statisticsInfo.visitsCount
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