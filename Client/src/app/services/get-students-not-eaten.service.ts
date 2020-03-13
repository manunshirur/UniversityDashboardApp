import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/IStudent';

@Injectable({
  providedIn: 'root'
})
export class GetStudentsNotEatenService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<IStudent[]>{
    return this.http.get<IStudent[]>("http://localhost:8080/students");
  }
  
}
