import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-auditfilenew',
  templateUrl: './auditfilenew.component.html',
  styleUrls: ['./auditfilenew.component.css']
})
export class AuditfilenewComponent implements OnInit {

  auditList: any = [];
  userList: any = [];
  modifyList: any = [];
  limit = 10;
  offset = 0;
  userId = '';
  status = '';
  isNextDisable = true;
  isPreviousDisable = false;
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any

  fileheader = true;
  detailsDataShow = false;
  detailFileId:any;
  detailsFileTypeId:any;
  detailsData:any;
  detailColumn:any;
  totalRow = 0;
  loading = false;
  downloading = false;

  detailsshowModuleId :any;

  approveRejectFileId = 0;
  approveRejectFileStatus = 1;
  approveRejectFileTypeId:any;
  channelId = sessionStorage.getItem("defaultChannelForAll") as any;
  channelNewList = [] as any;



  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getAllChannelNew();
    if(this.channelId == ''){ this.channelId = 'all'}
    // this.userId = this.common.getUserId();
    this.getAuditList();
    this.getUserList()
  }

  getAuditList() {
    if(this.channelId == ''){ this.channelId = 'all'}
    this.hideDetailsData();
    const data = {
      limit: this.limit,
      offset: this.offset,
      userId: this.userId,
      status: this.status,
      channelNewId: this.channelId
    };
    this.rest.getAuditList(data).subscribe((res: any) => {
      if (res.success) {
        this.auditList = res.response;
      }
    });
  }
  openApproveRejectModal(fileId:any, status:any,modal:any, fileTypeId:any){
    this.approveRejectFileId = fileId;
    this.approveRejectFileStatus = status;
    this.approveRejectFileTypeId = fileTypeId
    this.modalService.open(modal, {centered: true, size: 'md'});

  }
  approveRejectFile(fileId:any, status:any){
    const data = {
      fileId: fileId,
      status:status,
      fileTypeId: this.approveRejectFileTypeId,
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
    this.detailsshowModuleId = moduleId;

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
      moduleId: this.detailsshowModuleId
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
    this.detailColumn = []
    this.detailsData = []
    this.totalRow = 0
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

}
