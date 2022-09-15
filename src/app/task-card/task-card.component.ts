import { AfterViewInit, Component, ElementRef, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { TheListService } from '../the-list.service';
import { FormsModule } from '@angular/forms';
import { VariableBinding } from '@angular/compiler';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit, AfterViewInit {
  @ViewChild('taskTitle')
  textEl?: ElementRef;
  taskTitle: string = ""
  textElement: any

  @ViewChild('dialog')
  dialog?: ElementRef;
  dialogEl: any

  @ViewChild('checkbox')
  checkbox?: ElementRef;
  checkboxEl: any

  @Input() task: string = '';
  @Input() cardIndex: number = 0;
  @Input() selectAllChecked: boolean = false

  className = ''
  oldTitle: string = ''

  constructor(public listService: TheListService) { }

  ngOnInit(): void {
    this.listService.doneList.subscribe((arr) => {
      this.addDoneToClass();
    });
    this.oldTitle = this.taskTitle
  }

  ngAfterViewInit(): void {
    this.textElement = this.textEl?.nativeElement
    this.taskTitle = this.textEl?.nativeElement.textContent.trim();
    this.addDoneToClass()

    this.dialogEl = this.dialog?.nativeElement

    if (this.selectAllChecked) {
      this.checkboxEl = this.checkbox?.nativeElement
      console.log(this.checkboxEl.checked)
      this.checkboxEl.checked = true
      console.log(this.checkboxEl.checked)
    }
  }

  onCheckboxSelect(e: any) {
    e.preventDefault();
    let checked = e.target.checked
    if (checked) {
      this.listService.doneList.value.push(this.taskTitle)
    }
    else if (this.listService.doneList.value.includes(this.taskTitle)) {
      let index = this.listService.doneList.value.indexOf(this.taskTitle)
      this.listService.doneList.value.splice(index, 1)
    }

    this.addDoneToClass();
  }

  addDoneToClass() {
    if (this.listService.doneList.value.includes(this.taskTitle)) {
      this.className = "done"
    } else {
      this.className = ''
    }
  }

  deleteTask(e: any) {
    e.preventDefault();
    let index = this.listService.myList.indexOf(this.taskTitle)
    this.listService.myList.splice(index, 1)
  }

  editTask(e: any) {
    e.preventDefault();
    this.dialogEl.showModal()
  }

  closeDialog(e: any) {
    e.preventDefault();
    this.dialogEl.close()
  }

  editTitle(e: any) {
    e.preventDefault();
    console.log(e)
    this.listService.myList.forEach(element => {
      if (element == this.taskTitle) {
        let index = this.listService.myList.indexOf(element)
        this.listService.myList.splice(index, 1)
        this.listService.myList.splice(index, 0, e.target[0].value.trim())
      }
    })

    this.dialogEl.close()
  }
}


// @NgModule({
//   imports: [
//     FormsModule
//   ],
// })
// export class AppModule { }
