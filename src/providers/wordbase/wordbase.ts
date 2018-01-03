import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class WordbaseProvider {
  User: any;
  ServerURL = 'http://www.davenstudio.com';
  ServerPort = 4000;

  constructor(
    public http: HttpClient
  ) {}

  getWords() {
    return this.get('get', new HttpParams().set('_id', this.User._id));
  }

  insertWord(data) {
    data._userId = this.User._id;
    return this.post('insert', data);
  }

  deleteWord(data) {
    return this.post('delete', data);
  }

  favWord(data) {
    return this.post('fav', data);
  }

  editWord(id, what, data) {
    return this.post('edit', {
      id: id,
      update: {
        [what]: data
      }
    });
  }
  
  spliceData(id, dataId) {
    return this.post('spliceData', {
      id: id,
      splice: dataId
    });
  }

  addData(id, data) {
    return this.post('addData', {
      id: id,
      data: data
    })
  }

  login(logInfos) {
    return this.post('login', logInfos);
  }

  register(registerInfos) {
    return this.post('register', registerInfos);
  }

  disconnect(callback) {
    this.User = {};
    return callback();
  }

  get(url, params = null) {
    return this.http.get(this.getFullUrl(url), {responseType: 'json', params: params});
  }

  post(url, data) {
    return this.http.post(this.getFullUrl(url), data, {responseType: 'text'});
  }

  getFullUrl(url = '') {
    return this.ServerURL + ':' + this.ServerPort + '/' + url;
  }
}
