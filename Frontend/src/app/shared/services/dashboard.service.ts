import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API } from '../../shared/constants/api/api.constant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpService) { }

  async registerParticipant(user) {
    const data = await this.http.post(API.REGISTER_PARTICIPANT, user);
    return data;
  }
}
