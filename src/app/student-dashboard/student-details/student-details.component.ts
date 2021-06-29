import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import * as moment from 'moment';
import { GetsetService } from 'src/app/Services/getset.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  studentForm: FormGroup;
  submitted = false;
  studentData: any = null;
  studentList: any[] = [];
  currentIndex = 0;
  
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  @ViewChild('formDirective')
  formDirective!: NgForm;
  openpanel: boolean = true;;

  constructor(private fb: FormBuilder, private helperService: GetsetService) {
    this.studentForm = this.fb.group({
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],

    });
  }
  

  // tslint:disable-next-line: typedef
  get f() {
    return this.studentForm.controls;
  }

  ngOnInit(): void {
    if (localStorage.getItem('data') !== null) {
      this.studentList = this.helperService.getData() as Array<any>;
    } else {
      this.studentList = [];
    }

    this.currentIndex = this.studentList.length;
  }

  public onFormSubmit(): void {
    
    var dateToDB = moment(this.studentForm.value.dob).format("YYYY-MM-DD");

    
    this.submitted = true;
    if (this.studentForm.valid) {
      const data = {
        Id: this.currentIndex,
        fName: this.studentForm.value.fName,
        lName: this.studentForm.value.lName,
        email: this.studentForm.value.email,
        mobile: this.studentForm.value.mobile,
        address: this.studentForm.value.address,
        city: this.studentForm.value.city,
        gender: this.studentForm.value.gender,
        dob: dateToDB,

      };

      this.studentData = data;
      this.resetForm();
    }else {
    this.studentForm.markAllAsTouched();
    }

  }
  toggleEventHander($event: any) {
    
    this.openpanel = $event;
    this.accordion.openAll();
  }
  public resetForm(): void {
    this.studentForm.reset();
    this.submitted = false;
    this.studentList = this.helperService.getData() as Array<any>;
    this.currentIndex = this.studentList.length;
    this.accordion.closeAll();
  }

  public setFormValue(data: any): void {

    this.currentIndex = data.Id;
    this.studentForm.patchValue({
      fName: data.fName,
      lName: data.lName,
      address: data.address,
      email: data.email,
      mobile: data.mobile,
      city: data.city,
      gender : data.gender,
      dob : data.dob

    });
  }

}
