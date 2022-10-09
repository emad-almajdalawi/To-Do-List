import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TheListService, TaskDB, TaskNewId } from './the-list.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'toDoList';

  @ViewChild('insertionForm')
  form?: ElementRef;
  formEl: any;

  @ViewChild('selAllForm')
  selAllForm?: ElementRef;
  selAllFormEl: any;

  constructor(
    public listService: TheListService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listService.getTasks().subscribe((data: TaskDB[]) => {
      let renamedId = [];
      data.forEach(element => {
        let newObj = {};
        newObj = this.listService.renameId(element);
        renamedId.push(newObj);
      })

      this.listService.myList.next(renamedId);

      this.listService.doneCounter.next(this.listService.myList.value.filter((t: TaskNewId) => t.done).length);
    });
  }

  ngAfterViewInit(): void {
    this.formEl = this.form?.nativeElement;
    this.selAllFormEl = this.selAllForm?.nativeElement;
  }

  /**
   * Add the task to the tasks' object.
   * @param {any} e The event's element
   */
  onKeyEnter(e: any): void {
    e.preventDefault();
    this.listService.addTask({ title: e.target.value, done: false });
    this.formEl.reset();
    this.selAllFormEl.reset();
  }

  /**
   * Assign "true" or "false" as a value of "checked" attribute in all "Task" objects.
   * @param {any} e The event's element
   */
  onSelectAll(e: any): void {
    e.preventDefault();
    const isChecked: boolean = e.target.checked;

    const newList: TaskNewId[] = this.listService.myList.value.map((task: TaskNewId) => {
      if (isChecked && !this.listService.selectedList.value.includes(task.id)) {
        this.listService.selectedList.next([...this.listService.selectedList.value, task.id]);
      }
      else {
        this.listService.selectedList.next([]);
      }

      return task
    });
    this.listService.myList.next(newList);
  }

  /**
   * Delete all tasks.
   */
  deleteAll(): void {
    this.listService.deleteAll();
    this.selAllFormEl.reset();
  }

  /**
   * Delete all selected tasks.
   */
  deleteSelected(): void {
    this.listService.deleteMany(this.listService.selectedList.value);
    this.selAllFormEl.reset();
  }

  /**
   * Delete all done tasks.
   */
  deleteDone() {
    let ids: string[] = []
    this.listService.myList.value.forEach((element: TaskNewId) => {
      if (element.done) {
        ids.push(element.id);
      }
    })
    this.listService.deleteMany(ids)
    this.listService.doneCounter.next(0);
  }

  /**
   * Open the Register dialog (popup)
   */
  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '800px',
      // data: ''
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   console.log(result)
    // });
  }

  /**
   * Open the LogIn dialog (popup)
   */
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      // data: ''
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   console.log(result)
    // });
  }
}
