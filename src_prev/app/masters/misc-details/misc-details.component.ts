import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-misc-details',
  templateUrl: './misc-details.component.html',
  styleUrls: ['./misc-details.component.css']
})
export class MiscDetailsComponent implements OnInit {
  details_desc = '';
  details_code = '';
  header = 0;
  headerDetails: any;
  detailsData:any;


  detailDetails= [] as any;

  isedit = false;
  edit_detail_desc = '';
  edit_detail_code = '';

  editId = 0;
  deleteId = 0;
  constructor(private rest: RestApiService, private notifier:NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getheaderdata();
    this.getAllDetails();
  }

  clearAll(){
    this.details_desc = '';
    this.details_code = '';
    this.header = 0;
  }

  saveDetails(){
    if(this.header == 0 || this.details_code.trim() =='' || this.details_desc.trim() =='' ){
      alert('fields can not be blank')
    }else{

      const data = {
        header_id: this.header,
        details_description: this.details_desc,
        details_code: this.details_code,
  
        details_active: 1
        
        
        
      }
      this.rest.insertdetails(data).subscribe((res: any) => {
    
        if (res.success) {
          
          // console.log(this.documentDetails)
          this.getAllDetails();

        this.notifier.notify('success', 'Inserted Successfully');
        this.clearAll();
  
        }else{
          this.notifier.notify('error', res.message);
  
          }
      }, (err: any) => {
        this.notifier.notify('error', err.error.message);
        
  
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
  getdetailsdata(id:any){
    const data = {
      header_id: id
    }
    this.rest.getdetailsdata(data).subscribe((res: any) => {
  
      if (res.success) {
        this.detailDetails = res.details_data;
   

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }
  getAllDetails(){
    // this.detailDetails = [];
    this.rest.getallDetails().subscribe((res: any) => {
  
      if (res.success) {
        this.detailDetails = res.details_all;
        


  
        
      }
    }, (err: any) => {
      // this.notifier.notify('error', 'some error occurred');
      
  
    });

  }
  changeValue(id:any, delete_flag:any){
    if ((this.editId == id && delete_flag == 0)||(delete_flag == 1)){
      const data = {
        id: id,
        details_description: this.edit_detail_desc,
        details_code: this.edit_detail_code,

        delete_flag: delete_flag
      }
      this.rest.editdeletedetails(data).subscribe((res: any) => {
  
        if (res.success) {
          
          // console.log(this.documentDetails)
          this.notifier.notify('success', 'Done...');
        
          
          this.isedit = false;
          this.getdetailsdata(this.header);
          if(delete_flag == 1){
            this.modalService.dismissAll();
          }

  
    
          
        }
      }, (err: any) => {
        this.notifier.notify('error', 'some error occurred');
        
    
      });
    }
  }
  editValue(detail_code:any,detail_desc:any , id:any){

    if (this.isedit == false){
  
      this.isedit = true;
      this.edit_detail_desc = detail_desc;
      this.edit_detail_code = detail_code;
      this.editId = id;
      
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
