import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenTdbService {
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getQuizQuestions(settings: { numberOfQuestions: number; category: number|null; difficulty: string; type: string; }): Observable<any> {
    const url = `${this.apiUrl}?amount=${settings.numberOfQuestions}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`;
    return this.http.get(url);
  }
}
