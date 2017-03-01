import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<app-account></app-account>
		<router-outlet></router-outlet>
	`
})
export class AppComponent { }
