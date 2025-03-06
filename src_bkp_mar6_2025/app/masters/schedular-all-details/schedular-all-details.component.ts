import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/common.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-schedular-all-details',
  templateUrl: './schedular-all-details.component.html',
  styleUrls: ['./schedular-all-details.component.css']
})
export class SchedularAllDetailsComponent implements OnInit {
  tableData: any = [];
  showAction = -1;
  deleteScheduleId = '';
  editScheduleId = '';
  

  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService, private router: Router) { }
  ngOnInit(): void {
    this.getScheduleDetails()
  }
  getScheduleDetails(){
    this.rest.getScheduleDetails().subscribe((res: any) => {  
      if (res.success) {
        this.tableData = res.result;
        // console.log("this.tableData---",this.tableData)
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }
  editSchedule(itemId:any){
    this.editScheduleId = itemId;
    this.router.navigate(['dashboard/editscheduler',this.editScheduleId]);
  }
deleteItem(){
  const data = {
    id: this.deleteScheduleId,
    userId: this.common.getUserId()
  }
  this.rest.deleteScheduler(data).subscribe((res: any) => {
    if (res.success) {
      this.closeModal();
      this.notifier.notify('success', 'deleted successfully');
      this.getScheduleDetails();
    }else {
      this.notifier.notify('error', res.massage);
    }
  });
}
closeModal(): void {
  this.modalService.dismissAll();
  // this.reset();
}
openDeleteModal(deleteModal: any, itemId:any): void {
  this.deleteScheduleId = itemId;
  this.modalService.open(deleteModal, {centered: true});
}
addschedular(){
  this.router.navigate(['dashboard/addscheduler'])
}
}
