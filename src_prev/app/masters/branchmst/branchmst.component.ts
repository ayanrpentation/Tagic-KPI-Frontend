import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-branchmst',
  templateUrl: './branchmst.component.html',
  styleUrls: ['./branchmst.component.css']
})
export class BranchmstComponent implements OnInit {
  branchDataList: any = [];
  showAction = -1;
  columnList: any = [];
  columnName = 'all';
  searchValue = '';
  deleteBranchId: any;
  moduleId: any;
  offset = 0;
  limit = 10;
  prevDisable = true;
  nextDisable = false;

  isedit = false;
  editId = 0;

  editBranchCode = '';
  editCity = '';
  editTagicLocationType = '';
  editTagicLocationTypCommercial = '';
  editTagicZone = '';
  editState = '';
  editClZone = '';
  editVertical = '';
  editStateCd = '';
  editZone = '';
  editCluster = '';
  stateList: any = [];
  
  constructor(private ngxService: NgxUiLoaderService, private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.moduleId =  this.common.getBranchMasterId()
    // this.getBranchDetails();
    this.genericFilter();
    this.getColumnName();
  }
  addBranch() {
    this.router.navigate(['dashboard/addbranch']);
  }
  changeValue(id: any) {
    if (this.editId == id) {
      const data = {
        'id': id,
        'branchCode': this.editBranchCode,
        'city': this.editCity,
        'tagicLocationType': this.editTagicLocationType,
        'tagicLocationTypCommercial': this.editTagicLocationTypCommercial,
        'tagicZone': this.editTagicZone,
        'tagicStateId': this.editState,
        'clZone': this.editClZone,
        'vertical': this.editVertical,
        'stateCd': this.editStateCd,
        'zone': this.editZone,
        'cluster': this.editCluster
      }
      // console.log("data---",data)
      this.rest.editBranchData(data).subscribe((res: any) => {
        if (res.success) {
          this.notifier.notify('success', res.message);
          this.isedit = false;
          this.genericFilter();
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }
  }
  editBranch(itemId: any, branchCode: any, city: any, tagicLocationType: any, tagicLocationTypCommercial: any, tagicZone: any, state: any, clZone: any, vertical: any, stateCd: any, zone: any, cluster: any) {
    if (this.isedit == false) {
      this.isedit = true;
      this.editId = itemId;
      this.editBranchCode = branchCode;
      this.editCity = city;
      this.editTagicLocationType = tagicLocationType;
      this.editTagicLocationTypCommercial = tagicLocationTypCommercial;
      this.editTagicZone = tagicZone;
      this.editState = state;
      this.editClZone = clZone;
      this.editVertical = vertical;
      this.editStateCd = stateCd;
      this.editZone = zone;
      this.editCluster = cluster;
    }
    this.getState();
  }
  // getBranchDetails(){

  //   this.rest.getBranchDetails().subscribe((res:any)=>{
  //     // console.log("res---",res)
  //     if (res.success) {
  //       this.branchDataList = res.result
  //     }else{
  //       this.notifier.notify('error', res.message);
  //     }
  //   });
  // }

  deleteItem() {
    const data = {
      id: this.deleteBranchId,
    }
    this.rest.deleteBranchData(data).subscribe((res: any) => {
      if (res.success) {
        this.closeModal();
        this.notifier.notify('success', 'deleted successfully');
        // this.getBranchDetails();
        this.genericFilter();
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  closeModal(): void {
    this.modalService.dismissAll();
    // this.reset();
  }
  openDeleteModal(deleteModal: any, itemId: any): void {
    if (this.isedit == false) {
    this.deleteBranchId = itemId;
    this.modalService.open(deleteModal, { centered: true });
  }
  }
  uploadFile(event: any): any {
    const fd = new FormData();
    const files = event.target.files;
    fd.append('file', files[0]);
    this.ngxService.start();
    this.rest.branchUpload(fd).subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        this.notifier.notify('success', res.message);
        this.genericFilter();
      } else {
        this.ngxService.stop();
        this.notifier.notify('error', res.message);
      }
    });
  }
  getColumnName() {
    const data = {
      'moduleId': this.moduleId,
    }
    this.rest.getColumnName(data).subscribe((res: any) => {
      // console.log("res---",res)
      if (res.success) {
        this.columnList = res.result;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  genericFilter(flag: number = 0) {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.branchDataList = [];
    }
    this.isedit = false;
    const data = {
      'limit': 10,
      'offset': this.offset,
      'columnName': this.columnName,
      'value': this.searchValue,
      'moduleId': this.moduleId,
    }
    this.rest.genericFilter(data).subscribe((res: any) => {
      // console.log("res---", res)
      if (res.success) {
        if(res.result.length == 0){
          this.nextDisable = true;
          this.branchDataList = [];
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        }
        else {
          this.branchDataList = res.result
        }
      } else {
        this.notifier.notify('error', res.message);
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
    this.genericFilter();
  }

  goNext(): any {
    this.offset = this.offset + this.limit;
    this.genericFilter();
    this.prevDisable = false;
  }
  downloadTemplate(){
    // window.open(this.rest.file_path + '/template/' + 'branchTemplate.xlsx');
    const data ={
      'moduleId': this.moduleId,
    }
    this.rest.getTemplateModuleMaster(data).subscribe((res: any) => {
      if (res.success) {
        window.open(this.rest.file_path + '/template/' + res.templateName);
      } else {
        // this.notifier.notify('error', res.message);
      }
    });
  }
  getState() {
    this.rest.getState().subscribe((res: any) => {
      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.stateList = res.State_Names;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  getStateCode(value:any){
    for (let i=0;i<this.stateList.length;i++){
      if (this.stateList[i]['id'] == value){
        this.editStateCd = this.stateList[i]['state_code']
      }
    }
  }
}
