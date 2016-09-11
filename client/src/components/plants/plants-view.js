import React, { Component } from 'react';
import PlantsTable from './plants-table';
import QuerySelect from './query-select'
import * as store from '../../stores/plants-store'
import './plants-view.css';
import { Button } from 'react-bootstrap';


class PlantsView extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
    this.handleQueryClick = this.handleQueryClick.bind(this);
    this.state = {plants: [], selectValue: '', queryVal:''};
  }

  handleQuerySubmit(query, queryType) {
    console.log("Query:", query);
    console.log("queryType:", queryType);
    const { queryVal } = query;

    let queryFunc;

    switch(queryType) {
      case "symbol":
        queryFunc = store.getPlantsBySymbol;
        break;
      case "family":
        queryFunc = store.getPlantsByFamily;
        break;
      case "common":
        queryFunc = store.getPlantsByCommon;
        break;
      default:
        throw new Error("Query Type error");
    }

    queryFunc(queryVal).then((plants) => {
      this.setState({plants:plants});
    });

  }

  handleQueryChange(val) {
    this.setState({selectValue: val ? val.value : ""});
  }

  handleQueryTextChange(e) {
    this.setState({ queryVal: e.target.value });
  }

  handleQueryClick() {
    const {selectValue, queryVal} = this.state;
    this.handleQuerySubmit({queryVal: queryVal}, selectValue)
  }

  handleClick() {
    store.getPlants().then((plants) => {
      this.setState({plants: plants});
    });
  }

  render() {
    const { plants, selectValue, queryVal } = this.state;
    const queryOptions = [
        {value: 'common', label: 'Common'},
        {value: 'symbol', label: 'Symbol'},
        {value: 'family', label: 'Family'}
    ];
    return (
      <div className="PlantsView">
        <h2>Plants &nbsp;&nbsp;
          <Button
              bsStyle="primary"
              bsSize="small"
              onClick={this.handleClick}>
            Get some plants
          </Button>
        </h2>

        <QuerySelect queryOptions={queryOptions}
                     selectValue={selectValue}
                     handleQueryChange={this.handleQueryChange}
                     handleQueryTextChange={this.handleQueryTextChange}
                     queryVal={queryVal}
                     handleQueryClick={this.handleQueryClick} />
        <PlantsTable plants={plants} />
      </div>
    );
  }
}

export default PlantsView;
