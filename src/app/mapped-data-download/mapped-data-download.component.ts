import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-mapped-data-download',
  templateUrl: './mapped-data-download.component.html',
  styleUrls: ['./mapped-data-download.component.css']
})
export class MappedDataDownloadComponent implements OnInit {

  month = '' as any
  year = '' as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}] as any

  YearList = [] as any
  channelNewList = [] as any
  channelNew = String(sessionStorage.getItem("defaultChannelForAll")) as any
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  noPageCreated = false as any
  mapped_module = '' as any;
  fileTypeList = [] as any 
  userManualName = '' as any
  verticalValue = 'all' as any
  vertical_value_list = [] as any
  employee_code = '' as any;


  constructor(private ngxService: NgxUiLoaderService,private rest: RestApiService, private router: Router, private notifier: NotifierService, private common: CommonService) { }

  ngOnInit(): void {

    if(this.channelNew.includes(',')){
      this.channelNew = 'all'
    }
    
    this.month = sessionStorage.getItem('defaultMonthForAll')
    this.year = sessionStorage.getItem('defaultYearForAll')
    
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.year = new Date().getFullYear()}

    for(let yr = Number(this.year)+2; yr >= Number(this.year) -2; yr--){
      this.YearList.push(String(yr))
    }
    // if(this.channelNew==''){
    //   this.channelNew = 'all'
    // }
  
    this.getAllChannelNew();
    // this.channelWiseMappingModule();
    this.get_downloadMappedData_fileType()
    // console.log("channelNew ",this.channelNew)
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
    });
  }
  
  // // channelWiseMappingModule
  // channelWiseMappingModule(){
  //   const data = {
  //     channelNewId: this.channelNew
     
  //   }
  //   this.rest.channelWiseMappingModule(data).subscribe((res: any) => {
  
  //     if (res.success) {
  //       this.fileTypeList = res.result;        
  //     }
  //   }, (err: any) => {
  //     // this.notifier.notify('error', err.error.message);
  //   });
  // }
  

  goToCreateModule(){
    this.router.navigate(['/dashboard/createmodule'])
  }



  get_downloadMappedData_fileType(){
    this.vertical_value_list = []
    this.verticalValue = 'all'

    

    const data = {
      channelId: this.channelNew
     
    }
    this.rest.get_downloadMappedData_fileType(data).subscribe((res: any) => {
  
      if (res.success) {
        this.fileTypeList = res.fileType;        
      }
      else {
        if(this.channelNew != 'all'){
          this.notifier.notify('error', res.message);
        }
        
      }
    }, (err: any) => {
      this.notifier.notify('error', 'Some Error Occured');
    });
  }

  get_downloadMappedData_verticalValue(){
    this.vertical_value_list = []
    this.verticalValue = 'all'

    const data = {
      moduleId: this.mapped_module     
    }

    this.rest.get_downloadMappedData_verticalValue(data).subscribe((res: any) => {
  
      if (res.success) {
        this.vertical_value_list = res.vertical;     
      }
      else {
        // this.notifier.notify('error', res.message);
        // this.vertical_value_list = []
        // this.verticalValue = 'all'
        
      }
    }, (err: any) => {
      this.notifier.notify('error', 'Some Error Occured');
      // this.vertical_value_list = []
      // this.verticalValue = 'all'
    });
  }
  

  getMappedData(){ 
    

    if(this.channelNew=='' || this.channelNew== null){
      window.alert("Select Channel Name please")
      return      
    }
    
    else if(this.mapped_module =='' || this.mapped_module== null){
      window.alert("Select File Type please")
      return
    }
    else if(this.year =='' || this.year== null){
      window.alert("Select Year please")
      return
    }
    else if(this.month =='' || this.month== null){
      window.alert("Select Month please")
      return
    }
    // else if(this.employee_code == '' || this.employee_code == null){
    //   window.alert("Enter Employee Code")
    // }
    
    else {
      this.ngxService.start(); 
      const data = {
        moduleId: Number(this.mapped_module),
        year: Number(this.year),
        month: Number(this.month),
        channelId: Number(this.channelNew),
        vertical: this.verticalValue,
        empCode: this.employee_code,
      }

      this.rest.getMappedData(data).subscribe((res: any) => {
    
        if (res.success) {
          var filename = res.fileName
          // // this.fileTypeList = res.result; 
          // this.userManualName = res.res[0].userManualName
          window.open(this.rest.file_path + '/mapping/' + filename);
          this.ngxService.stop();         
          
        }
        else{
          this.ngxService.stop();
          this.notifier.notify('error', res.message);
        }
      }, (err: any) => {
        this.ngxService.stop();
        this.notifier.notify('error', 'Some Error Occured');
      });
      

    } 
  }

    
}