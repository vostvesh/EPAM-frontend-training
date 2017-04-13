import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TeacherBookService } from './teacher-book.service';

import { AppComponent } from './app.component';
import { TeacherBookComponent } from './teacher-book/teacher-book.component';
import { AssistantPrincipalComponent } from './assistant-principal/assistant-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherBookComponent,
    AssistantPrincipalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TeacherBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
