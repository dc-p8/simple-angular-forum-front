import { NgModule } from '@angular/core';

import { ThreadsComponent } from './threads.component';
import { ThreadsService } from './threads.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ThreadsComponent,
    CommonModule
  ],
  declarations: [],
  providers : [ThreadsService]
})
export class ThreadsModule { }
