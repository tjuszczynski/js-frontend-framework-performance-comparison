import {Component, AfterViewChecked} from '@angular/core';
import {HttpService} from './http.service';
import {Item} from './item.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  data = [];
  selected = undefined;
  selectedCountCreate = 1000;
  selectedCountAdd = 100;
  countCreate = [100, 1000, 10000, 5000, 20000, 50000];
  countAdd = [100, 1000, 10000];
  t0 = undefined;
  id = 1;

  constructor(private httpService: HttpService) {}

  createRows() {
    this.t0 = performance.now();
    this.data = this.createTestData(this.selectedCountCreate);
  }

  addRows() {
    this.t0 = performance.now();
    this.data = this.data.concat(this.createTestData(this.selectedCountAdd));
  }

  changeRows() {
    this.t0 = performance.now();
    for (let i = 0; i < this.data.length; i += 10) {
      this.data[i].label = this.data[i].label.toUpperCase();
    }
  }

  selectItem(item: Item) {
    this.t0 = performance.now();
    this.selected = item.id;
  }

  deleteItem(item: Item) {
    this.t0 = performance.now();
    const itemID = this.data.findIndex(d => d.id == item.id);
    this.data = this.data.filter((e, i) => i != itemID);
  }

  removeListOfItems() {
    this.t0 = performance.now();
    this.data = [];
  }

  getDataHTTP() {
    this.get(performance.now());
  }

  get(t0) {
    this.httpService.getDataHTTP()
      .subscribe(
        (data: any[]) => {
          document.getElementById('run-angular').innerHTML = (performance.now() - t0).toFixed(2) + ' ms';
          this.data = data;
        },
        (error) => console.log(error)
      );
  }

  createTestData(count): Array<Item> {
    count = count || 1000;
    const adjectives = ['active', 'ambitious', 'careful', 'decisive', 'easy-going', 'generous', 'polite', 'responsible',
      'sensitive', 'selfish', 'clever', 'secretive', 'talkative', 'honest', 'intelligent', 'faithful', 'forgetful'];
    const names = ['Marek', 'Tomek', 'Emil', 'Zuza', 'Monika', 'Ula', 'Ola', 'Ala', 'Piotr', 'Kasia', 'Kuba', 'Anita',
      'Arek'];
    const testData: Array<Item> = [];

    for (let i = 0; i < count; i++) {
      testData.push({
        id: i + 1,
        label: `${names[this.randomElement(names.length)]} is ${adjectives[this.randomElement(adjectives.length)]}.`
      });
    }

    return testData;
  }

  randomElement(max) {
    return Math.round(Math.random() * 1000) % max;
  }

  measureTime() {
    if (typeof this.t0 !== 'undefined') {
      document.getElementById('run-angular').innerHTML = (performance.now() - this.t0).toFixed(2) + ' ms';
      this.t0 = undefined;
    }
  }

  ngAfterViewChecked() {
    this.measureTime();
  }
}
