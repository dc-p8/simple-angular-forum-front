import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './account.service';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
	isAuth:Boolean = false;
	pseudo:string = '';
	password:string = '';
	err:Array<String> = [];
	sub:Subscription;

	constructor(private accountService:AccountService) { }

	ngOnInit() {
		this.sub = this.accountService.pseudo$.subscribe(
			res => {
				console.log("pseudo changed");
				
				if(res) {
					this.isAuth = true;
					this.pseudo = res;
				}
				else {
					this.isAuth = false;
					this.pseudo = null;       
				}
			});
	}
	ngOnDestroy(){
		this.sub.unsubscribe();
	}
	onSubmit(){
		this.isAuth = false;
		this.err = [];
		console.log('log in');
		this.accountService.login(this.pseudo, this.password).subscribe(res => {
			if(res)
			{
				this.pseudo = '';
				this.password = '';
				this.err = res;
				console.log('res : ' + JSON.stringify(res));
				console.log(res.length);
			}
		});
	}
	destroy(i:number){
		this.err.splice(i, 1);
	}
	onDisconnect()
	{
		this.accountService.logout();
	}
}
