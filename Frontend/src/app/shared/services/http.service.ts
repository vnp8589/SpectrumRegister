import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
constructor(private httpClient: HttpClient) { }

post(url, body, options?): Observable<any> {
    return this.httpClient.post(url, body, { headers: options });
}

get(url, options?): Observable<any> {
    return this.httpClient.get(url, { headers: options });
}

put(url, body, options?): Observable<any> {
    return this.httpClient.put(url, body, { headers: options });
}
delete(url, options?): Observable<any> {
    return this.httpClient.delete(url, { headers: options });
}

}
