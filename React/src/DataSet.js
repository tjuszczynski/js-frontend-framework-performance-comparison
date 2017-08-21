
export class DataSet {
    constructor() {
        this.data = [];
        this.uniqueID = 1;
        this.selected = null;
    }

    createRows(count) {
        this.data = this.createTestData(count);
    }

    addRows(count) {
        this.data = this.data.concat(this.createTestData(count));
    }

    deleteItem(id) {
        const itemID = this.data.findIndex(x => x.id === id);
        this.data = this.data.filter((e, i) => i !== itemID);
    }

    changeRows() {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i] = Object.assign({}, this.data[i], {label: this.data[i].label.toUpperCase()});
        }
    }

    selectItem(id) {
        this.selected = id;
    }

    removeListOfItems() {
        this.data = [];
    }

    createTestData(count) {
        count = count || 1000;
        const adjectives = ["active", "ambitious", "careful", "decisive", "easy-going", "generous", "polite", "responsible", "sensitive", "selfish",
            "clever", "secretive", "talkative", "honest", "intelligent", "faithful", "forgetful"];
        const names = ["Marek", "Tomek", "Emil", "Zuza", "Monika", "Ula", "Ola", "Ala", "Piotr", "Kasia", "Kuba", "Anita", "Arek"];

        const testData = [];
        for (let i = 0; i < count; i++)
            testData.push({
                id: this.uniqueID++,
                label: `${names[this.randomElement(names.length)]} is ${adjectives[this.randomElement(adjectives.length)]}.`
            });
        return testData;
    }

    randomElement(max) {
        return Math.round(Math.random() * 1000) % max;
    }
}