import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormData }    from './form-data';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }
  
  private postUrl = '/api/fetch';

  postData (formData : FormData): Observable<FormData> {
    return this.http.post<FormData>(this.postUrl, formData, httpOptions);
  }

}
