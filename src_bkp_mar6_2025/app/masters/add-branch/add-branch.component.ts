import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  branchCode: any;
  branchName: any;
  tagicLocationType: any
  tagicLocationTypCommercial: any
  tagicZone: any
  tagicStateId: any
  clZone: any
  vertical: any
  stateCd: any
  zone: any
  cluster: any
  stateList: any = [];

  constructor(private rest: RestApiService, private common: CommonService, private notifier: NotifierService,private router: Router) { }

  ngOnInit(): void {
    this.getState();
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
        this.stateCd = this.stateList[i]['state_code']
      }
    }
  }
  saveData() {
    const data = {
      "branchCode": this.branchCode,
      "city": this.branchName,
      "tagicLocationType": this.tagicLocationType,
      "tagicLocationTypCommercial": this.tagicLocationTypCommercial,
      "tagicZone": this.tagicZone,
      "tagicStateId": this.tagicStateId,
      "clZone": this.clZone,
      "vertical": this.vertical,
      "stateCd": this.stateCd,
      "zone": this.zone,
      "cluster": this.cluster
    }
    this.rest.addBranchDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.router.navigate(['dashboard/branchmst']);
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  back(){
    window.history.go(-1)
  }
}
