import { Button } from 'bootstrap';
import React, { Component } from 'react';
import { getBranches } from '../services/Api';
import { MainView } from './MainView';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      selectedBranch: null,
      branches: null
    };

  }


  async componentDidMount() {
    var branches = await getBranches();
    this.setState({ ...this.state, branches: branches })
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
      return (<MainView />)
    }
    return (
      <div>
        Loading...
      </div>
    );
  }
}
