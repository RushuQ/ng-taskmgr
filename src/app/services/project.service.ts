import { Injectable, Inject } from "@angular/core";
import { Project } from "../domain";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  private readonly domain = "projects";
  private headers = new HttpHeaders({
    "Content-Type": "application/json"
  });
  constructor(
    @Inject("BASE_CONFIG") private config,
    private http: HttpClient
  ) {}
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .patch(uri, JSON.stringify(project), { headers: this.headers })
      .map(res => res as Project);
  }

  update(project: Project): Observable<Project> {
    console.log(project);
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http
      .post(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res as Project);
  }

  del(project: Project): Observable<Project> {
    const delTasks$ = Observable.from(project.taskLists ? project.taskLists : [])
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`)).count();
    return delTasks$.switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)).mapTo(project);
  }

  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { members_like: userId } })
      .map(res => res as Project[]);
  }
}
