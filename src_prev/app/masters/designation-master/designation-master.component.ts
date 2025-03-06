import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit {
  designationDataList: any = [];
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

  editdesignation_type: any;
  editdesignationDescription: any;
  editreportTo: any;
  editlevel: any;

  designationCode: any
  designationDescription: any
  designationLable: any
  reporting: any
  constructor(private ngxService: NgxUiLoaderService, private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.moduleId = this.common.getDesignationMasterId();
    this.getColumnName();
    this.genericFilter();
  }
  genericFilter(flag: number = 0) {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.designationDataList = [];
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
        if (res.result.length == 0) {
          this.nextDisable = true;
          this.designationDataList = [];
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        }
        else {
          this.designationDataList = res.result;
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
    this.rest.uploadDesignationMaster(fd).subscribe((res: any) => {
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
  downloadTemplate() {
    // window.open(this.rest.file_path + '/template/' + 'designationTemplate.xlsx');
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
  back() {
    window.history.go(-2)
  }
  addDesignation() {
    this.show = true
  }
  saveData() {
    if (this.show == true) {
      const data = {
        'designationCode': this.designationCode,
        'designationDescription': this.designationDescription,
        'designationLable': this.designationLable,
        'reporting': this.reporting,
      }
      this.rest.addDesignationMaster(data).subscribe((res: any) => {
        if (res.success) {
          this.notifier.notify('success', res.message);
          this.show = false;
          this.genericFilter();
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }
  }
  editDesignation(itemId: any, designation_type: any, designationDescription: any, reportTo: any, level: any) {
    if (this.isedit == false) {
      this.isedit = true;
      this.editId = itemId;
      this.editdesignation_type = designation_type;
      this.editdesignationDescription = designationDescription;
      this.editreportTo = reportTo;
      this.editlevel = level;
    }
  }
  changeValue(id: any) {
    if (this.editId == id) {
      const data = {
        'id': id,
        'designationCode': this.editdesignation_type,
        'designationDescription': this.editdesignationDescription,
        'designationLable': this.editlevel,
        'reporting': this.editreportTo,
      }
      this.rest.editDesignationMaster(data).subscribe((res: any) => {
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
