import React, { Component } from 'react';
import { AddVisitView } from './Views/AddVisitView';
import { CustomersView } from './Views/CustomersView';
import { ServiceView } from './Views/ServiceView';
import { StatisticsView } from './Views/StatisticsView';

export class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedView: "" };

        this.handleCustomersClick = this.handleCustomersClick.bind(this);
        this.handleServiceClick = this.handleServiceClick.bind(this);
        this.handleVisitClick = this.handleVisitClick.bind(this);
        this.handleStatisticsClick = this.handleStatisticsClick.bind(this);
        this.clearViewSelection = this.clearViewSelection.bind(this);
    }

    handleCustomersClick() {
        this.setState({ ...this.state, selectedView: "customers" });
    }

    handleServiceClick() {
        this.setState({ ...this.state, selectedView: "service" });
    }

    handleVisitClick() {
        this.setState({ ...this.state, selectedView: "visit" });
    }

    handleStatisticsClick() {
        this.setState({ ...this.state, selectedView: "statistics" });
    }

    clearViewSelection() {
        this.setState({ ...this.state, selectedView: "" });
    }


    render() {
        if (this.state.selectedView !== "") {
            switch (this.state.selectedView) {
                case "customers":
                    return <CustomersView clearViewSelection={this.clearViewSelection} />;
                case "service":
                    return <ServiceView clearViewSelection={this.clearViewSelection} />;
                case "visit":
                    return <AddVisitView clearViewSelection={this.clearViewSelection} />;
                case "statistics":
                    return <StatisticsView clearViewSelection={this.clearViewSelection} />;
            }
        }

        return <div>
            <button onClick={() => this.handleCustomersClick()}>Customers</button>
            <button onClick={() => this.handleServiceClick()}>Service</button>
            <button onClick={() => this.handleVisitClick()}>Add a visit</button>
            <button onClick={() => this.handleStatisticsClick()}>Statistics</button>

            <br/>
            <button onClick={() => this.props.clearBranchSelection()}>Back</button>
        </div>
    }
}