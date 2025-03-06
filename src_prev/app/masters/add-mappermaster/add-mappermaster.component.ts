import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-add-mappermaster',
  templateUrl: './add-mappermaster.component.html',
  styleUrls: ['./add-mappermaster.component.css']
})
export class AddMappermasterComponent implements OnInit {
  channelNew: any;
  verticalName: any;
  city: any;
  partnerNameKey: any;
  CurrentSolId: any;
  legacySolId: any;
  levelEmployee: any;
  designationId: any;
  employeeCode: any;

  channelNewList: any = [];
  verticalList: any = [];
  branchList: any = [];
  designationList: any = [];

  constructor(private rest: RestApiService, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.getAllChannelNew();
    this.getBranch();
    this.getDesignation();
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
  getVerticals() {
    const data = {
      channelNewId: this.channelNew,
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
  saveData() {
    const data = {
      channelNew: this.channelNew,
      verticalName: this.verticalName,
      branchId: this.city,
      partnerNameKey: this.partnerNameKey,
      CurrentSolId: this.CurrentSolId,
      legacySolId: this.legacySolId,
      levelEmployee: this.levelEmployee,
      designationId: this.designationId,
      employeeCode: this.employeeCode,
    }
    this.rest.addMapperMaster(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.router.navigate(['dashboard/mappermst']);
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  back(){
    window.history.go(-1)
  }
}
