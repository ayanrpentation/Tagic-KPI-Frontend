import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-banca',
  templateUrl: './add-banca.component.html',
  styleUrls: ['./add-banca.component.css']
})
export class AddBancaComponent implements OnInit {
  legacy_sol_id: any;
  vertical: any;
  branch_type: any;
  branch_tagic_code: any;
  branch_tagic: any;
  state_name: any;
  zone_tagic: any;
  location_type: any;

  stateList: any = [];
  constructor(private rest: RestApiService, private common: CommonService, private notifier: NotifierService, private router: Router) { }


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
  saveData() {
    const data = {
      'legacy_sol_id': this.legacy_sol_id,
      'vertical': this.vertical,
      'branch_type': this.branch_type,
      'branch_tagic_code': this.branch_tagic_code,
      'branch_tagic': this.branch_tagic,
      'state': this.state_name,
      'zone_tagic': this.zone_tagic,
      'location_type': this.location_type,
    }
    console.log("data---",data)
    this.rest.addBancaMaster(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.router.navigate(['dashboard/bancamst']);
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  back(){
    window.history.go(-1)
  }
}
