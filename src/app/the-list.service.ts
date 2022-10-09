import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface TaskDB {
  _id: any,
  title: string,
  done: boolean,
  // authorId: string
}

export interface AddTaskDB {
  title: string,
  done: boolean,
  // authorId: string
}

export interface PostResponse {
  data: TaskNewId,
  message: string,
  status: string
}

export interface TaskNewId {
  id: string,
  title: string,
  done: boolean,
  // authorId: string
}

@Injectable({
  providedIn: 'root'
})
export class TheListService {

  baseUrl: string = 'http://127.0.0.1:5000'
  myList: BehaviorSubject<TaskNewId[]> = new BehaviorSubject([]);
  isAllDone: boolean;
  doneCounter: BehaviorSubject<number> = new BehaviorSubject(0);
  selectedList: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(
    public http: HttpClient
  ) { }

  /**
   * Fetch all data from the database
   */
  getTasks(): Observable<TaskDB[]> {
    return this.http.get<TaskDB[]>(this.baseUrl + '/tasks.json');
  }

  /**
   * Add a new task to the database and to the rendered BehaviorSubject
   * @param {AddTaskDB} body The body of the new data (title and done)
   */
  addTask(body: AddTaskDB): void {
    this.http.post<PostResponse>(this.baseUrl + '/task/add', body)
      .subscribe(res => {
        console.log(res);
        this.myList.next([...this.myList.value, res.data]);
      });
  }

  /**
   * Update the title of one task in the database and the rendered BehaviorSubject
   * @param {string} id The is od the task that wanted to be updated
   * @param {AddTaskDB} body The new body of the task (title and done)
   * @param {TaskNewId} task The new body of the task with edited keys (string id not ObjectId)
   */
  updateTask(id: string, body: AddTaskDB, task: TaskNewId): void {
    this.http.post<PostResponse>(this.baseUrl + `/task/update/${id}`, body)
      .subscribe(res => {
        console.log(res);
        const index = this.myList.value.indexOf(task);
        this.myList.value.splice(index, 1, res.data);
      });
  }

  /**
   * Delete one task from the database and from the rendered BehaviorSubject
   * @param {string} id The is od the task that wanted to be updated
   * @param {TaskNewId} task The new body of the task with edited keys (string id not ObjectId)
   */
  deleteTask(id: string, task: TaskNewId): void {
    this.http.post<PostResponse>(this.baseUrl + `/task/delete/${id}`, null)
      .subscribe(res => {
        console.log(res);
        const index = this.myList.value.indexOf(task);
        this.myList.value.splice(index, 1);
      });
  }

  /**
   * Delete all tasks from the database and from the rendered BehaviorSubject
   */
  deleteAll(): void {
    this.http.post(this.baseUrl + `/task/deleteall`, null)
      .subscribe(res => {
        console.log(res);
        this.myList.next([]);
      });
  }

  /**
   * Mark one task as done in the database and the rendered BehaviorSubject
   * @param {string} id The is od the task that wanted to be updated
   * @param {AddTaskDB} body The new body of the task (title and done)
   * @param {TaskNewId} task The new body of the task with edited keys (string id not ObjectId)   */
  oneDone(id: string, body: AddTaskDB, task: TaskNewId): void {
    this.http.post<PostResponse>(this.baseUrl + `/task/done/${id}`, body)
      .subscribe(res => {
        console.log(res);
        let new_list = [];
        this.myList.value.forEach(element => {
          if (element.id == task.id) {
            new_list.push(res.data);
          }
          else {
            new_list.push(element);
          }
        })
        this.myList.next(new_list);
      });
  }

  /**
   * Mark all tasks as done or not done in the database and the rendered BehaviorSubject
   * @param {boolean} isDone Checking if the select all checkbox checked or not
   */
  allDone(isDone: boolean): void {
    this.http.post<PostResponse>(this.baseUrl + `/task/alldone/${isDone}`, null)
      .subscribe(res => {
        console.log(res);
      });
  }

  /**
   * Delete many tasks from the database and rerender the rendered BehaviorSubject
   * @param {string[]} ids All IDs for tasks thant wanted to be deleted
   */
  deleteMany(ids: string[]) {
    const data: any = {
      allIds: ids
    }

    this.http.post(this.baseUrl + '/task/deletemany', data).subscribe(res => {
      console.log(res);

      let new_list = [];
      this.myList.value.forEach(element => {
        if (!ids.includes(element.id)) {
          new_list.push(element);
        }
      })

      this.myList.next(new_list);
      this.selectedList.next([]);
    })
  }

  /**
   * Convert the id type from ObjectId to string
   * @param {TaskDB} oldData The data that has ObjectId and wanted to be converted
   */
  renameId(oldData: TaskDB): any {
    let newData = {};
    const kyes = ['title', 'done'];
    newData['id'] = oldData["_id"]['$oid'].toString();
    kyes.forEach(feild_key => {
      newData[feild_key] = oldData[feild_key];
    });
    return newData
  }
}
