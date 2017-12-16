import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordbaseProvider {
  userID: string;
  serverURL = 'http://localhost/';

  constructor(private http: HttpClient) {
  }

  getWords() {
    return this.get('get');
  }

  login(log, password) {

  }

  get(url) {
    return this.http.get(this.serverURL + url, {responseType: 'json'});
  }
}
