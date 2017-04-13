import { Injectable } from '@angular/core';

import { TeacherBook } from './teacher-book';


@Injectable()
export class TeacherBookService {

  private KEY: string = 'teacherBook';

  public setKey(key: string) {
    this.KEY = key;
  }

  public isEmpty(): boolean {
    return localStorage.getItem(this.KEY) === null;
  }

  public putTeacherBook(tb: TeacherBook) {
    localStorage.setItem(this.KEY, JSON.stringify(TeacherBook.toJson(tb)));
  }

  public getTeacherBook(): TeacherBook {
    let tb = localStorage.getItem(this.KEY);
    if (tb !== null) {
      return TeacherBook.fromJson(JSON.parse(tb));
    } else {
      throw new Error("Box is empty");
    }
  }
}
