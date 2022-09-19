import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Task {
  title: string;
  checked: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TheListService {

  myList: BehaviorSubject<Task[]> = new BehaviorSubject([
    {
      title: 'task1',
      checked: false
    },
    {
      title: 'task2',
      checked: false
    },
    {
      title: 'task3',
      checked: false
    }
  ]
  )


  constructor() { }
}
