import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {
  fileUpload = '/uploadBulkFile';
  constructor(private common: CommonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'POST' && request.url.search(this.fileUpload) === -1) {
      /*request = request.clone({
        body: {payload: this.common.encode(JSON.stringify(request.body))}
      });*/
      // console.log(request.headers);
    }
    return next.handle(request).pipe(map((event: HttpEvent<any>): any => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        /*event = event.clone({
          body: JSON.parse(this.common.decode(event.body.response))
        })*/
      }
      return event
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        // console.log(err);
        if (err.status === 400) {
          // redirect to the login route
          // or show a modal
          console.log('ERROR');
          // window.location.href = this.messageService.API_ROOT;
        }
      }
    }));
  }
}
