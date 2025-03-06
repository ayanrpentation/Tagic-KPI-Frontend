import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})
export class EmployeeMasterComponent implements OnInit {
  employeeDataList: any = [];
  showAction = -1;
  columnList: any = [];
  columnName = 'all';
  searchValue = '';
  deleteEmployeeId: any;
  moduleId: any;

  offset = 0;
  limit = 10;
  prevDisable = true;
  nextDisable = false;
  isedit = false;
  editId = 0;

  editEmployeeCode: any;
  editEmpName: any;
  editDesignationType: any;
  editEmployeeJobLevel: any;
  editEmployeeLocation: any;
  editEmployeeBranch: any;
  editEmployeeChannelType: any;
  editEmployeeChannelSubType : any;
  

  stateList: any = [];
  branchList: any = [];
  designationList: any = [];
verticalList: any;
channelNewList: any;
  constructor(private ngxService: NgxUiLoaderService, private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.moduleId = this.common.getEmployeeMasterId();
    this.getColumnName();
    this.genericFilter();
  }
  addEmployee() {
    this.router.navigate(['dashboard/addemployee']);
  }
  getColumnName() {

    const data = {
      moduleId: this.moduleId,
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
    this.rest.employeeUpload(fd).subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        this.notifier.notify('success', res.message);
        this.genericFilter();
      } else {
        this.ngxService.stop();
        this.notifier.notify('error', res.massage);
      }
    });
  }
  editEmployeeMaster(itemId: any, employee_ECode: any, employee_Name: any, DesignationType: any, employee_Job_Level: any, employee_Location: any, employee_Branch: any, employee_Channel_Type: any, employee_Channel_SubType: any) {
    if (this.isedit == false) {
      this.isedit = true;
      this.editId = itemId;
      this.editEmployeeCode = employee_ECode;
      this.editEmpName = employee_Name;
      this.editDesignationType = DesignationType;
      this.editEmployeeJobLevel = employee_Job_Level;
      this.editEmployeeLocation = employee_Location;
      this.editEmployeeBranch = employee_Branch;
      this.editEmployeeChannelType = employee_Channel_Type;
      this.editEmployeeChannelSubType = employee_Channel_SubType;
      
    }
    this.getState();
    this.getBranch();
    this.getDesignation();
    this.getAllChannelNew();
  }
  genericFilter(flag: number = 0) {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.employeeDataList = [];
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
          this.employeeDataList = [];
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        }
        else {
          this.employeeDataList = res.result
        }
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }

  changeValue(id: any) {
    if (this.editId == id) {
      const data = {
        'id': id,
        'emp_code': this.editEmployeeCode,
        'emp_name': this.editEmpName,
        'designation_type': this.editDesignationType,
        'employee_Job_Level': this.editEmployeeJobLevel,
        'employee_Location': this.editEmployeeLocation,
        'employee_Branch': this.editEmployeeBranch,
        'employee_Channel_Type': this.editEmployeeChannelType,
        'employee_Channel_SubType': this.editEmployeeChannelSubType,
        
      }
      this.rest.editEmployeeMaster(data).subscribe((res: any) => {
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
  openDeleteModal(deleteModal: any, itemId: any): void {
    if (this.isedit == false) {
      this.deleteEmployeeId = itemId;
      this.modalService.open(deleteModal, { centered: true });
    }
  }
  deleteItem() {
    const data = {
      id: this.deleteEmployeeId,
      'moduleId': this.moduleId
    }
    this.rest.genericDelete(data).subscribe((res: any) => {
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
    // window.open(this.rest.file_path + '/template/' + 'employeeTemplate.xlsx');
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
  getBranch() {
    this.rest.getBranch().subscribe((res: any) => {
      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.branchList = res.data;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  getDesignation() {
    this.rest.getDesignation().subscribe((res: any) => {
      if (res.success) {
        // this.notifier.notify('success', res.massage)
        this.designationList = res.data;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  getVerticals() {
    const data = {
      channelNewId: this.editEmployeeChannelType,
    }
    this.rest.getVerticals(data).subscribe((res: any) => {
      if (res.success) {
        // console.log(this.documentDetails)
        this.verticalList = res.result;
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
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
}
