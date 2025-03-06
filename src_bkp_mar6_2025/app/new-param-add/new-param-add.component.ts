import { Component, OnInit } from '@angular/core';import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from '../rest-api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-new-param-add',
  templateUrl: './new-param-add.component.html',
  styleUrls: ['./new-param-add.component.css']
})
export class NewParamAddComponent implements OnInit {

  month = 'all' as any
  year = 'all' as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}] as any
  YearList = [] as any


  channelId = sessionStorage.getItem("defaultChannelForAll") as any;
  channelNewList = [] as any;

  parameter = 'all' as any;
  existingParamList = [] as any;
  newParamToAdd = '' as any;




  addNewParameterStatus = false as any;
  showWriteParam = false as any;

  // constructor() { }
  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService) { 
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(stringArray.length > 1){
      // this.channelId = stringArray[0]
      this.channelId = "all"
    }
  }

  ngOnInit(): void {
    // month year setup
    this.month = sessionStorage.getItem('defaultMonthForAll')
    this.year = sessionStorage.getItem('defaultYearForAll')    
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.year = new Date().getFullYear()}
    if(sessionStorage.getItem('defaultMonthForAll') == ''){this.month = 'all'}
    for(let yr = Number(this.year)+2; yr >= Number(this.year) -2; yr--){
      this.YearList.push(String(yr))
    }




    this.getAllChannelNew();
  }


  getAllChannelNew() {
    const data = {
      userId : this.common.getUserId(),
    }
    this.rest.getAllChannelNew(data).subscribe((res: any) => {
      if (res.success) {
        // console.log(this.documentDetails)
        this.channelNewList = res.data;
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

  getAllParamChannel() {
    const data = {
      userId: this.common.getUserId(),
      channelNewId: this.channelId,
    }
    this.rest.getAllChannel(data).subscribe((res: any) => {

      if (res.success) {

        this.existingParamList = res.details_data;
        // console.log(this.channelList)

      }
    }, (err: any) => {

    });
  }

  
  addNewButton(){
    // addNewParameterStatus=!addNewParameterStatus

    if(this.channelId != 'all'){
      this.addNewParameterStatus = !this.addNewParameterStatus;
    }
    else{
      window.alert("Select Channel First")
    }

  }

}
