import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { NotifierService } from 'angular-notifier';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CommonService } from 'src/app/common.service';



@Component({
  selector: 'app-manual-mapping',
  templateUrl: './manual-mapping.component.html',
  styleUrls: ['./manual-mapping.component.css']
})
export class ManualMappingComponent implements OnInit {

  subchannel = '';
  kpi_month = sessionStorage.getItem('defaultMonthForAll') as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];
  kpi_year = sessionStorage.getItem('defaultYearForAll') as any
  fYearList = [] as any
  channelNewList:any = [];
  verticalList:any = [];
  channelNew = sessionStorage.getItem("defaultChannelForAll") as any;
  verticalName = '' as any;
  channelNewName = '';
  uploadFileType = '' as any;
  mappingFileTypeId = '' as any
  mappingTaskId = '' as any
  module_name= '' as any;
  module_List: any = [];
  mapping = false;
  mappingFile = false;

  fileTypeList = [] as any
  userId =  this.common.getUserId();
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any

  

  constructor(private ngxService: NgxUiLoaderService,private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal, private common: CommonService) { }

  ngOnInit(): void {
    
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.kpi_year = new Date().getFullYear()}
    for(let yr = Number(this.kpi_year) + 2; yr >= Number(this.kpi_year) - 2; yr--){
      this.fYearList.push(yr)
    }
    
    this.getAllChannelNew();
    this.getModule();
    this.getVerticals();
    this.channelWiseMappingDetails()
  }


  channelWiseMappingDetails(){
    console.log(this.channelNew)
    if (this.channelNew == ''){ this.channelNew = 'all'}
    const data = {
      'channelNewId': this.channelNew
    }
    this.rest.channelWiseMappingDetails(data).subscribe((res: any) => {
      
      if (res.success) {
        // this.notifier.notify('success', res.message);
        this.fileTypeList = res.result
        
      }        
      if (res.success== false) {
        
        // this.notifier.notify('error', res.message);
      }
    }, 
    (err: any) => {

      // this.notifier.notify('error', 'some error occurred');
    })
  }
  
  mapfiledata(){
    this.mappingFile = true;
    const data = {
      'moduleId': this.module_name
    }
    this.rest.mapfiledata(data).subscribe((res: any) => {
      // console.log(res)
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.mappingFile = false;
      }        
      if (res.success== false) {
        this.mappingFile = false;
        this.notifier.notify('error', res.message);
      }
    }, 
    (err: any) => {
      this.mappingFile = false;

      this.notifier.notify('error', 'some error occurred');
    })
  }

  getModule(): any {
  
    this.rest.getModule().subscribe((res: any) => {
      if (res.success) {
        this.module_List = res.module
      }      
      if (res.success== false) {}
    }, 
    (err: any) => {  
    })
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
      channelNewId: this.channelNew,
    }
    this.rest.getVerticals(data).subscribe((res: any) => {
  
      if (res.success) {        
        // console.log(this.documentDetails)
        this.verticalList = res.result;
        this.channelNewName = res.channelNewName;        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }
  
  clearAll(){
    // this.kpi_year = ''
    // this.kpi_month =  ''
    // this.channelNew = ''
    // this.channelNewName = ''
    this.subchannel = ''
    this.verticalName = ''
    // this.mappingFileTypeId = ''
  }

  savekpiManually(){
    

    if(this.kpi_month == ''){
      window.alert("Month is not selected")
      return
    }
    else if(this.channelNewName== ''){
      window.alert("Channel is not selected")
      return
    }
    // else if(this.subchannel== ''){
    //   window.alert(" SubChannel is not selected")
    //   return
    // }
    else if(this.verticalName== ''){
      window.alert("Vertical is not selected")
      return
    }
    else if(this.mappingFileTypeId== ''){
      window.alert("File Type is not selected")
      return
    }

    this.ngxService.start();

    const data = {
      'userId': this.userId,
      'year':this.kpi_year,
      'month':this.kpi_month,
      'channel':this.channelNewName,
      'channelId':this.channelNew,
      'vertical':this.verticalName,
      // 'fileType':this.uploadFileType,
      'fileTypeId': this.mappingFileTypeId,
    }

    this.mapping = true;

    this.rest.mappingCall(data).subscribe((res: any) => {
      // this.ngxService.start();
      if (res.success) {
        this.ngxService.stop();
        this.notifier.notify('success', res.message);
        this.clearAll();  
        this.mapping = false;
      }

      else{
        this.notifier.notify('error', res.message);
        this.mapping = false;
        this.ngxService.stop();
      }
    }, (err: any) => {
        this.notifier.notify('error', 'some error occurred');
        this.mapping = false;
        this.ngxService.stop();
    });
  }









}

