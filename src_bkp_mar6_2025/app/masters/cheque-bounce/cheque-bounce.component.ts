import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cheque-bounce',
  templateUrl: './cheque-bounce.component.html',
  styleUrls: ['./cheque-bounce.component.css']
})
export class ChequeBounceComponent implements OnInit {

  error = '' as any;
  dragAreaClass = '' as any;
  draggedFiles: any;
  cheqBounceList: any = [];
  offset = 0;
  limit = 10;
  prevDisable = true;
  nextDisable = false;

  fileUploadSub?: Subscription;
  uploadedFileName = '';
  last_uploaded_at:any;
  last_uploaded_by:any;
  upload_message:any;
  branchId:any;
  blockUpload:any;
  userId: any;

  constructor(private modalService: NgbModal, fb: FormBuilder, private rest: RestApiService, private ngxService: NgxUiLoaderService, private common: CommonService) { }

  ngOnInit(): void {
    this.branchId = this.common.getBranchId();
    this.userId = this.common.getUserId();

    this.dragAreaClass = "dragarea";
    this.getCheqBounce();
    this.checkSchedulerFileUpload();
  }
  downloadTemplate(){
    window.open(this.rest.file_path + '/template/Cheque_Bounce_ template.xlsx');
  }
  checkSchedulerFileUpload(){
    const data = {
      branchId: this.branchId,
      fileType: 'CB'
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

  getCheqBounce(flag: number = 0): any {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.cheqBounceList = [];
    }
    var data = {
      limit: this.limit,
      offset: this.offset,
    }

    this.rest.cheqbounce_fetch(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response.length == 0) {
          this.nextDisable = true;
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        } else {
          this.cheqBounceList = res.response;
        }
      } else {
        this.common.openSnackBar('Something went wrong')
      }
    });
  }
  maping_check_bounce_sql(){
    const data = {fileType: 'CB'}
    this.rest.maping_check_bounce_sql(data).subscribe((res: any) => {
      if (res.success) {
        
      } else {
        this.common.openSnackBar('Something went wrong while mapping employee code')
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
    this.getCheqBounce();
  }

  goNext(): any {
    this.offset = this.offset + this.limit;
    this.getCheqBounce();
    this.prevDisable = false;
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  uploadFile(event: any): any {
    const files = event.target.files;
    const fd = new FormData();
    fd.append('file', files[0]);
    fd.append('fileType', 'CB');
    fd.append('branchId', this.branchId);
    fd.append('userId', this.userId);
    // fd.append('companyId', this.common.getCompanyId());
    this.ngxService.start();
    this.fileUploadSub = this.rest.check_bounce(fd).subscribe((res: any) => {
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
          this.checkSchedulerFileUpload();

            this.common.openSnackBar('File uploaded successfully');

            this.getCheqBounce();
            // this.maping_check_bounce_sql()
            this.checkSchedulerFileUpload();
        } else {
            // this.common.openSnackBar('Something went wrong')
          this.common.openSnackBar(res.message)

        }
    }, (err: any) => {
        console.log(err);
    });
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
      console.log(files[0].size,files[0].name,files[0].type);
      this.draggedFiles = files;
      console.log(this.draggedFiles);
    }
  }

  reset(): void {
    
  }

  clearErr(): void {
    
  }

  openModal(addModal: any) {
    this.clearErr();
    this.modalService.open(addModal, {centered: true});
  }

  closeModal(): void {
    this.modalService.dismissAll();
    this.reset();
  }

  openDeleteModal(deleteModal: any): void {
    // this.selectedId = userId;
    // this.selectedPosition = pos;
    this.modalService.open(deleteModal, {centered: true});
  }

}
