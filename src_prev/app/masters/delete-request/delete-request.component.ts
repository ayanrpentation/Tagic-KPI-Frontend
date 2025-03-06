import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-delete-request',
  templateUrl: './delete-request.component.html',
  styleUrls: ['./delete-request.component.css']
})
export class DeleteRequestComponent implements OnInit {

  channelId = sessionStorage.getItem("defaultChannelForAll") as any;
  channelNewList = [] as any;
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  
  userId = '';
  status = '';
  deleteReqList: any;

  approveRejectFileId = 0;
  approveRejectFileStatus = 3;

  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService) { }

  ngOnInit(): void {
    if(this.channelId == ''){ this.channelId = 'all'}
    this.getAllChannelNew();
    this.userId = this.common.getUserId();
    this.getAllDelReq();
    
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


  getAllDelReq() {
    if(this.channelId == ''){ this.channelId = 'all'}
    
    const data = {
      
      userId: this.userId,
      status: this.status,
      channelNewId: this.channelId
    };
    this.rest.getAllDelReq(data).subscribe((res: any) => {
      if (res.success) {
        this.deleteReqList = res.deleteRequests;
      }
    });
  }
  
  

  closeModal(): void {
    this.modalService.dismissAll();
  }

  
  

}
