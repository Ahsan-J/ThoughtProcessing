import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpParamsOptions, HttpRequest, HttpResponse } from '@angular/common/http';
import { takeLast } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/model/user';

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

export interface IApiParam<T = any> {
  path?: string;
  method?: HttpRequest<T>['method'];
  data?: HttpRequest<T>['body'];
  params?: HttpParamsOptions['fromObject'];
  // reportProgress?: HttpRequest<T>['reportProgress'],
  headers?: HttpRequest<T>['headers'],
  responseType?: HttpRequest<T>['responseType'],
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private user!: IUser;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      if(user) this.user = user;
    });
  }

  private getURL(params: IApiParam) {
    if (params.path) {
      if (urlRegex.test(params.path)) {
        return params.path
      }
      return `${environment['API_URL']}/${params.path}`;
    }
    else
      throw new Error('Path is undefined');

  };

  private getHeaders(params: IApiParam) {
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

  public request<T = any>(params: IApiParam, onSuccess?: Function, onFailure?: Function): Promise<HttpResponse<T>['body']> {
    return new Promise<HttpResponse<T>['body']>((resolve, reject) => {

      if (params.method?.toUpperCase() === "POST") {
        if (!params.data) params.data = {}
      }

      const requestingObject = new HttpRequest<any>(
        params.method || "GET",
        this.getURL(params),
        params.data,
        {
          params: new HttpParams({fromObject: params.params ? params.params : {}}),
          responseType: params.responseType,
          headers: this.getHeaders(params),
        }
      );

      this.http.request<T>(requestingObject).pipe(takeLast(1)).subscribe(observer => {
        if(observer instanceof HttpErrorResponse) {
          reject(observer.error);
          if(onFailure) onFailure(observer.error, params);
        }
        if(observer instanceof HttpResponse) {
          resolve(observer.body);
          if(onSuccess) onSuccess(observer.body, params);
        }
      })
    });
  }
}


