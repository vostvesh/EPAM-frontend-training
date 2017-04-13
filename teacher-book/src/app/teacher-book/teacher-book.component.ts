import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TeacherBook } from '../teacher-book';
import { TeacherAssistant } from '../teacher-assistant';

import { TeacherBookService } from '../teacher-book.service';
import { AssistantPrincipal } from '../assistant-principal';

@Component({
  selector: 'app-teacher-book',
  templateUrl: './teacher-book.component.html',
  styleUrls: ['./teacher-book.component.css']
})
export class TeacherBookComponent implements OnInit, OnDestroy {

  private _teacherBook: TeacherBook;
  private _teacherAssistant: TeacherAssistant;
  private _assistantPrincipal: AssistantPrincipal; /** */
  @Input() public teacherName: string; /** */

  public _vm: any;
  public get canAddStudent(): boolean {
    return this.newStudentName.length > 0 && !this._teacherBook.studentsNames.find(s => s === this.newStudentName);
  };

  private updateVm(oldVm: any, teacherBook: TeacherBook): any {
    let newVM: any = oldVm;

    newVM.lessons = [];
    for (let i = 1; i <= teacherBook.lessonsCount; i++) {
      newVM.lessons.push(i);
    }

    let stat = this._teacherAssistant.calculateStatistic(this._teacherBook, newVM.statValuesIndex);

    newVM.students = teacherBook.studentsNames.map(studentName => {
      let values = [];
      for (let lessonNumber = 1; lessonNumber <= teacherBook.lessonsCount; lessonNumber++) {
        let rating = teacherBook.getRating(studentName, lessonNumber);
        let absence = teacherBook.isAbsend(studentName, lessonNumber);
        let value = rating != null ? rating.toString() : absence ? "Н" : null;
        values.push(value);
      }
      return {
        name: studentName,
        values: values,
        stat: stat.get(studentName)
      };
    });
    return newVM;
  }

  // constructor(private _teacherBookBox: TeacherBookService) {
  //   this._teacherAssistant = new TeacherAssistant();

  //   if (this._teacherBookBox.isEmpty) {
  //     this._teacherBook = new TeacherBook();
  //   } else {
  //     this._teacherBook = this._teacherBookBox.getTeacherBook();
  //   }
  //   this._vm = { statValuesIndex: 0 };

  // }

  // ngOnInit() {
  //   let tb = localStorage.getItem('teacherBook');
  //   if (tb !== null) {
  //     this._teacherBook = TeacherBook.fromJson(JSON.parse(tb));
  //   } else {
  //     this._teacherBook = new TeacherBook();
  //   }
  // }

  constructor() {
    this._teacherAssistant = new TeacherAssistant();
    this._assistantPrincipal = new AssistantPrincipal();
    this._vm = { statValuesIndex: 0 };
  }

  ngOnInit() {
    this._assistantPrincipal.setName(this.teacherName);
    this._assistantPrincipal.setTeacherBook();
    this._teacherBook = this._assistantPrincipal.getTeacherBook();
    
    // let tb = localStorage.getItem(this._assistantPrincipal.getName());
    // if (tb !== null) {
    //   this._teacherBook = TeacherBook.fromJson(JSON.parse(tb));
    // } else {
    //   this._teacherBook = new TeacherBook();
    // }
  }

  ngOnDestroy() {
  }

  public newStudentName: string = "";

  public get vm(): any {
    this._vm = this.updateVm(this._vm, this._teacherBook);
    return this._vm;
  }

  public addStudent(): void {
    this._teacherBook.addStudent(this.newStudentName);
    this.newStudentName = "";
  }

  public addLesson(): void {
    this._teacherBook.addLesson();
  }

  public addValue(studentName: string, lessonNumber: number, value: any): void {
    let parsedValue = parseInt(value);
    if (!value) {
      return;
    } else if (!Number.isNaN(parsedValue)) {
      this._teacherBook.setRating(studentName, lessonNumber, parsedValue);
    } else {
      this._teacherBook.setAbsence(studentName, lessonNumber);
    }
  }

  public deleteStudent(studentName: string): void {
    this._teacherBook.removeStudent(studentName);
  }

  public setStatValuesIndex(lesson: number): void {
    this.vm.statValuesIndex = lesson;
  }

  // public saveTeacherBook(): void {
  //   this._teacherBookBox.putTeacherBook(this._teacherBook);
  // }
  public saveTeacherBook(): void {
    this._assistantPrincipal.saveTeacherBook();
  }
}