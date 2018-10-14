import { Injectable, Inject } from "@angular/core";
import { Task } from "../domain";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TaskList } from "../domain/task-list.model";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  private readonly domain = "projects";
  private headers = new HttpHeaders({
    "Content-Type": "application/json"
  });
  constructor(
    @Inject("BASE_CONFIG") private config,
    private http: HttpClient
  ) {}
  add(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(task), { headers: this.headers })
      .map(res => res as Task);
  }

  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      taskListId: task.taskListId,
      desc: task.desc,
      completed: task.completed,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      priority: task.priority,
      remark: task.remark,
      reminder: task.reminder,
      createDate: task.createDate
    };
    return this.http
      .post(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res as Task);
  }

  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/taskLists/${task.id}`;
    return this.http.delete(uri).mapTo(task);
  }

  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { taskListId: taskListId } })
      .map(res => res as Task[]);
  }

  getByLists(lists: TaskList[]): Observable<Task[]> {
    return Observable.from(lists)
      .mergeMap(list => this.get(list.id))
      .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []);
  }

  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http
      .patch(uri, JSON.stringify({ complete: !task.completed }), {
        headers: this.headers
      })
      .map(res => res as Task);
  }

  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http
      .patch(uri, JSON.stringify({ taskListId: taskListId }), {
        headers: this.headers
      })
      .map(res => res as Task);
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce((arr, x) => [...arr, x], []);
  }
}
