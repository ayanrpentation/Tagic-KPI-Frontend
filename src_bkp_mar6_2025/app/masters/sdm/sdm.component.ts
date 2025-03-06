import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sdm',
  templateUrl: './sdm.component.html',
  styleUrls: ['./sdm.component.css']
})
export class SdmComponent implements OnInit {

  error = '' as any;
  dragAreaClass = '' as any;
  draggedFiles: any;
  sdmList: any = [];
  offset = 0;
  limit = 10;
  prevDisable = true;
  nextDisable = false;

  fileUploadSub?: Subscription;
  uploadedFileName = '';
  branchId:any;
  userId:any;
  blockUpload =false;
  last_uploaded_at:any;
  last_uploaded_by:any;
  upload_message:any;
  error_list= false;
  error_count = 0;
  error_file :any;

  constructor(private modalService: NgbModal, fb: FormBuilder, private rest: RestApiService, private ngxService: NgxUiLoaderService, private common: CommonService) { }

  ngOnInit(): void {
    this.branchId = this.common.getBranchId();
    this.userId = this.common.getUserId();
    this.checkSchedulerFileUpload();
    this.dragAreaClass = "dragarea";
    this.getSdm();
  }
  checkSchedulerFileUpload(){
    const data = {
      branchId: this.branchId,
      fileType: 'SDM'
    }
    this.rest.checkSchedulerFileUpload(data).subscribe((res: any) => {
    
      if (res.success) {
        
        this.blockUpload = res.blockUpload;
        this.last_uploaded_at = res.last_uploaded_at;
        this.last_uploaded_by = res.last_uploaded_by;
        this.upload_message = res.message;

        
      }else{
      // this.notifier.notify('error', res.message);

      }
    }, (err: any) => {
      // this.notifier.notify('error', err.message.message);
      

    });
  }
  downloadTemplate(){
    window.open(this.rest.file_path + '/template/template_SDM.xlsx');
  }

  getSdm(flag: number = 0): any {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.sdmList = [];
    }
    var data = {
      limit: 50,
      offset: this.offset,
    }

    this.rest.sdm_fetch(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response.length == 0) {
          this.nextDisable = true;
          if (this.offset != 0){

            this.offset = this.offset - this.limit
          }
          // this.offset = this.offset - this.limit
          this.prevDisable = this.offset == 0
        } else {
          console.log(res)
          this.sdmList = res.response;
        }
      } else {
        this.common.openSnackBar('Something went wrong')
      }
    });
  }

  goPrev(): any {
    this.offset = this.offset - this.limit;
    this.prevDisable = true;
    if (this.offset <= 0) {
      this.offset = 0;
      this.prevDisable = true;
    } else {
      this.prevDisable = false;
    }
    this.getSdm();
  }

  goNext(): any {
    this.offset = this.offset + this.limit;
    this.getSdm();
    this.prevDisable = false;
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }
  mapEmployeeCode(){
    const data = {}
    this.rest.mapEmployeeCode(data).subscribe((res: any) => {
      if (res.success) {
        
      } else {
        this.common.openSnackBar('error in mapping sales with employee code')
      }
    });
  }
  saveFiles(files: FileList) {

    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
      console.log(files[0].size, files[0].name, files[0].type);
      this.draggedFiles = files;
      console.log(this.draggedFiles);
    }
  }

  uploadFile(event: any): any {
    const files = event.target.files;
    const fd = new FormData();
    fd.append('file', files[0]);
    fd.append('fileType', 'SDM');
    fd.append('branchId', this.branchId);
    fd.append('userId', this.userId);
    // fd.append('companyId', this.common.getCompanyId());
    this.ngxService.start();
    this.fileUploadSub = this.rest.sdm(fd).subscribe((res: any) => {
      this.ngxService.stop();
      if (this.fileUploadSub) {
        this.fileUploadSub.unsubscribe();
      }
      const fileUp = document.getElementById('fileUp');
      if (fileUp) {
        fileUp.removeEventListener('change', this.uploadFile);
        // this.isUpload = false;
      }
      if (res.success) {
        this.common.openSnackBar('File uploaded successfully');
        this.getSdm();
        this.checkSchedulerFileUpload();
        // this.mapEmployeeCode();
      } else {
        this.error_list = res.error_list;
          this.error_count = res.error_count;
          this.error_file = res.fileName;
          console.log(this.error_list, this.error_count, this.error_file)
        // this.common.openSnackBar('Something went wrong')
        this.common.openSnackBar(res.message)

      }
    }, (err: any) => {
      console.log(err);
    });
  }
  downloadError(){
    window.open(this.rest.file_path + '/error_details/'+ this.error_file);
  }
  reset(): void {

  }

  clearErr(): void {

  }

  openModal(addModal: any) {
    this.clearErr();
    this.modalService.open(addModal, { centered: true });
  }

  closeModal(): void {
    this.modalService.dismissAll();
    this.reset();
  }

  openDeleteModal(deleteModal: any): void {
    // this.selectedId = userId;
    // this.selectedPosition = pos;
    this.modalService.open(deleteModal, { centered: true });
  }

}
