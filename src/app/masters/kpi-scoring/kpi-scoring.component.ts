import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { RestApiService } from '../../rest-api.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotifierService} from "angular-notifier";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CommonService } from 'src/app/common.service';


@Component({
  selector: 'app-kpi-scoring',
  templateUrl: './kpi-scoring.component.html',
  styleUrls: ['./kpi-scoring.component.css']
})
export class KpiScoringComponent implements OnInit {

  // channelAccess = '' as any // channeNewName
  defaultVerticalCode = '' as any  //verticalId
  defaultEmpCode = '' as any // empCode

  allData = sessionStorage.getItem('tataaigstore') as any

  periodical = false
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any

  dropdownSettings_month:IDropdownSettings = {};
  dropdownSettings_channel:IDropdownSettings = {};
  dropdownSettings_vertical:IDropdownSettings = {};
  dropdownSettings_designation:IDropdownSettings = {};
  dropdownSettings_employee:IDropdownSettings = {};

  selectedMonthList = [] as any
  selectedChannelList = [] as any
  selectedVerticalList = [] as any
  selectedDesignationList = [] as any
  selectedEmployeeList = [] as any

  viewDetails = false;
  vieDetails_emp_code:any;
  vieDetails_designation:any;
  vieDetails_emp_month:any;
  vieDetails_emp_year:any;
  viewDetails_emp_quarter: any;
  viewDetails_emp_fy: any;

  // channelNew = 'all'; // id
  channelNew = sessionStorage.getItem("defaultChannelForAll") as any;
  channelName = 'all' // name
  channelNewList:any = [];



  viewDetails_emp_month = 0 as any;
  viewchannelNewName = '' as any;
  viewVerticalName = '' as any;


  employeeListForLevel3 = [] as any
  defaultEmpName = '' as any
  empCodeListLevel3 = [] as any




  empWisekpiScoreDetails:any;
  // year = 'all' as any;
  // month = 'all' as any;
  month = sessionStorage.getItem('defaultMonthForAll') as any
  year = sessionStorage.getItem('defaultYearForAll') as any

  periodType = 'month' as any
  periodTypeList = [{id:'month', name: 'Monthly'},{id:'quarter', name: 'Quarterly'},{id:'ytd', name: 'Year to Date'},]
  financialYear = '' as any
  fYList = [] as any




  employee_code = 'all';
  employeeList= [] as any;
  months = {'01': 'January','02': 'February','03': 'March','04': 'April','05': 'May','06': 'June','07': 'July','08': 'August','09': 'September','10': 'October','11': 'November','12': 'December'};

  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];
  periodList = [{id:'Q1', name: 'Quarter 1'},{id:'Q2', name: 'Quarter 2'},{id:'Q3', name: 'Quarter 3'},{id:'Q4', name: 'Quarter 4'}]
  period = '' as any
  yearList = [] as any;
  kpiScoreDetails:any;
  channelDetails = false;
  channelDetails_id: any;
  channelDetails_data: any;
  channelDetails_column:any;
  channelNameId:any = 0;
  colorSet = {0:'firstrow',1:'seconrow',2:'thirdrow'}
  
  designation = 'all'
  

  fullYear: number = new Date().getFullYear();

  noDataVsbl = false



  // for search
  EmpName = '' as any
  EmpCode = '' as any
  EmpDesig = '' as any
  EmpSubChannel = '' as any
  EmpVertical = '' as any
  EmpYear = '' as any
  EmpMonth = '' as any
  fullResult = [] as any
  verticalList = [] as any
  vertical = 'all' as any
  // vertical = sessionStorage.getItem('vertical') as any

  // employee = [sessionStorage.getItem('empCode') as any];
  designationList = [] as any
  employee = [] as any;

  report_period_Type = '' as any
  EmpFy = '' as any
  EmpQuarter = '' as any


  searchBoxes = true
  errormsgstatus = false
  errormsg = '' as any
  selectDesignationStatus = false
  selectChannelStatus = false
  selectVerticalStatus = false
  // userId = '' as any
  

  constructor(private rest: RestApiService, private modalService: NgbModal, private notifier: NotifierService, private ngxService: NgxUiLoaderService,private common: CommonService) {
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(stringArray.length > 1){
      // this.channelId = stringArray[0]
      this.channelNew = "all"
    }
   }

  
  ngOnInit(): void {

    if (this.userLevel == 3){
      this.employee = [{"empCode":sessionStorage.getItem('empCode')} ,];
      // console.log(this.employee);
      this.vertical = sessionStorage.getItem('vertical') ;

    }

    
    // console.log(this.selectedDefaultChannelName)
    
    // this.defaultVerticalCode = JSON.parse(this.allData).verticalName //verticalId
    // this.defaultVerticalName = JSON.parse(this.allData).verticalName //verticalId
    this.defaultEmpCode =  JSON.parse(this.allData).empCode // empCode
    this.defaultEmpName = JSON.parse(this.allData).name
    // this.vertical = this.defaultVerticalCode
    // this.employee = this.defaultEmpCode
    // if(this.defaultEmpCode.length != 0){
    //   // this.employee = [this.employee]
    //   this.employeeListForLevel3 = [{'empCode':this.defaultEmpCode,'nameCode': String(this.defaultEmpName + " (" + this.defaultEmpCode + ") ")}]
    //   this.empCodeListLevel3 = [this.defaultEmpCode]
    //   console.log("this.empCodeListLevel3", this.empCodeListLevel3)
    //   // this.employee = this.empCodeListLevel3
    // }

    

    // console.log("this.vertical",this.vertical);
    // console.log(this.month)

    

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
    this.refreshMainSearch();
    
    
    // this.currentMonthYear()
    

    // console.log("fullYear",this.fullYear)
    // this.yearList = [];
    // for (var i = this.fullYear; i >= this.fullYear-4; i--) {
    //   // console.log("year",i);
    //   this.yearList.push(i);
    // }

    if(sessionStorage.getItem('defaultYearForAll') == ''){this.year = new Date().getFullYear()}
    for(let yr = Number(this.year) + 2; yr >= Number(this.year) - 2; yr--){
      this.yearList.push(yr)

      let fy = String(yr) + "-" +String(yr+1)

      this.fYList.push(fy)
      
    }
    // this.refreshMainSearch()

    // console.log(this.yearList)
    // console.log(this.year)
    // console.log(this.month)

    this.channelDetails_data = [];
    // console.log(this.yearList)
    
    this.getAllChannelNew();

    this.dropdownSettings_month = { idField: 'id',textField: 'name',allowSearchFilter: true,enableCheckAll:false, itemsShowLimit: 1 };

    this.dropdownSettings_channel = { idField: 'id',textField: 'channelNewName',allowSearchFilter: true,enableCheckAll:false, itemsShowLimit: 1 };

    this.dropdownSettings_vertical = { idField: 'id',textField: 'verticalName',allowSearchFilter: true,enableCheckAll:false, itemsShowLimit: 1 };

    this.dropdownSettings_designation = { idField: 'designation_type',textField: 'designation_type',allowSearchFilter: true,enableCheckAll:false, itemsShowLimit: 1 };

    this.dropdownSettings_employee = { idField: 'empCode',textField: 'nameCode' ,allowSearchFilter: true,enableCheckAll:false, itemsShowLimit: 1 };


    
    this.channelName = sessionStorage.getItem("defaultChannelNameForAll") as any;
    // let tataaigstore = sessionStorage.getItem("tataaigstore") as any;
    // this.userId = JSON.parse(tataaigstore).user_id
    // console.log("this.userId>>>>>",this.userId)
    this.getVerticals()
    this.getEmployeeDetails();
    // this.getkpiScoreOnload();
    this.getkpiScore();


    // this.employeeList = []



  }

  consoleemployee(){
    // console.log(this.employee);
  }

   


  getVerticals(){

    let tataaigstore = sessionStorage.getItem('tataaigstore') as any;
    let access_channel = JSON.parse(tataaigstore).channelNewId;

    console.log("selected_channel-->", this.channelNew)
    console.log("access_channel-->",access_channel)
    
    

    const data= {
      access_channel: access_channel,
      channelNewId: this.channelNew, //selected channel
    }
    // console.log(data)
    this.rest.getVerticals(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        this.verticalList = res.result;
        if (this.userLevel == 3){
          this.vertical = sessionStorage.getItem('vertical') ;
          // console.log(this.vertical);
          
        }else{
          this.vertical = 'all';
    
        }



        this.channelName = res.channelNewName 
        // console.log("----", this.channelName)

        this.getDesignations()

        this.getEmployeeDetails()

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
    
  }

  currentMonthYear(){
    var d = new Date();
    var mon = d.getMonth()+1;
    var yr = d.getFullYear();
    
    if (mon == 1){ // if month is January then it will show Dec of previous year
      yr = d.getFullYear()-1
      mon = 13
    }
    this.month = mon-1 // final month to show in frontend
    
    if(String(this.month).length<2){ 
      this.month = '0' + String(this.month)
    }
    else{
      this.month = String(this.month)
    }
    
    this.year = yr




  }



  
  getChannelDetails(emp_code:any, channelId:any,month:any, year:any, detailsModal:any){
    // console.log(emp_code, channelId, month, year)
    const data ={
      emp_code: emp_code,
      channelId: channelId,
      year: year,
      month: month,

    }
    this.rest.getChannelDetails(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // this.empWisekpiScoreDetails = res.result;
        this.channelDetails_data =  res.result;
        this.channelDetails_column = res.column_data;
        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
    this.modalService.open(detailsModal, {centered: true, size: 'lg'});


    
  }
  hideChannelDetails(){

  }
  closeModal(){

      this.modalService.dismissAll();
      
    
  }
  downloadScore(flag: any){
      
    this.selectedMonthList = []
    this.selectedEmployeeList = []

    for(var m of this.month){
      if(m.id != null){
        this.selectedMonthList.push(m.id)
      }
    }
    
    for(var e of this.employee){      
      if(e.empCode != null){
        this.selectedEmployeeList.push(e.empCode)
      }
    }

    // for making tuple ----->
    let select_emp = `('${this.selectedEmployeeList.join("','")}')`;
    let select_m = `('${this.selectedMonthList.join("','")}')`; 

    if(this.channelNew == 'all'){
      this.channelName = 'all'
    }


    if(this.periodType == 'month' || this.periodType == 'ytd'){
      if(this.selectedMonthList.length == 0 ){
        // window.alert("Please select one month")
        this.errormsgstatus = true
        this.errormsg = 'Please select one month'
        return
      }
      else if(this.selectedMonthList.length > 1){
        this.errormsgstatus = true
        this.errormsg = 'Maximum one month can be selected for generating Excel'
        return
      }
      else if (this.channelNew == 'all'){
        this.errormsgstatus = true
        this.errormsg = 'Please Select Channel Name. Single Channel Selection is Allowed.'
        
        return
        // this.notifier.notify('error', 'Please Select Channel Name.');
      }
      // else if(this.selectedEmployeeList.length != 0){
      //   // window.alert("Please unselect all Employees. This will autometically generate Excel for all Employees")
      //   this.errormsgstatus = true
      //   this.errormsg = 'Please unselect all Employees. This will autometically generate Excel for all Employees'
      //   return
      // }
    }
    // else if(this.periodType == 'ytd'){
      
    // }

    else if(this.periodType == 'quarter'){
      if (this.channelNew == 'all'){
        this.errormsgstatus = true
        this.errormsg = 'Please Select Channel Name. Single Channel Selection is Allowed.'
        
        return
        // this.notifier.notify('error', 'Please Select Channel Name.');
      }
      // else if(this.selectedEmployeeList.length != 0){
      //   // window.alert("Please unselect all Employees. This will autometically generate Excel for all Employees")
      //   this.errormsgstatus = true
      //   this.errormsg = 'Please unselect all Employees. This will autometically generate Excel for all Employees'
      //   return
      // }
    }



    


    



    const data={
      'month': this.selectedMonthList,
      'emp_code': this.selectedEmployeeList,
      'year': this.year,
      'channelNewName': this.channelName,
      'verticalName': this.vertical,
      'designationType': this.designation,
      'period': this.periodType,
      'quarter': this.period,
      'fYear': this.financialYear,
      'mailFlag': flag

    }
    this.ngxService.start();
    this.rest.downloadScore(data).subscribe((res: any) => {
  
      if (res.success) {
        this.ngxService.stop();
        
        // this.kpiScoreDetails = res.result;
        let fileName = res.filename
        window.open(this.rest.file_path + '/downloads/'+fileName)
        
      }
      else{
        this.ngxService.stop();
        this.notifier.notify('error', 'Error Occurred');
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.notifier.notify('error', 'Technical Error Occurred');
      // this.notifier.notify('error', err.error.message);
      

    });
  }

  sendMail(){
      
    this.selectedMonthList = []
    this.selectedEmployeeList = []

    for(var m of this.month){
      if(m.id != null){
        this.selectedMonthList.push(m.id)
      }
    }
    
    for(var e of this.employee){      
      if(e.empCode != null){
        this.selectedEmployeeList.push(e.empCode)
      }
    }

    // for making tuple ----->
    let select_emp = `('${this.selectedEmployeeList.join("','")}')`;
    let select_m = `('${this.selectedMonthList.join("','")}')`; 

    if(this.channelNew == 'all'){
      this.channelName = 'all'
    }


    if(this.periodType == 'month' || this.periodType == 'ytd'){
      if(this.selectedMonthList.length == 0 ){
        // window.alert("Please select one month")
        this.errormsgstatus = true
        this.errormsg = 'Please select one month'
        return
      }
      else if(this.selectedMonthList.length > 1){
        this.errormsgstatus = true
        this.errormsg = 'Maximum one month can be selected for generating Excel'
        return
      }
      else if (this.channelNew == 'all'){
        this.errormsgstatus = true
        this.errormsg = 'Please Select Channel Name. Single Channel Selection is Allowed.'
        
        return
        // this.notifier.notify('error', 'Please Select Channel Name.');
      }
      
    }
    else if(this.periodType == 'quarter'){
      if (this.channelNew == 'all'){
        this.errormsgstatus = true
        this.errormsg = 'Please Select Channel Name. Single Channel Selection is Allowed.'
        
        return
        // this.notifier.notify('error', 'Please Select Channel Name.');
      }
    }
    const data={
      'month': this.selectedMonthList,
      'emp_code': this.selectedEmployeeList,
      'year': this.year,
      'channelNewName': this.channelName,
      'verticalName': this.vertical,
      'designationType': this.designation,
      'period': this.periodType,
      'quarter': this.period,
      'fYear': this.financialYear,
      'userId':this.common.getUserId(),
      // 'mailFlag': flag

    }
    //  // this.ngxService.start();
    this.rest.sendMail(data).subscribe((res: any) => {
  
      if (res.success) {
        // this.ngxService.stop();
        
        // this.kpiScoreDetails = res.result;
        // let fileName = res.filename
        // window.open(this.rest.file_path + '/downloads/'+fileName)
        this.notifier.notify('success', 'Mail Send Successfully');
        
      }
      else{
        // this.ngxService.stop();
        this.notifier.notify('error', 'Error Occurred');
      }
    }, (err: any) => {
      // this.ngxService.stop();
      // this.notifier.notify('error', 'Technical Error Occurred');
      this.notifier.notify('error', 'Under Construction');
      // this.notifier.notify('error', err.error.message);
    });
  }



  channelRow(i:any,target:any,mainChannel_id:any){
    let class_row = '';
    let row = i%3
    if (row == 0){
      class_row = 'firstrow'
    }else  if(row == 1){
      class_row = 'secondrow'

    }else  if(row == 2){
      class_row = 'thirdrow'

    }
    if (mainChannel_id != 3 && target == 0){
      class_row += ' red'
    }
    return class_row
  }
  getDetailsScore(emp_code:any, month:any, year:any, designationType:any, verticalName:any, channelNewName:any, quarter: any, fyear: any){
    
    this.viewDetails = true;
    this.vieDetails_emp_code = emp_code;
    this.vieDetails_designation = designationType;

    this.vieDetails_emp_month = month;
    this.vieDetails_emp_year = year;
    this.viewchannelNewName = channelNewName;
    this.viewVerticalName = verticalName;

    this.viewDetails_emp_quarter = quarter;
    this.viewDetails_emp_fy = fyear;
  

    for(var m of this.monthList){
      if(m.name== month){
        month = m.id
      }
    }

    this.viewDetails_emp_month = month;

    const data ={
      emp_code: this.vieDetails_emp_code,
      month: month,
      year: year,
      channelNewName: channelNewName,
      verticalName: verticalName,
      designationType: designationType,
      quarter: quarter,
      fYear: fyear,
      period: this.report_period_Type

    }
    this.rest.empwise_getkpiScore(data).subscribe((res: any) => {
  
      if (res.success) {
        this.searchBoxes = false
        this.empWisekpiScoreDetails = res.result;
        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });

  }
  hideDetailsScore(){
    this.viewDetails = false;
    this.searchBoxes = true

  }

  downloadTargetAchievement(dataType: any, kpiParamChannel:any){
    const data = {
      "empCode" :this.vieDetails_emp_code ,
       "kpiMonth" : this.viewDetails_emp_month,
        "kpiYear" : this.vieDetails_emp_year,
         "dataType" : dataType,
          "channelNewName" : this.viewchannelNewName,
           "verticalName" : this.viewVerticalName,
            "kpiParamChannel": kpiParamChannel,
    }
    this.rest.downloadTargetAchievement(data).subscribe((res: any) => {
  
      if (res.success) {
        let fileName = res.fileName;
        window.open(this.rest.file_path + '/downloads/' + fileName);

        this.notifier.notify('success',res.message)
      }else{
        this.notifier.notify('error',res.message)

      }
    }, (err: any) => {
      this.notifier.notify('error','some error occurred')

      

    });
  }

  getEmployeeDetails(){
    // console.log(this.employee)


    const data = {
      channelNewName: this.channelName,
      empCode: this.employee,
      userLevel: this.userLevel
    }
    this.rest.getEmployeeDetails(data).subscribe((res: any) => {
  
      if (res.success) {
        if (this.userLevel == 3){
          this.employee = [{"empCode":sessionStorage.getItem('empCode')},] ;
          // console.log(this.employee);
    
        }else{

          this.employee = 'all'
        }
        
        this.employeeList = res.employee_details;
        
        // if (this.userLevel == 3){
        //   this.employee = [{"empCode":sessionStorage.getItem('empCode')},] ;
        //   console.log(this.employee);
    
        // }
        for(var emp of this.employeeList){
          emp.nameCode = String(emp.empName) + " (" + String(emp.empCode)+ ") "
        }
        // console.log(this.employeeList)
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });

  }
  getkpiScore(){
    this.consoleemployee();
    this.EmpName = ''
    this.EmpCode = ''
    this.EmpDesig = ''
    this.EmpSubChannel = ''
    this.EmpVertical = ''
    this.EmpYear = ''
    this.EmpMonth = ''
    this.EmpFy = ''
    this.EmpQuarter = ''


    let tataaigstore = sessionStorage.getItem('tataaigstore') as any;
    let access_channel = JSON.parse(tataaigstore).channelNewId;

    console.log("selected_channel-->", this.channelNew)
    console.log("access_channel-->",access_channel)


    this.selectedMonthList = []
    this.selectedEmployeeList = []

    // console.log(this.month)

    for(var m of this.month){
      if(m.id != null){
        // if(m.id == 'Q4'){
        //   this.selectedMonthList.push('01','02','03')
        // }
        // else if(m.id == 'Q1'){
        //   this.selectedMonthList.push('04','05','06')
        // }
        // else if(m.id == 'Q2'){
        //   this.selectedMonthList.push('07','08','09')
        // }
        // else if(m.id == 'Q3'){
        //   this.selectedMonthList.push('10','11','12')
        // }

        // else {
          this.selectedMonthList.push(m.id)
        // }
        
      }
    }
    // console.log(this.employee);
    for(var e of this.employee){      
      if(e.empCode != null){
        this.selectedEmployeeList.push(e.empCode)
      }
    }
    // console.log("selectedEmployeeList>>>",this.selectedEmployeeList)

    // for making tuple ----->
    let select_emp = `('${this.selectedEmployeeList.join("','")}')`;
    let select_m = `('${this.selectedMonthList.join("','")}')`; 

    this.viewDetails = false;

    let channel: any;
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    console.log(stringArray)

    if(this.channelNew == 'all' || this.channelNew == ''){
      this.channelName = 'all'
    }
    if(this.channelName == 'all'){
      channel = stringArray
    }

    if(this.channelNew == "all" && stringArray.length>1){

      channel = stringArray
    }    
    else{
      channel = this.channelNew
    }

    const data={
      'month': this.selectedMonthList,
      'emp_code': this.selectedEmployeeList,
      'year': this.year,
      'access_channel': access_channel,
      'channelId': channel,
      'channelNewName': this.channelName,
      'verticalName': this.vertical,
      'designationType': this.designation,
      'period': this.periodType,
      'quarter': this.period,
      'fYear': this.financialYear


    }
    this.rest.getkpiScore(data).subscribe((res: any) => {
  
      if (res.success) {
        this.report_period_Type = res.period
        
        
        this.kpiScoreDetails = res.result;
        for(var obj of this.kpiScoreDetails){
          if(obj.targetMonth == 1){
            obj.targetMonth = 'January'
          }
          else if(obj.targetMonth == 2){
            obj.targetMonth = 'February'
          }
          else if(obj.targetMonth == 3){
            obj.targetMonth = 'March'
          }
          else if(obj.targetMonth == 4){
            obj.targetMonth = 'April'
          }
          else if(obj.targetMonth == 5){
            obj.targetMonth = 'May'
          }
          else if(obj.targetMonth == 6){
            obj.targetMonth = 'June'
          }
          else if(obj.targetMonth == 7){
            obj.targetMonth = 'July'
          }
          else if(obj.targetMonth == 8){
            obj.targetMonth = 'August'
          }
          else if(obj.targetMonth == 9){
            obj.targetMonth = 'September'
          }
          else if(obj.targetMonth == 10){
            obj.targetMonth = 'October'
          }
          else if(obj.targetMonth == 11){
            obj.targetMonth = 'November'
          }
          else if(obj.targetMonth == 12){
            obj.targetMonth = 'December'
          }
        }
        this.fullResult = this.kpiScoreDetails

        if(this.kpiScoreDetails.length == 0){
          this.noDataVsbl = true
          this.searchBoxes = false
        }
        else{
          this.noDataVsbl = false
          this.searchBoxes = true
        }
        // console.log("noDataVsbl",this.noDataVsbl ,"searchBoxes",this.searchBoxes)
        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });

    // this.searchEmployee()
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

  searchEmployee(){
    var searchResult = []
    // this.fullResult = this.kpiScoreDetails
    
    for ( var obj of this.fullResult) {
      // console.log("##",obj.empName) //text.includes("world");
      if(String(obj.empName ).toLowerCase().includes(this.EmpName.toLowerCase()) &&
          String(obj.empCode ).toLowerCase().includes(this.EmpCode.toLowerCase()) &&
          (String(obj.designationType ).toLowerCase() + ' ' + String(obj.HOMO_Mapping ).toLowerCase()).includes(this.EmpDesig.toLowerCase()) &&
          String(obj.channelNewName ).toLowerCase().includes(this.EmpSubChannel.toLowerCase()) &&
          String(obj.verticalName ).toLowerCase().includes(this.EmpVertical.toLowerCase()) &&
          String(obj.targetYear ).toLowerCase().includes(this.EmpYear.toLowerCase()) &&
          String(obj.targetMonth ).toLowerCase().includes(this.EmpMonth.toLowerCase())&&


          String(obj.fYear ).toLowerCase().includes(this.EmpFy.toLowerCase())&&
          String(obj.quarter ).toLowerCase().includes(this.EmpQuarter.toLowerCase())
      ){
        searchResult.push(obj)
      }
      
    }
    
    if(this.EmpName== '' &&
    this.EmpCode== '' &&
    this.EmpDesig== '' &&
    this.EmpSubChannel== '' &&
    this.EmpVertical== '' &&
    this.EmpYear== '' &&
    this.EmpMonth== '' &&
    this.EmpFy == '' &&
    this.EmpQuarter == ''){
      searchResult = this.fullResult
    }

    this.kpiScoreDetails = searchResult
  }

  clearSearchFields(){
    this.EmpName = ''
    this.EmpCode = ''
    this.EmpDesig = ''
    this.EmpSubChannel = ''
    this.EmpVertical = ''
    this.EmpYear = ''
    this.EmpMonth = ''
    this.EmpFy == ''
    this.EmpQuarter == ''
    this.searchEmployee()
  }

  

  getDesignations(){
    const data= {
      channelNewId: this.channelNew,
      verticalName: this.vertical
    }
    // console.log(data)
    this.rest.getChannelWiseDesignation(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        this.designationList = res.result;
        this.designation = 'all'

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
    this.getEmployeeDetails()
  }


  get_selected_list(){
    // console.log("selected month", this.month)
  }


  getkpiScoreOnload(){

    this.selectedMonthList.push(this.month)
    let selctedMonthIdList = []
    
    // for making tuple ----->
    // let select_emp = `('${this.selectedEmployeeList.join("','")}')`;
    // let select_m = `('${this.selectedMonthList.join("','")}')`; 
    for( var monList of this.selectedMonthList){
      for( var monId of monList){
        selctedMonthIdList.push(monId.id)
      }
    }

    this.viewDetails = false;

    // var employeeforsearch = [] as any
    // if(this.defaultEmpCode.length != 0){
    //   console.log("onload kpi", this.empCodeListLevel3)
    //   employeeforsearch = this.empCodeListLevel3
    // }
    // else{
    //   employeeforsearch = 'all'
    // }
    const data={
      'month': selctedMonthIdList,
      'emp_code': this.employee,
      'year': this.year,
      'channelNewName': sessionStorage.getItem("defaultChannelNameForAll"),
      'verticalName': this.vertical,
      'designationType': this.designation,
      'period': this.periodType,
      'quarter': this.period,
      'fYear': this.financialYear


    }
    this.rest.getkpiScore(data).subscribe((res: any) => {
  
      if (res.success) {
        this.report_period_Type = res.period

        this.kpiScoreDetails = res.result;
        for(var obj of this.kpiScoreDetails){
          if(obj.targetMonth == 1){
            obj.targetMonth = 'January'
          }
          else if(obj.targetMonth == 2){
            obj.targetMonth = 'February'
          }
          else if(obj.targetMonth == 3){
            obj.targetMonth = 'March'
          }
          else if(obj.targetMonth == 4){
            obj.targetMonth = 'April'
          }
          else if(obj.targetMonth == 5){
            obj.targetMonth = 'May'
          }
          else if(obj.targetMonth == 6){
            obj.targetMonth = 'June'
          }
          else if(obj.targetMonth == 7){
            obj.targetMonth = 'July'
          }
          else if(obj.targetMonth == 8){
            obj.targetMonth = 'August'
          }
          else if(obj.targetMonth == 9){
            obj.targetMonth = 'September'
          }
          else if(obj.targetMonth == 10){
            obj.targetMonth = 'October'
          }
          else if(obj.targetMonth == 11){
            obj.targetMonth = 'November'
          }
          else if(obj.targetMonth == 12){
            obj.targetMonth = 'December'
          }

          
        }
        this.fullResult = this.kpiScoreDetails

        if(this.kpiScoreDetails.length == 0){
          this.noDataVsbl = true
          this.searchBoxes = false
        }
        else{
          this.noDataVsbl = false
          this.searchBoxes = true
        }

        // noDataVsbl && searchBoxes
        // console.log("noDataVsbl",this.noDataVsbl ,"searchBoxes",this.searchBoxes)
        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });

    // this.searchEmployee()

  }

  refreshMainSearch(){
    // this.currentMonthYear()
    for(var month of this.monthList){
      if(this.month == month.id){
        this.month = [month]
      }
    }
    // this.channelNew = 'all'
    // this.vertical = 'all'
    this.verticalList = []
    this.designation = 'all'
    this.designationList = []
    this.employeeList= []
    

    if (this.userLevel == 3){
      this.employee = [{"empCode":sessionStorage.getItem('empCode')},] ;
      // console.log(this.employee);
      
    }else{
      this.employee = 'all';

    }
    if (this.userLevel == 3){
      this.vertical = sessionStorage.getItem('vertical') ;
      // console.log(this.vertical);
      
    }else{
      this.vertical = 'all';

    }
    this.getVerticals();
    
  }

  checkChannelSelected(){
    if(this.channelNew.length == 0 || this.channelNew == 'all'){
      this.selectChannelStatus = true
    }
  }

  checkVerticalSelected(){
    if(this.vertical.length == 0 || this.vertical == 'all' || this.vertical == ''){
      this.selectVerticalStatus = true
    }
  }

  checkDesignationSelected(){
    if(this.designation.length == 0 || this.designation == 'all' || this.designation == ''){
      this.selectDesignationStatus = true
    }
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/alarm.wav";
    audio.load();
    audio.play();
  }
  


  
}
