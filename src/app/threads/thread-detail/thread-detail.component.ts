import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx'
import {Thread} from '../../classes/Thread';
import {ThreadsService} from '../threads.service';
import {AccountService} from '../../account/account.service';

@Component({
	selector: 'app-thread-detail',
	templateUrl: './thread-detail.component.html',
	styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {
	id:number;
	thread:Thread;
	err:Array<string> = [];
	isAuth:boolean = false;
	content:string = '';
	sub:Subscription;
	sub2:Subscription;
	sub3:Subscription;

	constructor(private accountService:AccountService,
		private route: ActivatedRoute,
		private threadService:ThreadsService) {
			this.thread = {
				title:'Loading...',
				posts:[]
			};
		 }

	getTime(mili:number):string
	{
		let d = new Date();
		d.setTime(mili);
		return d.toLocaleString();
	}

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
		this.sub2 = this.threadService.currentThread$.subscribe(thread =>{
			if(thread)
				this.thread = thread;
			console.log(thread);
		});
		this.sub = this.route.params.subscribe(params =>{
			 this.id = +params['id'];
		});
		this.threadService.getThread(this.id);
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
		this.sub2.unsubscribe();
		this.sub3.unsubscribe();
	}

	destroy(i:number){
		this.err.splice(i, 1);
	}

	onSubmit()
	{
		this.err = [];
		this.threadService.postMessage(this.id, this.content).subscribe(errors => {
			if(errors.length > 0)
			{
				console.log(errors);
				this.err = errors;
			}
			else{
				this.content = '';
				this.threadService.getThread(this.id);
			}
			
		});
	}

}
