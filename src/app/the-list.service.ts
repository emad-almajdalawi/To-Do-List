import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheListService {

  myList: string[] = ['task1', 'task2', 'task3'];
  doneList: BehaviorSubject<string[]> = new BehaviorSubject(['']);

  printing() {
    console.log(this.myList)
  }

  constructor() { }
}
