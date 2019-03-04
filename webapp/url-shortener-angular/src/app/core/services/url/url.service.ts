import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Url } from './../../../shared/models/url.model';
import { environment } from '../../../../environments/environment';
import { LoggerService } from '../logger.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public apiUrl = environment.apiUrl;  // URL to web api

  constructor(
    private http: HttpClient,
    private logger: LoggerService) { }

  /**
   * @description Get list of urls
   * @param noOfElements 
   * @param page 
   * @param sortBy 
   * @param sortType asc or desc
   */
  getUrlList (noOfElements:number, page:number,sortBy:string, sortType:string): Observable<Url[]> {
    const url = `${this.apiUrl}/list/${noOfElements}/${page}/${sortBy}/${sortType}`;
    return this.http.get<Url[]>(url)
      .pipe(
        tap(_ => this.log('fetched urls')),
        catchError(this.handleError('getUrlList', []))
      );
  }


  /** GET url by hash */
  getUrl(hash: string): Observable<Url> {
    const url = `${this.apiUrl}/${hash}`;
    return this.http.get<Url>(url).pipe(
      tap(_ => this.log(`fetched url with hash=${hash}`)),
      catchError(this.handleError<Url>(`getUrl hash=${hash}`))
    );
  }


  //////// Save methods //////////

  /** POST: generate a new shorten url to the server */
  generateUrl (url:string): Observable<Url> {
    const body = {url : url};
    return this.http.post<Url>(this.apiUrl, body, httpOptions).pipe(
      tap((newUrl: Url) => this.log(`added url, the hash is ${newUrl.hash}`)),
      catchError(this.handleError<Url>('generateUrl'))
    );
  }

  /** POST: insert custom shorten url to the server */
  postCustomUrl (longUrl:string, hash:string): Observable<Url> {
    const body = {url : longUrl, hash:hash};
    const url = `${this.apiUrl}/custom`;
    return this.http.post<Url>(url, body, httpOptions).pipe(
      tap((newUrl: Url) => this.log(`added url, the hash is ${newUrl.hash}`)),
      catchError(this.handleError<Url>('postCustomUrl'))
    );
  }

  /** DELETE: delete an url from the server */
  deleteUrl (removeUrl:string): Observable<boolean> {
    const url = `${removeUrl}`;

    return this.http.delete<boolean>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted url`)),
      catchError(this.handleError<boolean>('deleteUrl'))
    );
  }

 

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      this.logError(`${operation} failed: ${error.message}`);

      return of(error as T);
    };
  }

  /** Log error messages from api calls*/
  private logError(message: string) {
    this.logger.error(`Url Service (error): ${message}`);
  }
  private log(message: string) {
    this.logger.info(`Url Service (info): ${message}`);
  }

  
}