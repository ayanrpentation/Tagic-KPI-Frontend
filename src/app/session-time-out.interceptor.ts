import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from './rest-api.service';



import { EMPTY } from 'rxjs';

@Injectable()
export class SessionTimeOutInterceptor implements HttpInterceptor {

  private readonly TIMEOUT_DURATION = 60 * 60 * 1000; // 5 minutes
  private hasLoggedOut = false;
  // userAgentId = this.common.getUserAgentId();

  constructor(private router:Router, private common: CommonService, private rest: RestApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const lastActivityTime = sessionStorage.getItem('lastActivityTime');

    if (lastActivityTime) {
      const currentTime = Date.now();
      const timeDifference = currentTime - Number(lastActivityTime);

      // Check if session expired
      // if (timeDifference > this.TIMEOUT_DURATION && this.hasLoggedOut==false) {
      if (timeDifference > this.TIMEOUT_DURATION ) {
        this.hasLoggedOut = true;
        this.logout();

        sessionStorage.clear();
        localStorage.clear();
        // sessionStorage.removeItem("lastActivityTime");
        return next.handle(request); // Prevent API execution after logout

        // sessionStorage.clear();
        // localStorage.clear();
        // return EMPTY; // Stop further request execution
      }
    }

    
    sessionStorage.setItem('lastActivityTime', Date.now().toString());

    
    return next.handle(request);
  }




  

  private logout(): void {
    sessionStorage.removeItem("columnName");
    sessionStorage.removeItem("value");
    sessionStorage.removeItem("current_link_name");

    sessionStorage.removeItem("firstLoadafterLogin");
    sessionStorage.removeItem("defaultChannelNameForAll");
    sessionStorage.removeItem("defaultChannelForAll");
    sessionStorage.removeItem("defaultMonthForAll");
    sessionStorage.removeItem("defaultYearForAll");

    sessionStorage.removeItem("aigSessionTime");
    sessionStorage.removeItem("moduleName");
    sessionStorage.removeItem("tataaigstore");
    sessionStorage.removeItem("config");
    
    localStorage.removeItem('credential');
    localStorage.removeItem('tataaigstore');
    localStorage.removeItem('aigSessionTime');
    // localStorage.removeItem('centSessionTime');


    localStorage.clear()
    sessionStorage.clear()    
    this.router.navigate(['']);
  }




}






















































// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';
// import { CommonService } from 'src/app/common.service';
// import { RestApiService } from './rest-api.service';

// @Injectable()
// export class SessionTimeOutInterceptor implements HttpInterceptor {

//   private readonly TIMEOUT_DURATION = 60 * 60 * 1000; // 1 hour
//   private hasLoggedOut = false;

//   constructor(
//     private router: Router,
//     private common: CommonService,
//     private rest: RestApiService
//   ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Skip session timeout and header logic for login requests
//     if (request.url.includes('/login')) {
//       console.log('Skipping login API');
//       return next.handle(request);
//     }

//     // --- Session Timeout Logic ---
//     const lastActivityTime = sessionStorage.getItem('lastActivityTime');
//     if (lastActivityTime) {
//       const currentTime = Date.now();
//       const timeDifference = currentTime - Number(lastActivityTime);

//       if (timeDifference > this.TIMEOUT_DURATION && !this.hasLoggedOut) {
//         this.hasLoggedOut = true;
//         this.logout();
//         sessionStorage.clear();
//         localStorage.clear();
//         // Optionally, stop further API execution after logout:
//         // return EMPTY;
//         return next.handle(request);
//       }
//     }
//     // Update last activity time
//     sessionStorage.setItem('lastActivityTime', Date.now().toString());

//     // --- User ID Header Logic ---
//     const userId = this.common.getUserId();
//     let modifiedRequest = request;
//     if (userId) {
//       modifiedRequest = request.clone({
//         setHeaders: {
//           'kpi_user_id': userId
//         }
//       });
//     }

//     return next.handle(modifiedRequest);
//   }

//   private logout(): void {
//     // Remove specific session/local storage items as needed
//     sessionStorage.removeItem("columnName");
//     sessionStorage.removeItem("value");
//     sessionStorage.removeItem("current_link_name");
//     sessionStorage.removeItem("firstLoadafterLogin");
//     sessionStorage.removeItem("defaultChannelNameForAll");
//     sessionStorage.removeItem("defaultChannelForAll");
//     sessionStorage.removeItem("defaultMonthForAll");
//     sessionStorage.removeItem("defaultYearForAll");
//     sessionStorage.removeItem("aigSessionTime");
//     sessionStorage.removeItem("moduleName");
//     sessionStorage.removeItem("tataaigstore");
//     sessionStorage.removeItem("config");
//     localStorage.removeItem('credential');
//     localStorage.removeItem('tataaigstore');
//     localStorage.removeItem('aigSessionTime');
//     localStorage.clear();
//     sessionStorage.clear();
//     this.router.navigate(['']);
//   }
// }


