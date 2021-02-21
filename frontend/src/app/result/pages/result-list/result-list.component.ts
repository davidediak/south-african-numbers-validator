import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/result/result.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  results$ = this.resultService.getAll();

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {}
}
