import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetsetService {

  constructor() { }

  
  // tslint:disable-next-line: typedef
  public setData(studentList: any){
    localStorage.setItem('data', JSON.stringify(studentList));
  }

  // tslint:disable-next-line: typedef
  public getData(){
    return JSON.parse(localStorage.getItem('data') || '{}');
  }
}
