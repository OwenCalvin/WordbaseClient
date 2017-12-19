import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordbaseProvider {
  UserID: string;
  ServerURL = 'http://localhost/';

  constructor(private http: HttpClient) {
  }

  getWords() {
    return this.get('get');
  }

  insertWord(data) {
    return this.post('insert', data);
  }

  deleteWord(data) {
    return this.post('delete', data);
  }

  login(log, password) {

  }

  removeFromArray(array: any[], index) {
    array.splice(index, 1);
  }

  get(url) {
    return this.http.get(this.ServerURL + url, {responseType: 'json'});
  }

  post(url, data, callback = null) {
    return this.http.post(this.ServerURL + url, data, {responseType: 'text'});
  }
}
