import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import {ThreadsComponent} from './threads/threads.component';
import {ThreadsService} from './threads/threads.service';

import {PostThreadsComponent} from './threads/post-thread/post-thread.component';

import {ThreadListComponent} from './threads/thread-list/thread-list.component';
import {ThreadDetailComponent} from './threads/thread-detail/thread-detail.component';

import {AccountComponent} from './account/account.component';
import {AccountService} from './account/account.service';

import {RegisterComponent} from './account/register/register.component'

const appRoutes: Routes = [
  {
    path: 'threads',
    component: ThreadsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'thread/:id',
    component: ThreadDetailComponent
  },
    
  {
    path: '',
    redirectTo: '/threads',
    pathMatch: 'full'
  }//,
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ThreadsComponent,
    PostThreadsComponent,
    ThreadDetailComponent,
    AccountComponent,
    RegisterComponent,
    ThreadListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AccountService, ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
