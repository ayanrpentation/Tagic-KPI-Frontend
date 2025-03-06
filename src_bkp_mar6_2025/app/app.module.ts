import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgMaterialMultilevelMenuModule, MultilevelMenuService } from 'ng-material-multilevel-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DashboardComponent} from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { UsersComponent } from './masters/users/users.component';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {FooterComponent} from "../../src/app/footer/footer.component";

import { IntercepterService } from './intercepter.service';
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
import { FilterPipe } from './filter.pipe';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FileUploadNewComponent } from './file-upload-new/file-upload-new.component';
import { TagicDashboardComponent } from './tagic-dashboard/tagic-dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RuleReplicationComponent } from './rule-replication/rule-replication.component';
import { MappedDataDownloadComponent } from './mapped-data-download/mapped-data-download.component';
import { UsermanualDownloadComponent } from './usermanual-download/usermanual-download.component';
import { CorUploadComponent } from './cor-upload/cor-upload.component';
import { ChannelwiseViewMailComponent } from './masters/channelwise-view-mail/channelwise-view-mail.component';
import { NewParamAddComponent } from './new-param-add/new-param-add.component';
import { ParameterSequenceComponent } from './parameter-sequence/parameter-sequence.component';
// import { CreateNewThingsComponent } from './create-new-things/create-new-things.component';


const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 1000,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    UsersComponent,
    FooterComponent,
    MenuMasterComponent,
    UserMenuMapComponent,
    SalesTargetComponent,
    SdmComponent,
    BankassuranceComponent,
    MappingMasterComponent,
    ChequeBounceComponent,
    ReceivableComponent,
    KpimapComponent,
    MiscDetailsComponent,
    MiscHeaderComponent,
    ViewkpiComponent,
    AuditFileComponent,
    SchedulerDetailsComponent,
    KpiScoringComponent,
    UploadedFilesComponent,
    GenerateScoreComponent,
    BranchmstComponent,
    StatemstComponent,
    DesigmstComponent,
    ChannelmstComponent,
    SubchannelmstComponent,
    SubmenumstComponent,
    MenumstComponent,
    AuditfilenewComponent,
    UploadedFilesNewComponent,
    PendingRequestComponent,
    DeleteRequestComponent,
    ControlPanelComponent,
    AddTasksComponent,
    ModulecreationComponent,
    FilterPipe ,
    UploadAllFileComponent,
    SchedularLogComponent,
    SchedularAllDetailsComponent,
    EditScheduleComponent,
    EmployeeMasterComponent,
    AddBranchComponent,
    ProductMasterComponent,
    ProducerMasterComponent,
    BancaMasterComponent,
    DesignationMasterComponent, 
    AddEmployeeComponent,
    AddBancaComponent,
    EditKpimapComponent,
    MaperMasterComponent,
    AddMappermasterComponent,
    EditUploadedFileComponent,
    ManualMappingComponent,
    HealthAndGiMapperComponent,
    SdmUnmappedDetailsComponent,
    HomepageComponent,
    FileUploadNewComponent,
    TagicDashboardComponent,
    RuleReplicationComponent,
    MappedDataDownloadComponent,
    UsermanualDownloadComponent,
    CorUploadComponent,
    ChannelwiseViewMailComponent,
    NewParamAddComponent,
    ParameterSequenceComponent,
    // CreateNewThingsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    NgbModule,
    MatMenuModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    DragDropModule,
    MatRadioModule,
    NgxUiLoaderModule,
    MatSnackBarModule,
    MatSelectModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    NgMultiSelectDropDownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    NgMaterialMultilevelMenuModule,
    MatProgressSpinnerModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    })
  ],
  providers: [DatePipe, {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    }, MultilevelMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
