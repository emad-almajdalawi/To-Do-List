import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TheListService } from './the-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

  selectAllChecked: boolean = false

  constructor(public listService: TheListService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.delSelClassList = this.delSelEl?.nativeElement.className
    this.formEl = this.form?.nativeElement
    this.selAllFormEl = this.selAllForm?.nativeElement
  }

  onKeyEnter(e: any) {
    e.preventDefault();
    this.listService.myList.push(e.target.value)
    this.formEl.reset()
    this.selAllFormEl.reset()
  }

  onSelectAll(e: any) {
    e.preventDefault();
    let checked = e.target.checked
    if (checked) {
      this.listService.myList.forEach(element => {
        this.listService.doneList.next(
          [...this.listService.doneList.value, element]
        )
        this.selectAllChecked = true
      })
    }
    else {
      this.listService.doneList.next([])
    }
  }

  deleteAll(e: any) {
    this.listService.myList = [];
    this.selAllFormEl.reset()
  }

  deleteSelected(e: any) {
    this.listService.doneList.value.forEach(element => {
      if (this.listService.myList.includes(element)) {
        console.log(element)
        let index = this.listService.myList.indexOf(element)
        this.listService.myList.splice(index, 1)
        let tempList: string[] = []
        this.listService.doneList.value.forEach((item) => {
          tempList.push(item)
        })
        let index2 = tempList.indexOf(element)
        tempList.splice(index, 1)
        this.listService.doneList.next(tempList)
      }
    })
    this.selAllFormEl.reset()
  }
}
