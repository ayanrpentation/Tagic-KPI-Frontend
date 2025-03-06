import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-menu-map',
  templateUrl: './user-menu-map.component.html',
  styleUrls: ['./user-menu-map.component.css']
})
export class UserMenuMapComponent implements OnInit {

  searchUserReport = '' as any;
  user = '' as any;
  menu = '' as any;
  sub_menu= ''as any;
  add = false as any;
  view = false as any;
  edit = false as any;
  dlt = false as any;
  approve = false as any;
  rowId:any

  seqNo: any

  addmorerow = [
    {
      user: '',
      menu :'',
      sub_menu: '',
      add: false,
      view: false,
      edit: false,
      dlt: false,
      approve: false
    }
  ] as any;


  user_list = [] as any;
  searchUser = '' as any;
  menu_list = [] as any;
  sub_menu_list = [] as any;
  menu_id = '' as any;
  selected_menu = '' as any
  user_name_list = '' as any;
  allow_Access = '' as any;



  constructor(private route: ActivatedRoute, private rest: RestApiService, private common: CommonService,private ngxService: NgxUiLoaderService, private modalService: NgbModal,private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getUserList();
    this.get_menu_list();
    this.get_sub_menu_list();
    this.menu_mapping_user_name_landingPage();
  }

  addopenModal(addModal: any) {
    // this.userName = '';
    // this.existReport = '';
    this.modalService.open(addModal, {centered: true, size: 'lg', scrollable: true});
  }

  openDeleteModal(deleteModal: any, rowId:any): void {
    // this.reportId = val.id;
    // this.position = i;
    this.rowId = rowId
    this.modalService.open(deleteModal, {centered: true});
  }

  closeModal(): void {
    this.modalService.dismissAll();
    this.addmorerow = [
      {
        user: '',
        menu :'',
        sub_menu: '',
        add: '',
        view: '',
        edit: '',
        dlt: '',
        approve: ''
      }
    ]
  }

  addRow(): any{
    this.addmorerow.push({
      user: '',
      menu :'',
      sub_menu: '',
      add: false,
      view: false,
      edit: false,
      dlt: false,
      approve: false
    })
  }

  remRow():any{
    if(this.addmorerow.length == 1){
      this.addmorerow = [
        {
          user: '',
          menu :'',
          sub_menu: '',
          add: false,
          view: false,
          edit: false,
          dlt: false,
          approve: false
        }
      ]
    }else{
      this.addmorerow.pop()
    }
  }

  getUserMenu(): any{
    this.menu_mapping_user_name_landingPage()
  }

  CreateUserMenu(): any{

    var data = {
      user: this.user,
      seqNo:this.seqNo,
      menu : this.menu,
      sub_menu: this.sub_menu,
      add: this.add,
      view: this.view,
      edit: this.edit,
      dlt: this.dlt,
      approve: this.approve
    }
    // {
    //   "user": "1",
    //   "menu": "1",
    //   "sub_menu": "2",
    //   "add": true,
    //   "view": true,
    //   "edit": true,
    //   "del": true,
    //   "approve": true
    // },

    // console.log(data)

    this.rest.create_user_menu_mapping(data).subscribe((res: any) => {
      if (res.success) {
        this.closeModal()
        // this.getUserList();
        // this.get_menu_list();
        // this.get_sub_menu_list();
        this.menu_mapping_user_name_landingPage();
        // location.reload();

      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

  UpdateUserMenu(): any{

  }

  // removeItem(): any{
    
  // }
  removeItem(): any{

    var data = {

      "id": this.rowId

    }

    // console.log(data);

    this.rest.remove_mapped_menu(data).subscribe((res: any) => {



      if (res.success) {

        // console.log(res)

        // this.sub_menu_list = res.response;

        this.notifier.notify('success', res.message);

        this.modalService.dismissAll();
        this.menu_mapping_user_name_landingPage();


        // location.reload();



      }else {

        this.notifier.notify('error', res.message);

      }

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
        this.user_list = res.response;
      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

  get_menu_list(){
    
    this.rest.get_menu_list().subscribe((res: any) => {
      if (res.success) {
        // console.log(res)
        this.menu_list = res.response;
      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }


  get_sub_menu_list(): any {
    var data = {
      "menu_id": this.menu_id
    }
    // console.log(data);
    this.rest.get_sub_menu_list(data).subscribe((res: any) => {

      if (res.success) {
        // console.log(res)
        this.sub_menu_list = res.response;
      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

  getSubMenuList_onMenuSelection(): any {
    this.menu_id = this.menu
    // console.log(menu_id)
    this.get_sub_menu_list()
  }



  menu_mapping_user_name_landingPage(){
    var data = {
      "searched": this.searchUserReport
    }
    
    this.rest.menu_mapping_user_name_search(data).subscribe((res: any) => {
      if (res.success) {
        // console.log(res)
        this.user_name_list = res.response;
      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }



  UpdateAccess(access: any, id: any):any{
    let current_access = !access
    var data = {
      "id": id,
      "access": current_access
    }
    // console.log("allow_access",data)
    

    this.rest.update_access(data).subscribe((res: any) => {
      if (res.success) {
        // this.menu_mapping_user_name_landingPage();
        this.notifier.notify('success', 'updated successfully');

      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

  update_view(view_access: any, id: any):any{
    let current_access = !view_access
    var data = {
      "id": id,
      "view_access": current_access
    }
    // console.log("allow_access",data)
    

    this.rest.update_view(data).subscribe((res: any) => {
      if (res.success) {
        // this.menu_mapping_user_name_landingPage();
        this.notifier.notify('success', 'updated successfully');


      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

  update_insert(insert_access: any, id: any):any{
    let current_access = !insert_access
    var data = {
      "id": id,
      "insert_access": current_access
    }
    // console.log("allow_access",data)
    

    this.rest.update_insert(data).subscribe((res: any) => {
      if (res.success) {
        // this.menu_mapping_user_name_landingPage();
        this.notifier.notify('success', 'updated successfully');


      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

  update_modify(update_access: any, id: any):any{
    let current_access = !update_access
    var data = {
      "id": id,
      "update_access": current_access
    }
    // console.log("allow_access",data)
    

    this.rest.update_modify(data).subscribe((res: any) => {
      if (res.success) {
        // this.menu_mapping_user_name_landingPage();
        this.notifier.notify('success', 'updated successfully');


      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

  update_delete(delete_access: any, id: any):any{
    let current_access = !delete_access
    var data = {
      "id": id,
      "delete_access": current_access
    }
    // console.log("allow_access",data)
    

    this.rest.update_delete(data).subscribe((res: any) => {
      if (res.success) {
        // this.menu_mapping_user_name_landingPage();
        this.notifier.notify('success', 'updated successfully');

      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }

}
