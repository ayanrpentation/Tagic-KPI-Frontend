import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  channelNewId = '' as any
  channelNewList = [] as any
  vertical = '' as any
  verticalList = [] as any
  empCode = '' as any

  userList: any = [];
  departmentList: any = [];
  userDetails: any;
  searchUser = '' as any;
  name = '';
  nameErr = '';
  userName = '';
  depname = '' as any;
  userNameErr = '';
  email = '';
  emailErr = '';
  phone = '1234567890';
  phoneErr = '';
  channelErr = ''
  utypeErr = ''
  empCodeErr = '' as any
  verticalErr = '' as any
  userType = '' as any;
  selectedId = '' as any // for delete
  userIdEdit = '' as any // for edit
  selectedPosition = 0;
  allchannelselection: any


  nameEdit = '' as any
  userNameEdit = '' as any
  emailEdit = '' as any
  userTypeEdit = '' as any
  channelNewIdEdit = '' as any
  verticalEdit = '' as any
  empCodeEdit = '' as any

  nameErrEdit = '' as any
  userNameErrEdit = '' as any
  emailErrEdit = '' as any
  utypeErrEdit = '' as any
  channelErrEdit = '' as any
  verticalErrEdit = '' as any
  empCodeErrEdit = '' as any
  corErrEdit = '' as any
  corErr = '' as any

  cor_access = 0 as any
  cor_access_edit = '' as any

  // toMailEdit = '' as any
  // fromMailEdit = '' as any
  // ccMailEdit = '' as any
  // toMailErrEdit = null
  // fromMailErrEdit = null
  // ccMailErrEdit = null

  dropdownList_channel = [] as any;
  selectedItems_channel = [] as any;
  dropdownSettings_channel:IDropdownSettings = {};
  allChannel = '' as any;




  dropdownList_channel_edit = [] as any;
  selectedItems_channel_edit = [] as any;
  dropdownSettings_channel_edit:IDropdownSettings = {};
  allChannel_edit = '' as any;





  constructor(private route: ActivatedRoute, private rest: RestApiService, private common: CommonService, private ngxService: NgxUiLoaderService, private modalService: NgbModal, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getUserList();
    this.getAllChannelNew();
    // this.departmentFetch();
    // this.getVerticals();
    // this.channelDropdownSettings();

  }
  channelDropdownSettings(){
    this.dropdownList_channel = this.channelNewList;
    this.dropdownSettings_channel = { idField: 'id',textField: 'channelNewName',allowSearchFilter: true, enableCheckAll: true, itemsShowLimit: 1,selectAllText: 'Select All', };
  }

  // Method to handle item select
  onItemSelect(item: any) {
    // console.log('Item selected:', item);
    console.log(this.selectedItems_channel)
  }

  // Method to handle item deselect
  onItemDeSelect(item: any) {
    console.log('Item deselected:', item);
    console.log(this.selectedItems_channel)
  }

  // Method to handle "Select All"
  onSelectAll(items: any) {
    // console.log('All items selected:', items);
    this.selectedItems_channel = [...this.dropdownList_channel]; // Select all items
    console.log(this.selectedItems_channel)
  }

  // Method to handle "Deselect All"
  onDeSelectAll(items: any) {
    // console.log('All items deselected:', items);
    this.selectedItems_channel = []; // Deselect all items
    console.log(this.selectedItems_channel)
  }




  // -----------------------multi select codes for edit section---------------
  channelDropdownSettings_edit(){
    this.dropdownList_channel_edit = this.channelNewList;
    // console.log("----------",this.dropdownList_channel_edit)
    this.dropdownSettings_channel_edit = { idField: 'id',textField: 'channelNewName',allowSearchFilter: true, enableCheckAll: true, itemsShowLimit: 1,selectAllText: 'Select All', };
  }
  onItemSelect_edit(item: any) {
    console.log(this.selectedItems_channel_edit)
    this.getVerticalsForEdit()
  }

  onItemDeSelect_edit(item: any) {
    console.log('Item deselected:', item);
    console.log(this.selectedItems_channel_edit)
    this.getVerticalsForEdit()
  }

  onSelectAll_edit(items: any) {
    this.selectedItems_channel_edit = [...this.dropdownList_channel_edit]; // Select all items
    console.log(this.selectedItems_channel_edit)
    this.getVerticalsForEdit()
  }

  onDeSelectAll_edit(items: any) {
    this.selectedItems_channel_edit = []; // Deselect all items
    console.log(this.selectedItems_channel_edit)
    this.getVerticalsForEdit()
  }



  getVerticalsForAdd() {
    if (this.userType == '3') {
      const data = {
        channelNewId: this.channelNewId,
      }
      // console.log(data)
      this.rest.getVerticals(data).subscribe((res: any) => {
        if (res.success) {
          // console.log(this.documentDetails)
          this.verticalList = res.result;
          this.vertical = ''
        }
      }, (err: any) => {
        // this.notifier.notify('error', err.error.message); 
      });
    }
  }

  getVerticalsForEdit() {
    // if(this.userTypeEdit == '3'){

    // }    
    const data = {
      channelNewId: this.channelNewIdEdit,
    }
    // console.log(data)
    this.rest.getVerticals(data).subscribe((res: any) => {
      if (res.success) {
        // console.log(this.documentDetails)
        this.verticalList = res.result;

      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message); 
    });
  }


  getAllChannelNew() {
    const data = {
      userId: this.common.getUserId(),
      channell_all: "all",
    }
    this.rest.getAllChannelNew(data).subscribe((res: any) => {
      if (res.success) {
        this.channelNewList = res.data;
        // console.log(this.)
        this.channelDropdownSettings();
        this.channelDropdownSettings_edit();
      }
    }, (err: any) => {
    });
  }

  getUserList(): any {
    var data = {
      "searchText": this.searchUser
    }
    // console.log(data);
    this.rest.userList(data).subscribe((res: any) => {
      if (res.success) {
        // console.log(res)
        this.userList = res.response;
        // console.log(this.userList)

        // if(this.userList)
        // let inputString = "50,51,52,53,54,55,94,57,58,59,60,61,62,91,92,93,66,90,69,70,71,72,73";

        // let stringArray = inputString.split(',');
        // let numberArray = stringArray.map(Number);
        // console.log(numberArray);

      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

  edit(modal: any, user_id: any, user_name: any, name: any, email: any, user_type: any, channel: any, verticalId: any, empCode: any, corFlag: any, toMail:any, fromMail:any, ccMail:any) {
    // this.clearErr();
    this.userIdEdit = user_id
    this.nameEdit = name
    this.userNameEdit = user_name
    this.emailEdit = email
    this.userTypeEdit = user_type
    if (channel == 0) { channel = 'all' }
    this.channelNewIdEdit = channel
    this.verticalEdit = verticalId
    this.empCodeEdit = empCode
    this.cor_access_edit = corFlag
    // this.toMailEdit = toMail
    // this.fromMailEdit = fromMail
    // this.ccMailEdit = ccMail

    if(this.channelNewIdEdit != "all"){

      let stringArray = this.channelNewIdEdit.split(',');
      let numberArray = stringArray.map(Number);
      this.selectedItems_channel_edit = [];
      // console.log(numberArray);

      for (let i = 0; i < numberArray.length; i++) {
        console.log(numberArray[i]);
        let channelName = ''
        for (let channel of this.dropdownList_channel_edit){
          if(channel.id == numberArray[i]){
            channelName = channel.channelNewName
          }
        }

        this.selectedItems_channel_edit.push({
          "id": numberArray[i],
          "channelNewName": channelName
        });
      }

    }else{
      this.selectedItems_channel_edit = this.dropdownList_channel_edit
    }
    
    
    

    console.log(
      "this.userIdEdit-",
      this.userIdEdit,
      "this.nameEdit-",
      this.nameEdit,
      "this.userNameEdit-",
      this.userNameEdit,
      "this.emailEdit-",
      this.emailEdit,
      "this.userTypeEdit-",
      this.userTypeEdit,
      "this.channelNewIdEdit-",
      this.channelNewIdEdit,
      typeof(this.channelNewIdEdit),
      "this.verticalEdit-",
      this.verticalEdit,
      "this.empCodeEdit-",
      this.empCodeEdit,
      "this.cor_access_edit-",
      this.cor_access_edit
    )


    this.getVerticalsForEdit()

    this.modalService.open(modal, { centered: true });
  }
  clearEditSection() {
    this.nameEdit = '' as any
    this.userNameEdit = '' as any
    this.emailEdit = '' as any
    this.userTypeEdit = '' as any
    this.channelNewIdEdit = '' as any
  }

  clearErr(): void {
    this.nameErr = '';
    this.emailErr = '';
    this.userNameErr = '';
    this.channelErr = ''
    this.utypeErr = ''
    this.verticalErr = ''
    this.empCodeErr = ''
    this.corErr = ''
  }

  clearEditErr() {
    this.nameErrEdit = '' as any
    this.userNameErrEdit = '' as any
    this.emailErrEdit = '' as any
    this.utypeErrEdit = '' as any
    this.channelErrEdit = '' as any
    this.verticalErrEdit = ''
    this.empCodeErrEdit = ''
    this.corErrEdit = ''
    // this.toMailErrEdit = null
    // this.fromMailErrEdit = null
    // this.ccMailErrEdit = null
  }

  departmentFetch(): any {
    var data = {
      "searchText": ""
    }

    this.rest.department_fetch(data).subscribe((res: any) => {
      if (res.success) {
        this.departmentList = res.response;
        // console.log(this.departmentList);
      } else {
        // this.common.openSnackBar(res.massage);
        this.notifier.notify('error', res.massage);
      }
    });
  }

  addUser(): any {
    // console.log("userType", this.userType, "channelNew--", this.channelNewId)
    if(this.selectedItems_channel.length == this.channelNewList.length){
      this.allChannel = "all"
    }
    else{
      this.allChannel = ""
    }

    if (this.userType != 4) { this.cor_access = 0 }
    if (this.channelNewId != 'all') { this.cor_access = 0 }

    // console.log("add user save button pressed")
    this.clearErr();
    if (this.name.trim() === '') {
      this.nameErr = 'Enter your name';
      this.notifier.notify("error",this.nameErr)
      return false;
    }
    if (this.userName.trim() === '') {
      this.userNameErr = 'Enter your username';
      this.notifier.notify("error",this.userNameErr)
      return false;
    }
    if (this.email.trim() === '') {
      this.emailErr = 'Enter your email';
      this.notifier.notify("error",this.emailErr)
      return false;
    }
    if (this.userType == '') {
      this.utypeErr = 'Select user type';
      this.notifier.notify("error",this.utypeErr)
      return false;
    }
    // if (this.channelNewId == '') {
    //   this.channelErr = 'Select channel';
    //   return false;
    // }
    
    if (this.selectedItems_channel.length == 0) {
      this.channelErr = 'Select channel';
      this.notifier.notify("error",this.channelErr)
      return false;
    }
    // if (this.cor_access == '') {
    //   this.corErr = 'Select Cor Access Right';
    //   return false;
    // }



    if (this.cor_access === '') {
      if (this.userType == 4 && this.channelNewId == 'all') {
        console.log("channelNewId ", this.channelNewId)
        this.corErr = 'Select Cor Access Right';
        this.notifier.notify("error",this.corErr)
        return false;
      }
    }


    // if(this.cor_access == '' && this.userType == 4 && this.channelNewId == 'all'){
    //   this.corErrEdit = 'Select Cor Access Right';
    //   return false;
    // }
    // if(this.userType != 4 || this.channelNewId != 'all'){
    //   // this.corErrEdit = 'Select Cor Access Right';
    //   this.corErrEdit = 0
    //   return false;
    // }

    if (this.userType == '3') {
      if (this.vertical == '') {
        this.verticalErr = 'Select vertical';
        return false;
      }
      if (this.empCode == '') {
        this.empCodeErr = 'Enter employee code';
        return false;
      }
    }


    






    const data = {
      name: this.name,
      user_name: this.userName,
      email: this.email,
      phone_number: this.phone,
      user_type: this.userType,
      passKey: '12345',
      // channelNewId: this.channelNewId,
      channelNewId: this.selectedItems_channel,
      allChannel: this.allChannel,
      verticalId: this.vertical,
      empCode: this.empCode,
      corFlag: this.cor_access
      // department_id: this.depname
    };
    console.log(data);
    this.rest.userInsert(data).subscribe((res: any) => {
      if (res.success) {
        this.getUserList();
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

  updateUser(): any {

    if (this.userTypeEdit != 4) { this.cor_access_edit = 0 }
    if (this.channelNewIdEdit != 'all') { this.cor_access_edit = 0 }

    this.clearEditErr();

    if (this.nameEdit.trim() === '') {
      this.nameErrEdit = 'Enter your name';
      return false;
    }
    if (this.emailEdit.trim() === '') {
      this.emailErrEdit = 'Enter your email';
      return false;
    }
    if (this.userTypeEdit == '') {
      this.utypeErrEdit = 'Select user type';
      return false;
    }
    // if (this.channelNewIdEdit == '') {
    //   this.channelErrEdit = 'Select channel';
    //   return false;
    // }

    if (this.selectedItems_channel_edit.length == 0) {
      this.channelErrEdit = 'Select channel';
      return false;
    }

    if (this.cor_access_edit === '') {
      if (this.userTypeEdit == 4 && this.channelNewIdEdit == 'all') {
        this.corErrEdit = 'Select Cor Access Right';
        return false;
      }
    }

    // if (this.cor_access_edit == '') {
    //   if(this.userTypeEdit == 4 && this.channelNewIdEdit == 'all'){
    //       this.corErrEdit = 'Select Cor Access Right';
    //       return false;
    //   }
    //   if(this.userTypeEdit != 4){
    //     // this.corErrEdit = 'Select Cor Access Right';
    //     this.corErrEdit = 0
    //     return false;
    //   }
    // }

    if (this.userTypeEdit == '3') {
      if (this.verticalEdit == '') {
        this.verticalErrEdit = 'Select vertical';
        return false;
      }
      if (this.empCodeEdit == '') {
        this.empCodeErrEdit = 'Enter employee code';
        return false;
      }
    }
    const data = {
      name: this.nameEdit,
      email: this.emailEdit,
      phone_number: this.phone,
      // department_id: this.depname,
      user_id: this.userIdEdit,
      user_type: this.userTypeEdit,
      // channelNewId: this.channelNewIdEdit,
      channelNewId: this.selectedItems_channel_edit,
      verticalId: this.verticalEdit,
      empCode: this.empCodeEdit,
      corFlag: this.cor_access_edit,
      // toMail: this.toMailEdit,
      // fromMail: this.fromMailEdit,
      // ccMail: this.ccMailEdit
    };

    // console.log(data);
    this.rest.userUpdate(data).subscribe((res: any) => {
      if (res.success) {
        this.getUserList();
        this.closeModal();
        this.clearEditSection();
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
    this.name = '';
    this.userName = '';
    this.email = '';
    // this.phone = '';
    this.userType = '';
    // this.depname = '';
    this.channelNewId = ''
    this.empCode = ''
    this.vertical = ''
  }

  openModal(addModal: any) {
    this.clearErr();
    this.modalService.open(addModal, { centered: true });
  }

  closeModal(): void {
    this.modalService.dismissAll();
    this.reset();
    this.clearEditSection()
    this.clearEditErr()
    this.clearErr()
  }

  openDeleteModal(deleteModal: any, userId: any): void {
    this.selectedId = userId;
    // this.selectedPosition = pos;
    this.modalService.open(deleteModal, { centered: true });
  }

  deleteData(): void {
    const data = {
      user_id: this.selectedId
    };
    this.rest.userDelete(data).subscribe((res: any) => {
      if (res.success) {
        this.closeModal();
        this.getUserList();
        // this.common.openSnackBar(res.message);
        // this.userList.splice(this.selectedPosition, 1);
        this.notifier.notify('success', "Deleted Successfully");
      } else {
        // this.common.openSnackBar(res.message);
        this.notifier.notify('error', res.massage);
      }
    }, (err: any) => {
      this.closeModal();
    });
  }

  setChannelIdEdit() {
    if (this.userTypeEdit != '4') {
      // this.channelNewIdEdit = ''
    }
    else if (this.userTypeEdit == '4') {
      this.channelNewIdEdit = 'all'
    }


  }

  setChannelIdAdd() {
    if (this.userType != '4') {
      this.channelNewId = ''
    }
    else if (this.userType == '4') {
      this.channelNewId = 'all'
    }

    // if(this.userType = '3'){
    //   this.getVerticalsForAdd()
    // } 


  }



}
