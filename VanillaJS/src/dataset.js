export class DataSet {
    constructor() {
        this.data = [];
    }

    createRows(count) {
        this.data = this.createTestData(count);
    }

    addRows(count) {
        this.data = this.data.concat(this.createTestData(count));
    }

    deleteItem(id) {
        const itemID = this.data.findIndex(d => d.id == id);
        this.data = this.data.filter((e, i) => i != itemID);
    }

    changeRows() {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label = this.data[i].label.toUpperCase();
        }
    }

    removeListOfItems() {
        this.data = [];
    }

    getDataHTTP(url) {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = function () {
                if (req.status == 200) {
                    resolve(req.response);
                }
                else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function () {
                reject(Error("Network Error"));
            };

            req.send();
        });
    }

    createTestData(count) {
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
                label: `${names[this.randomElement(names.length)]} is ${adjectives[this.randomElement(adjectives.length)]}.`
            });
        return testData;
    }

    randomElement(max) {
        return Math.round(Math.random() * 1000) % max;
    }
}