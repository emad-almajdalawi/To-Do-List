import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { TheListService, Task } from '../the-list.service';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit, AfterViewInit {

  @ViewChild('dialog')
  dialog?: ElementRef;
  dialogEl: any

  @ViewChild('editInput')
  editInput?: ElementRef;
  editInputEl: any

  @Input() task: Task;
  @Input() selectAllChecked: boolean;
  @Input() selectedCounter: number;

  @Output() selectedCounterChange = new EventEmitter<number>();

  className: string = '';

  constructor(public listService: TheListService) { }

  ngOnInit(): void {
    this.listService.myList.subscribe((arr) => {
      this.addDoneToClass();
    });
  }

  ngAfterViewInit(): void {
    this.addDoneToClass();
    this.dialogEl = this.dialog?.nativeElement;
    this.editInputEl = this.editInput?.nativeElement
  }

  /**
   * Assign "true" or "false" as a value of "checked" attribute in the "Task" object of the same card.
   * @param {any} e The event element
   */
  onCheckboxSelect(e: any): void {
    this.task.checked = e.target.checked;
    this.addDoneToClass();

    e.target.checked ? this.selectedCounter++ : this.selectedCounter--;
    this.selectedCounterChange.emit(this.selectedCounter);
  }

  /**
   * Add the class "done" to the task's title in the same card if it is checked.
   */
  addDoneToClass(): void {
    if (this.task.checked) {
      this.className = 'done';
    } else {
      this.className = '';
    }
  }

  /**
   *Delete the task of the same card.
   * @param {Event} e The event's element
   */
  deleteTask(e: Event): void {
    e.preventDefault();
    let index = this.listService.myList.value.indexOf(this.task);
    this.listService.myList.value.splice(index, 1);
  }

  /**
   * Edite task's title of the same card
   */
  editTask(): void {
    this.dialogEl.showModal();
  }

  /**
   * Close the dialog box
   */
  closeDialog(): void {
    this.dialogEl.close();
    this.editInputEl.value = this.task.title;
  }

  /**
   * Edit the task's title of the same card
   * @param {Event} e The event's element
   */
  editTitle(e: Event): void {
    e.preventDefault();
    this.task.title = e.target['inp'].value;
    this.closeDialog();
  }
}
