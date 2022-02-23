import { Button } from 'bootstrap';
import React, { Component } from 'react';
import { getBranches } from '../services/Api';
import { MainView } from './MainView';

export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBranch: null,
      branches: null
    };

    this.clearBranchSelection = this.clearBranchSelection.bind(this);
  }

  clearBranchSelection() {
    this.setState({ ...this.state, selectedBranch: null });
  }

  async componentDidMount() {
    if (!this.state.branches) {
      let branches = await getBranches();
      this.setState({ ...this.state, branches: branches })
    }
  }

  render() {
    let branches = this.state.branches;

    if (branches) {
      if (!this.state.selectedBranch) {
        return (
          <div>
            {branches.map(branch => {
              return <button onClick={() =>
                this.setState({ ...this.state, selectedBranch: branch.id })
              }>{branch.name}</button>
            })}
          </div>
        )
      }
      return (<MainView branchId={this.state.selectedBranch} clearBranchSelection={this.clearBranchSelection} />)
    }
    return (
      <div>
        Loading...
      </div>
    );
  }
}
