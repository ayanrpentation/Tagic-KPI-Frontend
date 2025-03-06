import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {

  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService) { }
  pendingList:any;
  deleteId:any;
  channelId = sessionStorage.getItem("defaultChannelForAll") as any;
  channelNewList = [] as any;
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  approve = 1;
  fileId = 0;
  fileTypeId = 0;
  // channelId = '' as any

  ngOnInit(): void {
    this.getPendingReq();
    this.getAllChannelNew();
  }
  getAllChannelNew() {
    console.log("came here")
    this.rest.getAllChannelNew().subscribe((res: any) => {
      if (res.success) {
        // console.log(this.documentDetails)
        this.channelNewList = res.data;
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

  approverejectReq(){
    this.closeModal();
    const data = {
      deleteId: this.deleteId,
      approve: this.approve,
      fileId: this.fileId,
      fileTypeId:this.fileTypeId,
      channelNewId: this.channelId
    }
    this.rest.approverejectReq(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success',res.message)
        this.getPendingReq();
        
      }else{
        this.notifier.notify('error',res.message)

      }
    });

  }
  getPendingReq(){
    const data = {
      channelNewId: this.channelId
    }
    
    this.rest.getPendingReq(data).subscribe((res: any) => {
      if (res.success) {
        // this.notifier.notify('success',res.message)
        this.pendingList = res.pendingRequests
      }else{
        this.notifier.notify('error',res.message)

      }
    });

  }
  openModal(id:any, approve:any,fileId:any,fileTypeId:any, channelId: any, modal:any){
    this.deleteId = id;
    this.fileId = fileId;
    this.approve = approve;
    this.fileTypeId = fileTypeId;
    this.channelId = channelId
    this.modalService.open(modal, {centered: true, size: 'md'})
  }
  closeModal(){
    this.modalService.dismissAll();
  }

}
