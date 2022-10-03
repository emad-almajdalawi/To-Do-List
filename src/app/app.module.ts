import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TheListService } from './the-list.service';


@NgModule({
  declarations: [
    AppComponent,
    DateTimeComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    TheListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
