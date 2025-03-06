import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router, RouteConfigLoadStart, RouteConfigLoadEnd} from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    secretKey = "TATA@AIGPent2022";
    constructor(private _snackBar: MatSnackBar, private router: Router) {
    }

    openSnackBar(message: string): any {
        this._snackBar.open(message, 'close', {
            panelClass: ['blue-snackbar']
        });

        setTimeout(() => {
            this._snackBar.dismiss();
        }, 30000);
    }

    getUserId(): any {
        var userData = sessionStorage.getItem("tataaigstore");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.user_id;
        } else {
            return null;
        }
    }

    getUserName(): any {
        var userData = sessionStorage.getItem("tataaigstore");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.name;
        } else {
            return null;
        }
    }

    getUserType(): any {
        const userData = sessionStorage.getItem("tataaigstore");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.user_type;
        } else {
            return null;
        }
    }
    getBranchId():any{
        const userData = sessionStorage.getItem("tataaigstore");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.branchId;
        } else {
            return null;
        }
    }

    sessionCheck() {
        const date = new Date();
        const time = date.getTime();
        //console.log(time);
        const sessionTime = sessionStorage.getItem('aigSessionTime');
        //console.log(Number(sessionTime));
        if (time < Number(sessionTime) + (3600 * 10)) {
            var newTime = time + (3600 * 1000);
            sessionStorage.setItem("aigSessionTime", String(newTime));

            //console.log("in");
        } else {
            sessionStorage.removeItem('aigSessionTime');
            sessionStorage.removeItem('tataaigstore');
            this.router.navigate(['/']);
        }
    }

    islogIn() {
        var userData = sessionStorage.getItem("tataaigstore");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            // this.router.navigate(['/dashboard/home']);
        } else {
            this.router.navigate(['/']);
        }
    }

    validateEmail(inputText: string): any {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (inputText.match(mailformat)) {
            // alert('Valid email address!');
            return true;
        } else {
            return false;
        }
    }

    validatePhone(inputText: string) {
        /* var a = document.getElementById(txtPhone).value;*/
        var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
        if (filter.test(inputText)) {
            return true;
        } else {
            return false;
        }
    }

    isEmail(email: string) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }

    IsName(Name: string) {
        var regex = /^([a-zA-Z ]{3,16})$/;
        if (!regex.test(Name)) {
            return false;
        } else {
            return true;
        }
    }

    PassWord(Pass: string) {
        //var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,12}$/;
        var regex = /^([a-zA-Z0-9!@#$%^&*]{5,12})+$/;
        if (!regex.test(Pass)) {
            return false;
        } else {
            return true;
        }
    }

    NumBer(Num: string) {
        //var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,12}$/;
        var regex = /^[0-9-+]+$/;
        if (!regex.test(Num)) {
            return false;
        } else {
            return true;
        }
    }

    groupBy(xs: any, key: string): any {
        return xs.reduce((rv: any, x: any) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }


    getManuList() {

        var data = sessionStorage.getItem("menuList")

        if (data) {
            var manulist = JSON.parse(data);

            return manulist;

        }


    }

    encode(data: any) {
        const key = CryptoJS.enc.Utf8.parse(this.secretKey);
        const encrypted = CryptoJS.AES.encrypt(data, key, {mode: CryptoJS.mode.ECB});
        // const binaryEnc = btoa(JSON.stringify(aesEnc));
        return encrypted.toString();
    }

    decode(data: any) {
        const key = CryptoJS.enc.Utf8.parse(this.secretKey);
        const decrypted =  CryptoJS.AES.decrypt(data, key, {mode:CryptoJS.mode.ECB});
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    getBranchMasterId(): any {
        var userData = sessionStorage.getItem("moduleName");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.branchMaster;
        } else {
            return null;
        }
    }
    getEmployeeMasterId(): any {
        var userData = sessionStorage.getItem("moduleName");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.emp_mst_new;
        } else {
            return null;
        }
    }
    getKpiMappingId():any{
        var userData = sessionStorage.getItem("moduleName");
        // console.log(userData)
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.kpi_mapping_new;
         } else {
             return null;
             }
     }
    
    getProductMasterId(): any {
        var userData = sessionStorage.getItem("moduleName");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.productMaster;
        } else {
            return null;
        }
    }
    getProducerMasterId(): any {
        var userData = sessionStorage.getItem("moduleName");
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.producerMaster;
        } else {
            return null;
        }
    }


    // getKpiParamSetup(): any {
    //     var columnName = sessionStorage.getItem('columnName');
    //     var searchValue = sessionStorage.getItem('value');
    //     const data = {
    //         'columnName': columnName,
    //         'searchValue' : searchValue
    //     }
    //     return data
    // }




    getBancaMasterId(): any {
         var userData = sessionStorage.getItem("moduleName"); if (userData !== undefined && userData !== null && userData != "") { let response = JSON.parse(userData);return response.bancaMaster; } else {return null; } }

    getDesignationMasterId():any{
         var userData = sessionStorage.getItem("moduleName");
        //  console.log(userData)
          if (userData !== undefined && userData !== null && userData != "") {
             let response = JSON.parse(userData);

              return response.designation_master;
             } else {
                 return null;
             }
             }



    getMapperMasterId():any{
        var userData = sessionStorage.getItem("moduleName");
        console.log(userData)
        if (userData !== undefined && userData !== null && userData != "") {
            let response = JSON.parse(userData);
            return response.mapperM;
         } else {
             return null;
             }
     }

     getSdmUnmappedId(): any {
         var userData = sessionStorage.getItem("moduleName");
          if (userData !== undefined && userData !== null && userData != "") {
             let response = JSON.parse(userData);
              return response.unmapDataUpload;
             } else {
                 return null;
                 }
                 }


     getUploadedFile_file_edit_id(): any {
         return sessionStorage.getItem('file_edit_id');
         }
          getUploadedFile_fileTypeId_edit(): any {
             return sessionStorage.getItem( 'fileTypeId_edit');
             }
              getUploadedFile_moduleId_edit(): any {
                 return sessionStorage.getItem('moduleId_edit');
                 }

}




