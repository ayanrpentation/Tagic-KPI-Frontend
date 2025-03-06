import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-banca-master',
  templateUrl: './banca-master.component.html',
  styleUrls: ['./banca-master.component.css']
})
export class BancaMasterComponent implements OnInit {
  bancaDataList: any = [];
  showAction = -1;
  columnList: any = [];
  columnName = 'all';
  searchValue = '';
  deleteId: any;
  moduleId: any;
  show = false;
  isedit = false;
  editId = 0;
  offset = 0;
  limit = 10;
  prevDisable = true;
  nextDisable = false;

  editLegacySolId:any;
  editVertical:any;
  editBranchType:any;
  editBranchTagicCode:any;
  editBranchTagic:any;
  editState:any;
  editZoneTagic:any;
  editLocationType:any;
  stateList: any = [];
  constructor(private ngxService: NgxUiLoaderService, private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.moduleId = this.common.getBancaMasterId();
    this.getColumnName();
    this.genericFilter();
  }
  genericFilter(flag: number = 0) {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.bancaDataList = [];
    }
    this.isedit = false;
    const data = {
      'limit': this.limit,
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
          this.bancaDataList = [];
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        }
        else {
          this.bancaDataList = res.result;
        }
        // this.reset();
      } else {
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
  uploadFile(event: any): any {
    const fd = new FormData();
    const files = event.target.files;
    fd.append('file', files[0]);
    this.ngxService.start();
    this.rest.uploadBancaMaster(fd).subscribe((res: any) => {
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
  closeModal(): void {
    this.modalService.dismissAll();
    // this.reset();
  }
  openDeleteModal(deleteModal: any, itemId: any): void {
    if (this.isedit == false) {
      this.deleteId = itemId;
      this.modalService.open(deleteModal, { centered: true });
    }
  }
  deleteItem() {
    const data = {
      id: this.deleteId,
      'moduleId': this.moduleId
    }
    this.rest.genericDelete(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', 'deleted successfully');
        this.closeModal();
        // this.reset();
        this.genericFilter();
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
    // window.open(this.rest.file_path + '/template/' + 'bancaTemplate.xlsx');
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
  addBanca(){
    this.router.navigate(['dashboard/addbancamst']);
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
  editBanca(itemId: any, legacy_sol_id: any,vertical:any,branch_type:any,branch_tagic_code:any,branch_tagic:any,state:any,zone_tagic:any,location_type:any) {
    if (this.isedit == false) {
      this.isedit = true;
      this.editId = itemId;
      this.editLegacySolId = legacy_sol_id;
      this.editVertical = vertical;
      this.editBranchType = branch_type;
      this.editBranchTagicCode = branch_tagic_code;
      this.editBranchTagic = branch_tagic;
      this.editState = state;
      this.editZoneTagic = zone_tagic;
      this.editLocationType = location_type;
    }
    this.getState();
  }
  changeValue(id: any) {
    if (this.editId == id) {
      const data = {
        'id': id,
        'legacy_sol_id' : this.editLegacySolId,
        'vertical': this.editVertical,
        'branch_type': this.editBranchType,
        'branch_tagic_code': this.editBranchTagicCode,
        'branch_tagic' : this.editBranchTagic,
        'state' : this.editState,
        'zone_tagic': this.editZoneTagic,
        'location_type': this.editLocationType
      }
      this.rest.editBancaMaster(data).subscribe((res: any) => {
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
  
}
