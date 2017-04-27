import { Routes } from '@angular/router';
import { AuthGuard } from './_services/auth.guard.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { NewEventComponent } from './new-event/new-event.component';
import { UserEventsListComponent } from './user-events-list/user-events-list.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'events-calendar', component: EventsCalendarComponent },
    { path: 'new-event', component: NewEventComponent },
    { path: 'user-events-list/:date', component: UserEventsListComponent },
  ] },
  { path: '**', component: PageNotFoundComponent }
];