import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RestApiService } from '../rest-api.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CommonService } from '../common.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    toppings: FormGroup;
    CRS_No = '';
    Proposal_No = "";
    Authorization_No = "";
    Policy_No = '';
    searchfor = "";
    search_Placeholder = "";
    value = [
        { name: 'CRS No', value: 'CRS_No', checked: false },
        { name: 'Proposal No', value: 'Proposal_No', checked: false },
        { name: 'Authorization No', value: 'Authorization_No', checked: false },
        { name: 'Policy No', value: 'Policy_No', checked: false },
    ] as any;
    done = [] as any;
    display_fields = [] as any;
    search_fields = [] as any;
    disArr = [] as any;
    fileOption = '1';
    searchText = '';
    fromDate = '';
    toDate = '';
    result = [] as any;
    tempArr = [] as any;
    existingfile = ''
    fileUploadSub?: Subscription;
    uploadedFileName = '';

    flag: boolean = false;
    btnTxt = "Select All";
    btnTxtRight = "Deselect All"
    isSelected: boolean = false;
    isSelectedRight: boolean = false;
    countLeft: number = 0;
    countRight: number = 0;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, fb: FormBuilder, private rest: RestApiService, private ngxService: NgxUiLoaderService, private common: CommonService) {
        this.toppings = fb.group({
            CRS_No: false,
            Proposal_No: false,
            Authorization_No: false,
            Policy_No: false,
        });
    }

    /*numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }*/

    ngOnInit(): void {
        this.getFields();
    }

    getFields() {
        this.rest.getFields().subscribe((res: any) => {
            this.search_fields = res.search_fields
            this.search_fields.sort(function (a: any, b: any) {
                if (a.display_name < b.display_name) {
                    return -1;
                }
                if (a.display_name > b.display_name) {
                    return 1;
                }
                return 0;
            })
            this.searchfor = this.search_fields[0].field_name;
            this.search_Placeholder = this.search_fields[0].display_name;
            this.display_fields = res.display_fields;

            this.display_fields.sort(function (a: any, b: any) {
                if (a.display_name < b.display_name) {
                    return -1;
                }
                if (a.display_name > b.display_name) {
                    return 1;
                }
                return 0;
            })
            for (let obj of this.display_fields) {
                obj.isCheck = false;
            }
        })
    }

    callType(event: any, flag: number): void {
        const position = event.target.selectedIndex;
        if (flag === 0) {
            this.search_Placeholder = this.search_fields[position].display_name;
        } else {
            this.search_Placeholder = this.search_fields[0].display_name;
        }
    }

    onsubmit(): any {
        if (this.fromDate === '') {
            this.common.openSnackBar('Please select from date')
            return false;
        } else if (this.toDate === '') {
            this.common.openSnackBar('Please select to date')
            return false;
        } else if (!this.validateDates(this.fromDate, this.toDate)) {
            return false;
        } else if (this.searchfor === '') {
            this.common.openSnackBar('Please select search field')
            return false;
        } else if (this.done.length === 0) {
            this.common.openSnackBar('Please select display fields')
            return false;
        }
        this.disArr = []
        for (let key of this.done) {
            this.disArr.push(key)
        }
        const displayData = { "display_name": this.search_Placeholder, "field_name": this.searchfor }
        this.disArr.unshift(displayData);
        let i = 1
        for (let key of this.disArr) {
            key.seq = i;
            i++;
        }

        const fromDate = this.fromDate + ' 00:00:00'
        const toDate = this.toDate + ' 23:59:59'
        let data = {
            "fromDate": fromDate,
            "toDate": toDate,
            "searchText": this.searchText,
            "searchField": this.searchfor,
            "displayFields": this.disArr
        }
        this.ngxService.start();
        this.rest.singleSearch(data).subscribe((res: any) => {
            this.ngxService.stop();
            if (res.status == 1) {
                this.tempArr = []
                this.tempArr = this.disArr;
                this.result = [];
                this.result = res.result;
            }
        });
    }

    singleSearchDownload(): any {
        if (this.fromDate == '') {
            this.common.openSnackBar('Please select from date')
            return false;
        } else if (this.toDate == '') {
            this.common.openSnackBar('Please select to date')
            return false;
        } else if (!this.validateDates(this.fromDate, this.toDate)) {
            return false;
        } else if (this.searchfor == '') {
            this.common.openSnackBar('Please select search field')
            return false;
        } else if (this.done.length == 0) {
            this.common.openSnackBar('Please select display fields')
            return false;
        }
        this.disArr = []
        for (let key of this.done) {
            this.disArr.push(key)
        }
        var displayData = { "display_name": this.search_Placeholder, "field_name": this.searchfor }
        this.disArr.unshift(displayData);
        let i = 1
        for (let key of this.disArr) {
            key.seq = i;
            i++;
        }
        var fromDate = this.fromDate + ' 00:00:00'
        var toDate = this.toDate + ' 23:59:59'
        let data = {
            "fromDate": fromDate,
            "toDate": toDate,
            "searchText": this.searchText,
            "searchField": this.searchfor,
            "displayFields": this.disArr
        }
        this.ngxService.start();
        this.rest.singleSearchDownload(data).subscribe((res: any) => {
            this.ngxService.stop();
            if (res.status == 1) {
                const fileName = res.result;
                window.open(this.rest.file_path + '/downloads/' + fileName)
            }
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            this.disArr = []
            for (let key of this.done) {
                this.disArr.push(key)
            }
            const displayData = { "display_name": this.search_Placeholder, "field_name": this.searchfor }
            this.disArr.unshift(displayData);
            let i = 1
            for (let key of this.disArr) {
                key.seq = i;
                i++;
            }
            if (this.tempArr.length > 0) {
                this.tempArr = this.disArr
            }
        } else {

            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    uploadExisting(): void {
        const fileUp = document.getElementById('fileUp');
        if (fileUp) {
            this.uploadFile = this.uploadFile.bind(this);
            fileUp.addEventListener('change', this.uploadFile);
            fileUp.click();
        }
    }

    uploadFile(event: any): any {
        const files = event.target.files;
        this.existingfile = files[0].name;
        const fd = new FormData();
        fd.append('file', files[0]);
        // fd.append('companyId', this.common.getCompanyId());
        this.ngxService.start();
        this.fileUploadSub = this.rest.uploadBulkFile(fd).subscribe((res: any) => {
            this.ngxService.stop();
            if (this.fileUploadSub) {
                this.fileUploadSub.unsubscribe();
            }
            const fileUp = document.getElementById('fileUp');
            if (fileUp) {
                fileUp.removeEventListener('change', this.uploadFile);
                // this.isUpload = false;
            }
            if (res.success) {
                if (res.format) {
                    this.common.openSnackBar('File uploaded successfully');
                    this.uploadedFileName = res.file;
                } else {
                    this.common.openSnackBar('Invalid Input')
                }
            } else {
                this.common.openSnackBar('Something went wrong')
            }
        }, (err: any) => {
            console.log(err);
        });
    }

    validateDates(sDate: any, eDate: any) {
        if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
            this.common.openSnackBar('To date should be grater then from date.');
            return false;
        } else {
            return true;
        }
    }

    onUpload(): any {
        if (this.fromDate === '') {
            this.common.openSnackBar('Please select from date')
            return false;
        } else if (this.toDate === '') {
            this.common.openSnackBar('Please select to date')
            return false;
        } else if (!this.validateDates(this.fromDate, this.toDate)) {
            return false;
        } else if (this.uploadedFileName == '') {
            this.common.openSnackBar('Please upload csv file')
            return false;
        } else if (this.searchfor == '') {
            this.common.openSnackBar('Please select search field')
            return false;
        } else if (this.done.length == 0) {
            this.common.openSnackBar('Please select display fields')
            return false;
        }
        this.disArr = []
        for (let key of this.done) {
            this.disArr.push(key)
        }
        const displayData = { "display_name": this.search_Placeholder, "field_name": this.searchfor }
        this.disArr.unshift(displayData);
        let i = 1
        for (let key of this.disArr) {
            key.seq = i;
            i++;
        }
        const fromDate = this.fromDate + ' 00:00:00'
        const toDate = this.toDate + ' 23:59:59'
        let data = {
            "fromDate": fromDate,
            "toDate": toDate,
            "file": this.uploadedFileName,
            "searchField": this.searchfor,
            "displayFields": this.disArr
        }
        this.ngxService.start();
        this.rest.bulkSearch(data).subscribe((res: any) => {
            this.ngxService.stop();
            if (res.status == 1) {
                this.tempArr = []
                this.tempArr = this.disArr
                this.result = [];
                this.result = res.result;
            }
        });
    }

    bulkSearchDownload(): any {
        if (this.fromDate == '') {
            this.common.openSnackBar('Please select from date')
            return false;
        } else if (this.toDate == '') {
            this.common.openSnackBar('Please select to date')
            return false;
        } else if (!this.validateDates(this.fromDate, this.toDate)) {
            return false;
        } else if (this.uploadedFileName == '') {
            this.common.openSnackBar('Please upload csv file')
            return false;
        } else if (this.searchfor == '') {
            this.common.openSnackBar('Please select search field')
            return false;
        } else if (this.done.length == 0) {
            this.common.openSnackBar('Please select display fields')
            return false;
        }
        this.disArr = []
        for (let key of this.done) {
            this.disArr.push(key)
        }
        var displayData = { "display_name": this.search_Placeholder, "field_name": this.searchfor }
        this.disArr.unshift(displayData);
        let i = 1
        for (let key of this.disArr) {
            key.seq = i;
            i++;
        }
        var fromDate = this.fromDate + ' 00:00:00'
        var toDate = this.toDate + ' 23:59:59'
        let data = {
            "fromDate": fromDate,
            "toDate": toDate,
            "file": this.uploadedFileName,
            "searchField": this.searchfor,
            "displayFields": this.disArr
        }
        this.ngxService.start();
        this.rest.bulkSearchDownload(data).subscribe((res: any) => {
            this.ngxService.stop();
            if (res.status == 1) {
                const fileName = res.result;
                window.open(this.rest.file_path + '/downloads/' + fileName)
            }
        });
    }



    singleSelectLeft(item: any, i: any): void {
        this.isSelected = true;
        this.btnTxt = "Select"

        if (item === false) {
            this.display_fields[i].isCheck = true;
            this.countLeft++;

        }
        else if (item === true) {
            this.display_fields[i].isCheck = false;
            this.countLeft--;

        }

        let isCheckCount = 0;

        for (let obj of this.display_fields) {
            if (obj.isCheck === false) {
                isCheckCount++;

            }
        }
        if (isCheckCount == this.display_fields.length) {
            this.btnTxt = "Select All"
            this.isSelected = false;
        }

    }

    selectLeft() {
        if (this.isSelected) {
            setTimeout(() => {
                this.copytoright();
                this.btnTxt = "Select All"
                this.isSelected = false;

            }, 200);

        }
        if (!this.isSelected) {

            for (let obj of this.display_fields) {
                obj.isCheck = true;
                this.btnTxt = "Select All"

            }

            setTimeout(() => {

                this.copytoright();
            }, 200);

        }

    }

    copytoright() {

        for (var i = 0; i < this.display_fields.length; i++) {
            if (this.display_fields[i].isCheck === true) {
                this.display_fields[i].isCheck = false;
                this.done.push(this.display_fields[i]);
                this.display_fields.splice(i, 1);
                i--;

            }

        }

        this.countLeft = 0;

    }

    singleSelectRight(item: any, i: any): void {
        this.isSelectedRight = true;
        this.btnTxtRight = "Deselect"

        if (item === false) {

            this.done[i].isCheck = true;
            this.countRight++;

        }
        else if (item === true) {

            this.done[i].isCheck = false;
            this.countRight--;

        }


        let isCheckCount = 0;

        for (let obj of this.done) {
            if (obj.isCheck === false) {
                isCheckCount++;

            }
        }
        if (isCheckCount == this.done.length) {
            this.btnTxtRight = "Deselect All"
            this.isSelectedRight = false;
        }

    }

    selectRight() {

        if (this.isSelectedRight) {
            setTimeout(() => {

                this.copytoleft();
                this.btnTxtRight = "Deselect All"
                this.isSelectedRight = false;

            }, 200);

        }
        if (!this.isSelectedRight) {

            for (let obj of this.done) {
                obj.isCheck = true;
                this.btnTxtRight = "Deselect All"
            }

            setTimeout(() => {

                this.copytoleft();
            }, 200);

        }

    }

    copytoleft() {

        for (var i = 0; i < this.done.length; i++) {
            if (this.done[i].isCheck === true) {
                this.done[i].isCheck = false;
                this.display_fields.push(this.done[i]);
                this.done.splice(i, 1);
                i--;

            }

        }
        this.countRight = 0;

    }
}
