import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {


  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService) { }
  




  kpi_month = sessionStorage.getItem('defaultMonthForAll') as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];
  kpi_year = sessionStorage.getItem('defaultYearForAll') as any
  fYearList = [] as any





  taskType = 'upload';
  userType = 1;

  fileTypeId = 0;
  seqNo = 1;
  taskDetails = '';
  dayWithin = 1;
  emailId = '';
  fileTypeList:any;

  taskList:any;
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  channelNew = sessionStorage.getItem("defaultChannelForAll")
  userLevel = sessionStorage.getItem('userLevel') as any
  channelNewList = [] as any
  taskId = '' as any

  ngOnInit(): void {

    if(sessionStorage.getItem('defaultYearForAll') == ''){this.kpi_year = new Date().getFullYear()}
    for(let yr = Number(this.kpi_year) + 2; yr >= Number(this.kpi_year) - 2; yr--){
      this.fYearList.push(yr)
    }




    if (this.channelNew == ''){
      this.channelNew = 'all'
    }
    
    this.getLastSeqNo();
    this.getAllTask();
    this.getAllChannelNew();

    if(this.channelNew == ''){
      this.getAllFileType(10);
    }
    else{
      this.getFileTypeChannelWise()
    }
    
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



  getFileTypeChannelWise(){
    const data = {
      channelNewId: this.channelNew
     
    }
    this.rest.channelWiseFileDetails(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        this.fileTypeList = res.result;

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }


  getAllFileType(id:any){
    const data = {
      header_id: id
     
    }
    this.rest.getdetailsdata(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        this.fileTypeList = res.details_data;

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }

  getAllTask(){
    if (this.channelNew == ''){
      this.channelNew = 'all'
    }
    const data = {
      "channelNewId": this.channelNew,
      // 'taskType': 'all',
      'taskType': this.taskType,
      'fileType': this.fileTypeId,
      'userType': this.userType,

      'month': this.kpi_month,
      'year': this.kpi_year,
    }
    
    this.rest.getAllTask(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        this.taskList = res.allTasks;
        

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }
  getLastSeqNo(){

  }

  resetAdding(){
    this.seqNo = 1
    this.taskType = "upload"
    this.taskDetails = ''
    this.fileTypeId = 0
    this.userType = 1    
    this.emailId = ''
    // this.dayWithin = ''
    this.dayWithin = 0
  }
  addTask(){

    if(this.kpi_year == null || this.kpi_year == '' || this.kpi_year == 'all'){
      this.notifier.notify('error', 'Please Select Year')
      return
    }

    if(this.kpi_month == null || this.kpi_month == '' || this.kpi_month == 'all'){
      this.notifier.notify('error', 'Please Select Month')
      return
    }

    if(this.channelNew == null || this.channelNew == '' || this.channelNew == 'all'){
      this.notifier.notify('error', 'Please Select Channel Name')
      return
    }

    if(this.seqNo == null || this.seqNo == 0){
      this.notifier.notify('error', 'Please Enter Seq No.')
      return
    }

    // if(this.taskType == ){
    //   this.notifier.notify('error', 'Please Select Task Type')
    //   return
    // }

    if(this.taskDetails == null || this.taskDetails == ''){
      this.notifier.notify('error', 'Please Enter Task Details')
      return
    }

    if(this.fileTypeId == 0 || this.fileTypeId == null){
      this.notifier.notify('error', 'Please Select File Type')
      return
    }

    // if(this.userType == ){
    //   this.notifier.notify('error', 'Please Select Month')
    //   return
    // }

    




    const data = {

      month: this.kpi_month,
      year: this.kpi_year,



      seqNo :this.seqNo,
      taskType :this.taskType,
      taskDetails : this.taskDetails,
      fileTypeId : this.fileTypeId,
      userType :this.userType,
      channelNewId: this.channelNew,

      emailId : this.emailId,
      dayWithin :this.dayWithin
    }
    this.rest.addTask(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        // this.fileTypeList = res.details_data;
      this.notifier.notify('success', res.message);
      this.getAllTask();
      this.resetAdding()


        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }
  deleteTask(){
    const data = {
      "taskId": this.taskId
    }
    
    this.rest.deleteTask(data).subscribe((res: any) => {
  
      if (res.success) {
        this.notifier.notify('success', res.message);

        this.closeModal()
        this.getAllTask()
      }
      else{
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });


  }
  

  openDeleteModal(deleteModal: any, id:any): void {
    // this.selectedId = userId;
    // this.selectedPosition = pos;
    this.taskId = id;
    this.modalService.open(deleteModal, {centered: true});
  }
  closeModal(){
    this.modalService.dismissAll();
  }

}
