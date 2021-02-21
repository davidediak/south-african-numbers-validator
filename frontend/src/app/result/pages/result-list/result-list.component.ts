import { Component, OnInit } from '@angular/core';
import { Outcome } from 'src/app/result/models/outcome';
import {
  acceptedTableHeaders,
  correctedTableHeaders,
  rejectedTableHeaders,
} from 'src/app/result/models/result';
import { ResultService } from 'src/app/result/result.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  public accepted$ = this.resultService.getByOutcome(Outcome.Accepted);
  public rejected$ = this.resultService.getByOutcome(Outcome.Rejected);
  public corrected$ = this.resultService.getByOutcome(Outcome.Corrected);

  public acceptedTableHeaders = acceptedTableHeaders;
  public rejectedTableHeaders = rejectedTableHeaders;
  public correctedTableHeaders = correctedTableHeaders;

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {}
}
