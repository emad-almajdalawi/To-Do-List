import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { TheListService } from './the-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'toDoList';
  tasks: string[] = [];

  constructor(public listService: TheListService) { }

  ngOnInit() {
    this.tasks = this.listService.myList
  }

  onKeyEnter(e: any) {
    e.preventDefault();
    this.listService.addToMyList(e.target.value)
  }

  onCheckboxSelect(e: any) {
    e.preventDefault();
    console.log(e)
  }
}
