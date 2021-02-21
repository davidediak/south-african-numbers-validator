import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/result/models/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private backendUrl = 'backend';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Result[]> {
    return this.httpClient.get<Result[]>(`${this.backendUrl}/results`);
  }
}
