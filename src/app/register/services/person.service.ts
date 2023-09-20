import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private API = "";

  constructor(private http: HttpClient) { }

  public putPerson(person: any): Observable<any> {
    return this.http.put('/register', person);
  }
}
