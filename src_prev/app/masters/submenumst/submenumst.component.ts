import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-submenumst',
  templateUrl: './submenumst.component.html',
  styleUrls: ['./submenumst.component.css']
})
export class SubmenumstComponent implements OnInit {

  menu_id = '';
  sub_menu_list:any;
  addsubmenuName = ''
  addmenuId = ''
  moduleId: any;
  moduleList:any = [];

  submenuIcon = ''
  submenuLink = ''


  menu_list:any;
  deletesubmenuId = -1;
  constructor(private route: ActivatedRoute, private rest: RestApiService, private common: CommonService,private ngxService: NgxUiLoaderService, private modalService: NgbModal,private notifier: NotifierService) { }

  ngOnInit(): void {
    this.get_menu_list();
    this.get_sub_menu_list();
    this.getModule();
  }
  getModule(): any {
  
    this.rest.getModule().subscribe((res: any) => {
      // console.log(res)
      if (res.success) {
        this.moduleList = res.module
      }  
      
      if (res.success== false) {
  
      }
    }, 
    (err: any) => {
  
    })
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
      "menu_id": this.addmenuId
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
  clearAll(){
    this.addsubmenuName = ''
    this.addmenuId = ''

    this.submenuIcon = ''
    this.submenuLink = ''
    this.deletesubmenuId = -1;
    this.moduleId = null;
  }
  addsubMenu(){
    const data ={
      "submenuName": this.addsubmenuName,

      "submenuIcon": this.submenuIcon,
      "submenuLink": this.submenuLink,

      "menuId": this.addmenuId,
      "moduleId": this.moduleId

    }
    this.rest.addsubMenu(data).subscribe((res: any) => {
      if (res.success) {
        

        this.notifier.notify('success', 'Inserted successfully');
        this.clearAll();
        this.get_sub_menu_list();

      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  deletesubMenu(){
    // console.log(this.deletesubmenuId);
    const data = {
      submenuId: this.deletesubmenuId
    }
    this.rest.deletesubMenu(data).subscribe((res: any) => {
      if (res.success) {
        // console.log(res)
        // this.menu_list = res.response;
        this.closeModal();

        this.notifier.notify('success', 'deleted successfully');
        this.get_sub_menu_list();

      }else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  

 

  

 
  closeModal(): void {
    this.modalService.dismissAll();
  }

  openDeleteModal(deleteModal: any, menuId:any): void {
    // this.selectedId = userId;
    // this.selectedPosition = pos;
    this.deletesubmenuId = menuId;
    this.modalService.open(deleteModal, {centered: true});
  }

}
