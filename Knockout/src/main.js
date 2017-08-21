import '../polyfills';
import 'bootstrap/dist/js/bootstrap.min';
import './main.css';

const ko = require('knockout');

function AppViewModel() {
    const self = this;
    self.data = ko.observableArray(null);

    self.createRows = function () {
        const t0 = performance.now();
        const e = document.getElementById("element-to-create-count");
        const count = e.options[e.selectedIndex].value;
        let data = _createTestData(count);
        data = addItemsToObservable(data);
        self.data(data);

        measureTime(t0);
    }

    self.deleteItem = function (item) {
        const t0 = performance.now();
        let data = self.data();
        const id = data.findIndex(d => d.id === item.id);
        self.data.splice(id, 1);

        measureTime(t0);
    }


    self.changeRows = function () {
        const t0 = performance.now();
        let data = self.data();

        for (let i = 0; i < data.length; i += 10) {
            data[i].label(data[i].label().toUpperCase());
        }
        measureTime(t0);
    }
    self.addRows = function () {
        const t0 = performance.now();
        const e = document.getElementById("element-to-add-count");
        const count = e.options[e.selectedIndex].value;
        let data = _createTestData(count);
        data = addItemsToObservable(data);
        ko.utils.arrayPushAll(self.data, data);

        measureTime(t0);
    }

    self.selected = ko.observable(null);
    self.selectItemInList = function (item) {
        const t0 = performance.now();
        self.selected(item.id);

        measureTime(t0);
    }

    self.removeListOfItems = function () {
        const t0 = performance.now();
        self.data.removeAll();

        measureTime(t0);
    }

    self.getDataHTTP = function () {
        self.get(performance.now());

    }

    self.get = function (t0) {
        const data = self.data;

        $.getJSON("data.txt", function (src) {
            document.getElementById("knockout-result").innerHTML = (performance.now() - t0).toFixed(2) + " ms";
            data(addItemsToObservable(src));
        })
    }

    const _randomElement = function(arrayLenght) {
        return Math.round(Math.random() * 2222) % arrayLenght;
    }

    const _createTestData = function(count) {
        count = count || 1000;
        const adjectives = ["active", "ambitious", "careful", "decisive", "easy-going", "generous", "polite",
            "responsible", "sensitive", "selfish", "clever", "secretive", "talkative", "honest", "intelligent",
            "faithful", "forgetful"];
        const names = ["Marek", "Tomek", "Emil", "Zuza", "Monika", "Ula", "Ola", "Ala", "Piotr", "Kasia", "Kuba",
            "Anita", "Arek"];

        const testData = [];
        for (let i = 0; i < count; i++)
            testData.push({
                id: i + 1,
                label: `${names[_randomElement(names.length)]} is ${adjectives[_randomElement(adjectives.length)]}.`
            });
        return testData;
    }

    const measureTime = function (start) {
        document.getElementById("knockout-result").innerHTML = (performance.now() - start).toFixed(2) + " ms";
    }

    //Basically I have an observableArray and the values for each item are not an observable. This means when I change
    // an item value the UI within a foreach loop of the observableArray does not update accordingly.
    const addItemsToObservable = function (data) {
        for (let i = 0; i < data.length; i++) {
            data[i].label = ko.observable(data[i].label);
        }
        return data;
    }
}

ko.bindingHandlers.prependText = {
    update: function (element, valueAccessor) {
        const value = ko.utils.unwrapObservable(valueAccessor());
        //replace the first child
        element.replaceChild(document.createTextNode(value), element.firstChild);
    }
};

ko.applyBindings(new AppViewModel());

ko.observableArray.fn.reset = function (values) {
    const array = self();
    self.valueWillMutate();
    ko.utils.arrayPushAll(array, values);
    self.valueHasMutated();
};


