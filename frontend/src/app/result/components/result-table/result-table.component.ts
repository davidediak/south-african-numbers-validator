import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/result/models/result';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit {
  @Input() results: Result[];
  @Input() headers: string[];
  @Input() headerClass: string;
  @Input() rowClass: string;

  public paginator = true;
  public initalRows = 10;
  public rowsPerPageOptions = [this.initalRows, { showAll: 'All' }];
  public showCurrentPageReport = true;
  constructor() {}

  ngOnInit(): void {}
}
