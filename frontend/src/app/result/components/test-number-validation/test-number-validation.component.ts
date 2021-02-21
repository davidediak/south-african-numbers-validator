import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/result/models/result';
import { ResultService } from 'src/app/result/result.service';

@Component({
  selector: 'app-test-number-validation',
  templateUrl: './test-number-validation.component.html',
  styleUrls: ['./test-number-validation.component.scss'],
})
export class TestNumberValidationComponent implements OnInit {
  public inputValue: string;
  public result$: Observable<Result>;
  constructor(private resultService: ResultService) {}

  ngOnInit(): void {}

  public doValdiate(): void {
    this.result$ = this.resultService.validateSingleNumber(this.inputValue);
  }
}
