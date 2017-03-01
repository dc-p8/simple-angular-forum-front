import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http'
import { Observable, BehaviorSubject } from 'rxjs/Rx'
import { Thread } from '../classes/Thread'

@Injectable()
export class AccountService {

	private _headers:Headers = new Headers({ 'Content-Type': 'application/json' });
	private _token: string;
	private _pseudo: string;
	// Observable string Sources
	 _pseudoSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
	public pseudo$: Observable<string> = this._pseudoSource.asObservable();
	
	public getHeader():Headers{
		return this._headers;
	}

	constructor(private http: Http) {
		this._token = localStorage.getItem('token');
		this._pseudo = localStorage.getItem('pseudo');
		this._headers.append('authorization', this._token);
		this._pseudoSource.next(localStorage.getItem('pseudo') || '');
		
	}

	public logout(): void {
		this._pseudo = '';
		this._token = '';
		this._pseudoSource.next('');
		localStorage.setItem('token', this._token);
		localStorage.setItem('pseudo', this._pseudo);
	}

	public login(pseudo: string, password: string): Observable<Array<String>> {
		return this.http.post('http://localhost:3000/api/login',
			JSON.stringify({ pseudo: pseudo, password: password }),
			{ headers: this._headers })
		.map(res => {
			let data = res.json();
			console.log('receive : ' + JSON.stringify(data));
			this._headers = new Headers({
				'Content-Type': 'application/json',
				'authorization': data.token
			});
			console.log(this._pseudoSource);
			this._token = data.token;
			this._pseudo = pseudo;
			this._pseudoSource.next(pseudo);
			
			localStorage.setItem('token', this._token);
			localStorage.setItem('pseudo', this._pseudo);
			return [];
		})
		.catch(error => {
			let body;
			let err;
			if (error instanceof Response) {
				body = error.json();
				err = body.err;
			} else {
				err = ['Unexpected error'];
			}

			console.log(err);
			return Observable.of(err);
		});
	}

	public register(pseudo: string, password: string): Observable<Array<String>> {
		return this.http.post('http://localhost:3000/api/register',
			JSON.stringify({ pseudo: pseudo, password: password }),
			{ headers: this._headers })
		.map(res => {
			let data = res.json();
			console.log('receive : ' + JSON.stringify(data));
			this._headers = new Headers({
				'Content-Type': 'application/json',
				'authorization': data.token
			});
			console.log(this._pseudoSource);
			this._token = data.token;
			this._pseudo = pseudo;
			this._pseudoSource.next(pseudo);
			
			localStorage.setItem('token', this._token);
			localStorage.setItem('pseudo', this._pseudo);
			return [];
		})
		.catch(error => {
			let body;
			let err;
			if (error instanceof Response) {
				body = error.json();
				err = body.err;
			} else {
				err = ['Unexpected error'];
			}

			console.log(err);
			return Observable.of(err);
		});
	}
}
