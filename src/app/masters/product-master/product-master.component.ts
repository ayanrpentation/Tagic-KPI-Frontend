import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
  productDataList: any = [];
  showAction = -1;
  columnList: any = [];
  columnName = 'all';
  searchValue = '';
  deleteId: any;
  moduleId: any;

  offset = 0;
  limit = 10;
  prevDisable = true;
  nextDisable = false;

  isedit = false;
  editId = 0;
  isInput = false;

  editProductCategory = '';
  editProductName = '';
  show = false;
  productCategory: any;
  productName: any;
  productCategoryNew: any;
  productCategoryList: any = [];

  constructor(private ngxService: NgxUiLoaderService, private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.moduleId = this.common.getProductMasterId();
    this.getColumnName();
    this.getDistinctProductCategory();
    this.genericFilter();
  }
  genericFilter(flag: number = 0) {
    if (flag == 1) {
      this.offset = 0;
      this.prevDisable = true;
      this.productDataList = [];
    }
    this.isedit = false;
    const data = {
      'limit': this.limit,
      'offset': this.offset,
      'columnName': this.columnName,
      'value': this.searchValue,
      'moduleId': this.moduleId,
    }
    this.rest.genericFilter(data).subscribe((res: any) => {
      // console.log("res---", res)
      if (res.success) {
        if(res.result.length == 0){
          this.nextDisable = true;
          this.productDataList = [];
          if (this.offset >= this.limit) {
            this.offset = this.offset - this.limit;
          }
          this.prevDisable = this.offset == 0
        }
        else {
          this.productDataList = res.result;
        }
        // this.reset();
      } else {
        this.notifier.notify('error', res.message);
      }
    });

  }
  addProduct() {
    this.show = true
  }
  getInput(){
    if (this.productCategory == 'Other'){
      this.isInput = true;
      
    }
    else{
      this.isInput = false;
    }
  }
  saveData() {
    if (this.show == true) {
      this.show = false;
      this.productCategory =  this.productCategoryNew;
      const data = {
        'productCategory': this.productCategory,
        'productName': this.productName
      }
      // console.log("data----", data)
      this.rest.addProductMaster(data).subscribe((res: any) => {
        if (res.success) {
          this.notifier.notify('success', res.message);
          this.genericFilter();
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }
  }
  uploadFile(event: any): any {
    const fd = new FormData();
    const files = event.target.files;
    fd.append('file', files[0]);
    this.ngxService.start();
    this.rest.uploadProductMaster(fd).subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        this.notifier.notify('success', res.message);
        this.genericFilter();
      } else {
        this.ngxService.stop();
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
  editBranch(itemId: any, productCategory: any, productName: any) {
    if (this.isedit == false) {
      this.isedit = true;
      this.editId = itemId;
      this.editProductCategory = productCategory;
      this.editProductName = productName;

    }
  }
  changeValue(id: any) {
    if (this.editId == id) {
      const data = {
        'id': id,
        'productCategory': this.editProductCategory,
        'productName': this.editProductName
      }
      this.rest.editProductData(data).subscribe((res: any) => {
        if (res.success) {
          this.notifier.notify('success', res.message);
          this.isedit = false;
          this.genericFilter();
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }
  }
  closeModal(): void {
    this.modalService.dismissAll();
    // this.reset();
  }
  openDeleteModal(deleteModal: any, itemId: any): void {
    if (this.isedit == false) {
      this.deleteId = itemId;
      this.modalService.open(deleteModal, { centered: true });
    }
  }
  deleteItem() {
    const data = {
      id: this.deleteId,
      'moduleId': this.moduleId
    }
    this.rest.genericDelete(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', 'deleted successfully');
        this.closeModal();
        this.reset();
        this.genericFilter();
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  reset() {
    this.columnName = 'all';
    this.deleteId = '';
    this.searchValue = '';
  }
getDistinctProductCategory(){
  this.rest.getDistinctProductCategory().subscribe((res: any) => {
    if (res.success) {
      this.productCategoryList = res.data
    } else {
      this.notifier.notify('error', res.message);
    }
  });
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
    this.genericFilter();
  }

  goNext(): any {
    this.offset = this.offset + this.limit;
    this.genericFilter();
    this.prevDisable = false;
  }
  downloadTemplate(){
    // window.open(this.rest.file_path + '/template/' + 'productTemplate.xlsx');
    const data ={
      'moduleId': this.moduleId,
    }
    this.rest.getTemplateModuleMaster(data).subscribe((res: any) => {
      if (res.success) {
        window.open(this.rest.file_path + '/template/' + res.templateName);
      } else {
        // this.notifier.notify('error', res.message);
      }
    });
  }
 
}
