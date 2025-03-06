import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-scheduler-details',
  templateUrl: './scheduler-details.component.html',
  styleUrls: ['./scheduler-details.component.css']
})
export class SchedulerDetailsComponent implements OnInit {

  schedulerDetails:any;
  fileTypeId = 'all';
  resetFileTypeId = 'all'

  constructor(private rest: RestApiService, private notifier: NotifierService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSchedulerDetails();
  }
  getSchedulerDetails(){
    this.rest.getSchedulerdetails().subscribe((res: any) => {
  
      if (res.success) {
        this.schedulerDetails = res.schedulerdetails;
  
        
      }
    }, (err: any) => {
      
      
  
    });

  }
  closeModal(): void {
    this.modalService.dismissAll();
  }
  openModal(fileTypeId:any,modal:any){
    this.resetFileTypeId = fileTypeId;
    // console.log()
    this.modalService.open(modal, {centered: true, size: 'md'});

  }
  resetScheduler(fileTypeId: any){
    const data ={
      fileTypeId: fileTypeId
    }
    this.rest.resetScheduler(data).subscribe((res:any)=>{
      if(res.success){
        this.notifier.notify('success','updated successfully')
        this.getSchedulerDetails();
      }
    }, (err: any) => {
      
      
  
    });
    this.closeModal();
  }

}
