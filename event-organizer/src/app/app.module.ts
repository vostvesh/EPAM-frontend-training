import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { appRoutes } from './routes/routes';

import { SocialEventsService } from './social-events.service';

import { AppComponent } from './app.component';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { NewEventComponent } from './new-event/new-event.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    EventsCalendarComponent,
    NewEventComponent,
    LoginComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1SAKfYFsz4YRHhatbwUOZMgdVZ4AYEHw'
    })
  ],
  providers: [SocialEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
