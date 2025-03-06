import {Component, OnInit, ViewChild} from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {Router, RouteConfigLoadStart, RouteConfigLoadEnd} from '@angular/router';
import {CommonService} from '../common.service';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {NotifierService} from "angular-notifier";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    showPassword = false;
    username = '';
    password = '';
    userId = '' as any

    constructor(private router: Router, private rest: RestApiService,
                private common: CommonService, private ngxService: NgxUiLoaderService,
                private notifier: NotifierService) {
    }

    ngOnInit(): void {
        // this.common.islogIn();
        this.userId = this.common.getUserId();
        if(this.userId != null && this.userId != ''){
            this.router.navigate(['/dashboard/tagickpi'])
        }
        
    }


    // login(){
    //     this.router.navigate(['dashboard/tagickpi']);
    // }

    login(): any {
        if (this.username.trim() === '') {
            this.showToaster('error', 'Please enter the username');
            return false;
        }
        if (this.password.trim() === '') {
            this.showToaster('error', 'Please enter the password');
            return false;
        }
        const data = {
            username: this.username,
            passKey: this.password
        };
        const date = new Date();
        const time = date.getTime();
        this.ngxService.start();
        this.rest.login(data).subscribe((res: any) => {
            this.ngxService.stop();
            if (res.success) {
                if (res.userDetails == null) {
                    this.showToaster('error', 'User not found.');
                } else {
                    sessionStorage.setItem("tataaigstore", JSON.stringify(res.userDetails));
                    sessionStorage.setItem("aigSessionTime", String(time));
                    // sessionStorage.setItem('menuList', JSON.stringify(res.userDetails.menuList));
                    let firstUrl = res.firstUrl
                    // this.router.navigate([firstUrl]);
                    sessionStorage.setItem("columnName", 'all');
                    sessionStorage.setItem("value", '');
                    sessionStorage.setItem("current_link_name", '');
                    sessionStorage.setItem('firstLoadafterLogin', 'true')
                    sessionStorage.setItem('defaultChannelForAll', res.userDetails.channelNewId)
                    sessionStorage.setItem('accessableChannels', res.userDetails.channelNewId)
                    sessionStorage.setItem('defaultChannelNameForAll', res.userDetails.channelNewName)
                    sessionStorage.setItem("defaultYearForAll", '')
                    sessionStorage.setItem("defaultMonthForAll", '');
                    sessionStorage.setItem("vertical", res.userDetails.verticalName);
                    sessionStorage.setItem("empCode", res.userDetails.empCode);
                    
                    sessionStorage.setItem("corFlag", res.userDetails.cor_flag);


                    
                    // sessionStorage.setItem("sideNavOpenStatus", '1');
                    sessionStorage.setItem("userLevel", res.userDetails.user_type)
                    


                    this.router.navigate(['dashboard/tagickpi']);
                }
            } else {
                this.showToaster('error', 'Login Failed');
            }
        }, (err: any) => {
        });
    }

    showToaster(type: string, message: string, flag: number = 1) {
        if (flag === 1) {
            this.notifier.notify(type, message);
            setTimeout(() => {
                this.notifier.hideAll();
            }, 5000);
        } else {
            this.notifier.notify(type, message);
        }
    }
   
}
