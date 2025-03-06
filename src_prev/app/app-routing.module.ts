import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { UsersComponent } from './masters/users/users.component';
import { MenuMasterComponent } from './masters/menu-master/menu-master.component';
import { UserMenuMapComponent } from './masters/user-menu-map/user-menu-map.component';
import { SalesTargetComponent } from './masters/sales-target/sales-target.component';
import { SdmComponent } from './masters/sdm/sdm.component';
import { BankassuranceComponent } from './masters/bankassurance/bankassurance.component';
import { MappingMasterComponent } from './masters/mapping-master/mapping-master.component';
import { ChequeBounceComponent } from './masters/cheque-bounce/cheque-bounce.component';
import { ReceivableComponent } from './masters/receivable/receivable.component';

import { KpimapComponent } from './masters/kpimap/kpimap.component';
import { MiscDetailsComponent } from './masters/misc-details/misc-details.component';
import { MiscHeaderComponent } from './masters/misc-header/misc-header.component';
import { ViewkpiComponent } from './masters/viewkpi/viewkpi.component';
import { AuditFileComponent } from './masters/audit-file/audit-file.component';
import { SchedulerDetailsComponent } from './masters/scheduler-details/scheduler-details.component';
import { KpiScoringComponent } from './masters/kpi-scoring/kpi-scoring.component';
import { UploadedFilesComponent } from './masters/uploaded-files/uploaded-files.component';
import { GenerateScoreComponent } from './masters/generate-score/generate-score.component';

import { BranchmstComponent } from './masters/branchmst/branchmst.component';
import { StatemstComponent } from './masters/statemst/statemst.component';
import { DesigmstComponent } from './masters/desigmst/desigmst.component';
import { ChannelmstComponent } from './masters/channelmst/channelmst.component';
import { SubchannelmstComponent } from './masters/subchannelmst/subchannelmst.component';
import { SubmenumstComponent } from './masters/submenumst/submenumst.component';
import { MenumstComponent } from './masters/menumst/menumst.component';
import { AuditfilenewComponent } from './masters/auditfilenew/auditfilenew.component';
import { UploadedFilesNewComponent } from './masters/uploaded-files-new/uploaded-files-new.component';
import { PendingRequestComponent } from './masters/pending-request/pending-request.component';
import { DeleteRequestComponent } from './masters/delete-request/delete-request.component';
import { ControlPanelComponent } from './masters/control-panel/control-panel.component';
import { AddTasksComponent } from './masters/add-tasks/add-tasks.component';
import { ModulecreationComponent } from './modulecreation/modulecreation.component';
import { UploadAllFileComponent } from './upload/upload-all-file/upload-all-file.component';
import { SchedularLogComponent } from './masters/schedular-log/schedular-log.component';
import { SchedularAllDetailsComponent } from './masters/schedular-all-details/schedular-all-details.component';
import { EditScheduleComponent } from './masters/edit-schedule/edit-schedule.component';
import { EmployeeMasterComponent } from './masters/employee-master/employee-master.component';
import { AddBranchComponent } from './masters/add-branch/add-branch.component';
import { ProductMasterComponent } from './masters/product-master/product-master.component';
import { ProducerMasterComponent } from './masters/producer-master/producer-master.component';
import { BancaMasterComponent } from './masters/banca-master/banca-master.component';
import { DesignationMasterComponent } from './masters/designation-master/designation-master.component';
import { AddEmployeeComponent } from './masters/add-employee/add-employee.component';
import { AddBancaComponent } from './masters/add-banca/add-banca.component';
import { EditKpimapComponent } from './masters/edit-kpimap/edit-kpimap.component';
import { MaperMasterComponent } from './masters/maper-master/maper-master.component';
import { AddMappermasterComponent } from './masters/add-mappermaster/add-mappermaster.component';
import { EditUploadedFileComponent } from './masters/edit-uploaded-file/edit-uploaded-file.component';
import { ManualMappingComponent } from './masters/manual-mapping/manual-mapping.component';
import { HealthAndGiMapperComponent } from './masters/health-and-gi-mapper/health-and-gi-mapper.component';
import { SdmUnmappedDetailsComponent } from './masters/sdm-unmapped-details/sdm-unmapped-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FileUploadNewComponent } from './file-upload-new/file-upload-new.component';
import { TagicDashboardComponent } from './tagic-dashboard/tagic-dashboard.component';
import { RuleReplicationComponent } from './rule-replication/rule-replication.component';
import { UsermanualDownloadComponent } from './usermanual-download/usermanual-download.component';
import { MappedDataDownloadComponent } from './mapped-data-download/mapped-data-download.component';
import { CorUploadComponent } from './cor-upload/cor-upload.component';
// import { CreateNewThingsComponent } from './create-new-things/create-new-things.component';
const routes: Routes = [{
  path: '',
  component: LoginComponent
},{
  path: 'dashboard',
  component: HeaderComponent,
  children:[{
    path: 'home2',
    component: DashboardComponent
  }, {
    path:'user',
    component : UsersComponent
  },{
    path:'user-menu-map',
    component : UserMenuMapComponent
  },{
    path:'menu-master',
    component : MenuMasterComponent
  },{
    path:'sales-target',
    component : SalesTargetComponent
  },{
    path:'sdm',
    component : SdmComponent
  },{
    path:'bankassurance',
    component : BankassuranceComponent
  },{
    path:'mapping-master',
    component : MappingMasterComponent
  },{
    path:'cheque-bounce',
    component : ChequeBounceComponent
  },{
    path:'receivable',
    component : ReceivableComponent
  },{
    path:'kpi-map',
    component: KpimapComponent
  },{
    path:'view-kpi',
    component: ViewkpiComponent
  },
  {
    path: 'misc/header',
    component: MiscHeaderComponent
  },
  {
    path: 'misc/details',
    component: MiscDetailsComponent
  },{
    path: 'audit',
    component: AuditFileComponent
  },{
    path: 'auditnew',
    component: AuditfilenewComponent,
  },{
    path: 'scheduler',
    component: SchedulerDetailsComponent
  },{
    path: 'kpi-scoring',
    component: KpiScoringComponent
  },{
    path: 'uploaded-files',
    component: UploadedFilesComponent
  },{
    path:'generate-score',
    component: GenerateScoreComponent
  },{
    path: 'branchmst',
    component: BranchmstComponent
  },{
    path: 'statemst',
    component: StatemstComponent
  },{
    path: 'channelmst',
    component: ChannelmstComponent
  },{
    path: 'subchannelmst',
    component: SubchannelmstComponent
  },{
    path: 'submenumst',
    component: SubmenumstComponent
  },{
    path: 'menumst',
    component: MenumstComponent
  },{
    path: 'uploadedfile',
    component: UploadedFilesNewComponent
  },
  {
    path: 'pendingrequest',
    component: PendingRequestComponent
  },{
    path: 'deleterequest',
    component: DeleteRequestComponent
  },{
    path: 'controlpanel',
    component:ControlPanelComponent
  }, {
    path : 'addtask',
    component: AddTasksComponent
  },{
    path : 'createmodule',
    component: ModulecreationComponent
  },
  { 
    // path: 'upload/:id/:month/:year',
    path: 'upload/:id',
     component:  UploadAllFileComponent},

  // { path: 'fileupload',
  // component:  UploadMotherComponent},
  { path: 'addscheduler',
     component:  SchedularLogComponent},
  { path: 'scheduleralldetails',
     component:  SchedularAllDetailsComponent},
  { path: 'editscheduler/:id',
     component:  EditScheduleComponent},
  { path: 'employeemst',
     component:  EmployeeMasterComponent},
  { path: 'addbranch',
     component:  AddBranchComponent},
  { path: 'productmst',
     component:  ProductMasterComponent},
  { path: 'producermst',
     component:  ProducerMasterComponent},
  { path: 'bancamst', 
  component: BancaMasterComponent},
  { path: 'designationmst',
  component: DesignationMasterComponent},
  { path: 'addemployee',
  component: AddEmployeeComponent},
  { path: 'addbancamst',
  component: AddBancaComponent},

  { path: 'editkpimap/:id',
  component: EditKpimapComponent},

  { path: 'mappermst',
    component: MaperMasterComponent},

  { path: 'addmappermst',
  component: AddMappermasterComponent},

  { path: 'edituploadedfile',
    component: EditUploadedFileComponent},
  { path: 'manualmapping',
    component: ManualMappingComponent},

  { path: 'healthgimapper',
   component: HealthAndGiMapperComponent},
   {
    path: 'sdmunmapped',
    component: SdmUnmappedDetailsComponent
   },
   { path: 'tagickpi',
     component: HomepageComponent},

  { path: 'fileupload',
  component: FileUploadNewComponent},

  { path: 'corUpload',
  component: CorUploadComponent},

  { path: 'home',
    component: TagicDashboardComponent},
  { path: 'rulereplication',
  component: RuleReplicationComponent},
  { path: 'download_Mapped_data',
  component: MappedDataDownloadComponent},
  { path: 'usermanual',
  component: UsermanualDownloadComponent},
  
  // { path: 'c',
  // component: CreateNewThingsComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
