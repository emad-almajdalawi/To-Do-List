import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TheListService, Task } from '../the-list.service';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit, AfterViewInit {
  @ViewChild('taskTitle11')
  textEl?: ElementRef;
  taskTitle: string = ""
  textElement: any

  @ViewChild('dialog')
  dialog?: ElementRef;
  dialogEl: any

  @Input() task: Task;
  @Input() cardIndex: number = 0;
  @Input() selectAllChecked!: boolean;

  className = '';

  constructor(public listService: TheListService) { }

  ngOnInit(): void {
    this.listService.myList.subscribe((arr) => {
      this.addDoneToClass();
      console.log('paolo');
    });
  }

  ngAfterViewInit(): void {
    this.textElement = this.textEl?.nativeElement;
    this.taskTitle = this.textEl?.nativeElement.textContent.trim();
    this.addDoneToClass();

    this.dialogEl = this.dialog?.nativeElement;
  }

  onCheckboxSelect(e: any): void {
    this.task.checked = e.target.checked;
    this.addDoneToClass();
  }

  addDoneToClass() {
    if (this.task.checked) {
      this.className = 'done';
    } else {
      this.className = '';
    }
  }

  deleteTask(e: Event) {
    e.preventDefault();
    let index = this.listService.myList.value.indexOf(this.task);
    this.listService.myList.value.splice(index, 1);
  }

  editTask() {
    this.dialogEl.showModal();
  }

  closeDialog() {
    this.dialogEl.close();
  }

  editTitle(e: any): void {
    e.preventDefault();
    this.task.title = e.target.inp.value;
    this.closeDialog();
  }
}
