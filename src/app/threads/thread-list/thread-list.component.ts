import { Component, OnInit, OnDestroy, Input, ElementRef, Directive, Renderer, HostListener} from '@angular/core';
import { ThreadsService } from '../threads.service';
import { AccountComponent } from '../../account/account.component';
import { ThreadsDescription } from '../../classes/ThreadsDescription';
import { Thread } from '../../classes/Thread';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx'


@Component({
	selector: 'app-thread-list',
	templateUrl: './thread-list.component.html',
	styleUrls: ['./thread-list.component.css']
})

export class ThreadListComponent implements OnInit, OnDestroy {
	@Input() perpage:any;
	@Input() page:any;

	arr:Array<any> = [];
	max_page:number = 0;
	lwidth:number = 0;

	firsttopics:Array<any> = [];
	lasttopics:Array<any> = [];
	threadsDescription:any = {};

	sub:Subscription;

	constructor(private threadsService:ThreadsService, private router: Router) {}

	ngOnInit() {
		this.perpage = 5;
		this.lwidth = 2.5;
		this.page = 0;
		this.sub = this.threadsService.threadsDescription$.subscribe(res=>{
			console.log(res);
			this.threadsDescription = res;
			this.max_page = Math.ceil(this.threadsDescription.numTotalThread / this.perpage) - 1;
			let tmp:Array<any> = [];
			let count:number = 0;
			for(let i = this.page - 1; i >= 0 && count < 3; i--, count++)
			{
				tmp.unshift(i);
			}
			this.firsttopics = tmp.slice();

			count = 0;
			tmp = [];
			//console.log(this.page + "test " + tmp + " " + count + " " + typeof(count) + " " + typeof(this.max_page));
			//console.log("type of tshis.page : " + typeof(this.page));
			//console.log("ICI : " + typeof(this.page + parseInt("1")) + " : "+(this.page + +1));

			for(let i = this.page + 1; i <= this.max_page && count < 3; i++, count++)
			{
				//console.log(typeof(i) + " " + i);
				tmp.push(i);
			}
			this.lasttopics = tmp.slice();
		});
		this.resetTopics();
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}

	select_thread(i:any){
		this.router.navigate(['/thread', i.id]);
	}

	number_show(event:any) {
		this.perpage = new Number(event.target.value);
		this.resetTopics();
		event.target.value = this.perpage;
	}
	page_click(event:any) {
		this.page = new Number(event.target.innerText);
		this.page_change(this.page);
		event.target.innerText = this.page;
	}
	page_input(event:any){
		this.page = new Number(event.target.value);
		this.page_change(this.page);
		event.target.value = this.page;
	}
	page_change(val:number){
		this.resetTopics();
		if(val != 0)
			this.lwidth = 1.5 + ((Math.floor(Math.log10(this.page)) + 1) * 0.5);
		else
			this.lwidth = 2;
	}

	displayFirstPage()
	{
		return (this.page - 3 > 0)
	}
	displayLastPage()
	{
		return (this.page + 3 < this.max_page)
	}

	resetTopics()
	{
		console.log('reset topic');
		if(this.page > this.max_page)
			this.page = this.max_page;

		if(this.page < 0)
			this.page = 0;

		if(this.perpage > 50)
			this.perpage = 50;
		
		if(this.perpage > this.threadsDescription.numTotalThread)
			this.perpage = this.threadsDescription.numTotalThread;

		if(this.perpage < 1)
			this.perpage = 1;

		this.threadsService.getThreads(this.page, this.perpage);
	}
	getTime(mili:number):string
	{
		let d = new Date();
		d.setTime(mili);
		return d.toLocaleString();
	}

}