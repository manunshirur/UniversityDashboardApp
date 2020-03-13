import { Component, OnInit } from '@angular/core';
import { GetStudentsNotEatenService } from 'src/app/services/get-students-not-eaten.service';
import { IStudent } from 'src/app/interfaces/IStudent';

@Component({
  selector: 'app-student-mainbar',
  templateUrl: './student-mainbar.component.html',
  styleUrls: ['./student-mainbar.component.css']
})
export class StudentMainbarComponent implements OnInit {

  constructor(private getStudentsNotEatenService: GetStudentsNotEatenService) { }

  public students:IStudent[];
  public displayTable: boolean = false;

  ngOnInit(): void {
  }

  getStudentsWhoHaveNotEaten() {
    this.getStudentsNotEatenService.getStudents()
    .subscribe((students: IStudent[]) => {
      this.students = students;
      this.displayTable = true;
    });
  }

}
