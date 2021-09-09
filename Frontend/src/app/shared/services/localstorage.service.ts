// import { IndexedDbService } from './indexdb.service';
import { Injectable, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements OnInit {
  returnData: any;
  constructor() { }

  ngOnInit() { }

  public storeData(key, value): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key): any {
    this.returnData = JSON.parse(localStorage.getItem(key));
    return this.returnData;
  }

  public removeData(key): void {
    localStorage.removeItem(key);
  }

  public clearStorage(): void {
    localStorage.clear();
    // this.indexedDbService.clearDB();
  }

  // TODO create method for store User

  // public getUser(): any {
  //   const localStorageUser = this.getData('token');
  //   if (!_.isNull(localStorageUser)) {
  //     const user = JSON.parse(localStorageUser);
  //     return user;
  //   }
  //   return null;
  // }

  // public getToken(): any {
  //   const token = this.getData('token');
  //   if (!_.isNull(token)) {
  //     return token;
  //   }
  //   return null;
  // }
}
