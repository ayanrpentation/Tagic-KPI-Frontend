import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
// import { CommonService } from 'src/app/common.service';
import { CommonService } from '../../common.service';
// import { RestApiService } from 'src/app/rest-api.service';
import { RestApiService } from "../../rest-api.service";
import { Subscription } from 'rxjs';
import { NotifierService } from "angular-notifier";

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ConsoleReporter } from 'jasmine';




@Component({
  selector: 'app-upload-all-file',
  templateUrl: './upload-all-file.component.html',
  styleUrls: ['./upload-all-file.component.css']
})
export class UploadAllFileComponent implements OnInit {
  error = '' as any;
  dragAreaClass = '' as any;
  draggedFiles: any;
  tableData: any = [];
  columnList: any = [];

  offset = 0;
  limit = 10;
  prevDisable = true;
  nextDisable = false;

  fileUploadSub?: Subscription;
  uploadedFileName = '';

  branchId: any;
  userId: any;
  blockUpload: any;
  addToExistingFlag: any;
  last_uploaded_at: any;
  last_uploaded_by: any;
  upload_message: any;
  file_path = this.rest.file_path;
  error_list = false;
  error_count = 0;
  error_file: any;
  moduleId: any;
  moduleName: any;
  templateName: any;
  verticalList: any;
  verticalName: any;

  uploadingStatus = false
  showError = false
  errorDataDownload = false

  errorMessage = '' as any
  dataError = '' as any

  // uploadYear = ''
  // uploadMonth = ''

  // uploadYear = this.ActivatedRoute.snapshot.params.year
  uploadYear = this.ActivatedRoute.snapshot.paramMap.get('year')
  uploadMonth = this.ActivatedRoute.snapshot.paramMap.get('month')

  // uploadYear = sessionStorage.getItem('uploadYear')
  // uploadMonth = sessionStorage.getItem('uploadMonth')


  month = ''
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];




  
  

  constructor(
    private ActivatedRoute: ActivatedRoute, 
    private modalService: NgbModal, 
    fb: FormBuilder, 
    private rest: RestApiService, 
    private ngxService: NgxUiLoaderService, 
    private common: CommonService, 
    private notifier: NotifierService, 
    private route: Router
    ) { 
      // this.notifier = notifier;
      // // behaviour: {
      // //   autoHide: 5000,
      // // }
      
    }

  ngOnInit(): void {

    // this.ActivatedRoute.queryParams.subscribe((params: Params) => {
    //   console.log(this.uploadMonth, this.uploadYear);
    // });




    this.moduleId = this.ActivatedRoute.snapshot.params.id;
    console.log(this.moduleId)
    // location.reload();
    this.branchId = this.common.getBranchId();
    this.userId = this.common.getUserId();
    this.checkSchedulerFileUpload();
    this.dragAreaClass = "dragarea";
    this.getModuleData();
    this.getFilesData();
    for(let mon of this.monthList){
      if (mon.id == this.uploadMonth){
        this.month = mon.name
      }
    }

    // this.ActivatedRoute.paramMap.subscribe(params => { this.moduleId = params.get('id'); });

  }
  downloadError() {
    window.open(this.rest.file_path + '/error_details/' + this.error_file);
  }
  checkSchedulerFileUpload() {
    const data = {
      branchId: this.branchId,
      // fileType: 'ST'
      moduleId: this.moduleId
    }
    this.rest.checkSchedulerFileUpload(data).subscribe((res: any) => {

      if (res.success) {

        this.blockUpload = res.blockUpload;
        this.last_uploaded_at = res.last_uploaded_at;
        this.last_uploaded_by = res.last_uploaded_by;
        this.upload_message = res.message;


      } else {
        // this.notifier.notify('error', res.message);

      }
    }, (err: any) => {
      // this.notifier.notify('error', err.message.message);


    });
  }
  downloadTemplate() {
    // window.open(this.rest.file_path + '/template/template_Target.xlsx');
    window.open(this.rest.file_path + '/template/' + this.templateName);
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
    this.getFilesData();
  }

  goNext(): any {
    this.offset = this.offset + this.limit;
    this.getFilesData();
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
  uploadFileNormal(event: any): any {

    this.uploadingStatus = true
      const fd = new FormData();
      const files = event.target.files;
      // console.log("file details", files)
      fd.append('file', files[0]);
      fd.append('moduleId', this.moduleId);
      fd.append('branchId', this.branchId);
      fd.append('userId', this.userId);
      fd.append('addDataToExisting', '0');
      // fd.append('uploadYear', this.uploadYear);
      // fd.append('uploadMonth', this.uploadMonth);


      this.ngxService.start();
      this.fileUploadSub = this.rest.uploadFile(fd).subscribe((res: any) => {
        this.ngxService.stop();
        if (this.fileUploadSub) {
          this.fileUploadSub.unsubscribe();
        }
        const fileUp = document.getElementById('fileUp');
        if (fileUp) {
          fileUp.removeEventListener('change', this.uploadFileNormal);
        }
        if (res.success) {
          this.uploadingStatus = false

          // this.common.openSnackBar('File uploaded successfully');
          this.notifier.notify('success', 'File uploaded successfully')
          this.getFilesData();
          this.checkSchedulerFileUpload();
          this.error_list = false

        } else {
          this.dataError = res
          this.uploadingStatus = false
          // this.showError = true
          this.error_list = res.response.error_list;
          this.error_count = res.response.error_count;
          this.error_file = res.response.fileName;

          this.errorDataDownload = true
          this.errorMessage = res.message
          this.showError = true
          // this.common.openSnackBar(res.response.message)
          this.notifier.notify('error', res.response.message)
          // this.notifier.show({
          //   message: 'Hi there!',
          //   type: 'info',
          // });
        }
      }, 
      (err: any) => {
        this.uploadingStatus = false
        this.showError = true
        console.log(err);
      });
  }

  uploadFileAddToExisting(event: any): any {

    this.uploadingStatus = true
      const fd = new FormData();
      const files = event.target.files;
      fd.append('file', files[0]);
      fd.append('moduleId', this.moduleId);
      fd.append('branchId', this.branchId);
      fd.append('userId', this.userId);
      fd.append('addDataToExisting', '1');
      // fd.append('uploadYear', this.uploadYear);
      // fd.append('uploadMonth', this.uploadMonth);

      this.ngxService.start();
      this.fileUploadSub = this.rest.uploadFile(fd).subscribe((res: any) => {
        this.ngxService.stop();
        if (this.fileUploadSub) {
          this.fileUploadSub.unsubscribe();
        }
        const fileUp = document.getElementById('fileUp');
        if (fileUp) {
          fileUp.removeEventListener('change', this.uploadFileAddToExisting);
        }
        if (res.success) {
          this.uploadingStatus = false

          // this.common.openSnackBar('File uploaded successfully');
          this.notifier.notify('success', 'File uploaded successfully')
          this.getFilesData();
          this.checkSchedulerFileUpload();
          this.error_list = false

        } else {
          this.errorMessage = res.message
          // console.log("0000000000000000000000000000",this.errorMessage)
          this.uploadingStatus = false
          this.showError = true
          this.error_list = res.response.error_list;
          this.error_count = res.response.error_count;
          this.error_file = res.response.fileName;
          
         
          this.errorDataDownload = true
          // this.common.openSnackBar(res.response.message)
          this.notifier.notify('error', res.response.message)
        }
      }, 
      (err: any) => {
        this.uploadingStatus = false
        this.showError = true
        this.errorMessage = ''
        console.log(err);
      }
      );
  }


  getFilesData(flag: number = 0): any {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.tableData = [];
    }
    var data = {
      limit: 100,
      offset: this.offset,
      moduleId: this.moduleId
    }

    // this.rest.sales_target_fetch(data).subscribe((res: any) => {
    this.rest.fetchAllTableData(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response.length == 0) {
          this.nextDisable = true;
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        } else {
          this.tableData = res.response;
          // console.log(this.tableData);
        }

      } else {
        // this.common.openSnackBar('Something went wrong')
        this.notifier.notify('error', 'Something went wrong')
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

  getModuleData() {
    const data = {
      moduleId: this.moduleId
    }
    this.rest.getModuleData(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res---", res)
        this.moduleName = res.moduleName
        this.columnList = res.columnList
        this.templateName = res.templateName
        this.addToExistingFlag = res.addToExistingFlag

      } else {
        // this.common.openSnackBar('Something went wrong')
        this.notifier.notify('error', 'Something went wrong')
      }
    });
  }


  addOverExisting(){
    this.blockUpload = false
    // this.common.openSnackBar('Now you can upload file with existing data');
    this.notifier.notify('success', 'Now you can upload file with existing data')
  }
  gotoFileUploadMother(){
    
    // if (this.moduleId != '256' || this.moduleId != '257'){
    //   this.route.navigate(['/dashboard/fileupload'])
    // }
    if(this.moduleId == '256' || this.moduleId == '257'){
      this.route.navigate(['/dashboard/corUpload'])
    }
    else{
      this.route.navigate(['/dashboard/fileupload'])
    }
    // this.route.navigate(['/dashboard/fileupload'])
  }

  closeErrorModal(){
    this.showError = false
    this.errorMessage = ''
    // this.ngOnInit()
    // window.location = window.location
    // if(this.error_list != true){
    //   this.route.navigate([window.location])
    // }
    
  }
  reload(){
    window.location = window.location
    this.route.navigate([window.location])
  }
}
