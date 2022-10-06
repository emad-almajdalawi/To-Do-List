import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { TheListService, TaskNewId } from '../the-list.service';


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

  @Input() task: TaskNewId;
  @Input() selectAllChecked: boolean;


  className: string = '';
  isSelected: boolean;

  constructor(public listService: TheListService) { }

  ngOnInit(): void {
    this.listService.myList.subscribe(() => {
      this.addDoneToClass();
      this.listService.doneCounter.next(this.listService.myList.value.filter((t: TaskNewId) => t.done).length);

    });

    this.listService.selectedList.subscribe(() => {
      this.isSelected = this.listService.selectedList.value.includes(this.task.id)
    })

    this.listService.doneCounter.subscribe(() => {

    })
  }

  ngAfterViewInit(): void {
    this.addDoneToClass();
    this.dialogEl = this.dialog?.nativeElement;
    this.editInputEl = this.editInput?.nativeElement
  }

  /**
   * Assign "true" or "false" as a value of "checked" attribute in the "Task" object of the same card.
   */
  taskDone(): void {
    this.listService.oneDone(this.task.id, { title: this.task.title, done: !this.task.done }, this.task)
    this.addDoneToClass();
  }

  /**
   * Add the class "done" to the task's title in the same card if it is checked.
   */
  addDoneToClass(): void {
    if (this.task.done) {
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
    let theTask = this.listService.myList.value.filter((task: TaskNewId) => {
      return task.id == this.task.id;
    })
    this.listService.deleteTask(theTask[0].id, theTask[0])
  }

  /**
   * Open a dialog box tat allow to edite task's title of the same card
   */
  editTask(): void {
    this.dialogEl.showModal();
  }

  /**
   * Close the dialog box that used to edit the task's title
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
    let theTask = this.listService.myList.value.filter((task: TaskNewId) => {
      return task.id == this.task.id;
    })
    this.listService.updateTask(theTask[0].id, { title: e.target['inp'].value, done: theTask[0].done }, theTask[0])
    this.closeDialog();
  }

  onCheckboxSelect(e: any) {
    let isChecked = e.target.checked

    if (isChecked && !this.listService.selectedList.value.includes(this.task.id)) {
      this.listService.selectedList.next([...this.listService.selectedList.value, this.task.id])
    }
    else if (!isChecked) {
      const index = this.listService.selectedList.value.indexOf(this.task.id);
      this.listService.selectedList.value.splice(index, 1);
    }

    console.log(this.listService.selectedList.value)
  }
}
