import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia.interface';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  selectedNoticia: Noticia | undefined;
  private apiUrl =
    'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=0BBFiwYgHvAzEc3OzTw47qmt42F0QTGG';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
