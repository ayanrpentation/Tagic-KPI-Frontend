import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-channelwise-view-mail',
  templateUrl: './channelwise-view-mail.component.html',
  styleUrls: ['./channelwise-view-mail.component.css']
})
export class ChannelwiseViewMailComponent implements OnInit {
  searchChannel = '';
  channelNewList: any = [];
  allDataList: any = [];
  channelNewName = '' as any
  toMail = '' as any
  ccMail = '' as any
  channelNewNameEdit = '' as any
  toMailEdit = '' as any
  ccMailEdit = '' as any

  userForm: FormGroup | undefined;
  constructor(private route: ActivatedRoute, private rest: RestApiService, private common: CommonService, private ngxService: NgxUiLoaderService, private modalService: NgbModal, private notifier: NotifierService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.viewChannelWiseMail();
    this.getAllChannelNew();
  }
  viewChannelWiseMail() {
    var data = {
      "searchText": this.searchChannel,
    }
    // console.log(data);
    this.rest.viewChannelWiseMail(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.res", res.res)
        this.allDataList = res.res;
      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  addModalFun(addModal: any) {
    // this.clearErr();
    this.modalService.open(addModal, { centered: true });
  }
  editModalFun(editModal: any, channelNewName: any, toMail_Id: any, ccMail_Id: any) {
    this.channelNewNameEdit = channelNewName;
    this.toMailEdit = toMail_Id;
    this.ccMailEdit = ccMail_Id;
    this.modalService.open(editModal, { centered: true });
  }
  closeModal(): void {
    this.modalService.dismissAll();
    this.reset();
    // this.clearEditSection()
    // this.clearEditErr()
    // this.clearErr()
  }
  addMail() {
    const data = {
      to_mail: this.toMail,
      cc_mail: this.ccMail,
      channel: this.channelNewName,

    };
    // console.log(data);
    this.rest.addChannelWiseMail(data).subscribe((res: any) => {
      if (res.success) {
        this.viewChannelWiseMail();
        this.closeModal();
        this.reset();
        // this.common.openSnackBar(res.message);
        this.notifier.notify('success', res.message);
      } else {
        // this.common.openSnackBar(res.message);
        this.notifier.notify('error', res.message);
      }
    });
  }
  editMail() {
    const data = {
      to_mail: this.toMailEdit,
      cc_mail: this.ccMailEdit,
      channel: this.channelNewNameEdit,
    }
    this.rest.editChannelWiseMail(data).subscribe((res: any) => {
      if (res.success) {
        this.viewChannelWiseMail();
        this.closeModal();
        // this.common.openSnackBar(res.message);
        this.notifier.notify('success', res.message);
        // this.notifier.hideAll();
      } else {
        // this.common.openSnackBar(res.massage);
        this.notifier.notify('error', res.message);
        // this.clearEditSection()
      }
    });

  }

  reset(): void {
    this.toMail = null;
    this.ccMail = null;
    this.channelNewName = null;
    this.toMailEdit = null;
    this.ccMailEdit = null;
    this.channelNewNameEdit = null;
  }
  getAllChannelNew() {
    const data = {
      userId: this.common.getUserId(),
    }
    this.rest.getAllChannelNew(data).subscribe((res: any) => {
      if (res.success) {
        this.channelNewList = res.data;
      }
    }, (err: any) => {
    });
  }
}
