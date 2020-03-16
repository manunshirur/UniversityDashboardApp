import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GetStudentsNotEatenService } from 'src/app/services/get-students-not-eaten.service';
import { IStudent } from 'src/app/interfaces/IStudent';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

let STUDENTSNOTEATENDATA: IStudent[];

@Component({
  selector: 'app-student-mainbar',
  templateUrl: './student-mainbar.component.html',
  styleUrls: ['./student-mainbar.component.css']
})
export class StudentMainbarComponent implements AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['student_id', 'first_name', 'last_name', 'missed_count', 'major'];
  public studentsWhoHaveNotEatenDataSource = new MatTableDataSource(STUDENTSNOTEATENDATA);

  constructor(private getStudentsNotEatenService: GetStudentsNotEatenService) { }

  public displayTable: boolean = false;

  ngAfterViewInit(): void {
    this.studentsWhoHaveNotEatenDataSource.sort = this.sort;
    this.studentsWhoHaveNotEatenDataSource.paginator = this.paginator;
  }

  applyFilter(value: String) {
    this.studentsWhoHaveNotEatenDataSource.filter = value.trim().toLowerCase();
  }

  getStudentsWhoHaveNotEaten() {
    this.getStudentsNotEatenService.getStudents()
    .subscribe((students: IStudent[]) => {
      this.studentsWhoHaveNotEatenDataSource.data = students;
      this.displayTable = true;
    });
  }

}
