import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-add-schedular-log',
  templateUrl: './schedular-log.component.html',
  styleUrls: ['./schedular-log.component.css']
})
export class SchedularLogComponent implements OnInit {
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

  channelList: any = [];
  filTypeList: any = [];
  userList: any = [];
  mailList: any = [];

  constructor(private rest: RestApiService, private common: CommonService, private ngxService: NgxUiLoaderService, private modalService: NgbModal, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getChannelList()
    this.getFiltypelList()
    this.get_user_details()
    this.branchId = this.common.getBranchId();
    this.userId = this.common.getUserId();
  }
  getChannelList() {
    this.rest.getChannelList().subscribe((res: any) => {
      if (res.success) {
        this.channelList = res.result;
        // console.log("this.channelList---",this.channelList)
      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  clearAll() {
    this.channelId = ''
  }
  getFiltypelList() {
    this.rest.getFiltypelList().subscribe((res: any) => {

      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.filTypeList = res.result;
        // console.log("this.filTypeList---",this.filTypeList)
        // console.log("channelId--",this.channelId)
      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  getMakerlList() { }
  getChakerlList() { }
  get_user_details() {
    this.rest.get_user_details().subscribe((res: any) => {

      // console.log("res--",res)
      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.userList = res.result;
        // console.log("this.userList---",this.userList)
      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  saveSchedule() {
    let a = this.mailId.split(',')
    for (let i = 0; i < a.length; i++) {
      this.mailList.push(a[i].trim())
    }
    const data = {
      'channelId': this.channelId,
      'fileTypeId': this.fileTypeId,
      'lastDayOfUpload': this.lastDayOfUpload,
      'mailId': this.mailList,
      'successMail': this.successMail,
      'failureMail': this.failureMail,
      'makerId': this.makerId,
      'chakerId': this.chakerId,
      'reminderDays': this.reminderDays,
      'reminderNumber': this.reminderNumber,
      'userId': this.userId
      
    }
    console.log("data==", data)
    this.rest.insert_schedulerFilelog_details(data).subscribe((res: any) => {

      // console.log("res--",res)
      if (res.success) {
        this.notifier.notify('success', res.massage)
        this.userList = res.result;
        // console.log("this.userList---",this.userList)
      } else {
        this.notifier.notify('error', res.massage);
      }
    });

  }

  // create(val: string){
  //   this.items = Number(val)
  //   console.log("this.items-----",this.items)
  //   if (this.items>5){
  //     alert("Reminder should be under 0-5");
  //   }else{ 
  //     for(let i=0;i<this.items;i++){
  //       let input = document.createElement('input')
  //       console.log("input----",input)
  //       input.className = "form-control col-2"
  //       document.querySelector(".abc")?.appendChild(input)

  //     }
  //   }
  // }
}
