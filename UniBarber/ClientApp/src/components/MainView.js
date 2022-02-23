import React, { Component } from 'react';

export class MainView extends Component {
    render(){
        return <div>
            <button>Customers</button>
            <button>Service</button>
            <button>Add a visit</button>
            <button>Statistics</button>
        </div>
    }
}