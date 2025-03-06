import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../rest-api.service";
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploaded-files-new',
  templateUrl: './uploaded-files-new.component.html',
  styleUrls: ['./uploaded-files-new.component.css']
})
export class UploadedFilesNewComponent implements OnInit {

  changedMonth = null as any;
  changedYear = null as any;
  editFileMonthYearShow = false as any
  fileId = null as any;

  editFileMonthYearShowTrue(id:any){
    this.fileId = id
    this.editFileMonthYearShow = true
  }

  saveMonthYear(id:any){
    this.monthYearChangeForNullMonthYear(id)
  }

  cancel_saveMonthYear(id:any){
    this.fileId = null
    this.editFileMonthYearShow = false
    this.changedMonth = null as any
    this.changedYear = null as any;
  }

  monthYearChangeForNullMonthYear(id:any){
    if(this.changedMonth == null || this.changedMonth < 1 || this.changedMonth > 12){
      
      this.notifier.notify('error', 'Enter Month Correctly')

      return

    }

    if(this.changedYear == null || this.changedYear == 0){
      
      this.notifier.notify('error', 'Enter Year Correctly')

      return
    }

    const data = {
      'month': this.changedMonth,
      'year': this.changedYear,
      'id': id
    }

    this.rest.monthYearChangeForNullMonthYear(data).subscribe((res: any) => {
      if (res.success) {
        this.cancel_saveMonthYear(0)
        this.getAuditList();
      }
    });
  }

  month = 'all' as any
  year = 'all' as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}] as any
  YearList = [] as any


  fileTypeList = [] as any;
  fileType = 'all' as any;




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
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any

  channelId = sessionStorage.getItem("defaultChannelForAll") as any;
  channelNewList = [] as any;


  detailsshowModuleId: any

  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService, private route: Router) {
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(stringArray.length > 1){
      // this.channelId = stringArray[0]
      this.channelId = "all"
    }
   }

  ngOnInit(): void {
    // month year setup
    this.month = sessionStorage.getItem('defaultMonthForAll')
    this.year = sessionStorage.getItem('defaultYearForAll')    
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.year = new Date().getFullYear()}
    for(let yr = Number(this.year)+2; yr >= Number(this.year) -2; yr--){
      this.YearList.push(String(yr))
    }




    if(this.channelId == ''){ this.channelId = 'all'}
    this.getAllChannelNew();
    this.userId = this.common.getUserId();
    this.getFileTypeList(); 
    this.getAuditList();
    this.getUserList();
    this.clear_session_storage()
    console.log("---------->",this.userLevel)
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




  getFileTypeList(){
    let channel: any;
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(this.channelId == ''){ this.channelId = 'all'}
    if(this.channelId == "all" && stringArray.length>1){
      channel = stringArray
    }
    else{
      channel = this.channelId
    }

    const data = {
      channelName: channel,
      userId: this.userId,
      status: this.status,
      month: this.month,
      year: this.year,
    }

    this.rest.getFileTypeList(data).subscribe((res: any) => {
      if (res.success) {
        this.fileTypeList = res.response;
      }
      else{
        console.log("error in API ---> getFileTypeList ")
      }
    });
  }

  // getAuditList() {
  //   let channel: any;
  //   let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
  //   let stringArray = default_cahnnel.split(',');
  //   if(this.channelId == ''){ this.channelId = 'all'}
  //   if(this.channelId == "all" && stringArray.length>1){
  //     channel = stringArray
  //   }
  //   else{
  //     channel = this.channelId
  //   }
  //   // console.log("------------",this.channelId)
  //   this.hideDetailsData();
  //   const data = {
  //     month: this.month,
  //     year: this.year,
  //     limit: this.limit,
  //     offset: this.offset,
  //     userId: this.userId,
  //     status: this.status,
  //     // channelNewId: this.channelId
  //     channelNewId: channel,
  //     fileType: this.fileType
  //   };
  //   this.rest.getAuditList(data).subscribe((res: any) => {
  //     if (res.success) {
  //       this.auditList = res.response;
  //     }
  //   });
  // }



  getAuditList() {
    let channel: any;
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(this.channelId == ''){ this.channelId = 'all'}

    if(this.channelId == "all" && stringArray.length>1){
      channel = stringArray
    }
    else{
      channel = this.channelId
    }

    console.log("channel---->", channel)
    console.log("stringarray----->>> ", stringArray)



    let user_id = ''

    if(this.userLevel != 4){
      user_id = this.userId
    }


    // if(this.userLevel == 4){
    //   this.userId = ''
    // }
    if(this.channelId == ''){ this.channelId = 'all'}
    this.hideDetailsData();
    // const data = {
    //   limit: this.limit,
    //   offset: this.offset,
    //   userId: user_id,
    //   status: this.status,
    //   channelNewId: this.channelId
    // };

    const data = {
      month: this.month,
      year: this.year,
      limit: this.limit,
      offset: this.offset,
      userId: user_id,
      status: this.status,
      // channelNewId: this.channelId,
      channelNewId: channel,
      fileType: this.fileType
    };
    this.rest.getAuditList(data).subscribe((res: any) => {
      if (res.success) {
        this.auditList = res.response;
      }
    });
  }
  deleteRequestModal(fileId:any,modal:any){
    this.deleteId = fileId;
   
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
       this.notifier.notify('success',res.message)
        // this.common.openSnackBar(res.message)
        
      }else{
        // this.common.openSnackBar(res.message)
        this.notifier.notify('error',res.message)
        

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
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      this.downloading = false;
      

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

  editFile(id: any, fileTypeId: any, moduleId: any){
    // sessionStorage.removeItem('file_edit_id')
    // sessionStorage.removeItem('fileTypeId_edit')
    // sessionStorage.removeItem('moduleId_edit')

    this.storedata_for_editfile(id, fileTypeId, moduleId)
    // this.route.navigate(['/dashboard/edituploadedfile']);
  }

  storedata_for_editfile(id: any, fileTypeId: any, moduleId: any){
    
    sessionStorage.setItem('file_edit_id', id );
    sessionStorage.setItem('fileTypeId_edit', fileTypeId );
    sessionStorage.setItem('moduleId_edit', moduleId );

    this.route.navigate(['/dashboard/edituploadedfile']);
        
  }

  clear_session_storage(){
    sessionStorage.removeItem('file_edit_id')
    sessionStorage.removeItem('fileTypeId_edit')
    sessionStorage.removeItem('moduleId_edit')
  }
    
  

}
