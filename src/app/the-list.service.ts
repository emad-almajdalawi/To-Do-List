import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


// export interface Task {
//   title: string;
//   checked: boolean
// }

export interface TaskDB {
  _id: any,
  title: string,
  done: boolean
}

export interface AddTaskDB {
  title: string,
  done: boolean
}

export interface PostResponse {
  data: TaskNewId,
  message: string,
  status: string
}

export interface TaskNewId {
  title: string,
  done: boolean,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class TheListService {

  baseUrl: string = 'http://127.0.0.1:5000'
  myList: BehaviorSubject<TaskNewId[]> = new BehaviorSubject([])
  flag: boolean = false


  constructor(
    public http: HttpClient
  ) { }

  isAllDone(): void {
    this.myList.value.forEach(element => {
      if (element.done == false) {
        this.flag = true
      }
    })
  }

  getTasks(): Observable<TaskDB[]> {
    return this.http.get<TaskDB[]>(this.baseUrl + '/tasks.json')
  }

  addTask(body: AddTaskDB): void {
    this.http.post<PostResponse>(this.baseUrl + '/task/add', body)
      .subscribe(res => {
        console.log(res)
        this.myList.next([...this.myList.value, res.data]);
      });
  }

  updateTask(id: string, body: AddTaskDB, task: TaskNewId): void {
    this.http.post<PostResponse>(this.baseUrl + `/task/update/${id}`, body)
      .subscribe(res => {
        console.log(res)
        const index = this.myList.value.indexOf(task);
        this.myList.value.splice(index, 1, res.data);
      });
  }

  deleteTask(id: string, task: TaskNewId): void {
    this.http.post<PostResponse>(this.baseUrl + `/task/delete/${id}`, null)
      .subscribe(res => {
        console.log(res)
        const index = this.myList.value.indexOf(task);
        this.myList.value.splice(index, 1);
      });
  }

  deleteAll(): void {
    this.http.post(this.baseUrl + `/task/deleteall`, null)
      .subscribe(res => {
        console.log(res)
        this.myList.next([]);
      });
  }

  oneDone(id: string, body: AddTaskDB, task: TaskNewId): void {
    this.http.post<PostResponse>(this.baseUrl + `/task/done/${id}`, body)
      .subscribe(res => {
        console.log(res)
        const index = this.myList.value.indexOf(task);
        this.myList.value.splice(index, 1, res.data);
      });
  }

  allDone(isDone: boolean): void {
    this.http.post<PostResponse>(this.baseUrl + `/task/alldone/${isDone}`, null)
      .subscribe(res => {
        console.log(res)
      });
  }

  deleteDone(): void {
    this.http.post(this.baseUrl + `/task/deletedone`, null)
      .subscribe(res => {
        console.log(res)
        const notChecked: any = this.myList.value.filter((task: TaskNewId) => {
          return !task.done;
        });
        this.myList.next(notChecked);
      });
  }

  renameId(oldData: TaskDB): any {
    let newData = {}
    const kyes = ['title', 'done']
    newData['id'] = oldData["_id"]['$oid'].toString()
    kyes.forEach(feild_key => {
      newData[feild_key] = oldData[feild_key]
    });
    return newData
  }

}
