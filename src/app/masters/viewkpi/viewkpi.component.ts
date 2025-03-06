import { Component, DoCheck,AfterContentInit, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {CommonService} from '../common.service';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewkpi',
  templateUrl: './viewkpi.component.html',
  styleUrls: ['./viewkpi.component.css']
})
export class ViewkpiComponent implements OnInit, DoCheck, AfterContentInit {

  
  monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];
  searchedMonth = sessionStorage.getItem('defaultMonthForAll') as any
  searchedYear = sessionStorage.getItem('defaultYearForAll') as any
  currentMonth = '' as any
  currentYear = '' as any
  yearList = [] as any

  allkpiDetails= [] as any;
  roleList: any;
  channelList: any;
  isedit = false;
  editId = -1;
  deleteId = -1;
  edit_role: any;
  edit_kpi_parameter_channel: any;
  edit_kpi_parameter_sub_channel: any;
  edit_minimum_target: any;
  edit_maximum_cap: any;
  edit_preferred: any;
  edit_moderate: any;
  edit_non_preferred: any;
  maximumDetails: any;
  role_desig = 'all' as any;
  param_channel_id = 'all' as any;
  userType: any;
  channelNewList = [] as any;

  // channelNewId: any;
  channelNewId = sessionStorage.getItem('defaultChannelForAll') as any;
  selectedDefaultChannelName =  sessionStorage.getItem('defaultChannelForAll') as any;
  userLevel = sessionStorage.getItem('userLevel') as any;

  

  verticalName = 'all' as any;

  verticalId: any;
  verticalList = [] as any;

  offset = 0;
  limit = 10;
  kpiParamList = [] as any;
  
  prevDisable = true;
  nextDisable = false;
  previousRowCount: any
  columnName = 'all' as any;
  columnList: any = [];
  searchValue = '' as any;
  moduleId: any;





  constructor(private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal, private common: CommonService, private router: Router) {
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    // console.log("default_cahnnel-->", default_cahnnel)
    let stringArray = default_cahnnel.split(',');
    console.log("stringArray-->", stringArray)
    if(stringArray.length > 1){
      this.channelNewId = "all"
    }


    if(sessionStorage.getItem('verticalMappedKPI')!= null){
      this.verticalName = String(sessionStorage.getItem('verticalMappedKPI'))
      // console.log("this.verticalName",this.verticalName, typeof(this.verticalName))
    }
    if(sessionStorage.getItem('roleMappedKPI')!= null){
      this.role_desig = String(sessionStorage.getItem('roleMappedKPI'))
      // console.log("this.role",this.role)
    }
    if(sessionStorage.getItem('paramChannelMappedKPI')!= null){
      this.param_channel_id = sessionStorage.getItem('paramChannelMappedKPI')
      // console.log("this.param_channel_id",this.param_channel_id)
    }
   }

  ngOnInit(): void {
    


    
    // console.log(this.channelNewId)
    this.moduleId = this.common.getKpiMappingId()
    this.userType = this.common.getUserType();
    this.getVerticals();

    this.columnName = sessionStorage.getItem('columnName');
    this.searchValue = sessionStorage.getItem('value');
    if(sessionStorage.getItem('columnName') == 'all' && sessionStorage.getItem('value') == '' && sessionStorage.getItem('defaultChannelForAll') != ''){
      this.columnName = 'channelNew'
      this.searchValue = sessionStorage.getItem('defaultChannelNameForAll')
    }


    

    
    

    // if(this.columnName == null || this.columnName == undefined || this.columnName == 'null'){
    //   this.columnName == 'all'
    // }
    // if(this.searchValue == null || this.searchValue == undefined || this.searchValue == 'null'){
    //   this.searchValue == ''
    // }
    
    // this.getallkpi();
    this.currentMonthYear()
    if(sessionStorage.getItem('defaultYearForAll') == ''){this.searchedYear = new Date().getFullYear()}
    if(sessionStorage.getItem('defaultMonthForAll') == ''){this.searchedMonth = this.currentMonth}
    this.getColumnName();
    this.getChannelWiseDesignation();
    this.getChannelWiseKpiParamList();

    this.getAllChannel();
    this.viewMappedKpi();
    // this.getdetailsdata(1);
    // this.getdetailsdata(2);
    for (var i = Number(this.searchedYear) + 5; i >= Number(this.searchedYear)-5; i--) {
      // console.log("year",i);
      this.yearList.push(i);
    }
    // console.log("999999999999999999",this.monthList, this.yearList)
    this.getAllChannelNew();


    // if(sessionStorage.getItem('verticalMappedKPI')!= null){
    //   this.verticalName = String(sessionStorage.getItem('verticalMappedKPI'))
    //   // console.log("this.verticalName",this.verticalName, typeof(this.verticalName))
    // }
    // if(sessionStorage.getItem('roleMappedKPI')!= null){
    //   this.role = String(sessionStorage.getItem('roleMappedKPI'))
    //   // console.log("this.role",this.role)
    // }
    // if(sessionStorage.getItem('paramChannelMappedKPI')!= null){
    //   this.param_channel_id = sessionStorage.getItem('paramChannelMappedKPI')
    //   // console.log("this.param_channel_id",this.param_channel_id)
    // }

    // setTimeout(() => {
    //   if (sessionStorage.getItem('verticalMappedKPI') != null) {
    //     this.verticalName = sessionStorage.getItem('verticalMappedKPI');
    //     console.log("this.verticalName", this.verticalName, typeof(this.verticalName));
    //   }
    //   if (sessionStorage.getItem('roleMappedKPI') != null) {
    //     this.role = sessionStorage.getItem('roleMappedKPI');
    //     console.log("this.role", this.role);
    //   }
    //   if (sessionStorage.getItem('paramChannelMappedKPI') != null) {
    //     this.param_channel_id = sessionStorage.getItem('paramChannelMappedKPI');
    //     console.log("this.param_channel_id", this.param_channel_id);
    //   }
    // }, 1500);
    

    
  }



  ngDoCheck() {
    
  }

  ngAfterContentInit(): void {
    // if(sessionStorage.getItem('verticalMappedKPI')!= null){
    //   this.verticalName = String(sessionStorage.getItem('verticalMappedKPI'))
    //   // console.log("this.verticalName",this.verticalName, typeof(this.verticalName))
    // }
    // if(sessionStorage.getItem('roleMappedKPI')!= null){
    //   this.role = String(sessionStorage.getItem('roleMappedKPI'))
    //   console.log("this.role",this.role)
    // }
    // if(sessionStorage.getItem('paramChannelMappedKPI')!= null){
    //   this.param_channel_id = sessionStorage.getItem('paramChannelMappedKPI')
    //   console.log("this.param_channel_id",this.param_channel_id)
    // }
  }



  getAllChannelNew() {
    const data = {
      userId : this.common.getUserId(),
    }
    this.rest.getAllChannelNew(data).subscribe((res: any) => {
      if (res.success) {
        this.channelNewList = res.data;
      }
    }, (err: any) => {
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
    this.currentMonth = mon-1 // final month to show in frontend
    
    if(String(this.currentMonth).length<2){ 
      this.currentMonth = '0' + String(this.currentMonth)
    }
    else{
      this.currentMonth = String(this.currentMonth)
    }
    
    this.currentYear = yr

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
    // this.getallkpi();
    this.viewMappedKpi();
  }

  goNext(): any {
    this.offset = this.offset + this.limit;
    // console.log("======",this.offset)
    // console.log("-----",this.allkpiDetails.length)
    // this.getallkpi();
    this.viewMappedKpi();
    this.prevDisable = false;
    // if(this.offset -10 > this.allkpiDetails.length){
    //   this.nextDisable = true
      
    // }
  }
  getChannelWiseDesignation() {
    // this.role = 'all'

    if(this.userLevel != 3 && sessionStorage.getItem('roleMappedKPI')== null){
      this.role_desig = 'all'

      // console.log('11111111111111111111111')
    }
    else {
      this.role_desig = sessionStorage.getItem('roleMappedKPI')
      // console.log('22222222222222222222')
    }

    const data = {
      channelNewId: this.channelNewId,
      verticalName: this.verticalName
    }
    this.rest.getChannelWiseDesignation(data).subscribe((res: any) => {
      if (res.success) {
        this.roleList = res.result;


        if(sessionStorage.getItem('roleMappedKPI')!= null){
          this.role_desig = String(sessionStorage.getItem('roleMappedKPI'))
          // console.log("this.role",this.role)
        }
        if(sessionStorage.getItem('paramChannelMappedKPI')!= null){
          this.param_channel_id = sessionStorage.getItem('paramChannelMappedKPI')
          // console.log("this.param_channel_id",this.param_channel_id)
        }

        
        console.log("role--------------------->> ",this.role_desig)
      }
    }, (err: any) => {

    });
  }
  getChannelWiseKpiParamList(){
    if(this.userLevel != 3  && sessionStorage.getItem('paramChannelMappedKPI')== null){
      this.param_channel_id = 'all'
    }
    const data = {
      channelNewId: this.channelNewId,
      verticalName: this.verticalName,
      role: this.role_desig,
      month: this.searchedMonth,
      year : this.searchedYear

    }
    this.rest.getChannelWiseKpiParamList(data).subscribe((res: any) => {
      if (res.success) {
        this.kpiParamList = res.result;
      }
    }, (err: any) => {

    });
  }
  getAllChannel() {
    const data = {
      userId : this.common.getUserId(),
      channelNewId: this.channelNewId,
    }
    this.rest.getAllChannel(data).subscribe((res: any) => {

      if (res.success) {
        this.channelList = res.details_data;


      }
    }, (err: any) => {

    });
  }

  
  getallkpi(flag: number = 0) {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.allkpiDetails = [];
    }
    const data = {
      'limit': this.limit,
      'offset': this.offset,
      role: this.role_desig,
      channel_id: this.param_channel_id,
    }
    this.rest.getallkpi(data).subscribe((res: any) => {

      if (res.success) {

        // console.log(this.documentDetails)
        this.allkpiDetails = res.kpi;


      } else {
        this.notifier.notify('error', res.message);

      }
    }, (err: any) => {
      this.notifier.notify('error', err.message.message);


    });
  }
  // getdetailsdata(id:any){
  //   const data = {
  //     header_id: id
  //   }
  //   this.rest.getdetailsdata(data).subscribe((res: any) => {

  //     if (res.success) {

  //       // console.log(this.documentDetails)
  //       if (id == 1){

  //         this.roleList = res.details_data;
  //       }else if (id == 2){
  //         this.channelList = res.details_data;
  //       }


  //     }
  //   }, (err: any) => {
  //     // this.notifier.notify('error', err.error.message);


  //   });
  // }
  getallowedPercentage(id: any, kpiId: any) {
    const data = {
      role: id,
      kpi_id: kpiId
    }
    this.rest.getmaximum(data).subscribe((res: any) => {

      if (res.success) {

        this.maximumDetails = res.maxium;
        // console.log(res)
        // console.log(this.maximumDetails)

      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);


    });
  }

  getVerticals() {
    if(this.userLevel != 3 && sessionStorage.getItem('verticalMappedKPI')== null){
      this.verticalName = 'all'
    }

    // if(this.userLevel != 3){
    //   this.verticalName = 'all'
    // }


    const data = {
      channelNewId: this.channelNewId,
    }
    this.rest.getVerticals(data).subscribe((res: any) => {
      if (res.success) {
        // console.log(this.documentDetails)
        this.verticalList = res.result;
        
        
        if(sessionStorage.getItem('verticalMappedKPI')!= null){
          this.verticalName = String(sessionStorage.getItem('verticalMappedKPI'))
          // console.log("this.verticalName",this.verticalName, typeof(this.verticalName))
        }
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

  changeValue(id: any, delete_flag: any) {
    if ((this.editId == id && delete_flag == 0) || (delete_flag == 1)) {

      // if(delete_flag == 0 && ((this.edit_preferred > this.maximumDetails.preferred) || (this.edit_moderate > this.maximumDetails.moderate) || (this.edit_non_preferred > this.maximumDetails.non_preferred))){
      //   alert('details crossed actual allowed percentage');
      // }else{

      const data = {
        id: id,
        role: this.edit_role,
        kpi_parameter_channel: this.edit_kpi_parameter_channel,
        kpi_parameter_sub_channel: this.edit_kpi_parameter_sub_channel,
        minimum_target: this.edit_minimum_target,
        maximum_cap: this.edit_maximum_cap,
        preferred: this.edit_preferred,
        moderate: this.edit_moderate,
        non_preferred: this.edit_non_preferred,

        delete_flag: delete_flag,
        channelNewId: this.channelNewId,
        verticalId: this.verticalId
      }
      this.rest.editdeletekpi(data).subscribe((res: any) => {

        if (res.success) {

          // console.log(this.documentDetails)
          this.notifier.notify('success', 'Done...');


          this.isedit = false;
          // this.getallkpi();
          if (delete_flag == 1) {
            this.modalService.dismissAll();
            this.viewMappedKpi()
          }




        }
      }, (err: any) => {
        this.notifier.notify('error', 'some error occurred');


      });
      // }
    }
  }
  editValue(id: any,channelId:any) {
    this.editId = id;
    this.router.navigate(['dashboard/editkpimap',channelId, this.editId]);
    // this.getallowedPercentage(this.edit_role, this.editId);


  }
  // editValue(role:any,kpi_parameter_channel:any,kpi_parameter_sub_channel:any,minimum_target:any,maximum_cap:any,preferred:any,moderate:any,non_preferred:any, id:any, channelNewId:any, verticalId:any){

  //   if (this.isedit == false){

  //     this.isedit = true;
  //     // kpi.role, kpi.kpi_parameter_channel, kpi.kpi_parameter_sub_channel, kpi.minimum_target, 
  //     // kpi.maximum_cap,kpi.preferred,kpi.moderate,kpi.non_preferred, kpi.id

  //     this.edit_role  = role;
  //     this.edit_kpi_parameter_channel = kpi_parameter_channel;
  //     this.edit_kpi_parameter_sub_channel = kpi_parameter_sub_channel;
  //     this.edit_minimum_target = minimum_target;
  //     this.edit_maximum_cap = maximum_cap;
  //     this.edit_preferred = preferred;

  //     this.edit_moderate = moderate;
  //     this.edit_non_preferred = non_preferred;
  //     this.channelNewId = channelNewId;
  //     this.verticalId = verticalId;
  //     // this.edit_kpi_parameter_channel = kpi_parameter_channel;

  //     // this.edit_detail_desc = detail_desc;
  //     // this.edit_detail_code = detail_code;
  //     this.editId = id;
  //     this.getallowedPercentage(this.edit_role, this.editId);

  //   }
  // }
  downloadKpi(sendmail: any) {
    const data = {
      mail_flag: sendmail,
      role: this.role_desig,
      channel_id: this.param_channel_id
    }

    this.rest.kpimappingDownload(data).subscribe((res: any) => {

      if (res.success) {
        if (sendmail == 0) {
          window.open(this.rest.file_path + '/downloaded_kpi/' + res.file_name)
        } else {
          this.notifier.notify('success', 'Sent Mail Successfully')
        }


      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);

    });
  }
  openDeleteModal(deleteModal: any, id: any): void {
    // this.selectedId = userId;
    // this.selectedPosition = pos;
    this.deleteId = id;
    this.modalService.open(deleteModal, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  // lastSearch(){
  //   this.columnName = localStorage.getItem("columnName");
  //   this.searchValue = localStorage.getItem("value");

  //   this.genericFilter()
  // }

  viewMappedKpi(flag: number = 0) {
    let accessableChannels = sessionStorage.getItem('accessableChannels') as any
    console.log("accessableChannels---->",accessableChannels)



    this.nextDisable = false;

    let channel: any;
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any 
    // let default_cahnnel = sessionStorage.getItem('accessableChannels') as any 

    let stringArray = default_cahnnel.split(',');
    if(this.channelNewId === ''){ this.channelNewId = 'all'}
    console.log("viewMappedKpi---channelNewId", this.channelNewId)

    // if(this.channelNewId == "all" && stringArray.length>1){
    if(this.channelNewId == "all" ){

      

      let accessableChannels_list = accessableChannels.split(',');

      console.log("accessableChannels_list---->",accessableChannels_list)

      channel = accessableChannels_list


      // channel = stringArray
    }
    else{
      channel = this.channelNewId
    }
    

    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.allkpiDetails = [];
    }
    this.isedit = false;
    const data = {
      'month': this.searchedMonth,
      'year': this.searchedYear,
      'limit': this.limit,
      'offset': this.offset,
      // 'channelNew': this.channelNewId,
      'channelNew': channel,
      'vertical': this.verticalName,
      'role': this.role_desig,
      'kpi_parameter_channel': this.param_channel_id,
    }

    sessionStorage.setItem("verticalMappedKPI", this.verticalName);
    sessionStorage.setItem("roleMappedKPI", this.role_desig);
    sessionStorage.setItem("paramChannelMappedKPI", this.param_channel_id);

    






    // sessionStorage.setItem("mapKpiMonth", this.searchedMonth);
    // sessionStorage.setItem("mapKpiYear", this.searchedYear);
    // sessionStorage.setItem("mapKpiLimit", String(this.limit));
    // sessionStorage.setItem("mapKpiOffset", String(this.offset));
    // sessionStorage.setItem("mapKpiChannelNew", this.channelNewId);
    // sessionStorage.setItem("mapKpiVertical", this.verticalName);
    // sessionStorage.setItem("mapKpiRole", this.role);
    // sessionStorage.setItem("mapKpiParameterChannel", this.param_channel_id);

    // if(data.columnName == 'null' || data.columnName == null){
    //   data.columnName == 'all'
    // }
    // if(data.value == 'null' || data.value == null){
    //   data.value == ''
    // }
    // sessionStorage.setItem("columnName", this.columnName);
    // sessionStorage.setItem("value", this.searchValue);


    this.rest.viewMappedKpi(data).subscribe((res: any) => {
      // console.log("this.previousRowCount---", this.previousRowCount)
      if (res.success) {
        if (res.result.length == 0) {
          this.nextDisable = true;
          this.allkpiDetails = [];
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        }
        else {
          this.allkpiDetails = res.result;
          this.previousRowCount = res.result.length
          
        }
        // this.reset();

        // console.log("verticalMappedKPI",this.verticalName)
        // console.log("roleMappedKPI",this.role)
        // console.log("paramChannelMappedKPI",this.param_channel_id)

        

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






  setRoleOnChange = () => {
    // this.role = 'all'

    // if(sessionStorage.getItem('roleMappedKPI')!= null){
    //   this.role = String(sessionStorage.getItem('roleMappedKPI'))
    // }
    // if(sessionStorage.getItem('paramChannelMappedKPI')!= null){
    //   this.param_channel_id = sessionStorage.getItem('paramChannelMappedKPI')
    // }
  }

  goToParamSeq(){
    this.router.navigate(['dashboard/param_sequence']);
  }
}
