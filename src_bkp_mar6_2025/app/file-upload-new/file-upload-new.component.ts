import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
// import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
// import { NgxUiLoaderService } from "ngx-ui-loader";
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';


@Component({
  selector: 'app-file-upload-new',
  templateUrl: './file-upload-new.component.html',
  styleUrls: ['./file-upload-new.component.css']
})
export class FileUploadNewComponent implements OnInit {

  month = 'all' as any
  year = 'all' as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}] as any

  YearList = [] as any
  channelNewList = [] as any
  channelNew = String(sessionStorage.getItem("defaultChannelForAll")) as any
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  noPageCreated = false as any
  uploadFileType = '' as any;
  fileTypeList = [] as any 


  constructor(private rest: RestApiService, private router: Router,private common: CommonService, private notifier: NotifierService,) { 
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(stringArray.length > 1){
      // this.channelId = stringArray[0]
      this.channelNew = "all"
    }
  }

  ngOnInit(): void {
    this.month = sessionStorage.getItem('defaultMonthForAll')
    this.year = sessionStorage.getItem('defaultYearForAll')
    
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.year = new Date().getFullYear()}

    for(let yr = Number(this.year)+2; yr >= Number(this.year) -2; yr--){
      this.YearList.push(String(yr))
    }
    if(this.channelNew==''){
      this.channelNew = 'all'
    }
  
    this.getAllChannelNew();
    this.channelWiseModule();
  }
  

  getAllChannelNew() {
    const data = {
      month: this.month,
      year: this.year,
      userId : this.common.getUserId(),
    }
    this.rest.getAllChannelNew(data).subscribe((res: any) => {
      if (res.success) {
        this.channelNewList = res.data;
      }
    }, (err: any) => {
    });
  }
  

  channelWiseModule(){
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
      month: this.month,
      year: this.year,
      channelNewId: channel
     
    }
    this.rest.channelWiseModule(data).subscribe((res: any) => {
  
      if (res.success) {
        this.fileTypeList = res.result;        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

  goToCreateModule(){
    this.router.navigate(['/dashboard/createmodule'])
  }
  

  goTouploadafilePage(){  
    
    if(this.year =='' || this.year== 'all'){
      window.alert("Select Year please")
      // return
    }
    else if(this.month =='' || this.month== 'all'){
      window.alert("Select Month please")
      // return
    }

    if(this.channelNew=='' || this.channelNew== null){
      window.alert("Select Channel Name please")      
    }
    
    else if(this.uploadFileType =='' || this.uploadFileType== null){
      window.alert("Select File Type please")
    }
    
    else {
      // sessionStorage.setItem('uploadMonth', this.month)
      // sessionStorage.setItem('uploadYear', this.year)
      // console.log(typeof this.month, this.month)
      // console.log(typeof this.year, this.year)
      console.log(typeof this.uploadFileType, this.uploadFileType)
      

      // this.router.navigate(['/dashboard/upload/' + this.uploadFileType, this.month, this.year]);
      // this.router.navigate(['/dashboard/upload/' + this.uploadFileType ]);
      this.addMonthWiseControlPanel();

    } 
  }



  addMonthWiseControlPanel(){
    const data = {
      month: this.month,
      year: this.year,
      channel: this.channelNew
    }

    this.rest.addMonthWiseControlPanel(data).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/dashboard/upload/' + this.channelNew,this.uploadFileType, this.month, this.year]);
        // this.router.navigate(['/dashboard/upload/' + this.uploadFileType, this.month, this.year]);
        // this.router.navigate(['/dashboard/upload/' + this.uploadFileType ]);
      }else{
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
      this.notifier.notify('error', err.error.message);
    });
  }

    
}



