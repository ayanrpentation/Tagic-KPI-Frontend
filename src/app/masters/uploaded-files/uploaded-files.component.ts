import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-uploaded-files',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.css']
})
export class UploadedFilesComponent implements OnInit{

  auditList: any = [];
  userList: any = [];
  modifyList: any = [];
  limit = 10;
  offset = 0;
  userId = '';
  status = '';
  isNextDisable = true;
  isPreviousDisable = false;

  fileheader = true;
  detailsDataShow = false;
  detailFileId:any;
  detailsFileTypeId:any;
  detailsData:any;
  detailColumn:any;
  totalRow = 0;
  loading = false;
  downloading = false;

  approveRejectFileId = 0;
  approveRejectFileStatus = 3;

  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService) { }

  ngOnInit(): void {
    // if(this.channelId == ''){ this.channelId = 'all'}
    // this.userId = this.common.getUserId();
    this.getAuditList();
    this.getUserList()
  }

  getAuditList() {
    // if(this.channelId == ''){ this.channelId = 'all'}
    this.hideDetailsData();
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
  openApproveRejectModal(fileId:any, status:any,modal:any){
    this.approveRejectFileId = fileId;
    this.approveRejectFileStatus = status;
    this.modalService.open(modal, {centered: true, size: 'md'});

  }
  approveRejectFile(fileId:any, status:any){
    const data = {
      fileId: fileId,
      status:status,
      approved_by: this.common.getUserId()
      
    };
    this.rest.approveRejectFile(data).subscribe((res: any) => {
      if (res.success) {
       this.getAuditList();
       this.notifier.notify('success','updated file status successfully')
      }else{
        

      }
    });
    this.closeModal();

  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  showDetailsData(fileId:any, fileTypeId:any, moduleId:any){
    this.detailFileId = fileId;
    this.fileheader = false;
    this.detailsDataShow = true;
    this.detailsFileTypeId = fileTypeId
    this.loading = true;

    const data = {
      fileId: this.detailFileId,
      fileTypeId: this.detailsFileTypeId,
      moduleId: moduleId
    };
    this.rest.getFileDetailsData(data).subscribe((res: any) => {
      if (res.success) {
        this.loading = false;

        this.detailsData = res.detailsData;
        this.detailColumn = res.detailsColumn;
        this.totalRow = res.totalRow;
      }else{
        this.loading = false;
        

      }
    });
  }
  downloadData(){
    this.downloading = true;
    const data = {
      fileId: this.detailFileId,
      fileTypeId: this.detailsFileTypeId,
    };
    this.rest.downloadFileDetailsData(data).subscribe((res: any) => {
      if (res.success) {
        console.log(this.rest.file_path +'/downloads/'+ res.fileName)
        window.open(this.rest.file_path +'/downloads/'+ res.fileName)
        this.downloading = false;

      }else{
        this.downloading = false;
        

      }
    });
  }
  getdetailsdata(id:any){
    const data = {
      header_id: id
    }
    this.rest.getdetailsdata(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        // this.fileTypeList = res.

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }
  hideDetailsData(){
    this.detailFileId = -1;
    this.fileheader = true;
    this.detailsDataShow = false;
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
