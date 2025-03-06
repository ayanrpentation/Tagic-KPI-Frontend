import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {NotifierService} from "angular-notifier";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modulecreation',
  templateUrl: './modulecreation.component.html',
  styleUrls: ['./modulecreation.component.css']
})
export class ModulecreationComponent implements OnInit {

  allcheck = true;

  dropdownSettings:IDropdownSettings = {};
  dropdownList = []
  selected_column_list = [] as any

  module_id: any
  validation_id = '' as any

  module_name: any
  module_details: any
  table_name: any
  paramlist = [] as any
  visibility = false
  searchField = '';

  files : any
  validation_list: any
  column_name_list = [] as any
  column_name_list_length = this.column_name_list.length

  moduleList: any

  table_list: any
  table_column_list: any
  // selected_table_name = '' as any
  addCol_visibility = false
  manual_col_name: any
  NameError:any
  Nameerror: any
  errorId: any

  filterColId :any;
  filterOperator = '=';
  filterValue:any;
  dateFormat = '';
  filterData:any;
  
  operatorList = ['=', '!=','>', '<', '<=', '>=', 'IN', 'NOT IN', 'IS NULL', 'NOT NULL', 'DATE RANGE']

  constructor(private common: CommonService, private rest: RestApiService,private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTableName()
    this.get_validation()
    this.getModule()
    console.log("----",this.validation_list)
    
    this.dropdownSettings = { idField: 'id',textField: 'columnName',allowSearchFilter: true,enableCheckAll:false, itemsShowLimit: 1 };
  }

  setfile(event: any): any {
    const files = event.target.files;
    this.files = files
  }
  checkUncheckAll(){
    if (this.allcheck == false){
      for (const  col of  this.column_name_list){
        col.check = false;
      }
    }else{
      for (const  col of  this.column_name_list){
        col.check = true;
      }
    }
  }
  checkUncheckSingle(check:any){
    if (check == false){
      this.allcheck = false;
    }else{
      for (const  col of  this.column_name_list){
        if (col.check == true){
          this.allcheck = true;
        }else{
          this.allcheck = false;
          break
        }
      }
    }
  }

  addFilter(){
    const data = {
      moduleId: this.module_id,
      filterColId: this.filterColId,
      filterOperator: this.filterOperator,
      filterValue: this.filterValue,
      dateFormat: this.dateFormat,
    }
    this.rest.addFilter(data).subscribe((res: any) => {
      // console.log(res)
      if (res.success) {
        this.notifier.notify('success',res.message);
      }  
      
      if (res.success== false) {
        this.notifier.notify('error',res.message);
  
      }
    }, 
    (err: any) => {
  
    })
  }

  viewFilter(modal:any){
    // console.log("jjhjk")
    const data = {
      moduleId: this.module_id
    }
    this.rest.viewFilter(data).subscribe((res: any) => {
      // console.log(res)
      if (res.success) {
        
        this.filterData = res.data;
        this.modalService.open(modal, {centered: true, size: 'md'})
        
      }  
      
      if (res.success== false) {
        this.notifier.notify('error', res.message);
      }
    }, 
    (err: any) => {

    })
  }
  
  closeModal(){
    this.modalService.dismissAll();
  }

  uploadFile(event: any): any {
    console.log(this.files)
    const fd = new FormData();
    fd.append('file', this.files[0]);
    fd.append('moduleName', this.module_name);
    fd.append('moduleDetails', this.module_details);
    fd.append('tableName', this.table_name);
    this.rest.template_upload(fd).subscribe((res: any) => {
      // console.log(res)
      if (res.success) {
        
        this.module_id = res.moduleId

        this.getColumn()
        this.getModule()
        this.notifier.notify('success', "created successfully");

      }  
      
      if (res.success== false) {

      }
    }, 
    (err: any) => {

    })
    

    
}
get_validation(): any {
  
  this.rest.get_validation().subscribe((res: any) => {
    // console.log(res)
    if (res.success) {
      this.validation_list = res.validation
    }  
    
    if (res.success== false) {

    }
  }, 
  (err: any) => {

  })
}

getColumn(): any {
  const data = {
    'moduleId': this.module_id
  }
  
  this.rest.getColumn(data).subscribe((res: any) => {
    // console.log(res)
    if (res.success) {
      this.column_name_list = res.column;
      for (const  col of  this.column_name_list){
        col.check = true;
      }

    }  
    
    if (res.success== false) {
      this.notifier.notify('error', res.message);
      // console.log("dddd")
    }
  }, 
  (err: any) => {
    this.notifier.notify('error', "Some Error Occurred");
  })
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

getParamList(): any {
  const data = {
    'validationId': this.validation_id,
    'columnList': this.selected_column_list
  }
  
  this.rest.getParamList(data).subscribe((res: any) => {
    // console.log(res)
    if (res.success) {
      // this.column_name_list = res.column
      this.paramlist =res.validationParamList
      if(this.paramlist.length != 0){
        this.visibility= true
      }
      else if(this.paramlist==null || this.paramlist.length == 0){
        this.visibility= false
        this.addColValidation()
      }
    }  
    
    if (res.success== false) {

    }
  }, 
  (err: any) => {

  })
}

get_selected_list(){
  console.log("selection", this.selected_column_list)
  
}

addValidation(){
  console.log("666666666666666666666666",this.selected_column_list)
  this.getParamList()
}

setValue(){
  console.log("33333#########",this.paramlist)
  this.addColValidation()
  
  
}


getTableName(){
  
  this.rest.getTableName().subscribe((res: any) => {
    
    if (res.success) {
      this.table_list = res.tableList 
    }
    if (res.success== false) {}
  }, 
  (err: any) => {

  })
}



getColumnTable(value: any){
  const data = {
    'tableName': value
  }

  
  this.rest.getColumnTable(data).subscribe((res: any) => {
    
    if (res.success) {
      this.table_column_list = res.columnList
    }
    if (res.success== false) {}
  }, 
  (err: any) => {

  })
}

// dekhao(){
//   console.log("11111111111113333333333",this.paramlist)
// }

addColValidation(){
  const data = {
    'validationId': this.validation_id,
    'moduleId': this.module_id,
    'columnList': this.selected_column_list,
    'validationParamList': this.paramlist
  }

  
  this.rest.addColValidation(data).subscribe((res: any) => {
    
    if (res.success) {
      this.getColumn();
      this.selected_column_list = [];
      this.paramlist = [];
      this.notifier.notify('success', "Added Successfully");
    }
    if (res.success== false) {
      this.notifier.notify('error', "Error Occurred");
    }
  }, 
  (err: any) => {

  })
}


addNewCol(){
  const data = {
    'columnName': this.manual_col_name,
    'moduleId': this.module_id,
    
  }

  
  this.rest.addNewCol(data).subscribe((res: any) => {
    
    if (res.success) {
      this.getColumn()
      this.notifier.notify('success', res.mess);
    }
    if (res.success== false) {
      this.notifier.notify('error', res.mess);
    }
  }, 
  (err: any) => {

  })
}

addManualColVisibility(){
  this.addCol_visibility = true
}

checkTableName():any{
  if (this.table_name.trim().includes(' ') || (!this.table_name.trim().match(/^[a-zA-Z]+$/))){
    this.NameError = 'this field can only have alphanumeric characters'

    console.log("++++++",this.NameError)
    console.log(this.table_name)
    // return false; 
  }
  else{
    this.NameError = ''
    console.log("-----0",this.NameError)
    console.log(this.table_name)
  }
}

checkTableName1(data:any, id: any):any{
  if(data!=''){
    if (data.trim().includes(' ') || (!data.trim().match(/^[a-zA-Z]+$/))){
      this.Nameerror = 'this field can only have alphanumeric characters'
      this.errorId = id
  
      
      // return false; 
    }
    else{
      this.Nameerror = ''
      
    }
  }
  else{
    this.Nameerror = ''
    
  }
  
}

finalSubmit(){
  const data={
    'moduleId': this.module_id,
    'columnList': this.column_name_list
  }
  this.rest.updateColMapping(data).subscribe((res: any) => {
    
    if (res.success) {
      // this.getColumn()
      this.notifier.notify('success', res.message);
    }
    if (res.success== false) {
      this.notifier.notify('error', res.message);
    }
  }, 
  (err: any) => {

  })
}





}
