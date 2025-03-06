import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
// import { NotifierService } from 'angular-notifier';
import { NotifierService, NotifierOptions } from 'angular-notifier';
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

  

  constructor(private ngxService: NgxUiLoaderService,private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal, private common: CommonService) {
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(stringArray.length > 1){
      // this.channelId = stringArray[0]
      this.channelNew = "all"
    }

    if(sessionStorage.getItem('defaultMonthForAll') != null){

      this.kpi_month = Number(sessionStorage.getItem('defaultMonthForAll'))
    }
    else {
      this.fixMonthYearValues()
    }
    // console.log('kpi month------------->',this.kpi_month)
    if (this.kpi_month == 0){
      this.fixMonthYearValues()
    }
   }

  ngOnInit(): void {
    this.monthString()
    
    console.log("month---> ", this.kpi_month)
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.kpi_year = new Date().getFullYear()}
    for(let yr = Number(this.kpi_year) + 2; yr >= Number(this.kpi_year) - 2; yr--){
      this.fYearList.push(yr)
    }
    
    this.getAllChannelNew();
    this.getModule();
    this.getVerticals();
    this.channelWiseMappingDetails()
    // this.showNotification()

   
  }


  fixMonthYearValues(){
    const currentMonth = new Date().getMonth() + 1;
    // console.log("currentMonthIndex---->>>",  currentMonth)

    if(currentMonth > 1){

      this.kpi_month = currentMonth - 1
      
    }
    else{
      this.kpi_month = 12
      this.kpi_year = this.kpi_year - 1

    }

    
  }



  monthString(){
    this.kpi_month =  String(this.kpi_month)
    if(this.kpi_month.length == 1){
      this.kpi_month = '0' + this.kpi_month
    }
  }


  channelWiseMappingDetails(){
    // console.log(this.channelNew)
    // if (this.channelNew == ''){ this.channelNew = 'all'}
    let channel: any;
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(this.channelNew == ''){ this.channelNew = 'all'}
    if(this.channelNew == "all" && stringArray.length>1){
      channel = stringArray
    }
    else{
      channel = this.channelNew
    }
    const data = {
      'channelNewId': channel,
      'month': this.kpi_month,
      'year': this.kpi_year,
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
    
    const data = {

    }
  
    this.rest.getModule(data).subscribe((res: any) => {
      if (res.success) {
        this.module_List = res.module
      }      
      if (res.success== false) {}
    }, 
    (err: any) => {  
    })
  }  

  getAllChannelNew() {
    const data = {
      userId : this.common.getUserId(),
    }
    this.rest.getAllChannelNew(data).subscribe((res: any) => {
      if (res.success) {
        this.channelNewList = res.data;
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

  getVerticals(){

    let channel: any;
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(this.channelNew == ''){ this.channelNew = 'all'}
    if(this.channelNew == "all" && stringArray.length>1){
      channel = stringArray
    }
    else{
      channel = this.channelNew
    }
    

    const data= {
      // channelNewId: this.channelNew,
      'channelNewId': channel,
      'month': this.kpi_month,
      'year': this.kpi_year,

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
        // window.alert(res.message)
        setTimeout(() => {
          window.alert(res.message);
        }, 200);
      }

      else{
        this.notifier.notify('error', res.message);
        this.mapping = false;
        this.ngxService.stop();
        // window.alert("Error! " + res.message)
        setTimeout(() => {
          window.alert("Error! " + res.message);
        }, 200);
      }
    }, (err: any) => {
        this.notifier.notify('error', 'some error occurred');
        this.mapping = false;
        this.ngxService.stop();
        // window.alert('some error occurred')
        setTimeout(() => {
          window.alert('some error occurred');
        }, 200);
    });
  }









  // showNotification() {
  //   this.notifier.show({
  //     type: 'success',
  //     message: 'This is a custom notification!',
  //     // Override the autoHide option to keep the notification visible until user closes it
  //     // behaviour: {
  //     //   autoHide: false, // Notification will not auto-hide
  //     //   showDismissButton: true, // Ensure the dismiss button is shown
  //     // }
  //   });
  // }



  showNotification() {
    const customOptions: NotifierOptions = {
      // type: 'success',
      // message: 'This is a custom notification!',
      behaviour: {
        autoHide: 40000, // Set to 0 to disable auto-hide, meaning it stays until dismissed
      }
    };

    this.notifier.notify('success', 'yes');
  }

  









}

