import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API } from '../../shared/constants/api/api.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpService) { }

  async registerUser(user: any) {
    const data = await this.http.post(API.REGISTER, user);
    return data;
  }

  async login(userDetails) {
    const data = await this.http.post(API.LOGIN, userDetails);
    return data;
  }
  
}
