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
      this.listService.doneList.push(this.taskTitle)
    }
    else if (this.listService.doneList.includes(this.taskTitle)) {
      let index = this.listService.doneList.indexOf(this.taskTitle)
      this.listService.doneList.splice(index, 1)
    }

    this.addDoneToClass();
  }

  addDoneToClass() {
    if (this.listService.doneList.includes(this.taskTitle)) {
      this.className = "done"
    } else {
      this.className = ''
    }
  }

  // onSelectAll(e: any) {
  //   e.preventDefault();
  //   let checked = e.target.checked
  //   if (checked) {
  //     this.listService.myList.forEach(element => {
  //       console.log(element)
  //       this.listService.doneList.push(element)
  //       this.SelectAllClassName = "done"
  //     })
  //   }
  //   else {
  //     this.listService.doneList = []
  //     this.SelectAllClassName = ''
  //   }
  // }
  // }

  deleteTask(e: any) {
    e.preventDefault();
    let index = this.listService.myList.indexOf(this.taskTitle)
    this.listService.myList.splice(index, 1)
  }
}