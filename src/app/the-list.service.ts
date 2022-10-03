import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class TheListService {

  baseUrl: string = 'http://127.0.0.1:5000'

  myList: BehaviorSubject<TaskDB[]> = new BehaviorSubject([])


  constructor(
    public http: HttpClient
  ) { }

  getTasks(): Observable<TaskDB[]> {
    return this.http.get<TaskDB[]>(this.baseUrl + '/tasks.json');
  }

  addTask(body: AddTaskDB): void {
    this.http.post<AddTaskDB>(this.baseUrl + '/task/add', body);
    this.getTasks()
  }

  deleteTask(id: string): void {
    this.http.post(this.baseUrl + `/task/delete/${id}`, null);
    this.getTasks()
  }

  updateTask(id: string, body: AddTaskDB): void {
    this.http.post(this.baseUrl + `/task/update/${id}`, body);
    this.getTasks()
  }
}
