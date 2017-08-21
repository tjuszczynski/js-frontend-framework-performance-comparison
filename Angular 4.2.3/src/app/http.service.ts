import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {
  constructor(private http: Http) { }

  getDataHTTP() {
    return this.http.get('data.txt')
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }
}
