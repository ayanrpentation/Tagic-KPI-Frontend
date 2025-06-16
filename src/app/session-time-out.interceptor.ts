import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from 'src_prev/app/common.service';
import { RestApiService } from './rest-api.service';



import { EMPTY } from 'rxjs';

@Injectable()
export class SessionTimeOutInterceptor implements HttpInterceptor {

  private readonly TIMEOUT_DURATION = 60 * 60 * 1000; // 15 minutes
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








// @Injectable()
// export class SessionTimeoutInterceptor implements HttpInterceptor {
//   private readonly TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes
//   private hasLoggedOut = false;

//   userAgentId = this.common.getUserAgentId();

//   constructor(private router: Router, private common: CommonService, private rest:RestApiService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const lastActivityTime = sessionStorage.getItem('lastActivityTime');

//     if (lastActivityTime) {
//       const currentTime = Date.now();
//       const timeDifference = currentTime - Number(lastActivityTime);

//       // Check if session expired
//       if (timeDifference > this.TIMEOUT_DURATION && !this.hasLoggedOut) {
//         this.hasLoggedOut = true;
//         this.logout();
//         sessionStorage.clear();
//         localStorage.clear();
//         return next.handle(req); // Prevent API execution after logout
//       }
//     }
//     // else{
//     //   this.logout();
//     //   sessionStorage.clear();
//     //   localStorage.clear();
//     // }

    
//     sessionStorage.setItem('lastActivityTime', Date.now().toString());

//     return next.handle(req);

//     // Update the last activity time on every request
//   }

//   private logout(): void {
//     this.deleteDdos();

//     // Clear all session and local storage
//     sessionStorage.clear();
//     localStorage.clear();

//     // Navigate to login page
//     this.router.navigate(['/']);
//   }

//   // private deleteDdos(): void {
//   //   // Your DDOS cleanup logic here
//   //   console.log('DDOS resources cleaned');
//   // }

//   private deleteDdos() {
//     const data = {
//       userAgentId: this.userAgentId    
//     }
//     this.rest.delete_ddos(data).subscribe((res:any)=>{
//       if (res.success) {
        
//         sessionStorage.clear();
//         localStorage.clear();
//       } else {

//       }
//     });
//   }
// }
