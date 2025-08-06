import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable()
export class PassUserIdInterceptor implements HttpInterceptor {

  constructor( private common: CommonService) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }


  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   // const userId = localStorage.getItem('kpi_user_id'); // or from a service

  //   // Skip adding user ID for login API
  //   if (req.url.includes('/users/login')) {
  //     return next.handle(req);
  //   }


  //   const userId = this.common.getUserId();   

  //   if (userId) {
  //     const modifiedReq = req.clone({
  //       setHeaders: {
  //         'X-User-Id': userId
  //       }
  //     });
  //     return next.handle(modifiedReq);
  //   }

  //   return next.handle(req);
  // }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/login')) {
      console.log('Skipping login API');
      return next.handle(req);
    }else{

      const userId = this.common.getUserId();
      console.log('Intercepted Request:', req.url, '| User ID:', userId);
    
      if (userId) {
        const modifiedReq = req.clone({
          setHeaders: {
            'user_id': userId+'' // this always need a string and does not work with Int value
          }
        });
        return next.handle(modifiedReq);
      }
    
      return next.handle(req);
    }
  
  }
}
