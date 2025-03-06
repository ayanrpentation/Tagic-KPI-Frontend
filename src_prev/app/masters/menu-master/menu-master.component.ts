import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { CommonService } from "../../common.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.css']
})
export class MenuMasterComponent implements OnInit {

  menu_name = '' as any;
  menu_status = '' as any;
  menuErr = '';
  statusErr = '';

  addmenuName = ''
  menuIcon = ''

  menu_list: any;
  deletemenuId = -1;
  constructor(private route: ActivatedRoute, private rest: RestApiService, private common: CommonService, private ngxService: NgxUiLoaderService, private modalService: NgbModal, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.get_menu_list()
  }
  get_menu_list() {

    this.rest.get_menu_list().subscribe((res: any) => {
      if (res.success) {
        // console.log(res)
        this.menu_list = res.response;
      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  clearAll() {
    this.addmenuName = ''
    this.menuIcon = ''
    this.deletemenuId = -1;

  }
  addMenu() {
    const data = {
      "menuIcon": this.menuIcon,
      "menuName": this.addmenuName
    }
    if (this.menuIcon != '' && this.addmenuName != '') {
      this.rest.addMenu(data).subscribe((res: any) => {
        if (res.success) {


          this.notifier.notify('success', 'Inserted successfully');
          this.clearAll(); 
          this.get_menu_list();

        } else {
          this.notifier.notify('error', res.massage);
        }
      });
    }else {
      this.notifier.notify('error','Fill the required places');
    }
  }
  deleteMenu() {
    // console.log(this.deletemenuId);
    const data = {
      menuId: this.deletemenuId
    }
    this.rest.deleteMenu(data).subscribe((res: any) => {
      if (res.success) {
        // console.log(res)
        // this.menu_list = res.response;
        this.closeModal();

        this.notifier.notify('success', 'deleted successfully');
        this.get_menu_list();

      } else {
        this.notifier.notify('error', res.massage);
      }
    });
  }
  edit(modal: any) {
    this.clearErr();
    this.menu_name = '';
    this.menu_status = '';

    this.modalService.open(modal, { centered: true });
  }

  clearErr(): void {
    this.menuErr = '';
    this.statusErr = '';
  }

  reset(): void {
    this.menu_name = '';
    this.menu_status = '';
  }

  openModal(addModal: any) {
    this.clearErr();
    this.modalService.open(addModal, { centered: true });
  }

  closeModal(): void {
    this.modalService.dismissAll();
    this.reset();
  }

  openDeleteModal(deleteModal: any, menuId: any): void {
    // this.selectedId = userId;
    // this.selectedPosition = pos;
    this.deletemenuId = menuId;
    this.modalService.open(deleteModal, { centered: true });
  }

}
