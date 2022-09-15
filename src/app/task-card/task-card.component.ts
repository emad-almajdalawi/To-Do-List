import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TheListService } from '../the-list.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit, AfterViewInit {
  @ViewChild('taskTitle')
  textEl?: ElementRef;
  taskTitle: string = ""
  textElement: any

  @Input() task: string = '';
  @Input() cardIndex: number = 0;

  className = ''

  constructor(public listService: TheListService) { }

  ngOnInit(): void {
    this.listService.doneList.subscribe((arr) => {
      this.addDoneToClass();
    });
  }

  ngAfterViewInit(): void {
    this.textElement = this.textEl?.nativeElement
    this.taskTitle = this.textEl?.nativeElement.textContent.trim();
    this.addDoneToClass()
  }

  onCheckboxSelect(e: any) {
    e.preventDefault();
    let checked = e.target.checked
    if (checked) {
      this.listService.doneList.value.push(this.taskTitle)
    }
    else if (this.listService.doneList.value.includes(this.taskTitle)) {
      let index = this.listService.doneList.value.indexOf(this.taskTitle)
      this.listService.doneList.value.splice(index, 1)
    }

    this.addDoneToClass();
  }

  addDoneToClass() {
    if (this.listService.doneList.value.includes(this.taskTitle)) {
      this.className = "done"
    } else {
      this.className = ''
    }
  }

  deleteTask(e: any) {
    e.preventDefault();
    let index = this.listService.myList.indexOf(this.taskTitle)
    this.listService.myList.splice(index, 1)
  }

  editTask(e: any) {
    e.preventDefault();
    // let index = this.listService.value.myList.indexOf(this.taskTitle)
    // this.listService.myList[index] = 'edited'
  }
}
