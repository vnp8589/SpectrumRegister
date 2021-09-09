import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API } from '../../shared/constants/api/api.constant';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DropDownDataService {


  constructor(private http: HttpService) { }
  

  async getFoodType(): Promise<Observable<any>> {

    const { FOODTYPE } = API;
    const data = await this.http.get(FOODTYPE);
    return data;

  }

  async getColleges(): Promise<Observable<any>> {

    const { COLLEGE } = API;
    const data = await this.http.get(COLLEGE);
    return data;
    
  }

  
}
