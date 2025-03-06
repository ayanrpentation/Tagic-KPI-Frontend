import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { Subscription } from 'rxjs';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-sales-target',
  templateUrl: './sales-target.component.html',
  styleUrls: ['./sales-target.component.css']
})
export class SalesTargetComponent implements OnInit {

  error = '' as any;
  dragAreaClass = '' as any;
  draggedFiles: any;
  salesList: any = [];
  offset = 0;
  limit = 10;
  prevDisable = true;
  nextDisable = false;

  fileUploadSub?: Subscription;
  uploadedFileName = '';

  branchId :any;
  userId:any;
  blockUpload:any;
  last_uploaded_at:any;
  last_uploaded_by:any;
  upload_message:any;
  file_path = this.rest.file_path;
  error_list= false;
  error_count = 0;
  error_file :any;

  constructor(private modalService: NgbModal, fb: FormBuilder, private rest: RestApiService, private ngxService: NgxUiLoaderService, private common: CommonService,private notifier: NotifierService) { }

  ngOnInit(): void {
    this.branchId = this.common.getBranchId();
    this.userId = this.common.getUserId();
    this.checkSchedulerFileUpload();
    this.dragAreaClass = "dragarea";

    this.getSalesTarget();
  }
  downloadError(){
    window.open(this.rest.file_path + '/error_details/'+ this.error_file);
  }
  checkSchedulerFileUpload(){
    const data = {
      branchId: this.branchId,
      fileType: 'ST'
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
    window.open(this.rest.file_path + '/template/template_Target.xlsx');
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
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
    this.getSalesTarget();
  }

  goNext(): any {
    this.offset = this.offset + this.limit;
    this.getSalesTarget();
    this.prevDisable = false;
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

  saveFiles(files: FileList) {

    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
      this.draggedFiles = files;
    }
  }

  uploadFile(event: any): any {
    if (this.blockUpload == false){

      const files = event.target.files;
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('fileType', 'ST');
      fd.append('branchId', this.branchId);
      fd.append('userId', this.userId);
  
  
  
      // fd.append('companyId', this.common.getCompanyId());
      this.ngxService.start();
      this.fileUploadSub = this.rest.sales_target(fd).subscribe((res: any) => {
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
          this.getSalesTarget();
          this.checkSchedulerFileUpload();
    
        } else {
          this.error_list = res.error_list;
          this.error_count = res.error_count;
          this.error_file = res.fileName;
          console.log(this.error_list, this.error_count, this.error_file)
          this.common.openSnackBar(res.message)
          // this.notifier.notify('error','')
        }
      }, (err: any) => {
        console.log(err);
      });
    }else{
      alert('file is already uploaded')
    }
  }

  getSalesTarget(flag: number = 0): any{
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.salesList = [];
    }
    var data = {
      limit: 100,
      offset: this.offset,
    }

    this.rest.sales_target_fetch(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response.length == 0) {
          this.nextDisable = true;
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        } else {
          this.salesList = res.response;
          console.log(this.salesList);
        }

      } else {
        this.common.openSnackBar('Something went wrong')
      }
    });
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
