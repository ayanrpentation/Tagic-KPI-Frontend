import {Component, OnInit, ViewChild, AfterViewInit,HostListener} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router, RouteConfigLoadStart, RouteConfigLoadEnd} from '@angular/router';
import {CommonService} from '../common.service';
import { RestApiService } from '../rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from "angular-notifier";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})


// @HostListener('window:keydown.control.b', ['$event'])
// bigFont(event: KeyboardEvent) {
//     event.preventDefault();
//     document.body.style.fontSize = '32px';
// }



export class HeaderComponent implements AfterViewInit, OnInit {

    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;

    cor_flag = sessionStorage.getItem('corFlag') as any
    
    isMenuShow = true;
    showFiller = false;
    manulist: any = [];
    userType = '' as any;
    userName = '' as any;
    appitems = [] as any;
    main_menu_name = '' as any;
    subMenuVisibility = false;
    opened_link = '' as any;
    current_link_name = '' as any
    sideNavOpenStatus = true as any
    userId = '' as any

    selectedChannelName = 'all';

    // default setting
    defaultSettingBoxStatus = false as any
    channelNewList = [] as any
    selectedDefaultChannel = sessionStorage.getItem('defaultChannelForAll') as any
    selectedDefaultChannelName = sessionStorage.getItem('defaultChannelNameForAll') as any
    userLevel = sessionStorage.getItem('userLevel') as any
    firstLoadafterLogin = sessionStorage.getItem('firstLoadafterLogin') as any
    kpi_month = '' as any;
    kpi_year = new Date().getFullYear() as any;
    fYearList = [] as any
    monthList = [{id:'01', name: 'January'},{id:'02', name: 'February'},{id:'03', name: 'March'},{id:'04', name: 'April'},{id:'05', name: 'May'},{id:'06', name: 'June'},{id:'07', name: 'July'},{id:'08', name: 'August'},{id:'09', name: 'September'},{id:'10', name: 'October'},{id:'11', name: 'November'},{id:'12', name: 'December'}];


    

    config = {
        paddingAtStart: true,
        interfaceWithRoute: true,
        classname: 'my-custom-class',
        listBackgroundColor: `transparent -webkit-linear-gradient( 174deg, rgba(13, 53, 148, .898039), #35d3e1) 0 0 no-repeat padding-box`,
        fontColor: `rgb(255, 253, 251)`,
        backgroundColor: `transparent -webkit-linear-gradient( 174deg, rgba(13, 53, 148, .898039), #35d3e1) 0 0 no-repeat padding-box`,
        selectedListFontColor: `#07075a`,
        // selectedListBackgroundColor:`white` ,
        highlightOnSelect: true,
        collapseOnSelect: true,
        useDividers: false,
        rtlLayout: false
    };

    constructor(public observer: BreakpointObserver, private common: CommonService, private router: Router, private rest:RestApiService, private modalService: NgbModal, private notifier: NotifierService) {
    }

    ngOnInit(): void {
        console.log(typeof this.selectedDefaultChannel )
        // if(this.selectedDefaultChannel == '0'){
        //     this.selectedDefaultChannel = ''
        // }


        this.userId = this.common.getUserId();
        if(this.userId == undefined || this.userId == null){
            this.router.navigate([''])
        }
        
        this.userName = this.common.getUserName();
        this.userType = this.common.getUserType();
        this.current_link_name = sessionStorage.getItem("current_link_name")
        // console.log("current_link_name",String(this.current_link_name))
        // this.sideNavOpenStatus = Boolean(Number(sessionStorage.getItem("sideNavOpenStatus")))
        // this.manulist = this.common.getManuList();
        // this.common.islogIn()
        this.show_menu_data();
        this.getFilterModuleMaster();
        

        if(this.firstLoadafterLogin == 'true'){
            this.defaultSettingBoxStatus = true
            this.getAllChannelNew()
        }

        for(let yr = this.kpi_year + 2; yr >= this.kpi_year - 2; yr--){
            this.fYearList.push(yr)
        }

        


       
    }

    @HostListener('window:keydown.control.s', ['$event'])
    defaultSetup(event: KeyboardEvent) {
        event.preventDefault();
        this.setting()
    }

    @HostListener('window:keydown.escape', ['$event'])
    closedefaultSetup(event: KeyboardEvent) {
        event.preventDefault();
        this.closeSettings()
    }




    @HostListener('window:keydown.control.1', ['$event'])
    goToUpload(event: KeyboardEvent) {
        event.preventDefault();
        this.router.navigate(['/dashboard/fileupload'])
    }
    @HostListener('window:keydown.control.2', ['$event'])
    goToAudit(event: KeyboardEvent) {
        event.preventDefault();
        this.router.navigate(['/dashboard/auditnew'])
    }
    @HostListener('window:keydown.control.3', ['$event'])
    goToMapping(event: KeyboardEvent) {
        event.preventDefault();
        this.router.navigate(['/dashboard/manualmapping'])
    }
    @HostListener('window:keydown.control.4', ['$event'])
    goToCalculation(event: KeyboardEvent) {
        event.preventDefault();
        this.router.navigate(['/dashboard/view-kpi'])
    }
    @HostListener('window:keydown.control.5', ['$event'])
    goToGenerateScore(event: KeyboardEvent) {
        event.preventDefault();
        this.router.navigate(['/dashboard/generate-score'])
    }
    @HostListener('window:keydown.control.6', ['$event'])
    goTOpublishScore(event: KeyboardEvent) {
        event.preventDefault();
        this.router.navigate(['/dashboard/kpi-scoring'])
    }







    ngAfterViewInit() {
        this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
            try {
                if (res.matches) {
                    this.sidenav.mode = 'over';
                    this.sidenav.close();
                } else {
                    // this.sidenav.mode = 'side';
                    this.sidenav.open();
                }
              }
              catch(err) {}            
        });
    }

    savename = ''

    cleanUp(modal:any){
        window.alert("Permission Restricted")
        // this.modalService.open(modal, {centered: true});
    }
    closeModal(){
        this.modalService.dismissAll();
    }
    truncateAll(){
        const data = {
            user_id: this.common.getUserId(),  
              // user_id: '1',  
          };
      
          // console.log(data)
      
          this.rest.truncateAll(data).subscribe((res: any) => {
          //   console.log(res)
            if (res.success) {
              
             this.notifier.notify('success', res.message);
             this.modalService.dismissAll();
              
            }  
          }, 
          (err: any) => {
              console.log("Some error occurred")
          }
          );
    }

    routePage(reportId: any, name: string) {
        this.router.navigate(['/dashboard']).then(() => {
            this.saveurl = ''
            this.savename = name
            this.router.navigate(['/dashboard/report/' + reportId + '/' + name]);
        });
    }

    saveurl = ''

    goTo(path: string): void {
        this.savename = ''
        this.saveurl = path
        this.router.navigate(['/dashboard' + path]);
    }

    logout() {
        // localStorage.clear()
        // sessionStorage.clear()
        sessionStorage.removeItem("columnName");
        sessionStorage.removeItem("value");
        sessionStorage.removeItem("current_link_name");

        sessionStorage.removeItem("firstLoadafterLogin");
        sessionStorage.removeItem("defaultChannelNameForAll");
        sessionStorage.removeItem("defaultChannelForAll");
        sessionStorage.removeItem("defaultMonthForAll");
        sessionStorage.removeItem("defaultYearForAll");

        sessionStorage.removeItem("aigSessionTime");
        sessionStorage.removeItem("moduleName");
        sessionStorage.removeItem("tataaigstore");
        sessionStorage.removeItem("config");
        
        localStorage.removeItem('credential');
        localStorage.removeItem('tataaigstore');
        localStorage.removeItem('aigSessionTime');
        // localStorage.removeItem('centSessionTime');
        this.router.navigate(['']);
    }
    gotoHome(){
        this.router.navigate(['/dashboard/tagickpi']);
    }

    menuToggle() {
        this.sidenav.toggle();
        this.isMenuShow = !this.isMenuShow;
        
    }

    show_menu_data(){
        const data = {
          user_id: this.common.getUserId(), 
          user_type: sessionStorage.getItem('userLevel')
            // user_id: '1',  
        };
    
        console.log(data)
    
        this.rest.show_menu_data(data).subscribe((res: any) => {
        //   console.log(res)
          if (res.success) {
            
            this.appitems= res.response
            // console.log("22222222222222222222",this.appitems)
            
          }  
        }, 
        (err: any) => {
            console.log("menu_list_not_working")
        }
        );
    }

    goTodefinedpage(link:any){
        const url = String(window. location. href)
        // console.log("55555",url)
        this.opened_link = url


        this.current_link_name = link
        sessionStorage.setItem("current_link_name", link);

        this.router.navigate(['/dashboard']).then(() => {
            this.router.navigate([link])
        });

        
        
        // if(url.includes(link)){
        //     this.opened_button = true
        // }
        // console.log(url.includes(link))

        
    }

    goTodefinedpage1(link:any){
        // const url = String(window. location. href)
        // console.log("55555",url)
        // this.opened_link = url
        this.current_link_name = link  
        sessionStorage.setItem("current_link_name", link);

    }

    mainMenuClick(label:any){

        if ( this.main_menu_name == label){
            this.main_menu_name = ''
        }else{

            this.main_menu_name = label
        }

        // if(this.main_menu_name!=''){
        //     this.subMenuVisibility = !this.subMenuVisibility
        // }
        this.subMenuVisibility = !this.subMenuVisibility
    }
    getFilterModuleMaster(){
        this.rest.getFilterModuleMaster().subscribe((res: any) => {  
            if (res.success) {
                sessionStorage.setItem('moduleName', JSON.stringify(res.result));
            } else {
                this.notifier.notify('error', res.message);
            }
        }, (err: any) => {
        });
    }

    // sideNavOpenStat(){
    //     this.sideNavOpenStatus == !this.sideNavOpenStatus

    //     if(this.sideNavOpenStatus == true){
    //         sessionStorage.setItem("sideNavOpenStatus", '1' )
    //     }
    //     else{
    //         sessionStorage.setItem("sideNavOpenStatus", '0' )
    //     }
        
    // }

    getAllChannelNew() {
        this.rest.getAllChannelNew().subscribe((res: any) => {
          if (res.success) {
            this.channelNewList = res.data;
          }
        }, (err: any) => {});
    }


    setting(){
        this.defaultSettingBoxStatus =  true
        this.getAllChannelNew();

        this.selectedDefaultChannel = sessionStorage.getItem('defaultChannelForAll')
        this.kpi_year = sessionStorage.getItem('defaultYearForAll')
        this.kpi_month = sessionStorage.getItem('defaultMonthForAll')

        console.log(this.selectedDefaultChannel,this.kpi_year,this.kpi_month)
        
        if(this.kpi_year == '' && this.kpi_month == ''){
            this.currentMonthYear()
        }
    }

    defaultsetting(){

        // var selectedChannelName = ''


        for(var channel of this.channelNewList){
            if(channel.id == this.selectedDefaultChannel){
                ("came here")
                this.selectedChannelName = String(channel.channelNewName)
            }
            // else{
            //     var selectedChannelName = ''

            // }

        }

        console.log(this.selectedChannelName, this.selectedDefaultChannel);
        console.log(this.selectedChannelName, typeof(this.selectedDefaultChannel));


        sessionStorage.setItem("defaultChannelForAll", this.selectedDefaultChannel)
        sessionStorage.setItem("defaultChannelNameForAll", this.selectedChannelName)
        sessionStorage.setItem("defaultYearForAll", String(this.kpi_year))
        sessionStorage.setItem("defaultMonthForAll", this.kpi_month)


        this.notifier.notify('success', 'saved successfully')
        this.defaultSettingBoxStatus =  false
        sessionStorage.setItem('firstLoadafterLogin', 'false')

        window.location = window.location
        this.router.navigate([window.location])

        // window.location.reload();

        // console.log(this.current_link_name)
        // if(this.firstLoadafterLogin != 'true'){
        //     // console.log("moving")
        //     // this.router.navigate([this.current_link_name])
        //     window.location.reload()
        // }
        
    }

    // inNumber(val:any){
    //     // val = Number(val)
    //     try{

    //         return Number(val)
    //     }
    //     catch{
    //         return 'all'
    //         console.log("error")
    //     }

    // }

    closeSettings(){
        this.defaultSettingBoxStatus =  false
        sessionStorage.setItem('firstLoadafterLogin', 'false')
    }

    currentMonthYear(){
        var d = new Date();
        var mon = d.getMonth()+1;
        var yr = d.getFullYear();

        if (mon == 1){ // if month is January then it will show Dec of previous year
          yr = yr-1
          mon = 13
        }
        this.kpi_month = mon-1 // final month to show in frontend
        
        if(String(this.kpi_month).length<2){ 
          this.kpi_month = '0' + String(this.kpi_month)
        }
        else{
          this.kpi_month = String(this.kpi_month)
        }
        
        this.kpi_year = yr

        // console.log("date", this.kpi_month, '/', this.kpi_year)
    
    }

    

    

}
