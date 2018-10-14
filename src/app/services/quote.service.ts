import { Injectable, Inject } from "@angular/core";
import { Quote } from "./../domain/quote";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class QuoteService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_CONFIG") private config
  ) {}

  getQuote(): Observable<Quote> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    return this.http.get(uri).map(res => res as Quote);
  }
}
