import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/IStudent';
import { Student } from '../interfaces/Student';

@Injectable({
  providedIn: 'root'
})
export class GetStudentsNotEatenService {

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get("http://localhost:8080/students")
  }
  
}
