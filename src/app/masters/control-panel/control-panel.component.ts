import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService, private router: Router) { }
  

  taskList:any;
  searchedfiletype = '' as any
  searchedfiledetails = '' as any
  listToShow = []
  taskType = 'all' as any

  resetTaskId:any;
  resetTaskSeqNo:any;
  resetTaskChannelId = '' as any
  channelNew = 'all' as any
  channelNewList = [] as any
  resetting_status = false as any
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any


  fileTypeIdToGo = '' as any
  channelIdToGo = '' as any
  moduleIdToRoute = '' as any
  uploadStatusToRoute = '' as any
  approveStatusToRoute = '' as any
  openRoutingModuleStatus = false
  taskTypeToRoute = '' as any

  uploadYear = sessionStorage.getItem('defaultYearForAll') as any
  uploadMonth = sessionStorage.getItem('defaultMonthForAll') as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];
  yearList = [] as any;





  ngOnInit(): void {
    if(sessionStorage.getItem('defaultYearForAll') == '' && sessionStorage.getItem('defaultMonthForAll') == ''){
      // this.uploadYear = new Date().getFullYear()
      this.currentMonthYear()
    }
    for(let yr = Number(this.uploadYear) + 2; yr >= Number(this.uploadYear) - 2; yr--){
      this.yearList.push(yr)

      let fy = String(yr) + "-" +String(yr+1)

      // this.fYList.push(fy)
      
    }

    // this.getAllFileType(10);
    this.channelNew = sessionStorage.getItem("defaultChannelForAll")
    if(this.channelNew.length == 0 ){
      this.channelNew = 'all'
    }
    // console.log(this.channelNew)

    this.getLastSeqNo();
    this.getAllTask();
    this.getAllChannelNew();
  }



  currentMonthYear(){
    var d = new Date();
    var mon = d.getMonth()+1;
    var yr = d.getFullYear();
    
    if (mon == 1){ // if month is January then it will show Dec of previous year
      yr = d.getFullYear()-1
      mon = 13
    }
    this.uploadMonth = mon-1 // final month to show in frontend
    
    if(String(this.uploadMonth).length<2){ 
      this.uploadMonth = '0' + String(this.uploadMonth)
    }
    else{
      this.uploadMonth = String(this.uploadMonth)
    }
    
    this.uploadYear = yr




  }
  // getAllFileType(id:any){
  //   const data = {
  //     header_id: id
     
  //   }
  //   this.rest.getdetailsdata(data).subscribe((res: any) => {
  
  //     if (res.success) {
        
  //       // console.log(this.documentDetails)
  //       this.fileTypeList = res.details_data;

        
  //     }
  //   }, (err: any) => {
  //     // this.notifier.notify('error', err.error.message);
      

  //   });
  // }

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

  getAllTask(){
    if(this.taskType==''){
      this.taskType = 'all'
    }
    if(this.channelNew==''){
      this.channelNew = 'all'
    }
    const data = {
      month: this.uploadMonth,
      year: this.uploadYear,
      channelNewId : this.channelNew,
      taskType: this.taskType
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
  
  openResetModal(taskId: any, seqNo: any, channelId:any, modal:any){
    this.resetTaskId = taskId;
    this.resetTaskSeqNo = seqNo;
    this.resetTaskChannelId = channelId
    this.modalService.open(modal, {centered: true, size: 'md'});


  }
  openModal(modal:any){
    this.modalService.open(modal,{centered: true, size: 'md'} )
  }

  createNewBatch(){
    this.resetTaskId = 0;
    this.resetTaskSeqNo = 0;
    this.resetTask();

    this.rest.createNewBatch().subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        // this.taskList = res.allTasks;
      this.notifier.notify('success', res.message);
      this.getAllTask();
      this.closeModal();


        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
    
  }
  resetTask(){

    this.resetting_status = true
    const data ={
      resetTaskId: this.resetTaskId,
      resetTaskSeqNo: this.resetTaskSeqNo,
      channelNewId: this.resetTaskChannelId
    }
    this.rest.resetTask(data).subscribe((res: any) => {
  
      if (res.success) {
        
        this.resetting_status = false
        // console.log(this.documentDetails)
        // this.taskList = res.allTasks;
      this.notifier.notify('success', res.message);
      this.getAllTask();
      this.closeModal();


        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      this.resetting_status = false
      

    });
  }
  closeModal(){
    this.modalService.dismissAll();
  }


  searchRows(){

  }

  getModuleIdbyFileType(){
    const data = {
      'fileTypeId': this.fileTypeIdToGo,
      'channelNewId' : this.channelIdToGo
    }
    this.rest.fileTypeWiseModulleDetails(data).subscribe((res: any) => {  
      if (res.success) {
        this.moduleIdToRoute = res.moduleId
      }
    }, (err: any) => {
      this.resetting_status = false
    });
  }

  openRoutingModule(fileTypeId: any, channelNewId:any, is_uploaded: any, is_approved: any, taskType: any){
    this.channelIdToGo = channelNewId
    this.fileTypeIdToGo = fileTypeId
    this.uploadStatusToRoute = is_uploaded
    this.approveStatusToRoute = is_approved
    this.taskTypeToRoute = taskType

    this.getModuleIdbyFileType()

    this.openRoutingModuleStatus = true
  }

  goToPendingUploadPage(){
    this.router.navigate(['/dashboard/upload/' + this.moduleIdToRoute ]);
  }



  goToApprovePage(){
   this.router.navigate(['/dashboard/auditnew']);
  }

  goToMappingPage(){
    this.router.navigate(['/dashboard/manualmapping']);
  }

  goToGenerateScorePage(){
    this.router.navigate(['/dashboard/generate-score']);
  }



}
