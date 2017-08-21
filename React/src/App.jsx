import './polyfills';
import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import data from './data.txt';

const {DataSet} = require('./DataSet');
const {Element} = require('./Element');

class App extends Component {
    constructor(props) {
        super(props);
        this.selectedCountCreate = 100;
        this.selectedCountAdd = 100;
        this.t0 = undefined;
        this.state = {dataset: new DataSet()};

        this.addRows = this.addRows.bind(this);
        this.createRows = this.createRows.bind(this);
        this.changeRows = this.changeRows.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.removeListOfItems = this.removeListOfItems.bind(this);
        this.getDataHTTP = this.getDataHTTP.bind(this);
        this.onChangeCreate = this.onChangeCreate.bind(this);
        this.onChangeAdd = this.onChangeAdd.bind(this);
    }

    componentDidUpdate() {
        this.measureTime(this.t0);
    }

    componentDidMount() {}

    getDataHTTP() {
        this.get(performance.now());
    }

    get(t0) {
        const self = this;
        axios.get(data)
            .then(function (response) {
                document.getElementById("run-reactjs").innerHTML = (performance.now() - t0).toFixed(2) + " ms";
                self.state.dataset.data = response.data;
                self.setState({dataset: self.state.dataset});
        }).catch(function (error) {
                console.log(error);
        });
    }

    createRows() {
        this.t0 = performance.now();
        this.state.dataset.createRows(this.selectedCountCreate);
        this.setState({dataset: this.state.dataset});
    }

    addRows() {
        this.t0 = performance.now();
        this.state.dataset.addRows(this.selectedCountAdd);
        this.setState({dataset: this.state.dataset});
    }

    changeRows() {
        this.t0 = performance.now();
        this.state.dataset.changeRows();
        this.setState({dataset: this.state.dataset});
    }

    selectItem(id) {
        this.t0 = performance.now();
        this.state.dataset.selectItem(id);
        this.setState({dataset: this.state.dataset});
    }

    deleteItem(id) {
        this.t0 = performance.now();
        this.state.dataset.deleteItem(id);
        this.setState({dataset: this.state.dataset});
    }

    removeListOfItems() {
        this.t0 = performance.now();
        this.state.dataset.removeListOfItems();
        this.setState({dataset: this.state.dataset});
    }

    onChangeCreate(event) {
        const index = event.nativeEvent.target.selectedIndex;
        this.selectedCountCreate = event.nativeEvent.target[index].text;
    }

    onChangeAdd(event) {
        const index = event.nativeEvent.target.selectedIndex;
        this.selectedCountAdd = event.nativeEvent.target[index].text;
    }

    measureTime(start) {
        if (typeof this.t0 !== 'undefined') {
            document.getElementById("run-reactjs").innerHTML = (performance.now() - start).toFixed(2) + " ms";
            this.t0 = undefined;
        }
    }

    render() {
        let elements = this.state.dataset.data.map((x, i) => {
                return <Element key={x.id} data={x} onSelect={this.selectItem} onDelete={this.deleteItem}
        style={x.id === this.state.dataset.selected ? 'col-md-11 test-data selItem ' : 'col-md-11 test-data'}></Element>
    });

        return (<div className="container">
            <div className="row">
            <div className="col-md-11 top-panel jumbotron">
            <h1>ReactJS v15.6.1</h1>
        <div className="test-result">
            <div className="score">Wynik wynosi: </div>
        <div className="score" id="run-reactjs"></div>
            </div>
            <div className="pull-right">
            <div className="form-group elements-count">
            <select id="element-to-create-count" className="form-control"
        onChange={this.onChangeCreate}>
                <option value="100">100</option>
                <option value="1000">1000</option>
                <option value="10000">10000</option>
                <option value="5000">5000</option>
                <option value="20000">20000</option>
                <option value="50000">50000</option>
            </select>
            </div>
            <button className="btn btn-primary" id="run" onClick={this.createRows}>Utwórz elementy</button>
        <button className="btn btn-primary" id="update" onClick={this.changeRows}>Zmień co 10-ty element
        </button>
        <div className="form-group elements-count">
            <select id="element-to-add-count" className="form-control"
        onChange={this.onChangeAdd}>
    <option value="100">100</option>
    <option value="1000">1000</option>
    <option value="10000">10000</option>
            </select>
            </div>
            <button className="btn btn-primary" id="add" onClick={this.addRows}>Dodaj elementy</button>
        <button className="btn btn-primary" id="getTestData" onClick={this.getDataHTTP}>GET
        </button>
        <button className="btn btn-primary" id="clear" onClick={this.removeListOfItems}>Wyczyść listę</button>
        </div>
        </div>
        <div className="col-md-12">
            {elements}
            </div>
            </div>
            </div>
    );
    }
}

export default App;
