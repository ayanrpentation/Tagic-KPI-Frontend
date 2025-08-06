import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { windowWhen } from 'rxjs/operators';
import { CommonService } from 'src/app/common.service';


@Component({
  selector: 'app-kpimap',
  templateUrl: './kpimap.component.html',
  styleUrls: ['./kpimap.component.css']
})
export class KpimapComponent implements OnInit, OnDestroy {



  addBand_BoxStatus = false;
  bandName_to_add = "" as any;
  check_addBandName(){
    // if(this.bandName_to_add.includes('/')){
    //   window.alert("Using of / in Band name is prohibited")
    // }
  }
  addBand(){
    if(this.bandName_to_add.includes('/')){
      window.alert("Using of / in Band name is prohibited");
      return
    }
    const data = {
      userId: this.common.getUserId(),
      month: this.kpi_month,
      year: this.kpi_year,
      channelNewId: this.channelNew,
      bandToadd: this.bandName_to_add,
    }

    this.rest.addBand(data).subscribe((res: any) => {

      if (res.success) {
        this.getAllBand();
        this.bandName_to_add = "";
        this.notifier.notify('success', res.message);
        this.addBand_BoxStatus = false;
      }else{
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      this.addBand_BoxStatus = false;
    });
  }

  showBand_status = this.common.showBandDropdown_status();
  checkShowBandStatus(channelId:any){
    this.showBand_status = this.common.checkShowBandStatus(channelId);
  }
  band = 0 as any;
  bandList = [] as any;


  role = 0 as any;
  channel = 0;
  subchannel = null;
  max_per = 0;
  min_per = 0;
  pref_per = 0
  mod_per = 0;
  nonpref_per = 0;
  roleList: any;
  channelList: any;
  maximumDetails: any;
  kpi_month = '' as any;
  kpi_year = new Date().getFullYear();
  fYearList: any
  channelNewList: any = [];
  verticalList: any = [];
  ruleList: any = [];
  // channelNew :any;
  channelNew = sessionStorage.getItem("defaultChannelForAll") as any;
  selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
  userLevel = sessionStorage.getItem('userLevel') as any
  verticalName = null;
  baseParam = '' as any;
  scoreUnder = 'score';
  scoreAbove = 'score';
  scoreWithin = 'score';
  scoreUnderNumber = 0;
  scoreWithinNumber = 0;
  scoreAboveNumber = 0;
  stateBifurcation = false;
  ruleVarValues: any = [];
  roleType = null;
  addNewBpStatus = false
  bpSearch = "" as any
  bpResult = [] as any
  full_baseParamList = [] as any
  ruleName = "" as any
  ruleBaseParam = "" as any
  scoreVariable = "" as any
  maxPerc = false
  minPerc = false
  extraBoxFlag = false
  roleTypeFlag = false

  marketShareList = [{ 'name': 'Market Share(HDB Lending)', 'id': '105' }, { 'name': 'Market Share(Godrej HL)', 'id': '106' }, { 'name': 'Market Share(PNB)', 'id': '107' }]

  marketShareList_hdb = [{ 'name': 'Market Share(Godrej HL)', 'id': '106' }, { 'name': 'Market Share(PNB)', 'id': '107' }]

  marketShareList_hl = [{ 'name': 'Market Share(HDB Lending)', 'id': '105' }, { 'name': 'Market Share(PNB)', 'id': '107' }]

  marketShareList_pnb = [{ 'name': 'Market Share(HDB Lending)', 'id': '105' }, { 'name': 'Market Share(Godrej HL)', 'id': '106' }]

  marketShareDropDown = [] as any
  marketShareIdList = ['105', '106', '107']
  partner1name = '' as any
  partner2name = '' as any
  // partner1ID = '' as any
  partner2ID = '' as any
  weightage_partner1 = '' as any
  weightage_partner2 = '' as any
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  constructor(private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal, private common: CommonService) {
    let default_cahnnel = sessionStorage.getItem('defaultChannelForAll') as any
    let stringArray = default_cahnnel.split(',');
    if(stringArray.length > 1){
      this.channelNew = ""
    }
    
    // console.log('kpi month11------------->',this.kpi_month)

    if(sessionStorage.getItem('defaultMonthForAll') != null){

      this.kpi_month = Number(sessionStorage.getItem('defaultMonthForAll'))
    }
    else {
      this.fixMonthYearValues()
    }
    // console.log('kpi month------------->',this.kpi_month)
    if (this.kpi_month == 0){
      this.fixMonthYearValues()
    }
   }

  ngOnInit(): void {

    console.log("showBand_status", this.showBand_status)
    
    


    this.fYearList = [];
    for (let yr = Number(this.kpi_year) + 5; yr >= Number(this.kpi_year) - 5; yr--) {
      this.fYearList.push(yr)
    }


    // this.getdetailsdata(1);
    // this.getdetailsdata(2);
    this.getAllBand();
    this.getAllRole();
    this.getAllChannel();
    this.getChannelNew();
    this.getAllRuleData();
    this.getVerticals()
    this.showRoleTypeFlag()

  }

  fixMonthYearValues(){
    const currentMonth = new Date().getMonth() + 1;
    // console.log("currentMonthIndex---->>>",  currentMonth)

    if(currentMonth > 1){

      this.kpi_month = currentMonth - 1
      
    }
    else{
      this.kpi_month = 12
      this.kpi_year = this.kpi_year - 1

    }
  }




  clearRuleVarVal() {
    this.ruleVarValues = [];
    this.scoreUnder = 'score';
    this.scoreAbove = 'score';
    this.scoreWithin = 'score';
  }

  assignRuleVarVal(key: any, value: any) {

    // this.ruleVarValues[key] = value;
    let data = {
      [key]: value,
    }
    this.ruleVarValues.push(data);
    // console.log(this.ruleVarValues)
  }

  getVerticals() {
    const data = {
      channelNewId: this.channelNew,
    }
    this.rest.getVerticals(data).subscribe((res: any) => {
      if (res.success) {
        this.verticalList = res.result;
        this.verticalName = this.verticalList[0].id
        // console.log("this.verticalName", this.verticalName)
        // console.log("res.resul>>>>",res.result)

      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);


    });
  }

  getAllRuleData() {
    this.scoreUnder = 'score';
    this.scoreAbove = 'score';
    this.scoreWithin = 'score';
    this.baseParam = '';
    const data = {
      parameterChannelId: this.channel,
    }
    this.rest.getAllRuleData(data).subscribe((res: any) => {

      if (res.success) {
        this.ruleList = res.result;

        for (var rule of this.ruleList) {
          this.full_baseParamList.push(rule.ruleName)
        }
        // console.log("tttttttttt",this.full_baseParamList)
        this.scoreUnder = 'score';
        this.scoreAbove = 'score';
        this.scoreWithin = 'score';
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      this.scoreUnder = 'score';
      this.scoreAbove = 'score';
      this.scoreWithin = 'score';


    });
  }

  getChannelNew() {
    const data = {
      userId: this.common.getUserId(),
    }
    this.rest.getAllChannelNew(data).subscribe((res: any) => {

      if (res.success) {
        this.channelNewList = res.data;
        // console.log(this.channelNewList)

      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);

    });
  }
  getAllRole() {
    this.rest.getAllRole().subscribe((res: any) => {
      if (res.success) {
        this.roleList = res.details_data;
      }
    }, (err: any) => {

    });
  }

  getAllBand() {
    this.rest.getAllBand().subscribe((res: any) => {
      if (res.success) {
        this.bandList = res.details_data;
      }
    }, (err: any) => {

    });
  }


  getAllChannel() {
    const data = {
      month: this.kpi_month,
      year: this.kpi_year,
      userId: this.common.getUserId(),
      channelNewId: this.channelNew,
    }
    this.rest.getAllChannel(data).subscribe((res: any) => {

      if (res.success) {

        this.channelList = res.details_data;
        // console.log(this.channelList)

      }
    }, (err: any) => {

    });
  }



  getallowedPercentage(id: any) {
    const data = {
      role: id
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
  clearAll() {
    // this.role = 0;
    this.channel = 0;
    this.subchannel = null;
    this.max_per = 0;
    this.min_per = 0;
    this.pref_per = 0;
    this.mod_per = 0;
    this.nonpref_per = 0;
    this.scoreUnderNumber = 0;
    this.scoreWithinNumber = 0;
    this.scoreAboveNumber = 0;
    this.baseParam = null;
    this.roleType = null;
    this.clearRuleVarVal();

  }
  savekpi() {

    this.checkWeightageMatch()

    if (this.roleType == 'null') {
      this.roleType = null;
    }
    if (this.scoreUnderNumber == null && this.scoreUnder == 'score') {
      this.scoreUnderNumber = 0;
    }
    if (this.scoreWithinNumber == null && this.scoreWithin == 'score') {
      this.scoreWithinNumber = 0;
    }
    if (this.scoreAboveNumber == null && this.scoreAbove == 'score') {
      this.scoreAboveNumber = 0;
    }
    if (this.showBand_status == false){
      this.band = "";
    }
    if (this.channelNew != null 
        && this.verticalName != null 

        // this logic is here to handle band value validation
        && ((this.showBand_status == true && this.band != null && this.band != 0 && this.band.length != 0) || (this.showBand_status == false))

        && this.role != null 
        && this.role != 0 
        && this.kpi_month != '' 
        && this.kpi_year != null 
        && this.channel != 0 
        && this.baseParam != null 
        && this.baseParam != '' 
        && this.min_per != null 
        && this.max_per != null) {

      const data = {
        channelNew: this.channelNew,
        verticalName: this.verticalName,
        bandStatus: this.showBand_status,
        band: this.band,
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

        extraPartner: this.partner2ID,
        partner_one_weightage: this.weightage_partner1,
        partner_two_weightage: this.weightage_partner2,



      }
      // console.log("insertmapkpi data>>>",data);
      this.rest.insertmapkpi(data).subscribe((res: any) => {

        if (res.success) {

          // this.maximumDetails = res.maximum;
          this.notifier.notify('success', res.message);
          this.clearAll();



        }
        else {
          this.notifier.notify('error', res.message);

        }
      }, (err: any) => {
        this.notifier.notify('error', 'some error occurred');


      });



      // }else{
      //   alert('details crossed the actual allowed percentage')
      // }
    }
    else {
      alert('please fill the necessary details')
    }
  }


  closeModal() {
    this.modalService.dismissAll();
  }

  searchBp() {

    this.bpResult = []

    for (var r of this.full_baseParamList) {
      if (r.toLowerCase().includes(this.bpSearch.toLowerCase())) {
        this.bpResult.push(r)
      }
    }
  }


  showExtraBoxes() {
    if (this.channelNew == '59' && this.marketShareIdList.includes(String(this.channel)) && this.role == '1') {
      this.extraBoxFlag = true

      if (this.channel == 105) {
        this.marketShareDropDown = this.marketShareList_hdb
        this.partner1name = 'Market Share(HDB Lending) weightage'
      }
      else if (this.channel == 106) {
        this.marketShareDropDown = this.marketShareList_hl
        this.partner1name = 'Market Share(Godrej HL) weightage'
      }
      else if (this.channel == 107) {
        this.marketShareDropDown = this.marketShareList_pnb
        this.partner1name = 'Market Share(PNB) weightage'
      }

    } else {
      this.extraBoxFlag = false
    }
  }
  showRoleTypeFlag() {
    if (this.channelNew == '60') {
      this.roleTypeFlag = true
    } else {
      this.roleTypeFlag = false
    }
  }


  getPartner2() {
    for (let ms of this.marketShareList) {
      if (ms.id == this.partner2ID) {
        this.partner2name = ms.name
      }
    }
  }

  checkWeightageMatch() {
    if (this.weightage_partner1 != '' && this.weightage_partner2 != '') {

      if (this.weightage_partner1 + this.weightage_partner2 != this.pref_per) {
        // this.notifier.notify('error', 'Sum of Partner 1 & Partner 2 weightage should match with Apply Weightage Value');
        this.common.openSnackBar('Sum of Partner 1 & Partner 2 weightage should match with Apply Weightage Value')
        return;
      }

    }
  }

  ngOnDestroy() {
    // ...
  }
  setPreferPer_value() {
    if (this.stateBifurcation == false) {
      this.pref_per = 0
      // console.log("this.pref_per--->", this.pref_per)
    }
  }

}
