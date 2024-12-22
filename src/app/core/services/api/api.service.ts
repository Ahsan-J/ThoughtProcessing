import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpParamsOptions, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from '@/core/services/auth.service';
import { IUser } from '@/core/models/user/user.model';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ObjectType } from '@/core/types/collection.types';

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

export interface IApiParam<T = ObjectType> {
	path?: string;
	method?: HttpRequest<T>['method'];
	data?: HttpRequest<T>['body'];
	params?: HttpParamsOptions['fromObject'];
	headers?: HttpRequest<T>['headers'],
	responseType?: HttpRequest<T>['responseType'],
}

@Injectable({
	providedIn: 'root',
})
export class ApiService {

	private user!: IUser;

	private get baseURL(): string {
		return process.env['API_URL'] as string;
	}

	constructor(private http: HttpClient, private authService: AuthService) {
		this.authService.user$.subscribe(user => {
			if (user) this.user = user;
		});
	}

	private getURL<T = ObjectType>(params: IApiParam<T>) {
		if (params.path) {

			if (urlRegex.test(params.path)) {
				return params.path
			}

			return `${this.baseURL}/${params.path}`;
		}
		else
			throw new Error('Path is undefined');

	};

	private getHeaders<T = ObjectType>(params: IApiParam<T>) {
		const access_token = this.user?.access_token;

		let headers = new HttpHeaders({
			Accept: "application/json",
		});

		if (!(params.data instanceof FormData)) {
			headers = headers.set('Content-Type', "application/json")
		}

		if (access_token) {
			headers = headers.set('Authorization', `Bearer ${access_token}`);
		}

		return headers;
	};

	private handleResponse<R>(value: HttpEvent<R>): HttpResponse<R> {
		if(value instanceof HttpResponse) return value;
    throw value
	}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));  // Return an observable with a user-facing error message
  }

	private getRequest<Q = ObjectType>(params: IApiParam<Q>): HttpRequest<IApiParam<Q>['data']> {
		if (params.method?.toUpperCase() === "POST") {
			if (!params.data) params.data = null
		}

		return new HttpRequest<IApiParam<Q>['data']>(
			params.method || "GET",
			this.getURL(params),
			params.data,
			{
				params: new HttpParams({ fromObject: params.params ? params.params : {} }),
				responseType: params.responseType,
				headers: this.getHeaders(params),
			}
		);
	}

	public request<Q = ObjectType, R = ObjectType>(params: IApiParam<Q>): Observable<HttpResponse<R>> {
		const requestingObject = this.getRequest(params);

		return this.http.request<R>(requestingObject).pipe(
			retry(3),
			map(this.handleResponse),
			catchError(this.handleError)
		);

	}
}


