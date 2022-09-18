import { Component, ElementRef, ViewChild } from '@angular/core';
import { TheListService, Task } from './the-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'toDoList';

  @ViewChild('delSelected')
  delSelEl?: ElementRef;
  delSelClassList: string[] = []

  @ViewChild('form')
  form?: ElementRef;
  formEl: any

  @ViewChild('selAllForm')
  selAllForm?: ElementRef;
  selAllFormEl: any

  selectAllChecked: boolean = false;

  constructor(
    public listService: TheListService
  ) { }

  ngAfterViewInit(): void {
    this.delSelClassList = this.delSelEl?.nativeElement.className
    this.formEl = this.form?.nativeElement
    this.selAllFormEl = this.selAllForm?.nativeElement
  }

  onKeyEnter(e: any) {
    e.preventDefault();
    this.listService.myList.value.push({ title: e.target.value, done: false, checked: false })
    this.formEl.reset()
    this.selAllFormEl.reset()
  }

  onSelectAll(e: any) {
    this.selectAllChecked = !this.selectAllChecked;
    e.preventDefault();
    const isChecked: boolean = e.target.checked;

    this.listService.myList.value.forEach((task: Task) => {
      isChecked ? task.checked = true : task.checked = false;
    })
  }

  deleteAll() {
    this.listService.myList.next([]);
    this.selAllFormEl.reset()
  }

  deleteSelected(e: any) {
    const notChecked: any = this.listService.myList.value.filter((task: Task) => {
      return !task.checked;
    });
    this.listService.myList.next(notChecked);

    this.selAllFormEl.reset()
  }
}
