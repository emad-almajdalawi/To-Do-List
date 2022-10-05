import { Component, ElementRef, ViewChild } from '@angular/core';
import { __values } from 'tslib';
import { TheListService, TaskDB, TaskNewId } from './the-list.service';

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
      let renamedId = [];
      data.forEach(element => {
        let newObj = {};
        newObj = this.listService.renameId(element)
        renamedId.push(newObj)
      })
      this.listService.myList.next(renamedId);
      console.log(renamedId)
      this.listService.myList.value.forEach(element => {
        if (element.done) {
          this.selectedCounter += 1
        }
      })
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
    this.listService.addTask({ title: e.target.value, done: false })
    this.formEl.reset()
    this.selAllFormEl.reset()
  }

  /**
   * Assign "true" or "false" as a value of "checked" attribute in all "Task" objects.
   * @param {any} e The event's element
   */
  onAllDone(e: any): void {
    e.preventDefault();
    const isChecked: boolean = e.target.checked;
    this.listService.allDone(isChecked)

    const newList: TaskNewId[] = this.listService.myList.value.map((task: TaskNewId) => {
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
    this.listService.deleteAll()
    this.selAllFormEl.reset()
  }

  /**
   * Delete all selected tasks (done tasks).
   */
  deleteDone(): void {
    this.listService.deleteDone()
    this.selAllFormEl.reset()
  }
}
