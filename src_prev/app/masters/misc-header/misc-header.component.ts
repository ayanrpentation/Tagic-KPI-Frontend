import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-misc-header',
  templateUrl: './misc-header.component.html',
  styleUrls: ['./misc-header.component.css']
})
export class MiscHeaderComponent implements OnInit {

  header_desc = '';
  header_code = '';
  headerDetails = [] as any;

  isedit = false;
  edit_header_desc = '';
  edit_header_code = '';

  editId = 0;
  deleteId = 0;

  constructor(private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getheaderdata();

  }
  clearAll(){
    this.header_desc = '';
    this.header_code = ''
  }
  saveHeader(){
    if(this.header_desc.trim() =='' || this.header_code.trim() ==''  ){
      alert('fields can not be blank')
    }else{

      const data = {
        header_code: this.header_code,
        header_description: this.header_desc,
        active: 1
        
        
        
      }
      this.rest.insertheader(data).subscribe((res: any) => {
    
        if (res.success) {
          
          // console.log(this.documentDetails)
        this.notifier.notify('success', 'Inserted Successfully');
        this.clearAll();
        this.getheaderdata();
  
          
        }else{
        this.notifier.notify('error', res.message);

        }
      }, (err: any) => {
        this.notifier.notify('error', err.message.message);
        
  
      });
    }

}
getheaderdata(){
    
  this.rest.getheaderdata().subscribe((res: any) => {

    if (res.success) {
      
      // console.log(this.documentDetails)
    
      this.headerDetails = res.header;

      
    }
  }, (err: any) => {
    // this.notifier.notify('error', err.error.message);
    

  });

}
editValue(header_code:any,header_desc:any , id:any){

  if (this.isedit == false){

    this.isedit = true;
    this.edit_header_desc = header_desc;
    // this.edit_header_code = header_code;
    this.editId = id;
    
  }
}
changeValue(id:any,delete_flag:any){
  if ((this.editId == id && delete_flag == 0)||(delete_flag == 1)){
    // if(delete_flag == 1){
      // alert('are you sure to delete this?')
    // }
    const data = {
      id: id,
      header_description: this.edit_header_desc,
      delete_flag: delete_flag
    }
    this.rest.editdeleteheader(data).subscribe((res: any) => {

      if (res.success) {
        
        // console.log(this.documentDetails)
        this.notifier.notify('success', 'Done...');
      
        
        this.isedit = false;
        if(delete_flag == 1){
          this.closeModal();
        }
        this.getheaderdata();
        

  
        
      }
    }, (err: any) => {
      this.notifier.notify('error', 'some error occurred');
      
  
    });
  }
}
openDeleteModal(deleteModal: any, id:any): void {
  // this.selectedId = userId;
  // this.selectedPosition = pos;
  this.deleteId = id;
  this.modalService.open(deleteModal, {centered: true});
}
closeModal(){
  this.modalService.dismissAll();
}
}
