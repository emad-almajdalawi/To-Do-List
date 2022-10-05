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


  constructor(
    public http: HttpClient
  ) { }

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
        // console.log('task from servace', task)
        const index = this.myList.value.indexOf(task);
        this.myList.value.splice(index, 1);
      });
  }

}
