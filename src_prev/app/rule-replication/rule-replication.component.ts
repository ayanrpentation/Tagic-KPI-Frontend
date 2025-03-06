import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-rule-replication',
  templateUrl: './rule-replication.component.html',
  styleUrls: ['./rule-replication.component.css']
})
export class RuleReplicationComponent implements OnInit {


  dropdownSettings_paramChannel:IDropdownSettings = {};

  verticalList = [] as any
  
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  
  fullreplicationstatus = true
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];
  yearList = [] as any
  fullYear: number = new Date().getFullYear();
  channelNewList = [] as any
  paramChannelList = [] as any
  designationList = [] as any


  // full replication
  f_Channel = sessionStorage.getItem('defaultChannelForAll') as any
  f_fromYear = sessionStorage.getItem('defaultYearForAll') as any
  f_fromMonth = sessionStorage.getItem('defaultMonthForAll') as any
  f_toYear = '' as any
  f_toMonth = '' as any

  // selective replication
  // s_channelId = '' as any
  // s_toChannel = '' as any
  // s_tpVertical = '' as any

  s_fromYear = sessionStorage.getItem('defaultYearForAll') as any
  s_fromMonth = sessionStorage.getItem('defaultMonthForAll') as any
  s_Channel = sessionStorage.getItem('defaultChannelForAll') as any
  s_Vertical = '' as any
  s_ParamChannel = [] as any
  s_toYear = '' as any
  s_toMonth = '' as any
  s_designation = 'all' as any
  

  fullRmonth_checking_status = false
  fullRmonth_checking_msg = ''
  fullRmonth_granted = false
  fullgrantButtonStatus = false
  selectivegrantButtonStatus = false




  constructor(private ngxService: NgxUiLoaderService,private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log(this.s_fromMonth, this.s_fromYear)
    for (var i = this.fullYear + 2; i >= this.fullYear-2; i--) {
      this.yearList.push(i);
    }

    this.getAllChannelNew()
    this.getVerticals()
    this.getDistParameterList()
    this.dropdownSettings_paramChannel = { 
      idField: 'kpiParameterChannelId',
      textField: 'kpiParameterChannelName',
      allowSearchFilter: true,
      enableCheckAll:true, 
      itemsShowLimit: 1 
    };

  }


  fullRchecking(){
    var fromYm = Number(this.f_fromYear)*12 + Number(this.f_fromMonth)
    var toYm = Number(this.f_toYear)*12 + Number(this.f_toMonth)

    if(toYm-fromYm == 0 ){
      this.fullRmonth_checking_status = true
      this.fullRmonth_checking_msg = 'From Date and To Date are same'
      // return
    }
    else if(toYm-fromYm < 0 ){
      this.fullRmonth_checking_status = true
      this.fullRmonth_checking_msg = 'You are trying to replicate backword. Do you really want to carry on this replication?'
      this.fullgrantButtonStatus = true
    }
    else if(toYm-fromYm > 1 ){
      this.fullRmonth_checking_status = true
      this.fullRmonth_checking_msg = 'Do you really carry on this replication?'
      this.fullgrantButtonStatus = true

    }
    else if(toYm-fromYm == 1 ){
      this.fullRmonth_checking_status = false
      this.fullReplication()
    }
    

    // console.log("~~~~~~~~~~~~~~~~>>>>>>>",this.fullRmonth_checking_msg)
  }

  selectiveRchecking(){
    var fromYm = Number(this.s_fromYear)*12 + Number(this.s_fromMonth)
    var toYm = Number(this.s_toYear)*12 + Number(this.s_toMonth)

    if(toYm-fromYm == 0 ){
      this.fullRmonth_checking_status = true
      this.fullRmonth_checking_msg = 'From Date and To Date are same'
      // return
    }
    else if(toYm-fromYm < 0 ){
      this.fullRmonth_checking_status = true
      this.fullRmonth_checking_msg = 'You are trying to replicate backword. Do you really want to carry on this replication?'
      this.selectivegrantButtonStatus = true
    }
    else if(toYm-fromYm > 1 ){
      this.fullRmonth_checking_status = true
      this.fullRmonth_checking_msg = 'Do you really carry on this replication?'
      this.selectivegrantButtonStatus = true
    }
    else if(toYm-fromYm == 1 ){
      this.fullRmonth_checking_status = false
      this.selectiveReplication()
    }
  }

  clearfullReplication(){
    this.f_toMonth = ''
    this.f_toYear = ''
  }


  fullReplication(){

    // this.ngxService.start();
    const data = {
      fromMonth: this.f_fromMonth,
      fromYear: this.f_fromYear,
      toMonth: this.f_toMonth,
      toYear: this.f_toYear,
      channelNewId: this.f_Channel
    }

    this.rest.allKpiRuleCopy(data).subscribe((res: any) => {
  
      if (res.success) {
        // this.ngxService.stop();
        this.notifier.notify('success', 'Parameter Replication Successful');
        this.fullRmonth_checking_status = false
      }
      else{
        // this.ngxService.stop();
        this.notifier.notify('error', 'Error Occurred');
        this.fullRmonth_checking_status = false
      }
    }, (err: any) => {
      // this.ngxService.stop();
      this.notifier.notify('error', 'Technical Error Occurred');
      this.fullRmonth_checking_status = false
      // this.notifier.notify('error', err.error.message);
      

    });

    this.fullgrantButtonStatus = false



    // this.fullRmonth_granted = false
  }
  clearSelectiveSelection(){
    this.s_toMonth = ''
    this.s_toYear = ''
    this.s_Vertical = ''
    this.s_ParamChannel = []
  }

  selectiveReplication(){   

    const data = {
      fromMonth: this.s_fromMonth,
      fromYear: this.s_fromYear,
      toMonth: this.s_toMonth,
      toYear: this.s_toYear,
      channelNewId: this.s_Channel,
      verticalId: this.s_Vertical,
      parameterChannelId: this.s_ParamChannel,
      designationId: []
      // designationId: [this.s_designation]
    }

    this.rest.selectiveKpiRuleCopy(data).subscribe((res: any) => {
  
      if (res.success) {
        // this.ngxService.stop();
        this.notifier.notify('success', 'Parameter Replication Successful');
        this.fullRmonth_checking_status = false
        this.clearSelectiveSelection()
      }
      else{
        // this.ngxService.stop();
        this.notifier.notify('error', 'Error Occurred');
        this.fullRmonth_checking_status = false
      }
    }, (err: any) => {
      // this.ngxService.stop();
      this.notifier.notify('error', 'Technical Error Occurred');
      this.fullRmonth_checking_status = false
      // this.notifier.notify('error', err.error.message);
      

    });

    this.selectivegrantButtonStatus = false

  }


  getVerticalsFrom(){

  }

  getVerticalsTo(){
    
  }



  getAllChannelNew() {
    this.rest.getAllChannelNew().subscribe((res: any) => {
      if (res.success) {
        this.channelNewList = res.data;
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

  getVerticals(){
    const data= {
      channelNewId: this.s_Channel,
    }
    this.rest.getVerticals(data).subscribe((res: any) => {  
      if (res.success) {        
        this.verticalList = res.result;        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

  getDistParameterList(){

    const data= {
      fromMonth: 'all',
      fromYear: 'all',
      channelNewId: this.s_Channel,
      verticalId: this.s_Vertical,
    }
    this.rest.getDistParameterList(data).subscribe((res: any) => {  
      if (res.success) {        
        this.paramChannelList = res.distParamList;        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

}
