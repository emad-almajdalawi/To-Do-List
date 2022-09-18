import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TheListService } from '../the-list.service';


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

  @Input() task: string = '';
  @Input() cardIndex: number = 0;
  @Input() selectAllChecked!: boolean;

  className = '';

  constructor(public listService: TheListService) { }

  ngOnInit(): void {
    this.listService.doneList.subscribe((arr) => {
      this.addDoneToClass();
    });
  }

  ngAfterViewInit(): void {
    this.textElement = this.textEl?.nativeElement;
    this.taskTitle = this.textEl?.nativeElement.textContent.trim();
    this.addDoneToClass();

    this.dialogEl = this.dialog?.nativeElement;
  }

  onCheckboxSelect(e: any): void {
    e.preventDefault();
    let checked = e.target.checked;
    if (checked) {
      this.listService.doneList.next(
        [...this.listService.doneList.value, this.taskTitle]
      );
    }
    else {
      let index = this.listService.doneList.value.indexOf(this.taskTitle);
      this.listService.doneList.value.splice(index, 1);
    }

    this.addDoneToClass();
  }

  addDoneToClass() {
    if (this.listService.doneList.value.includes(this.taskTitle)) {
      this.className = 'done';
    } else {
      this.className = '';
    }
  }

  deleteTask(e: Event) {
    e.preventDefault();
    let index = this.listService.myList.indexOf(this.taskTitle);
    this.listService.myList.splice(index, 1);

    if (this.listService.doneList.value.includes(this.taskTitle)) {
      let index = this.listService.doneList.value.indexOf(this.taskTitle);
      this.listService.doneList.value.splice(index, 1);
    };
  }

  editTask() {
    this.dialogEl.showModal();
  }

  closeDialog() {
    this.dialogEl.close();
  }

  editTitle(e: any): void {
    e.preventDefault();
    let index = this.listService.myList.indexOf(this.taskTitle);

    this.listService.myList.splice(index, 1);
    this.listService.myList.splice(index, 0, e.target.inp.value);
    this.closeDialog();
  }
}
