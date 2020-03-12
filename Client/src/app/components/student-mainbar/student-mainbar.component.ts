import { Component, OnInit } from '@angular/core';
import { GetStudentsNotEatenService } from 'src/app/services/get-students-not-eaten.service';

@Component({
  selector: 'app-student-mainbar',
  templateUrl: './student-mainbar.component.html',
  styleUrls: ['./student-mainbar.component.css']
})
export class StudentMainbarComponent implements OnInit {

  constructor(private getStudentsNotEatenService: GetStudentsNotEatenService) { }

  public students:any = [];
  public displayTable: boolean = false;

  ngOnInit(): void {
  }

  getStudentsWhoHaveNotEaten() {
    this.getStudentsNotEatenService.getStudents().subscribe((data) => {
      this.students = data;
      this.displayTable = true;
      console.log(this.students);
    });
  }

}
