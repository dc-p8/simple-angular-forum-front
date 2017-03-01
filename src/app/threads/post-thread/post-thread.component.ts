import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { ThreadsService} from '../threads.service';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
	selector: 'app-post-thread',
	templateUrl: './post-thread.component.html',
	styleUrls: ['./post-thread.component.css']
})
export class PostThreadsComponent implements OnInit, OnDestroy {
	message:string = '';
	title:string = '';
	isAuth:boolean = false;
	errors:Array<String> = []
	err = [];
	sub:Subscription;

	constructor(private router: Router,
		private accountService:AccountService,
		private threadsService:ThreadsService) { }

	ngOnInit() {
		this.sub = this.accountService.pseudo$.subscribe(
			res => {
				console.log("here changddfg");
				if(res) {
					this.isAuth = true;
				}
				else {
					this.isAuth = false;     
				}
				console.log(this.isAuth);
				
			});
	}
	ngOnDestroy(){
		this.sub.unsubscribe();
	}

	destroy(i:number):void
	{
		this.err.splice(i, 1);
	}

	onSubmit(){
		this.threadsService.postThread(this.title, this.message).subscribe(data => {
			if(!data.errors){
				console.log('redirecting');
				this.router.navigate(['/thread', data.threadid]);
			}
			else{
				this.err = data.errors;
			}
		});
	}
}