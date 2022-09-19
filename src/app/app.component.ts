import { Component, ElementRef, ViewChild } from '@angular/core';
import { __values } from 'tslib';
import { TheListService, Task } from './the-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'toDoList';

  @ViewChild('insertionForm')
  form?: ElementRef;
  formEl: any

  @ViewChild('selAllForm')
  selAllForm?: ElementRef;
  selAllFormEl: any

  selectedCounter: number = 0;

  constructor(
    public listService: TheListService
  ) { }

  ngAfterViewInit(): void {
    this.formEl = this.form?.nativeElement
    this.selAllFormEl = this.selAllForm?.nativeElement
  }

  /**
   * Add the task to the tasks' object.
   * @param {any} e The event's element
   */
  onKeyEnter(e: any): void {
    e.preventDefault();
    this.listService.myList.value.push({ title: e.target.value, checked: false })
    this.formEl.reset()
    this.selAllFormEl.reset()
  }

  /**
   * Assign "true" or "false" as a value of "checked" attribute in all "Task" objects.
   * @param {any} e The event's element
   */
  onSelectAll(e: any): void {
    e.preventDefault();
    const isChecked: boolean = e.target.checked;

    const newList: Task[] = this.listService.myList.value.map((task: Task) => {
      isChecked ? task.checked = true : task.checked = false;

      return task;
    });
    this.listService.myList.next(newList);

    this.selectedCounter = isChecked ? this.listService.myList.value.length : 0;
  }

  /**
   * Delete all tasks.
   */
  deleteAll(): void {
    this.listService.myList.next([]);
    this.selAllFormEl.reset()
  }

  /**
   * Delete all selected tasks.
   */
  deleteSelected(): void {
    const notChecked: any = this.listService.myList.value.filter((task: Task) => {
      return !task.checked;
    });
    this.listService.myList.next(notChecked);

    this.selAllFormEl.reset()
  }
}
