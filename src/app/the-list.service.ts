import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Task {
  title: string;
  checked: boolean;
  done: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TheListService {

  myList: BehaviorSubject<Task[]> = new BehaviorSubject([
    {
      title: 'task1',
      done: false,
      checked: false
    },
    {
      title: 'task2',
      done: false,
      checked: false
    },
    {
      title: 'task3',
      done: false,
      checked: false
    }
  ])

  constructor() { }
}
