import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-edit-uploaded-file',
  templateUrl: './edit-uploaded-file.component.html',
  styleUrls: ['./edit-uploaded-file.component.css']
})
export class EditUploadedFileComponent implements OnInit {

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
  deleteId = 0;

  approveRejectFileId = 0;
  approveRejectFileStatus = 3;


  // data getting from common service for editing
  file_edit_id = this.common.getUploadedFile_file_edit_id()
  fileTypeId_edit =  this.common.getUploadedFile_fileTypeId_edit()
  moduleId_edit = this.common.getUploadedFile_moduleId_edit()

  isEdit = false
  editId: any

  datatodelete:any

  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService) { }

  ngOnInit(): void {
    // if(this.channelId == ''){ this.channelId = 'all'}
    this.userId = this.common.getUserId();
    this.getAuditList();
    this.getUserList();
    this.showDetailsData()
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
  deleteRequestModal(data:any,modal:any){
    this.datatodelete = data
    // this.deleteId = fileId;
   
    this.modalService.open(modal, {centered: true, size: 'md'});

  }
  sendDeleteReq(fileId:any){
    const data = {
      fileId: fileId,
      
      userId: this.userId
      
    };
    this.rest.sendDeleteReq(data).subscribe((res: any) => {
      if (res.success) {
       this.getAuditList();
      //  this.notifier.notify('success',res.message)
        this.common.openSnackBar(res.message)
        
      }else{
        this.common.openSnackBar(res.message)

        

      }
    });
    this.closeModal();

  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  showDetailsData(){
    // this.detailFileId = fileId;
    this.fileheader = false;
    this.detailsDataShow = true;
    // this.detailsFileTypeId = fileTypeId
    this.loading = true;

    const data = {
      fileId: this.file_edit_id,
      fileTypeId: this.fileTypeId_edit,
      moduleId: this.moduleId_edit
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

  editFile(id: any){
    
  }

  changeEditStatus(id: any){
    this.editId = id
    if(this.isEdit==false){
      this.isEdit = true
    }
    // else{
    //   this.isEdit = false
    // }
    // if(this.isEdit==true){
    //   this.isEdit = false
    // }
    this.isEdit = true

    // console.log("qqqqqqqqqqqqqq", this.isEdit, "editid", this.editId)
  }

  saveDatafromRow(data: any){
    this.isEdit = false
    this.editId = -1
    

    // data['file_type_id'] = this.fileTypeId_edit;
    // data['module_id'] = this.moduleId_edit;


    const data1 = {
      'data': data,
      'file_type_id': this.fileTypeId_edit,
      'module_id': this.moduleId_edit,
      'delete_flag': 0

    }
    
    // console.log("data to save", data1)

    this.rest.editDeleteFileRowData(data1).subscribe((res: any) => {
      // console.log("res---",res)
      if (res.success) {
        this.showDetailsData() // after res.success==true
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }

  deletedata(data: any){
    this.isEdit = false
    this.editId = -1
    // this.showDetailsData() // after res.success==true

    // data['file_type_id'] = this.fileTypeId_edit;
    // data['module_id'] = this.moduleId_edit;



    const data1 = {
      'data': data,
      'file_type_id': this.fileTypeId_edit,
      'module_id': this.moduleId_edit,
      'delete_flag': 1
    }

    this.rest.editDeleteFileRowData(data1).subscribe((res: any) => {
      // console.log("res---",res)
      if (res.success) {
        this.closeModal();
        this.showDetailsData() // after res.success==true
      } else {
        this.notifier.notify('error', res.message);
      }
    });
    
    console.log("data to save", data1)


  }


  cancelEdit(){
    this.isEdit = false
    this.editId = -1
    this.showDetailsData()
  }
  back(){
    window.history.go(-1)
  }

}
