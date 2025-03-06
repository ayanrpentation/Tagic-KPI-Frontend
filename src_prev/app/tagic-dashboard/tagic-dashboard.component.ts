import { Component, OnInit } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from '../rest-api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-tagic-dashboard',
  templateUrl: './tagic-dashboard.component.html',
  styleUrls: ['./tagic-dashboard.component.css']
})
export class TagicDashboardComponent implements OnInit {

  constructor(private rest: RestApiService, private modalService: NgbModal, private common: CommonService, private notifier: NotifierService) { }
  
  selectedRow = '' as any
  taskList:any;
  filteredFileTypeIdList=[] as any
  filteredTaskList= [] as any

  // resetTaskId:any;
  // resetTaskSeqNo:any;
  channelNewid= sessionStorage.getItem("defaultChannelForAll") as any
  channelName = '' as any

  channelNewList = [] as any
  module_List = [] as any




  ngOnInit(): void {
    this.getModule();
    
    this.getAllTask();
    this.getAllChannelNew();
    
    

  }
  getModule(): any {
  
    this.rest.getModule().subscribe((res: any) => {
      
      if (res.success) {
        this.module_List = res.module
        
        // this.allFileTypeList = this.module_List
      }  
      
      if (res.success== false) {
  
      }
    }, 
    (err: any) => {
  
    })
  }

  getAllTask(){
    const data = {
      "channelNewId": this.channelNewid,
      'taskType': 'all'
    }
    
    this.rest.getAllTask(data).subscribe((res: any) => {
  
      if (res.success) {
        
        // console.log(this.documentDetails)
        this.taskList = res.allTasks;
        this.filteredTaskList = this.taskList

        
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
      

    });
  }
  
  


  getAllChannelNew() {
    // const data = {
    //   header_id: 16,
    // }
    this.rest.getAllChannelNew().subscribe((res: any) => {
      if (res.success) {
        // console.log(this.documentDetails)
        this.channelNewList = res.data;
      }
    }, (err: any) => {
      // this.notifier.notify('error', err.error.message);
    });
  }

  selectChannel(){
    for(var obj of this.channelNewList){
      if(obj.id == this.channelNewid){
        this.channelName = obj.channelNewName
      }
    }


    this.filteredTaskList = []
    this.filteredFileTypeIdList=[]

    // console.log('channelid', this.channelNewid)
    // console.log('filetypeid', this.filteredFileTypeIdList)

    for(var module of this.module_List){
      // console.log("module.channelid", module.channelId)
      if(module.channelId == this.channelNewid){
        this.filteredFileTypeIdList.push(module.fileTypeId)
      }
    }

    // console.log('filetypeid', this.filteredFileTypeIdList)

    for(var filetypeid of this.filteredFileTypeIdList){
      for(var task of this.taskList){
        if(filetypeid == task.fileTypeId){
          this.filteredTaskList.push(task)
        }
      }
    }

    console.log("filter task", this.filteredTaskList)







    if(this.channelNewid =='' || this.channelNewid.length==0){
      this.getAllTask()
    }

  }




  

}
