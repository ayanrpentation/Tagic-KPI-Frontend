import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxUiLoaderService } from "ngx-ui-loader";
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  channelId = '';
  fileTypeId = '';
  makerId = '';
  chakerId = '';
  lastDayOfUpload = '';
  mailId = '';
  successMail = '';
  failureMail = '';
  branchId = '';
  userId = '';
  reminderNumber: any;
  reminderDays: any;
  scheduleId: any;

  channelList: any = [];
  filTypeList: any = [];
  eachDetails: any = [];
  userList: any = [];
  mailList: any = [];
  constructor(private ActivatedRoute: ActivatedRoute,private rest: RestApiService, private common: CommonService, private ngxService: NgxUiLoaderService, private modalService: NgbModal, private notifier: NotifierService,private router: Router) { }

  ngOnInit(): void {
    this.scheduleId = this.ActivatedRoute.snapshot.params.id;
    this.getChannelList()
    this.getFiltypelList()
    this.get_user_details()
    this.getScheduleOne()
    this.branchId = this.common.getBranchId();
    this.userId = this.common.getUserId();
  }
  getChannelList() {
    this.rest.getChannelList().subscribe((res: any) => {
      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.channelList = res.result;
      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  getFiltypelList() {
    this.rest.getFiltypelList().subscribe((res: any) => {
      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.filTypeList = res.result;
      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
 
  
  get_user_details() {
    this.rest.get_user_details().subscribe((res: any) => {
      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.userList = res.result;
      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  saveSchedule() {
    // let a = this.mailId.split(',')
    // for (let i = 0; i < a.length; i++) {
    //   this.mailList.push(a[i].trim())
    // }
    const data = {
      'channelId': this.channelId,
      'fileTypeId': this.fileTypeId,
      'lastDayOfUpload': this.lastDayOfUpload,
      // 'mailId': this.mailList,
      'mailId': this.mailId,
      'successMail': this.successMail,
      'failureMail': this.failureMail,
      'makerId': this.makerId,
      'chakerId': this.chakerId,
      'reminderDays': this.reminderDays,
      'reminderNumber': this.reminderNumber,
      'userId': this.userId,
      'id':this.scheduleId,
      
    }
    // console.log("data==", data)
    this.rest.editScheduler(data).subscribe((res: any) => {
      // console.log("res--",res)
      if (res.success) {
        this.notifier.notify('success', res.message)
        this.userList = res.result;
        // console.log("this.userList---",this.userList)
        this.router.navigate(['dashboard/scheduleralldetails']);
      } else {
        this.notifier.notify('error', res.eassage);
      }
    });
  }
  getScheduleOne(){
    const data = {
      'id':this.scheduleId      
    }
    this.rest.getScheduleOne(data).subscribe((res: any) => {
      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.eachDetails = res.result;
        // console.log("this.eachDetails--",this.eachDetails)
        this.channelId = this.eachDetails.mainChannelId
        this.fileTypeId = this.eachDetails.fileTypeID
        this.lastDayOfUpload = this.eachDetails.uploadWithin
        this.mailId = this.eachDetails.emailID
        this.successMail = this.eachDetails.emailBodySucees
        this.failureMail = this.eachDetails.emailBodyFailure
        this.makerId = this.eachDetails.maker
        this.chakerId = this.eachDetails.checker
        this.reminderNumber = this.eachDetails.remainderCount
        this.reminderDays = this.eachDetails.remainderDate

      } else {
        this.notifier.notify('error', res.message);
      }
    });

  }
}
