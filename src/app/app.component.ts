import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TheListService } from './the-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'toDoList';
  tasks: string[] = [];
  SelectAllClassName = ''

  constructor(public listService: TheListService) { }

  ngOnInit() {
    this.tasks = this.listService.myList
  }

  onKeyEnter(e: any) {
    e.preventDefault();
    this.listService.myList.push(e.target.value)
  }

  onSelectAll(e: any) {
    e.preventDefault();
    let checked = e.target.checked
    if (checked) {
      this.listService.myList.forEach(element => {
        console.log(element)
        this.listService.doneList.push(element)
      })
    }
    else {
      this.listService.doneList = []
    }
  }
}
