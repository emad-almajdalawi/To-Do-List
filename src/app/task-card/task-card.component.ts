import { Component, Input, OnInit } from '@angular/core';
import { TheListService } from '../the-list.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() task: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onCheckboxSelect(e: any) {
    e.preventDefault();
    console.log(e.target.checked)
    console.log(e)
  }
}
