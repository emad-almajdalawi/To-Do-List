import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TheListService {

  myList: string[] = ['task1', 'task2', 'task3'];

  printing() {
    console.log(this.myList)
  }

  constructor() { }

  addToMyList(newValue: string) {
    this.myList.push(newValue)
  }

  removeFromMylest(x: any) {
    this.myList.push(x)
  }
}
