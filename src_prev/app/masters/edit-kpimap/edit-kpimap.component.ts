import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-kpimap',
  templateUrl: './edit-kpimap.component.html',
  styleUrls: ['./edit-kpimap.component.css']
})
export class EditKpimapComponent implements OnInit {
  role = 0;
  channel = 0;
  subchannel = null;
  max_per = 0;
  min_per = 0;

  pref_per = 0
  mod_per = 0;
  nonpref_per = 0;
  weightage = 0

  roleList:any;
  channelList: any;
  maximumDetails:any;
  kpi_month = '';
  kpi_year = new Date().getFullYear();
  fYearList :any

  channelNewList:any = [];
  verticalList:any = [];
  ruleList:any = [];
  channelNew :any;
  verticalName:any;

  baseParam = '';
  scoreUnder='score';
  scoreAbove= 'score';
  scoreWithin= 'score';
  scoreUnderNumber = 0;
  scoreWithinNumber = 0;
  scoreAboveNumber = 0;

  stateBifurcation = false;

  ruleVarValues :any = [];
  editKpiitemId: any;
  roleType = null;
  // id:any;

  partner1name = '' as any
  partner2name = '' as any
  partner1ID = '' as any
  partner2ID = '' as any
  weightage_partner1 = '' as any
  weightage_partner2 = '' as any

  initiate_partner1name = '' as any
  initiate_partner1ID = '' as any
  initiate_partner2name = '' as any
  initiate_partner2ID = '' as any
  initiate_weightage_partner1 = '' as any
  initiate_weightage_partner2 = '' as any



  extraBoxFlag = false
  marketShareList = [{'name': 'Market Share(HDB Lending)', 'id' : '105'},{'name':'Market Share(Godrej HL)','id':'106'},{'name':'Market Share(PNB)','id':'107'}]

  marketShareList_hdb = [{'name':'Market Share(Godrej HL)','id':'106'},{'name':'Market Share(PNB)','id':'107'}]

  marketShareList_hl = [{'name': 'Market Share(HDB Lending)', 'id' : '105'},{'name':'Market Share(PNB)','id':'107'}]

  marketShareList_pnb = [{'name': 'Market Share(HDB Lending)', 'id' : '105'},{'name':'Market Share(Godrej HL)','id':'106'}]

  marketShareDropDown = [] as any
  marketShareIdList = ['105','106', '107']
  
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any


  constructor(private ActivatedRoute: ActivatedRoute,private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal,private router: Router, private common: CommonService) { }

  ngOnInit(): void {
    this.editKpiitemId =  this.ActivatedRoute.snapshot.params.id;
    // console.log("this.editKpiitemId--",this.editKpiitemId);
    this.fYearList = [];
    for(let yr = Number(this.kpi_year) + 5; yr >= Number(this.kpi_year) - 5; yr--){
      this.fYearList.push(yr)
    }

    // this.getdetailsdata(1);
    // this.getdetailsdata(2);
    this.getAllRole();
    this.getAllChannel();
    this.getChannelNew();
    this.getAllRuleData();
    this.getKpiRowById();

    // this.showExtraBoxes();
  }
  clearRuleVarVal(){
    this.ruleVarValues = [];
  }

  assignRuleVarVal(key:any, value:any){

    // this.ruleVarValues[key] = value;
    let data = {
      [key]: value,
    }
    this.ruleVarValues.push(data);
    console.log(this.ruleVarValues)
  }
  getVerticals(){

    const data= {
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

  getAllRuleData(){
    this.rest.getAllRuleData().subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        this.ruleList = res.result;

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }

  getChannelNew(){
    // const data = {
    //   header_id: 16
     
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
  getAllRole(){
    
    this.rest.getAllRole().subscribe((res: any) => {
  
      if (res.success) {
    
          this.roleList = res.details_data;
   
      }
    }, (err: any) => {

    });
  }
  getAllChannel(){
    this.rest.getAllChannel().subscribe((res: any) => {
  
      if (res.success) {
   
          this.channelList = res.details_data;
   
      }
    }, (err: any) => {
      
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


  getallowedPercentage(id:any){
    const data = {
       role: id
    }
    this.rest.getmaximum(data).subscribe((res: any) => {
  
      if (res.success) {
        
        this.maximumDetails = res.maxium;
        console.log(res)
        console.log(this.maximumDetails)


        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }
  clearAll(){
    // this.role = 0;
    // this.channel = 0;
    // this.subchannel = null;
    // this.max_per = 0;
    // this.min_per = 0;
    // this.pref_per = 0;
    // this.mod_per = 0;
    // this.nonpref_per = 0;
    // this.clearRuleVarVal();
    // this.channelNew = '';
    // this.verticalName = '';




  }
  editDeleteKpi(){
    this.checkWeightageMatch()
    // console.log(this.maximumDetails.preferred, this.maximumDetails.moderate ,this.maximumDetails.non_preferred )
    // console.log(this.pref_per, this.mod_per, this.nonpref_per)

    // if(this.weightage != 0 || this.weightage != null){
    //   this.stateBifurcation = true
    // }
    // else if(this.weightage == 0 || this.weightage == null){
    //   this.stateBifurcation = false
    // }
    if (this.roleType == 'null'){
      this.roleType = null;
    }
    if (this.scoreUnderNumber == null && this.scoreUnder == 'score'){
      this.scoreUnderNumber = 0;
    }
    if (this.scoreWithinNumber == null && this.scoreWithin == 'score'){
      this.scoreWithinNumber = 0;
    }
    if (this.scoreAboveNumber == null && this.scoreAbove == 'score'){
      this.scoreAboveNumber = 0;
    }

    // console.log(this.ruleVarValues)
    // if(this.kpi_month != '' && this.channel != 0 && this.role != null  ){
    if(this.channelNew != null && this.verticalName!= null && this.role != null && this.kpi_month != '' && this.kpi_year != null && this.channel != 0 && this.baseParam != null && this.min_per != null && this.max_per != null){

      // if(this.pref_per <= this.maximumDetails.preferred && this.mod_per <= this.maximumDetails.moderate && this.nonpref_per <= this.maximumDetails.non_preferred){
  
        const data = {
          channelNew: this.channelNew,
          verticalName: this.verticalName,

          role: this.role,
          roleType: this.roleType,
          kpi_parameter_channel: this.channel,
          kpi_parameter_sub_channel: this.subchannel,
          baseParam: this.baseParam,
          ruleVarValues: this.ruleVarValues,
          minimum_target: this.min_per,
          maximum_cap: this.max_per,
          scoreUnder: this.scoreUnder,
          scoreWithin: this.scoreWithin,
          scoreAbove: this.scoreAbove,

          scoreUnderNumber: this.scoreUnderNumber,
          scoreWithinNumber: this.scoreWithinNumber,
          scoreAboveNumber: this.scoreAboveNumber,


          stateBifurcation: this.stateBifurcation,
          preferred: this.pref_per,
          moderate: this.pref_per,
          non_preferred: this.pref_per,
          // moderate: this.mod_per,
          // non_preferred: this.nonpref_per,
          kpi_month: this.kpi_month,
          kpi_year: this.kpi_year,
          id : this.editKpiitemId,
          delete_flag: 0,

          extraPartner: this.partner2ID,
          partner_one_weightage: this.weightage_partner1,
          partner_two_weightage: this.weightage_partner2,
        }
        console.log(data);
        this.rest.editdeletekpi(data).subscribe((res: any) => {
    
          if (res.success) {
            
            // this.maximumDetails = res.maximum;
          this.notifier.notify('success', res.message);
          this.clearAll();
          this.router.navigate(['dashboard/view-kpi']);
  
    
            
          }
          else{
          this.notifier.notify('error', res.message);

          }
        }, (err: any) => {
          this.notifier.notify('error', 'some error occurred');
          
    
        });
  
    }
    else{
      alert('please fill the necessary details')
    }
  }


  closeModal(){
    this.modalService.dismissAll();
  }
  getKpiRowById(){
    const data = {
      'id': this.editKpiitemId,
    }
    this.rest.getKpiRowById(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res---",res.data);
        this.channelNew = res.data.channelNew;
        this.verticalName = res.data.verticalName;
        this.getVerticals();
        this.role = res.data.role;
        this.roleType = res.data.roleType;
        this.kpi_month = res.data.kpi_month;
        this.kpi_year = res.data.kpi_year;
        this.channel = res.data.kpi_parameter_channel;


        this.baseParam = res.data.base_param;
        this.min_per = res.data.minimum_val;
        this.max_per = res.data.maximum_val;
        this.scoreUnder = res.data.under_range;
        this.scoreWithin = res.data.within_range;
        this.scoreAbove = res.data.above_range;
        this.scoreUnderNumber = res.data.under_range_score;
        this.scoreWithinNumber = res.data.within_range_score;
        this.scoreAboveNumber = res.data.above_range_score;
        this.stateBifurcation = res.data.state_bifurcation_calc;
        this.weightage = res.data.preferred;
        this.pref_per = res.data.preferred;
        this.mod_per = res.data.moderate;
        this.nonpref_per = res.data.non_preferred;
        this.ruleList =  res.ruleList;
        this.ruleVarValues =  res.data.ruleVarValues;


        this.initiate_partner2ID = res.data.addPartner;
        this.initiate_weightage_partner1 = res.data.partnerWeightage_1st;
        this.initiate_weightage_partner2 = res.data.partnerWeightage_2nd;

        this.showExtraBoxes()
        this.getPartner2()

      } else{
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
          this.notifier.notify('error', 'some error occurred');
          
    
        });
  }
  back(){
    window.history.go(-1)
  }

  setWeightage(){
    this.pref_per = this.weightage
    this.mod_per = this.weightage
    this.nonpref_per = this.weightage
  }

  showExtraBoxes(){
    if (this.channelNew == '59' &&  this.marketShareIdList.includes(String(this.channel)) && String(this.role) == '1'){
      this.extraBoxFlag = true

      this.partner2ID = this.initiate_partner2ID;
      this.weightage_partner1 = this.initiate_weightage_partner1;
      this.weightage_partner2 = this.initiate_weightage_partner2;



      if(this.channel == 105){
        this.marketShareDropDown = this.marketShareList_hdb
        this.partner1name = 'Market Share(HDB Lending) weightage'
      }
      else if(this.channel == 106){
        this.marketShareDropDown = this.marketShareList_hl
        this.partner1name = 'Market Share(Godrej HL) weightage'
      }
      else if(this.channel == 107){
        this.marketShareDropDown = this.marketShareList_pnb
        this.partner1name = 'Market Share(PNB) weightage'
      }

    }

    else{
      this.partner1name = '' as any
      this.partner2name = '' as any
      this.partner1ID = '' as any
      this.partner2ID = '' as any
      this.weightage_partner1 = '' as any
      this.weightage_partner2 = '' as any

      this.extraBoxFlag = false
    }
  }

  getPartner2(){
    for (let ms of this.marketShareList){
      if (ms.id == this.partner2ID){
        this.partner2name = ms.name
      }
    }
  }

  checkWeightageMatch(){
    if(this.weightage_partner1 != '' && this.weightage_partner2 != ''){

      if(this.weightage_partner1 + this.weightage_partner2 != this.pref_per){
        // this.notifier.notify('error', 'Sum of Partner 1 & Partner 2 weightage should match with Apply Weightage Value');
        this.common.openSnackBar('Sum of Partner 1 & Partner 2 weightage should match with Apply Weightage Value')
        return;
      }

    }    
  }
}
