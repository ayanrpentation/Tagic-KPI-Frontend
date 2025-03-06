import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  showValidation = false
  userType = this.common.getUserType();

  uploadVisible = false
  auditVisible = false
  mappingVisible = false
  calculationVisible = false
  gscoreVisible = false
  pubScoreVisible = false



  constructor( private router: Router, private common:CommonService, private notifier: NotifierService) { }

  ngOnInit(): void {
    // console.log(this.userType);
  }

  goToUpload(){
    if(this.userType == 2 || this.userType == 3){
      // console.log("came here")

      this.notifier.notify('error', 'You are not authorized to open this');
    }else{
      // console.log("came here")


      this.router.navigate(["/dashboard/fileupload"])
    }
    // window.alert("This Page is Under Construction!")
  }

  goToMapping(){
    if(this.userType == 2 || this.userType == 3){
      this.notifier.notify('error', 'You are not authorized to open this');


    }else{

      this.router.navigate(["/dashboard/manualmapping"])
    }

  }

  goToCalculation(){
    if (this.userType == 2 || this.userType == 3){
      this.notifier.notify('error', 'You are not authorized to open this');


    }else{

      this.router.navigate(["/dashboard/view-kpi"])
    }
  }

  goToGenerateScore(){
    if (this.userType == 2 || this.userType == 3){
      this.notifier.notify('error', 'You are not authorized to open this');


    }else{
    this.router.navigate(["/dashboard/generate-score"])
    }
  }

  goToViewScore(){

    this.router.navigate(["/dashboard/kpi-scoring"])
  }
  goToAudit(){
    if (this.userType == 1 || this.userType == 3){
      this.notifier.notify('error', 'You are not authorized to open this');


    }else{
    this.router.navigate(["/dashboard/auditnew"])
    }
  }


  disableSelection(){

    if(this.userType == 4){
      this.uploadVisible = true
      this.mappingVisible = true
      this.calculationVisible =true
      this.gscoreVisible = true
      this.pubScoreVisible = true
      this.auditVisible = true
    }
    else if(this.userType != '2' && this.userType != '3'){
      this.uploadVisible = true
      this.mappingVisible = true
      this.calculationVisible =true
      this.gscoreVisible = true
    }

    else if(this.userType != '1' && this.userType != '3'){
      this.auditVisible = true
    }
    else if(this.userType != '2'){
      this.pubScoreVisible = true
    }
  }

}
