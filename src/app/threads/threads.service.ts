import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable, BehaviorSubject } from 'rxjs/Rx'
import { AccountService } from '../account/account.service';
import { ThreadsDescription } from '../classes/ThreadsDescription';
import { Post } from '../classes/Post';
import { Thread } from '../classes/Thread'; 

@Injectable()
export class ThreadsService {
    _threadsDescriptionSource:BehaviorSubject<ThreadsDescription> = new BehaviorSubject<ThreadsDescription>(new ThreadsDescription());
    public threadsDescription$:Observable<ThreadsDescription> = this._threadsDescriptionSource.asObservable();
    
    _currentThread:BehaviorSubject<Thread> = new BehaviorSubject<Thread>(null);
    public currentThread$:Observable<Thread> = this._currentThread.asObservable();

	constructor(private http: Http, private accountService:AccountService) { }

	public getThread(threadid:number): void{
		this.http.get('http://localhost:3000/api/thread/'+threadid,
			{headers:this.accountService.getHeader()})
		.map(res => {
			return res.json();
		})
		.catch((err:any) =>  Observable.throw(err.json().error || 'Server error'))
        .subscribe(data =>{
            this._currentThread.next(data);
        });
	}

	public getThreads(page:number, perpage:number):void{
        console.log('asking ' + page + ' ' + perpage);
        let uurl = 'http://localhost:3000/api/threads-'+page+'-'+perpage;
        console.log(uurl);
		this.http.get(uurl,{headers:this.accountService.getHeader()})
		.map(res => {
            return res.json();
		})
        .catch((err:any) =>  Observable.throw(err.json().error || 'Server error'))
        .subscribe(data =>{
			console.log(data);
            this._threadsDescriptionSource.next(data);
        });
	}

    public postThread(title:string, content:string):Observable<any>{
		return this.http.post('http://localhost:3000/api/threads',
			JSON.stringify({ title:title, content:content }),
			{ headers: this.accountService.getHeader() })
		.map(res => {
			let data = res.json();
			console.log('receive : ' + JSON.stringify(data));
			return data;
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
			return Observable.of({errors : err});
		});
	}

	public postMessage(id:number, content:string):Observable<any>{
		return this.http.post('http://localhost:3000/api/thread/'+id,
		JSON.stringify({content:content}),
			{ headers: this.accountService.getHeader() })
		.map(res =>{
			return res.json();
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
			return Observable.of({errs : err});
		});
	}
}
