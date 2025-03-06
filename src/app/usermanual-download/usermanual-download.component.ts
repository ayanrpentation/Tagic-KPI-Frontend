import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-usermanual-download',
  templateUrl: './usermanual-download.component.html',
  styleUrls: ['./usermanual-download.component.css']
})
export class UsermanualDownloadComponent implements OnInit {

  month = '' as any
  year = '' as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}] as any

  YearList = [] as any
  channelNewList = [] as any
  channelNew = String(sessionStorage.getItem("defaultChannelForAll")) as any
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  noPageCreated = false as any
  uploadFileType = '' as any;
  fileTypeList = [] as any 
  userManualName = '' as any


  constructor(private rest: RestApiService, private router: Router,private common: CommonService) { }

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
  

  

  goToCreateModule(){
    this.router.navigate(['/dashboard/createmodule'])
  }
  

  downloadUserManual(){  

    if(this.channelNew=='' || this.channelNew== null){
      window.alert("Select Channel Name please")      
    }
    
    // else if(this.uploadFileType =='' || this.uploadFileType== null){
    //   window.alert("Select File Type please")
    // }
    
    else {
      const data = {
        channelId: this.channelNew       
      }

      this.rest.fetchUserManualName(data).subscribe((res: any) => {
    
        if (res.success) {
          // this.fileTypeList = res.result; 
          this.userManualName = res.res[0].userManualName
          // console.log(this.userManualName)

          if(this.userManualName != null || String(this.userManualName) != 'null'){
            window.open(this.rest.file_path + '/user_manual/' + this.userManualName);
          }
          else{
            window.alert('User Manual not available')
          }

          
          
          
        }
      }, (err: any) => {
        // this.notifier.notify('error', err.error.message);
      });
      

    } 
  }

    
}
