import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from "angular-notifier";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-generate-score',
  templateUrl: './generate-score.component.html',
  styleUrls: ['./generate-score.component.css']
})
export class GenerateScoreComponent implements OnInit {
  intervalSubscription!: Subscription;
  // year = new Date().getFullYear();
  // month = (new Date().getMonth() + 1).toString();
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  month = sessionStorage.getItem('defaultMonthForAll') as any
  year = sessionStorage.getItem('defaultYearForAll') as any
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];

  periodType = 'month' as any
  periodTypeList = [{id:'month', name: 'Monthly'},{id:'quarter', name: 'Quarterly'},{id:'half', name: 'Half Yearly'},{id:'ytd', name: 'Year to Date'},]
  financialYear = '' as any
  fYList = [] as any
  periodList = [{id:'Q1', name: 'Quarter 1'},{id:'Q2', name: 'Quarter 2'},{id:'Q3', name: 'Quarter 3'},{id:'Q4', name: 'Quarter 4'}]
  period = '' as any

  halfYearlyPeriodList = [{id:'1st_half', name: '1st Half (April Start - September End)'},{id:'2nd_half', name: '2nd Half (October Start - March End)'}]
  halfYearlyPeriod = '' as any

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
      this.period = 'Q4';
      this.halfYearlyPeriod = '2nd_half';
    }
    else if(this.month == '4' || this.month == '04' || this.month == '5' || this.month == '05' || this.month == '6' || this.month == '06'){
      this.period = 'Q1';
      this.halfYearlyPeriod = '1st_half';
    }
    else if(this.month == '7' || this.month == '07' || this.month == '8' || this.month == '08' || this.month == '9' || this.month == '09'){
      this.period = 'Q2';
      this.halfYearlyPeriod = '1st_half';
    }
    else if(this.month == '10' || this.month == '11' || this.month == '12' ){
      this.period = 'Q3';
      this.halfYearlyPeriod = '2nd_half';
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
    
    // this.modalService.open(modal, {centered: true, size: 'md'});
    this.check_score_status(modal);
    

  }




  isModalOpen = false;

  // modalText = "" as any;
  checkIfScoreIsPresent(){
    this.generate_score_status = "";
    this.closeModal();


    setTimeout(() => {

      let month = this.month;
      let periodType = this.periodType;
  
  
  
      if( this.periodType == 'half' && this.halfYearlyPeriod == '1st_half'){
        month = '09'; // sept
        periodType = 'ytd'; // period type value will not be changed in frontend, so this is done
      }
      if( this.periodType == 'half' && this.halfYearlyPeriod == '2nd_half'){
        month = '03'; // sept
        periodType = 'half yearly'; // period type value will not be changed in frontend, so this is done
      }


      let year = this.year;

      if(this.periodType === 'half' || this.periodType ===  'ytd' || this.periodType === 'quarter'){
        
        if (Number(month) < 4){
          year = this.financialYear.split('-')[1];
        }else{
          year = this.financialYear.split('-')[0];
        }

      }
  
  
  
  
      const data={
        'userId': this.common.getUserId(),
        'emp_code': this.employee_code,
        // 'year': this.year,
        'year': year,
        // 'channelNewName': this.channelNew,
        'channelNewId' : this.channelNew,
        
        'quarter': this.period,
        'fYear': this.financialYear,
        
        'halfYearlyPeriod': this.halfYearlyPeriod,
        
        'month': month,
        'period': periodType,
  
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
    })

  }

  generate_score_status = "";
  last_generationDetails:any;

  check_score_status(modal:any){
    this.generate_score_status = "";


    setTimeout(() => {

      let month = this.month;
      let periodType = this.periodType;
  
  
  
      if( this.periodType == 'half' && this.halfYearlyPeriod == '1st_half'){
        month = '09'; // sept
        periodType = 'ytd'; // period type value will not be changed in frontend, so this is done
      }
      if( this.periodType == 'half' && this.halfYearlyPeriod == '2nd_half'){
        month = '03'; // sept
        periodType = 'half yearly'; // period type value will not be changed in frontend, so this is done
      }


      let year = this.year;

      if(this.periodType === 'half' || this.periodType ===  'ytd' || this.periodType === 'quarter'){
        
        if (Number(month) < 4){
          year = this.financialYear.split('-')[1];
        }else{
          year = this.financialYear.split('-')[0];
        }

      }
  
  
  
  
      const data={
        'userId': this.common.getUserId(),
        'emp_code': this.employee_code,
        // 'year': this.year,
        'year': year,
        // 'channelNewName': this.channelNew,
        'channelNewId' : this.channelNew,
        
        'quarter': this.period,
        'fYear': this.financialYear,
        
        'halfYearlyPeriod': this.halfYearlyPeriod,
        
        'month': month,
        'period': periodType,
  
      }
  
      
  
  
  
      this.rest.check_score_status(data).subscribe((res: any) => {
  
    
        if (res.success) {
          this.last_generationDetails = res.details;
          this.generate_score_status = res.status;
          if(res.status == "running"){
            this.notifier.notify('info', res.message)


            this.intervalSubscription = interval(5000).subscribe(() => {
              this.check_score_status_recall();
            });


          }else if(res.status == "last_processed"){
            this.notifier.notify('info', 'Score generation last processed on ' + res.details.ended_at)



          }else if(res.status == "none"){
            // when you should call the next api || to pop up modal to proceed further
            this.modalService.open(modal, {centered: true, size: 'md'});
          }
  
          
          
        }else{
          this.generate_score_status = res?.status || '';
  
        this.notifier.notify('error', res.message)
        }
      }, (err: any) => {

        this.generate_score_status =  "";
        // this.loading = false;
        // this.notifier.notify('error', 'some error occurred')
        // setTimeout(() => {
        //   window.alert('some error occurred');
        // }, 200);
  
  
        // this.notifier.notify('error', err.error.message);
        
  
      });
    })

  }

  check_score_status_recall(){    

      let month = this.month;
      let periodType = this.periodType;  
  
      if( this.periodType == 'half' && this.halfYearlyPeriod == '1st_half'){
        month = '09'; // sept
        periodType = 'ytd'; // period type value will not be changed in frontend, so this is done
      }
      if( this.periodType == 'half' && this.halfYearlyPeriod == '2nd_half'){
        month = '03'; // sept
        periodType = 'half yearly'; // period type value will not be changed in frontend, so this is done
      }

      let year = this.year;

      if(this.periodType === 'half' || this.periodType ===  'ytd' || this.periodType === 'quarter'){
        
        if (Number(month) < 4){
          year = this.financialYear.split('-')[1];
        }else{
          year = this.financialYear.split('-')[0];
        }

      }  
  
      const data={
        'userId': this.common.getUserId(),
        'emp_code': this.employee_code,
        // 'year': this.year,
        'year': year,
        // 'channelNewName': this.channelNew,
        'channelNewId' : this.channelNew,
        
        'quarter': this.period,
        'fYear': this.financialYear,
        
        'halfYearlyPeriod': this.halfYearlyPeriod,
        
        'month': month,
        'period': periodType,
  
      }
  
      
  
  
  
      this.rest.check_score_status(data).subscribe((res: any) => {
  
    
        if (res.success) {
          this.generate_score_status = res.status;
          if(res.status == "running"){           


          }else if(res.status == "last_processed"){
            this.intervalSubscription.unsubscribe();
            this.notifier.notify('info', 'Score generation completed for Current selection. ' + ' Last processed on ' + res.details.ended_at)
            
          }else{
            this.intervalSubscription.unsubscribe();
            
          }
  
          
          
        }else{
          this.generate_score_status = res?.status || "";
          
          this.notifier.notify('error', res.message)
        }
      }, (err: any) => {
        
        this.generate_score_status =  "";
                
  
      });
    

  }





  // checkIfScoreIsPresent() {
  //   this.closeModal();
  
  //   // Ensure model bindings are up-to-date before logic runs
  //   setTimeout(() => {
  //     let month = this.month;
  //     let periodType = this.periodType;
  
  //     // ✅ Make sure these values are properly updated before use
  //     if (this.periodType === 'half' && this.halfYearlyPeriod === '1st_half') {
  //       month = '09'; // September
  //       periodType = 'ytd';
  //     } else if (this.periodType === 'half' && this.halfYearlyPeriod === '2nd_half') {
  //       month = '03'; // March
  //       periodType = 'half yearly';
  //     }
  
  //     // ✅ Prepare payload *after* month & periodType are finalized
  //     const data = {
  //       userId: this.common.getUserId(),
  //       emp_code: this.employee_code,
  //       year: this.year,
  //       channelNewId: this.channelNew,
  //       quarter: this.period,
  //       fYear: this.financialYear,
  //       halfYearlyPeriod: this.halfYearlyPeriod,
  //       month,
  //       period: periodType,
  //     };
  
  //     this.rest.checkScoringConfig(data).subscribe(
  //       (res: any) => {
  //         if (res.success) {
  //           if (res.config === 'old') {
  //             this.isModalOpen = false;
  //             this.generateKpiScore();
  //           } else {
  //             this.isModalOpen = true; // config already present
  //           }
  //         } else {
  //           this.isModalOpen = false; // config not present
  //         }
  //       },
  //       (err: any) => {
  //         console.error('Error:', err);
  //       }
  //     );
  //   });
  // }
  


  // generateKpiScore(){
  //   this.closeModal();
  //   this.loading = true;



  //   // let data={
  //   //   'userId': this.common.getUserId(),
  //   //   'month': this.month,
  //   //   'emp_code': this.employee_code,
  //   //   'year': this.year,
  //   //   // 'channelNewName': this.channelNew,
  //   //   'channelNewId' : this.channelNew,

  //   //   'period': this.periodType,
  //   //   'quarter': this.period,
  //   //   'fYear': this.financialYear,

  //   //   'halfYearlyPeriod': this.halfYearlyPeriod


  //   // }

  //   // if( this.periodType === 'half' && this.halfYearlyPeriod === '1st_half'){
  //   //   data.month = '09'; // sept
  //   //   data.period = 'ytd'; // period type value will not be changed in frontend, so this is done
  //   // }
  //   // if( this.periodType === 'half' && this.halfYearlyPeriod === '2nd_half'){
  //   //   data.month = '03'; // sept
  //   //   data.period = 'half yearly'; // period type value will not be changed in frontend, so this is done
  //   // }








  //   setTimeout(() => {

      
  //         let month = this.month;
  //         let periodType = this.periodType;
      
      
  //         if( this.periodType == 'half' && this.halfYearlyPeriod == '1st_half'){
  //           month = '09'; // sept
  //           periodType = 'ytd'; // period type value will not be changed in frontend, so this is done
  //         }
  //         if( this.periodType == 'half' && this.halfYearlyPeriod == '2nd_half'){
  //           month = '03'; // sept
  //           periodType = 'half yearly'; // period type value will not be changed in frontend, so this is done
  //         }
      
      
      
      
  //         const data={
  //           'userId': this.common.getUserId(),
  //           'emp_code': this.employee_code,
  //           'year': this.year,
  //           // 'channelNewName': this.channelNew,
  //           'channelNewId' : this.channelNew,
            
  //           'quarter': this.period,
  //           'fYear': this.financialYear,
            
  //           'halfYearlyPeriod': this.halfYearlyPeriod,
            
  //           'month': month,
  //           'period': periodType,
      
  //         }
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
          
  //         let scoreAPIs = {'KPG-PSU': 'generateKpiScore' };
  //         // this.rest.generateKpiScore(data).subscribe((res: any) => {
  //         this.rest.generateKpiScore(data).subscribe((res: any) => {
      
        
  //           if (res.success) {
              
  //             // this.kpiScoreDetails = res.result;
  //             this.loading = false;
  //             this.generated = true;
  //             this.notifier.notify('success', res.message)
  //             setTimeout(() => {
  //               window.alert(res.message);
  //             }, 200);
              
  //           }else{
  //           this.loading = false;
  //           this.notifier.notify('error', res.message)
  //           setTimeout(() => {
  //             window.alert("Error! " + res.message);
  //           }, 200);
      
  //           }
  //         }, (err: any) => {
  //           this.loading = false;
  //           this.notifier.notify('error', 'some error occurred')
  //           setTimeout(() => {
  //             window.alert('some error occurred');
  //           }, 200);
      
      
  //           // this.notifier.notify('error', err.error.message);
            
      
  //         });
  //   });




  // }












  generateKpiScore() {
    console.log("Generating KPI Score...");
    this.closeModal();
    this.loading = true;
  
    // Step 1: Get initial values
    let month = this.month;
    let periodType = this.periodType;
    console.log("Initial month:", month, "Initial periodType:", periodType);
  
    // Step 2: Adjust for half-year logic before forming payload
    if (this.periodType === 'half' && this.halfYearlyPeriod === '1st_half') {
      month = '09';            // September
      periodType = 'ytd';      // For first half, YTD until September
    } else if (this.periodType === 'half' && this.halfYearlyPeriod === '2nd_half') {
      month = '03';            // March
      periodType = 'half yearly';
    }


    let year = this.year;

    if(this.periodType === 'half' || this.periodType ===  'ytd' || this.periodType === 'quarter'){
      
      if (Number(month) < 4){
        year = this.financialYear.split('-')[1];
      }else{
        year = this.financialYear.split('-')[0];
      }

    }


  
    // Step 3: Form the final payload
    const data = {
      userId: this.common.getUserId(),
      emp_code: this.employee_code,
      // year: this.year,
      year: year,
      channelNewId: this.channelNew,
      quarter: this.period,
      fYear: this.financialYear,
      halfYearlyPeriod: this.halfYearlyPeriod,
      month: month,
      period: periodType,
    };
  
    // Debug log (optional)
    console.log("Payload for KPI Score:", data);
  
    // Step 4: API call
    this.rest.generateKpiScore(data).subscribe({
      next: (res: any) => {
        this.loading = false;
  
        if (res.success) {
          this.generated = true;
          this.notifier.notify('success', res.message);
          setTimeout(() => window.alert(res.message), 200);
        } else {
          this.notifier.notify('error', res.message);
          setTimeout(() => window.alert("Error! " + res.message), 200);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.notifier.notify('error', 'Some error occurred');
        setTimeout(() => window.alert('Some error occurred'), 200);
        console.error('Error generating KPI score:', err);
      }
    });
  }




  loading_regenerate = false;

  regenerateKpiScore() {
    console.log("Re-Generating KPI Score...");
    this.closeModal();
    this.loading_regenerate = true;
  
    // Step 1: Get initial values
    let month = this.month;
    let periodType = this.periodType;
    console.log("Initial month:", month, "Initial periodType:", periodType);
  
    // Step 2: Adjust for half-year logic before forming payload
    if (this.periodType === 'half' && this.halfYearlyPeriod === '1st_half') {
      month = '09';            // September
      periodType = 'ytd';      // For first half, YTD until September
    } else if (this.periodType === 'half' && this.halfYearlyPeriod === '2nd_half') {
      month = '03';            // March
      periodType = 'half yearly';
    }


    let year = this.year;

    if(this.periodType === 'half' || this.periodType ===  'ytd' || this.periodType === 'quarter'){
      
      if (Number(month) < 4){
        year = this.financialYear.split('-')[1];
      }else{
        year = this.financialYear.split('-')[0];
      }

    }


  
    // Step 3: Form the final payload
    const data = {
      userId: this.common.getUserId(),
      emp_code: this.employee_code,
      // year: this.year,
      year: year,
      channelNewId: this.channelNew,
      quarter: this.period,
      fYear: this.financialYear,
      halfYearlyPeriod: this.halfYearlyPeriod,
      month: month,
      period: periodType,
    };
  
    // Debug log (optional)
    console.log("Payload for KPI Score:", data);
  
    // Step 4: API call
    this.rest.generateKpiScore(data).subscribe({
      next: (res: any) => {
        this.loading_regenerate = false;
  
        if (res.success) {
          this.generated = true;
          this.notifier.notify('success', res.message);
          setTimeout(() => window.alert(res.message), 200);
        } else {
          this.notifier.notify('error', res.message);
          setTimeout(() => window.alert("Error! " + res.message), 200);
        }
      },
      error: (err: any) => {
        this.loading_regenerate = false;
        this.notifier.notify('error', 'Some error occurred');
        setTimeout(() => window.alert('Some error occurred'), 200);
        console.error('Error generating KPI score:', err);
      }
    });
  }
  





  generateKpiScore_new_reGen(){
    this.closeModal();
    this.loading = true;



    this.isModalOpen = false;




    // const data={
    //   'userId': this.common.getUserId(),
    //   'month': this.month,
    //   'emp_code': this.employee_code,
    //   'year': this.year,
    //   // 'channelNewName': this.channelNew,
    //   'channelNewId' : this.channelNew,

    //   'period': this.periodType,
    //   'quarter': this.period,
    //   'fYear': this.financialYear

    // }



    // Step 1: Get initial values
    let month = this.month;
    let periodType = this.periodType;
    console.log("Initial month:", month, "Initial periodType:", periodType);
  
    // Step 2: Adjust for half-year logic before forming payload
    if (this.periodType === 'half' && this.halfYearlyPeriod === '1st_half') {
      month = '09';            // September
      periodType = 'ytd';      // For first half, YTD until September
    } else if (this.periodType === 'half' && this.halfYearlyPeriod === '2nd_half') {
      month = '03';            // March
      periodType = 'half yearly';
    }




    let year = this.year;

    if(this.periodType === 'half' || this.periodType ===  'ytd' || this.periodType === 'quarter'){
      
      if (Number(month) < 4){
        year = this.financialYear.split('-')[1];
      }else{
        year = this.financialYear.split('-')[0];
      }

    }
  
    // Step 3: Form the final payload
    const data = {
      userId: this.common.getUserId(),
      emp_code: this.employee_code,
      // year: this.year,
      year: year,
      channelNewId: this.channelNew,
      quarter: this.period,
      fYear: this.financialYear,
      halfYearlyPeriod: this.halfYearlyPeriod,
      month: month,
      period: periodType,
    };
  
    // Debug log (optional)
    console.log("Payload for KPI Score:", data);
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
