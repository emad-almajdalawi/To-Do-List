import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
})
export class DateTimeComponent implements OnInit, OnDestroy {

  timeInterval: any;
  currentDateTime: BehaviorSubject<number> = new BehaviorSubject(Date.now());

  constructor() {
  }

  ngOnInit(): void {
    this.timeInterval = setInterval(() => {
      this.currentDateTime.next(Date.now());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval)
  }
}
