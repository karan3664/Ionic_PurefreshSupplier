import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token: any;
  data: any;

  constructor(private http: HttpClient,
    private storageService: StorageService) {
   


  }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = { headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;


    return this.http.post(url, data, options);
  }

  get(serviceName: string) {
    const toke =localStorage.getItem('token');
    console.log('Karan => ' + toke);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + toke
    });


    const options = { headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;

    return this.http.get(url, { headers: headers });
  }

  postData(serviceName: string, data: any) {
    const toke =localStorage.getItem('token');
    console.log('Karan => ' + toke);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + toke
    });

    const options = { headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, data, options);
  }

}
