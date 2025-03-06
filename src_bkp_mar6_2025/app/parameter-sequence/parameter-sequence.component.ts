import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parameter-sequence',
  templateUrl: './parameter-sequence.component.html',
  styleUrls: ['./parameter-sequence.component.css']
})
export class ParameterSequenceComponent implements OnInit {

  userId =  this.common.getUserId();

  month = 'all' as any
  year = 'all' as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}] as any
  YearList = [] as any;
  paramSeqDataList = [] as any;

  channelId = sessionStorage.getItem("defaultChannelForAll") as any;
  channelNewList = [] as any;

  paramSeq_edit = null as any;

  index_editrow = null as any;
  parameterChannelId_editrow = null as any;
  showEditSection_status = false as any;



  constructor( private common: CommonService, private rest: RestApiService, private notifier: NotifierService, 
    private route: Router) { 
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(stringArray.length > 1){
      // this.channelId = stringArray[0]
      this.channelId = "all"
    }
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('defaultMonthForAll') == '' || sessionStorage.getItem('defaultMonthForAll') == null){
      this.month = 'all'
    }
    else{

      this.month = sessionStorage.getItem('defaultMonthForAll') 
    }
    this.year = sessionStorage.getItem('defaultYearForAll')    
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.year = new Date().getFullYear()}
    for(let yr = Number(this.year)+2; yr >= Number(this.year) -2; yr--){
      this.YearList.push(String(yr))
    }


    if(this.channelId == ''){ this.channelId = 'all'}
    this.getAllChannelNew();
    // this.userId = this.common.getUserId();


    this.getParamSeqData()

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


  getParamSeqData(){
    // check
    // if(this.channelId == 'all'){
    //   this.notifier.notify('error', 'Please Select Channel')
    // }



    const data = {
      month: this.month,
      year: this.year,
      channelNewId: this.channelId,
      userId: this.userId,
    }

    this.rest.getParamSeqData(data).subscribe((res: any) => {
      if (res.success) {
        
        this.paramSeqDataList = res.result;
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });

  }

  editParamSeq(index:any, parameterChannelId: any, channelId: any, seq_no: any, month:any, year: any){

    const data = {
      month: month,
      year: year,
      channelId: channelId,
      parameterChannelId: parameterChannelId,

      prevSequence: seq_no,
      newSequence: this.paramSeq_edit



    }

    this.rest.editParamSeq(data).subscribe((res: any) => {
      if (res.success) {

        this.offEditInput(index,parameterChannelId)
        this.getParamSeqData()
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });


    
  }

  showEditInput(index:any, parameterChannelId: any){

    this.index_editrow = index
    this.parameterChannelId_editrow = parameterChannelId
    this.showEditSection_status = true

  }

  offEditInput(index:any, parameterChannelId: any){

    this.index_editrow = null
    this.parameterChannelId_editrow = null
    this.showEditSection_status = false
    this.paramSeq_edit = null

  }

  gotoMappedKpiPage(){
    this.route.navigate(['/dashboard/view-kpi'])
  }

}
