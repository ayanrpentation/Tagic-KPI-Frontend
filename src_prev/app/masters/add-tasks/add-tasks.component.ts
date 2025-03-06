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
  
  taskType = 'upload';
  userType = 1;

  fileTypeId = 0;
  seqNo = 1;
  taskDetails = '';
  dayWithin ='';
  emailId = '';
  fileTypeList:any;

  taskList:any;
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  channelNew = sessionStorage.getItem("defaultChannelForAll")
  userLevel = sessionStorage.getItem('userLevel') as any
  channelNewList = [] as any
  taskId = '' as any

  ngOnInit(): void {
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
    this.rest.getAllChannelNew().subscribe((res: any) => {
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
      'userType': this.userType
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
    this.dayWithin = ''
  }
  addTask(){
    const data = {
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
