import { Observable } from "rxjs/Observable";
import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../domain";
import { Auth } from "../domain/auto.model";

@Injectable()
export class AutoService {
  private readonly domain = "users";
  private headers = new HttpHeaders({
    "Content-Type": "application/json"
  });
  private token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
    ".eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9" +
    ".TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
  constructor(
    private http: HttpClient,
    @Inject("BASE_CONFIG") private config
  ) {}

  register(user: User): Observable<Auth> {
    user.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { email: user.email } })
      .switchMap(res => {
        if (Object.keys(res).length) {
          throw "user exited";
        }
        return this.http
          .post(uri, JSON.stringify(user), { headers: this.headers })
          .map(r => ({ token: this.token, user: r as User }));
      });
  }

  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'email':username,'password': password}})
    .map(res=>{
        if(!Object.keys(res).length){ 
            throw 'username or password not match'
        } 
        return {
            token: this.token,
            user: res[0] as User
        }
    })
  }
}
