import { Injectable, Inject } from "@angular/core";
import { TaskList } from "../domain";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TaskListService {
  private readonly domain = "taskLists";
  private headers = new HttpHeaders({
    "Content-Type": "application/json"
  });
  constructor(
    @Inject("BASE_CONFIG") private config,
    private http: HttpClient
  ) {}
  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), { headers: this.headers })
      .map(res => res as TaskList);
  }

  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };
    return this.http
      .post(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res as TaskList);
  }

  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/taskLists/${taskList.id}`;
    return this.http.delete(uri).mapTo(taskList);
  }

  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { projectId: projectId } })
      .map(res => res as TaskList[]);
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]>  {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({ order: target.order }), {
        headers: this.headers
      })
      .map(res => res as TaskList);
    const drop$ = this.http
      .patch(dropUri, JSON.stringify({ order: src.order }), {
        headers: this.headers
      })
      .map(res => res as TaskList);
    return Observable
      .concat(drag$, drop$)
      .reduce((arrs, list) => [...arrs, list], []);// 累加，后一个参数作为初始值，如果没有则将第一个参数作为初始值
  }
}
