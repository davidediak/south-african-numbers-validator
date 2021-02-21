import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultListComponent } from './pages/result-list/result-list.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ResultListComponent],
  imports: [CommonModule, TableModule],
  exports: [ResultListComponent],
})
export class ResultModule {}
