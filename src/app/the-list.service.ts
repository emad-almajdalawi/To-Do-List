import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TheListService {

  myList: string[] = ['task1', 'task2', 'task3'];

  doneList: string[] = []

  printing() {
    console.log(this.myList)
  }

  constructor() { }
}
