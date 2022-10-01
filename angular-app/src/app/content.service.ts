import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Content} from "./data-model/content";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private contentBase = environment.backend + '/content';

  constructor(private http: HttpClient) {
  }

  getContent(): Observable<Content> {
    return this.http.get<Content>(this.contentBase);
  }

  getSecret(): Observable<Content> {
    return this.http.get<Content>(this.contentBase + '/restricted');
  }

}
