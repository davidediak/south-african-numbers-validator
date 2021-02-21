import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Outcome } from 'src/app/result/models/outcome';
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

  getByOutcome(outcome: Outcome): Observable<Result[]> {
    return this.httpClient.get<Result[]>(
      `${this.backendUrl}/results/filter/outcome/${outcome}`
    );
  }

  validateSingleNumber(
    numberToTest: string
  ): Observable<Partial<Result> & { rejectionReason: string }> {
    return this.httpClient.get<Partial<Result> & { rejectionReason: string }>(
      `${this.backendUrl}/results/validate/${numberToTest}`
    );
  }
}
