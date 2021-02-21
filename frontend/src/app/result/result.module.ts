import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultListComponent } from './pages/result-list/result-list.component';

@NgModule({
  declarations: [ResultListComponent],
  imports: [CommonModule],
  exports: [ResultListComponent],
})
export class ResultModule {}
