import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultListComponent } from './pages/result-list/result-list.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { TestNumberValidationComponent } from './components/test-number-validation/test-number-validation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResultListComponent,
    ResultTableComponent,
    TestNumberValidationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [ResultListComponent],
})
export class ResultModule {}
