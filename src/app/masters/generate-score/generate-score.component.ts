import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from "angular-notifier";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-generate-score',
  templateUrl: './generate-score.component.html',
  styleUrls: ['./generate-score.component.css']
})
export class GenerateScoreComponent implements OnInit {
  // year = new Date().getFullYear();
  // month = (new Date().getMonth() + 1).toString();
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  month = sessionStorage.getItem('defaultMonthForAll') as any
  year = sessionStorage.getItem('defaultYearForAll') as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];

  periodType = 'month' as any
  periodTypeList = [{id:'month', name: 'Monthly'},{id:'quarter', name: 'Quarterly'},{id:'ytd', name: 'Year to Date'},]
  financialYear = '' as any
  fYList = [] as any
  periodList = [{id:'Q1', name: 'Quarter 1'},{id:'Q2', name: 'Quarter 2'},{id:'Q3', name: 'Quarter 3'},{id:'Q4', name: 'Quarter 4'}]
  period = '' as any

  employee_code = 'all';
  loading = false;
  employeeList:any;
  dropdownSettings_employee:IDropdownSettings = {};
  generated = false;

  sdmMapping = false;
  cbMapping = false;
  rpMapping = false;

  // channelNew = 'all';
  channelNew = sessionStorage.getItem("defaultChannelForAll") as any;
  // channelId = sessionStorage.getItem("defaultChannelForAll") as any;
  channelNewList:any = [];

  // monthList = [{id:'1', name: 'January'},{id:'2', name: 'February'},{id:'3', name: 'March'},{id:'4', name: 'April'},{id:'5', name: 'May'},{id:'6', name: 'June'},{id:'7', name: 'July'},{id:'8', name: 'August'},{id:'9', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];
  yearList= [] as any;
  // kpiScoreDetails:any;
  fullYear: number = new Date().getFullYear();
  constructor(private rest: RestApiService, private common: CommonService, private modalService: NgbModal, private notifier: NotifierService) { }


  ngOnInit(): void {

    if(this.month == '1' || this.month == '01' || this.month == '2' || this.month == '02' || this.month == '3' || this.month == '03'){
      this.financialYear = String(Number(this.year)-1) + "-" + this.year
    }
    else{
      this.financialYear = this.year + "-" + String(Number(this.year)+1)
    }

    if(this.month == '1' || this.month == '01' || this.month == '2' || this.month == '02' || this.month == '3' || this.month == '03'){
      this.period = 'Q4'
    }
    else if(this.month == '4' || this.month == '04' || this.month == '5' || this.month == '05' || this.month == '6' || this.month == '06'){
      this.period = 'Q1'
    }
    else if(this.month == '7' || this.month == '07' || this.month == '8' || this.month == '08' || this.month == '9' || this.month == '09'){
      this.period = 'Q2'
    }
    else if(this.month == '10' || this.month == '11' || this.month == '12' ){
      this.period = 'Q3'
    }



    if(this.month.length == 1){
      this.month = '0' + this.month;
    }
    // this.yearList = [];
    // for (var i = this.fullYear; i >= this.fullYear-10; i--) {
    //   // console.log("year",i);
    //   this.yearList.push(i);
    // }
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.year = new Date().getFullYear()}
    for(let yr = Number(this.year) + 2; yr >= Number(this.year) - 2; yr--){
      this.yearList.push(yr)

      let fy = String(yr) + "-" +String(yr+1)

      this.fYList.push(fy)
    }

    // console.log(this.month)
    this.getEmployeeDetails();
    this.getAllChannelNew();

    // this.dropdownSettings_employee = { idField: 'empCode',textField: 'nameCode' ,allowSearchFilter: true,singleSelection: true, itemsShowLimit: 1,  };
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

  
  getEmployeeDetails(){
    this.employee_code = 'all'
    const data = {
      // channelNewName: this.channelNew,
      channelNewId: this.channelNew
    }
    this.rest.getEmployeeDetails(data).subscribe((res: any) => {
  
      if (res.success) {
        
        this.employeeList = res.employee_details;
        for(var emp of this.employeeList){
          emp.nameCode = String(emp.empName) + " (" + String(emp.empCode)+ ") "
        }
        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });

  }
  mapEmployeeCodeRP(){
    this.rpMapping = true;
    const data = {fileType: 'RP', userId: this.common.getUserId()}
    this.rest.maping_receivable_pending_sql(data).subscribe((res: any) => {
      if (res.success) {
        this.common.openSnackBar(res.message)
        this.rpMapping = false;

        
      } else {
        this.rpMapping = false;
        
        this.common.openSnackBar(res.message)
      }
    });
  }
  mapEmployeeCodeSDM(){
    this.sdmMapping = true;
    const data = {fileType: 'SDM', userId: this.common.getUserId()}
    this.rest.mapEmployeeCode(data).subscribe((res: any) => {
      if (res.success) {
        this.sdmMapping = false;

        this.common.openSnackBar(res.message)
        
      } else {
        this.sdmMapping = false;
        
        this.common.openSnackBar(res.message)
      }
    });
  }
  mapEmployeeCodeCB(){
    this.cbMapping = true;
    const data = {fileType: 'CB', 
    userId: this.common.getUserId()}
    this.rest.maping_check_bounce_sql(data).subscribe((res: any) => {
      if (res.success) {
        this.cbMapping = false;

        this.common.openSnackBar(res.message)

        
      } else {
        this.cbMapping = false;

        this.common.openSnackBar(res.message)
      }
    });
  }
  closeModal(){
    this.modalService.dismissAll();
  }
  checkIfMapped(modal:any){
    this.modalService.open(modal, {centered: true, size: 'md'});
    

  }




  isModalOpen = false;

  // modalText = "" as any;
  checkIfScoreIsPresent(){
    this.closeModal();
    const data={
      'userId': this.common.getUserId(),
      'month': this.month,
      'emp_code': this.employee_code,
      'year': this.year,
      // 'channelNewName': this.channelNew,
      'channelNewId' : this.channelNew,

      'period': this.periodType,
      'quarter': this.period,
      'fYear': this.financialYear
    }



    this.rest.checkScoringConfig(data).subscribe((res: any) => {

  
      if (res.success) {

        if(res.config === "old"){
          this.isModalOpen = false;
          this.generateKpiScore();
        }else{
          // this.modalText = res.
          this.isModalOpen = true; // when config is present already
        }
        

        // this.loading = false;
        // this.generated = true;
        // this.notifier.notify('success', res.message)
        // setTimeout(() => {
        //   window.alert(res.message);
        // }, 200);
        
      }else{

        this.isModalOpen = false; // when config is not present 
      // this.loading = false;
      // this.notifier.notify('error', res.message)
      // setTimeout(() => {
      //   window.alert("Error! " + res.message);
      // }, 200);

      }
    }, (err: any) => {
      // this.loading = false;
      // this.notifier.notify('error', 'some error occurred')
      // setTimeout(() => {
      //   window.alert('some error occurred');
      // }, 200);


      // this.notifier.notify('error', err.error.message);
      

    });
  }


  generateKpiScore(){
    this.closeModal();
    this.loading = true;
    const data={
      'userId': this.common.getUserId(),
      'month': this.month,
      'emp_code': this.employee_code,
      'year': this.year,
      // 'channelNewName': this.channelNew,
      'channelNewId' : this.channelNew,

      'period': this.periodType,
      'quarter': this.period,
      'fYear': this.financialYear

    }
    let scoreAPIs = {'KPG-PSU': 'generateKpiScore' };
    // this.rest.generateKpiScore(data).subscribe((res: any) => {
    this.rest.generateKpiScore(data).subscribe((res: any) => {

  
      if (res.success) {
        
        // this.kpiScoreDetails = res.result;
        this.loading = false;
        this.generated = true;
        this.notifier.notify('success', res.message)
        setTimeout(() => {
          window.alert(res.message);
        }, 200);
        
      }else{
      this.loading = false;
      this.notifier.notify('error', res.message)
      setTimeout(() => {
        window.alert("Error! " + res.message);
      }, 200);

      }
    }, (err: any) => {
      this.loading = false;
      this.notifier.notify('error', 'some error occurred')
      setTimeout(() => {
        window.alert('some error occurred');
      }, 200);


      // this.notifier.notify('error', err.error.message);
      

    });

  }





  generateKpiScore_new_reGen(){
    this.closeModal();
    this.loading = true;



    this.isModalOpen = false;
    const data={
      'userId': this.common.getUserId(),
      'month': this.month,
      'emp_code': this.employee_code,
      'year': this.year,
      // 'channelNewName': this.channelNew,
      'channelNewId' : this.channelNew,

      'period': this.periodType,
      'quarter': this.period,
      'fYear': this.financialYear

    }
    let scoreAPIs = {'KPG-PSU': 'generateKpiScore' };
    // this.rest.generateKpiScore(data).subscribe((res: any) => {
    this.rest.generatekpiScore_new(data).subscribe((res: any) => {

  
      if (res.success) {
        
        // this.kpiScoreDetails = res.result;
        this.loading = false;
        this.generated = true;
        this.notifier.notify('success', res.message)
        setTimeout(() => {
          window.alert(res.message);
        }, 200);
        
      }else{
      this.loading = false;
      this.notifier.notify('error', res.message)
      setTimeout(() => {
        window.alert("Error! " + res.message);
      }, 200);

      }
    }, (err: any) => {
      this.loading = false;
      this.notifier.notify('error', 'some error occurred')
      setTimeout(() => {
        window.alert('some error occurred');
      }, 200);


      // this.notifier.notify('error', err.error.message);
      

    });

  }

}
