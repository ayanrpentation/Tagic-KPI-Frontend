import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-audit-file',
  templateUrl: './audit-file.component.html',
  styleUrls: ['./audit-file.component.css']
})
export class AuditFileComponent implements OnInit {

  auditList: any = [];
  userList: any = [];
  modifyList: any = [];
  limit = 10;
  offset = 0;
  userId = '';
  status = '';
  isNextDisable = true;
  isPreviousDisable = false;
  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService) { }

  ngOnInit(): void {
    // if(this.channelId == ''){ this.channelId = 'all'}
    // this.userId = this.common.getUserId();
    this.getAuditList();
    this.getUserList()
  }

  getAuditList() {
    // if(this.channelId == ''){ this.channelId = 'all'}
    const data = {
      limit: this.limit,
      offset: this.offset,
      userId: this.userId,
      status: this.status
    };
    this.rest.getAuditList(data).subscribe((res: any) => {
      if (res.success) {
        this.auditList = res.response;
      }
    });
  }

  getUserList() {
    this.rest.userList({searchText: ''}).subscribe((res: any) => {
      if (res.success) {
        this.userList = res.response;
      }
    })
  }

  onUserChnage() {
    this.offset = 0;
    this.getAuditList();
  }

  onErrorDownload(fileName: string) {
    window.open(this.rest.file_path + '/error_details/' + fileName, '_blank');
  }

  showModification(data: any, detailsModal: any) {
    this.modifyList = data;
    this.modalService.open(detailsModal, {centered: true, size: 'md'});
  }

}
