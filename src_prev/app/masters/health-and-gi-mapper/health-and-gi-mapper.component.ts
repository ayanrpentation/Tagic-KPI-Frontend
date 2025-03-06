import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-health-and-gi-mapper',
  templateUrl: './health-and-gi-mapper.component.html',
  styleUrls: ['./health-and-gi-mapper.component.css']
})
export class HealthAndGiMapperComponent implements OnInit {

  channel = 0;
  subchannel = '';
  max_per = 0;
  min_per = 0;

  pref_per = 0
  mod_per = 0;
  nonpref_per = 0;

  roleList: any;
  channelList: any;
  maximumDetails: any;
  kpi_month = '';
  kpi_year = new Date().getFullYear();
  fYearList: any

  // channelNewList = ['BANCA'] as any
  channelNewList: any = [];
  // verticalList = ['All', 'BOB', 'CANARA', 'IDBI', 'IPPB'] as any
  verticalList:any = [];
  // subchannel_list = ['KPG-PSU'] as any
  subchannel_list: any = [];
  ruleList: any = [];
  channelNew: any;
  verticalName: any;
  // lastUploadedStatus = true
  currentUploadedStatus = false;




  stateBifurcation = false;

  ruleVarValues: any = [];




  uploadFileType: any
  datatodelete: any
  uploadcredentials: any
  dataList: any = [];

  isedit = false;
  editId = 0;
  editkpiType: any;
  showAction = -1;
  editChannel: any;
  editVertical: any;
  editProductName: any;
  editSubChannel: any;

  constructor(private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fYearList = [];
    for (let yr = this.kpi_year; yr >= this.kpi_year - 10; yr--) {
      this.fYearList.push(yr)
    }
    this.showPSU_Heath_GI_Map();
    this.getAllChannelNew();
  }
  clearRuleVarVal() {
    this.ruleVarValues = [];
  }

  assignRuleVarVal(key: any, value: any) {

    // this.ruleVarValues[key] = value;
    let data = {
      [key]: value,
    }
    this.ruleVarValues.push(data);
    console.log(this.ruleVarValues)
  }



  clearAll() {
    this.kpi_year = new Date().getFullYear();
    this.kpi_month = ''
    this.channelNew = ''
    this.subchannel = ''
    this.verticalName = ''
    this.uploadFileType = ''
  }



  closeModal() {
    this.modalService.dismissAll();
  }

  savekpiManually(showdata: any) {

    console.log("rrrrrrrrrrrrrrrrrrr")

    if (this.uploadcredentials == null) {
      window.alert("Please Select File to Upload")
    }

    if (this.channelNew == '' || this.channelNew == null || this.subchannel == '' || this.subchannel == null) {
      window.alert("Please Fill All The Fields")
    }

    else {
      this.uploadcredentials.append('channel', this.channelNew);
      this.uploadcredentials.append('sub_channel', this.subchannel);

      const data = this.uploadcredentials




      this.rest.uploadPSU_Heath_GI_Map(data).subscribe((res: any) => {

        if (res.success) {
          this.notifier.notify('success', res.message);
          this.clearAll();
          this.openShowdataModal(showdata)
        }

        else {
          this.notifier.notify('error', res.message);

        }
      }, (err: any) => {
        this.notifier.notify('error', 'some error occurred');


      });
    }


  }

  lastUploaded() {

  }

  deleteRequestModal(data: any, modal: any) {
    // this.datatodelete = data
    // this.deleteId = fileId;

    this.modalService.open(modal, { centered: true, size: 'md' });

  }


  deletedata(data: any) {
    // this.isEdit = false
    // this.editId = -1
    // // this.showDetailsData() // after res.success==true

    // // data['file_type_id'] = this.fileTypeId_edit;
    // // data['module_id'] = this.moduleId_edit;



    // const data1 = {
    //   'data': data,
    //   'file_type_id': this.fileTypeId_edit,
    //   'module_id': this.moduleId_edit,
    //   'delete_flag': 1
    // }

    // this.rest.editDeleteFileRowData(data1).subscribe((res: any) => {
    //   // console.log("res---",res)
    //   if (res.success) {
    //     this.closeModal();
    //     this.showDetailsData() // after res.success==true
    //   } else {
    //     this.notifier.notify('error', res.message);
    //   }
    // });

    // console.log("data to save", data1)


  }


  cancelEdit() {
    // this.isEdit = false
    // this.editId = -1
    // this.showDetailsData()
  }

  showData() {
    this.currentUploadedStatus = true
    this.modalService.dismissAll();
  }
  dontshowdata() {

    this.currentUploadedStatus = false
    this.closeModal()
  }

  openShowdataModal(modal: any) {
    this.modalService.open(modal, { centered: true, size: 'md' });
  }



  uploadFile(event: any): any {
    const fd = new FormData();
    const files = event.target.files;
    fd.append('file', files[0]);
    this.uploadcredentials = fd
  }
  editHealthGI(itemId: any, kpiType: any,channel:any,subChannel:any,vertical:any,productName:any) {
    if (this.isedit == false) {
      this.isedit = true;
      this.editId = itemId;
      this.editkpiType = kpiType;
      this.editChannel = channel;
      this.editSubChannel = subChannel;
      this.editVertical = vertical;
      this.editProductName =  productName;
    }
   
  }
  editPSU_Heath_GI_Map(id: any) {
    if (this.editId == id) {
      const data = {
        // channel: this.editChannel,
        // subChannel:this.editSubChannel,
        // vertical: this.editVertical,
        // productName: this.editProductName,
        id: this.editId,
        kpiType: this.editkpiType,
    }
      this.rest.editPSU_Heath_GI_Map(data).subscribe((res: any) => {
        // console.log("res---",res)
        if (res.success) {
          this.notifier.notify('success', res.message);
          this.isedit = false;
          this.showPSU_Heath_GI_Map();
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }
  }
  showPSU_Heath_GI_Map() {

    this.rest.showPSU_Heath_GI_Map().subscribe((res: any) => {
      // console.log("res---",res)
      if (res.success) {
        this.dataList = res.data;
      } else {
        // this.notifier.notify('error', res.message);
      }
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
}


