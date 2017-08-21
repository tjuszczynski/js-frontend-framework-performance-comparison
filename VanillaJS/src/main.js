'use strict';

require('core-js');
import '../polyfills';
import 'bootstrap/dist/js/bootstrap.min';
import './main.css';
import {DataSet} from './dataset';

class Main {
    constructor() {
        this.dataSet = new DataSet();
        this.container = document.getElementById("container");
        this.selectedRow = undefined;
        this.rows = [];
        this.data = [];

        this.createRows = this.createRows.bind(this);
        this.changeRows = this.changeRows.bind(this);
        this.addRows = this.addRows.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById("main").addEventListener('click', e => {
            if (e.target.matches('#create-rows')) {
                this.createRows();
            }
            else if (e.target.matches('#change-rows')) {
                this.changeRows();
            }
            else if (e.target.matches('#add-rows')) {
                this.addRows();
            }
            else if (e.target.matches('#clear-rows')) {
                this.removeListOfItems();
            }
            else if (e.target.matches('#getDataHTTP')) {
                this.getDataHTTP();
            }
            else if (e.target.matches('.remove-rows')) {
                const id = this.getElementId(e.target);
                const itemID = this.data.findIndex(d => d.id === id);
                this.deleteItem(itemID);
            }
            else if (e.target.matches('.select-row')) {
                const id = this.getElementId(e.target);
                const itemID = this.data.findIndex(d => d.id === id);
                this.selectItem(itemID);
            }
        });
    }

    getElementId(elem) {
        while (elem) {
            if (elem.className === "col-md-11 test-data") {
                return elem.data_id;
            }
            elem = elem.parentNode;
        }
        return undefined;
    }

    createRows() {
        const t0 = performance.now();
        this.rows = [];
        this.data = [];
        const e = document.getElementById("create-rows-count");
        this.clearAllRows();
        this.dataSet.createRows(e.options[e.selectedIndex].value);
        this.appendNewRows();
        this.measureTime(t0);
    }

    addRows() {
        const t0 = performance.now();
        const e = document.getElementById("add-rows-count");
        this.dataSet.addRows(e.options[e.selectedIndex].value);
        this.appendNewRows();
        this.measureTime(t0);
    }

    changeRows() {
        const t0 = performance.now();
        this.dataSet.changeRows();
        for (let i = 0; i < this.data.length; i += 10) {
            this.rows[i].childNodes[0].innerHTML = `${i + 1} ${this.dataSet.data[i].label}<span class="glyphicon glyphicon-remove pull-right remove"></span>`;
        }
        this.measureTime(t0);
    }

    unselectItem() {
        if (this.selectedRow !== undefined) {
            this.selectedRow.className = "col-md-11 test-data";
            this.selectedRow = undefined;
        }
    }

    selectItem(itemID) {
        const t0 = performance.now();
        this.unselectItem();
        this.selectedRow = this.rows[itemID];
        this.selectedRow.className = "col-md-11 test-data selItem";
        this.measureTime(t0);
    }

    deleteItem(itemID) {
        const t0 = performance.now();
        this.dataSet.deleteItem(this.data[itemID].id);
        this.rows[itemID].remove();
        this.rows.splice(itemID, 1);
        this.data.splice(itemID, 1);
        this.measureTime(t0);
    }

    clearAllRows() {
        this.container.textContent = "";
    }

    removeListOfItems() {
        const t0 = performance.now();
        this.dataSet.removeListOfItems();
        this.rows = [];
        this.data = [];
        this.clearAllRows();
        this.measureTime(t0);
    }

    getDataHTTP() {
        this.get(performance.now());
    }

    get(t0) {
        const self = this;
        this.dataSet.getDataHTTP('data.txt').then(function (response) {
            document.getElementById("run-vanillajs").innerHTML = (performance.now() - t0).toFixed(2) + " ms";
            self.appendNewRows(JSON.parse(response));
        }, function (error) {
            console.error("Failed!", error);
        });
    }

    appendNewRows(dataSet = this.dataSet.data) {
        const rows = this.rows;
        const data = this.data;
        const container = this.container;

        for (let i = rows.length; i < dataSet.length; i++) {
            const div = this.newRow(dataSet[i]);
            rows[i] = div;
            data[i] = dataSet[i];
            container.appendChild(div);
        }
    }

    newRow(data) {
        const div1 = document.createElement("div");
        div1.data_id = data.id;
        div1.className = "col-md-11 test-data";
        const div2 = document.createElement("div");
        div2.className = "select-row";
        div2.innerText = `${data.id} ${data.label}`;
        const span = document.createElement("span");
        span.className = "glyphicon glyphicon-remove pull-right remove-rows";
        div2.appendChild(span);
        div1.appendChild(div2);

        return div1;
    }

    measureTime(start) {
        document.getElementById("run-vanillajs").innerHTML = (performance.now() - start).toFixed(2) + " ms";
    }
}

new Main();