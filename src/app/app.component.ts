import { Component, ElementRef, ViewChild } from '@angular/core';
import { __values } from 'tslib';
import { TheListService, TaskDB, AddTaskDB } from './the-list.service';

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

  ngOnInit(): void {
    this.listService.getTasks().subscribe((data: TaskDB[]) => {
      this.listService.myList.next(data);
    });
  }

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
    // this.listService.myList.value.push({ title: e.target.value, done: false })
    this.listService.addTask({ title: e.target.value, done: false })
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

    const newList: TaskDB[] = this.listService.myList.value.map((task: TaskDB) => {
      isChecked ? task.done = true : task.done = false;

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
    const notChecked: any = this.listService.myList.value.filter((task: TaskDB) => {
      return !task.done;
    });
    this.listService.myList.next(notChecked);

    this.selAllFormEl.reset()
  }
}
