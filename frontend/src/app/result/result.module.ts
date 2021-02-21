import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultListComponent } from './pages/result-list/result-list.component';
import { TableModule } from 'primeng/table';
import { ResultTableComponent } from './components/result-table/result-table.component';

@NgModule({
  declarations: [ResultListComponent, ResultTableComponent],
  imports: [CommonModule, TableModule],
  exports: [ResultListComponent],
})
export class ResultModule {}
