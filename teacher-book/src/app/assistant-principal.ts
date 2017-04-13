import { TeacherBookService } from './teacher-book.service';
import { TeacherBook } from './teacher-book';

export class AssistantPrincipal {
  private _teacherBookService: TeacherBookService;
  private _teacherBook: TeacherBook;
  private _name: string = '';

  public setName(name: string): void {
    this._name = name;
  }

  public getName(): string {
    return this._name;
  }

  public setTeacherBook(): void {
    this._teacherBookService = new TeacherBookService();
    this._teacherBookService.setKey(this._name);
    if (!this._teacherBookService.isEmpty()) {
      this._teacherBook = this._teacherBookService.getTeacherBook();
    } else {
      this._teacherBook = new TeacherBook();
    }
  }

  public getTeacherBook(): TeacherBook {
    return this._teacherBook;
  }

  public saveTeacherBook() {
    this._teacherBookService.putTeacherBook(this._teacherBook);
  }

}
