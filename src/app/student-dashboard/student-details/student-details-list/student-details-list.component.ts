import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetsetService } from '././../../../Services/getset.service';

@Component({
  selector: 'app-student-details-list',
  templateUrl: './student-details-list.component.html',
  styleUrls: ['./student-details-list.component.css']
})
export class StudentDetailsListComponent implements OnInit {

  @Input() studentData: any = null;
  @Input()
  studentForm!: FormGroup;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleEvent = new EventEmitter<boolean>();

  @Input() isEdit = false;
  @Output() sendData = new EventEmitter();
  @Output() isEditDone = new EventEmitter();
  studentList: any[] = [];
  
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'dob',
    'mobile',
    'city',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private helperService: GetsetService) {}

  ngOnInit(): void {
    if (localStorage.getItem('data') !== null) {
      this.studentList = this.helperService.getData() as Array<any>;
      this.dataSource = new MatTableDataSource(this.studentList);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    if (this.studentData !== null) {
      if (localStorage.getItem('data') != null) {
        this.studentList = this.helperService.getData() as Array<any>;
        const index = this.studentList.findIndex(
          (student) => student.Id === this.studentData?.Id
        );

        if (index !== -1) {
          this.studentList.splice(index, 1, this.studentData);
        } else {
          this.studentList.push(this.studentData);
        }
      } else {
        this.studentList.push(this.studentData);
      }
      this.helperService.setData(this.studentList);
      this.dataSource = new MatTableDataSource(this.studentList);
      this.dataSource.paginator = this.paginator;
    }
  }

  public updateStudent(studentData: any): void {
    
    this.toggleEvent.emit(true);
    this.sendData.emit(studentData);
  }

  public deleteStudent(studentData: any): void {
    
    if (this.studentList.length === 1) {
      this.studentList = [];
      localStorage.clear();
      this.dataSource = new MatTableDataSource(this.studentList);
      this.dataSource.paginator = this.paginator;
      this.studentForm.reset();
      return;
    } else {
      let index = this.studentList.findIndex( el => el.Id === studentData.Id )

      this.studentList.splice(index, 1);
      this.studentForm.reset();
    }
    this.helperService.setData(this.studentList);
    this.dataSource = new MatTableDataSource(this.studentList);
    this.dataSource.paginator = this.paginator;
  }


}
