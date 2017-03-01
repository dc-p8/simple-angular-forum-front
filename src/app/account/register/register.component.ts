import { Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router'
import {AccountService } from '../account.service';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {
	pseudo:string = '';
	password:string = '';
	confirm_password:string = '';
	err = [];
	sub:Subscription;

	constructor(private router: Router, private accountService:AccountService) { }
	ngOnInit()
	{
		this.sub = this.accountService.pseudo$.subscribe(res => {
			if(res)
				this.router.navigateByUrl('/threads');
		});
	}
	ngOnDestroy(){
		this.sub.unsubscribe();
	}
	onSubmit():void
	{
		this.err = [];
		
		if(this.confirm_password != this.password)
		{
			console.log('ok');
			this.err.push('mdp/confirmation ne correspond pas');
			console.log(this.err);
			return;
		}
		console.log('test');
		this.accountService.register(this.pseudo, this.password).subscribe(res => {
			console.log('rec from connservice : ' + res);
			this.err = res;
		});
	}

	destroy(i:number):void
	{
		this.err.splice(i, 1);
	}

	

}
