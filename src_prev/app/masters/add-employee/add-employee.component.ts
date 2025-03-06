import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeCode: any;
  employeeName: any;
  // gender:any;
  // title:any;
  jobLevel:any;
  // band:any;
  // zone:any;
  // state:any;
  city: any;
  // probationStatus:any;
  // payType:any;
  // variablePay:any;
  // employeeClass:any;
  // emailId:any;

  stateList: any = [];
  branchList: any = [];
  DesignationType: any;
  designationList: any;
  Location: any;
  EmployeeChannelType: any;
  channelNewList: any;
  EmployeeChannelSubType: any;
  verticalList: any;
  constructor(private rest: RestApiService, private common: CommonService, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.getState();
    this.getBranch();
    this.getDesignation();
    this.getAllChannelNew();
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
  getVerticals() {
    const data = {
      channelNewId: this.EmployeeChannelType,
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
    // const data = {
    //   header_id: 16,
    // }
    this.rest.getAllChannelNew().subscribe((res: any) => {
      if (res.success) {
        // console.log(this.documentDetails)
        this.channelNewList = res.data;
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
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
  saveData() {
    const data = {
      'emp_code': this.employeeCode,
      'emp_name': this.employeeName,
      // 'gender': this.gender,
      // 'Title': this.title,
      'jobLevel': this.jobLevel,
      // 'zone': this.zone,
      // 'band': this.band,
      'designation_id': this.DesignationType,
      'branch_name_id': this.city,
      // 'state_id': this.state,
      // 'probationStatus': this.probationStatus,
      // 'payType': this.payType,
      // 'variablePay': this.variablePay,
      // 'employeeClass': this.employeeClass,
      // 'emailId': this.emailId,
      'location':this.Location,
      'channel_new_id': this.EmployeeChannelType,
      'channel_sub_type':this.EmployeeChannelSubType


    }
    this.rest.addEmployeeMaster(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.router.navigate(['dashboard/employeemst']);
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  back(){
    window.history.go(-1)
  }
}
