import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // tata aig new redhat server
  API_ROOT = 'http://10.35.12.201:5000';
  file_path = 'http://10.35.12.201:5000/static';



  // API_ROOT = 'http://20.198.5.28:5020';
  // file_path = 'http://20.198.5.28:5020/static';

  //----arbaz----
  // API_ROOT = 'http://172.20.1.24:5000';
  // file_path = 'http://172.20.1.24:5000/static';

  //---Me----
  // API_ROOT = 'http://127.0.0.1:5020';
  // file_path = 'http://127.0.0.1:5020/static';

  //---Arpan----
  // API_ROOT = 'http://192.168.1.12:5020';
  // file_path = 'http://192.168.1.12:5020/static';

  // API_ROOT = 'http://192.168.0.103:5020';
  // file_path = 'http://192.168.0.103:5020/static';

  // API_ROOT = 'http://192.168.29.164:5020';
  // file_path = 'http://192.168.29.164:5020/static';

  //------tataaig-----
  // API_ROOT = 'http://10.33.195.171:5000';
  // file_path = 'http://10.33.195.171:5000/static';

  // API_ROOT = 'https://dataondemand.tataaig.com/api';
  // file_path = 'https://dataondemand.tataaig.com/api/static';



  constructor(private http: HttpClient) {
  }

  get_menu_list() {
    return this.http.get(this.API_ROOT + '/users/menu_list');
  }
  deleteMenu(data: any): any {
    return this.http.post(this.API_ROOT + '/users/deleteMenu', JSON.stringify(data), httpOptions);
  }
  deletesubMenu(data: any): any {
    return this.http.post(this.API_ROOT + '/users/deletesubMenu', JSON.stringify(data), httpOptions);
  }
  addMenu(data: any): any {
    return this.http.post(this.API_ROOT + '/users/addMenu', JSON.stringify(data), httpOptions);
  }
  addsubMenu(data: any): any {
    return this.http.post(this.API_ROOT + '/users/addsubMenu', JSON.stringify(data), httpOptions);
  }
  show_menu_data(data: any): any {
    return this.http.post(this.API_ROOT + '/users/access_right1', JSON.stringify(data), httpOptions);
  }
  get_sub_menu_list(data: any) {
    return this.http.post(this.API_ROOT + '/users/sub_menu_list', JSON.stringify(data), httpOptions);
  }
  menu_mapping_user_name_landingPage() {
    return this.http.get(this.API_ROOT + '/users/menu_mapping_user_name_landingPage');
  }
  menu_mapping_user_name_search(data: any) {
    return this.http.post(this.API_ROOT + '/users/menu_mapping_user_name_search', JSON.stringify(data), httpOptions);
  }
  create_user_menu_mapping(data: any) {
    return this.http.post(this.API_ROOT + '/users/create_user_menu_mapping', JSON.stringify(data), httpOptions);
  }
  update_access(data: any) {
    return this.http.post(this.API_ROOT + '/users/update_access', JSON.stringify(data), httpOptions);
  }
  update_view(data: any) {
    return this.http.post(this.API_ROOT + '/users/update_view', JSON.stringify(data), httpOptions);
  }
  update_insert(data: any) {
    return this.http.post(this.API_ROOT + '/users/update_insert', JSON.stringify(data), httpOptions);
  }
  update_modify(data: any) {
    return this.http.post(this.API_ROOT + '/users/update_modify', JSON.stringify(data), httpOptions);
  }
  update_delete(data: any) {
    return this.http.post(this.API_ROOT + '/users/update_delete', JSON.stringify(data), httpOptions);
  }






  login(data: any): any {
    return this.http.post(this.API_ROOT + '/users/login', JSON.stringify(data), httpOptions);
  }
  getFields(): any {
    return this.http.get(this.API_ROOT + '/search/getFields');
  }
  singleSearch(data: any): any {
    return this.http.post(this.API_ROOT + '/search/singleSearch', JSON.stringify(data), httpOptions);
  }
  singleSearchDownload(data: any): any {
    return this.http.post(this.API_ROOT + '/search/singleSearchDownload', JSON.stringify(data), httpOptions);
  }
  uploadBulkFile(data: any): any {
    return this.http.post(this.API_ROOT + '/search/uploadBulkFile', data);
  }
  bulkSearch(data: any): any {
    return this.http.post(this.API_ROOT + '/search/bulkSearch', JSON.stringify(data), httpOptions);
  }
  bulkSearchDownload(data: any): any {
    return this.http.post(this.API_ROOT + '/search/bulkSearchDownload', JSON.stringify(data), httpOptions);
  }

  getFieldsData(data: any) {
    return this.http.post(this.API_ROOT + '/report/getFileds', JSON.stringify(data), httpOptions);
  }
  uploadBulkFile_v2(data: any): any {
    return this.http.post(this.API_ROOT + '/report/uploadBulkFile', data);
  }
  search(data: any): any {
    return this.http.post(this.API_ROOT + '/report/search', data);
  }
  search_v2(data: any): any {
    return this.http.post(this.API_ROOT + '/report/search_v2', data);
  }

  addChannelWiseMail(data: any): any {
    return this.http.post(this.API_ROOT + '/kpimap/addChannelWiseMail', JSON.stringify(data), httpOptions);
  }
  viewChannelWiseMail(data: any): any {
    return this.http.post(this.API_ROOT + '/kpimap/viewChannelWiseMail', JSON.stringify(data), httpOptions);
  }
  editChannelWiseMail(data: any): any {
    return this.http.post(this.API_ROOT + '/kpimap/editChannelWiseMail', JSON.stringify(data), httpOptions);
  }
  // User
  userList(data: any): any {
    return this.http.post(this.API_ROOT + '/users/getUserDetails', JSON.stringify(data), httpOptions);
  }
  userInsert(data: any): any {
    return this.http.post(this.API_ROOT + '/users/addUser', JSON.stringify(data), httpOptions);
  }
  userUpdate(data: any): any {
    return this.http.post(this.API_ROOT + '/users/updateUser', JSON.stringify(data), httpOptions);
  }
  userDelete(data: any): any {
    return this.http.post(this.API_ROOT + '/users/deleteUser', JSON.stringify(data), httpOptions);
  }

  department_fetch(data: any): any {
    return this.http.post(this.API_ROOT + '/department/fetch', JSON.stringify(data), httpOptions);
  }


  createNewBatch(): any {
    return this.http.get(this.API_ROOT + '/audit/createNewBatch')

  }
  resetTask(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/resetTask', data, httpOptions)

  }

  truncateAll(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/truncateAll', data, httpOptions)

  }

  getAllTask(data: any) {
    return this.http.post(this.API_ROOT + '/audit/getAllTask', data, httpOptions)

  }

  addTask(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/addTask', data, httpOptions);

  }

  monthYearChangeForNullMonthYear(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/monthYearChangeForNullMonthYear', data, httpOptions);

  }

  sendDeleteReq(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/sendDeleteReq', data, httpOptions);
  }

  checkFileExist_status(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/checkFileExist_status', data, httpOptions);
  }

  getPendingReq(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/getPendingReq', data, httpOptions)
  }
  getAllDelReq(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/getAllDelReq', data, httpOptions)
  }

  approverejectReq(data: any): any {
    return this.http.post(this.API_ROOT + '/audit/approverejectReq', data, httpOptions);
  }

  addMonthWiseControlPanel(data: any) {
    return this.http.post(this.API_ROOT + '/audit/addMonthWiseControlPanel', data, httpOptions);
  }

  sales_target(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/upload_target_to_DB', data);
  }
  sdm(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/upload_SDM_to_DB', data);
  }
  check_bounce(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/upload_check_bounce_to_DB', data);
  }
  mapping_hom(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/upload_mapping_mst_hom_producer_to_DB', data);
  }
  bankassurance(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/upload_banca_universal_to_DB', data);
  }
  receivable_pending(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/upload_receivable_pending_to_DB', data);
  }

  sales_target_fetch(data: any): any {
    return this.http.post(this.API_ROOT + '/kpi/getSalesTarget', JSON.stringify(data), httpOptions);
  }
  sdm_fetch(data: any): any {
    return this.http.post(this.API_ROOT + '/kpi/getSdm', JSON.stringify(data), httpOptions);
  }
  bankassur_fetch(data: any): any {
    return this.http.post(this.API_ROOT + '/kpi/getBankAssur', JSON.stringify(data), httpOptions);
  }
  mappingmst_fetch(data: any): any {
    return this.http.post(this.API_ROOT + '/kpi/getMappingMst', JSON.stringify(data), httpOptions);
  }
  cheqbounce_fetch(data: any): any {
    return this.http.post(this.API_ROOT + '/kpi/getCheqBounce', JSON.stringify(data), httpOptions);
  }
  resvmst_fetch(data: any): any {
    return this.http.post(this.API_ROOT + '/kpi/getResvMst', JSON.stringify(data), httpOptions);
  }
  checkSchedulerFileUpload(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/checkSchedulerFileUpload', JSON.stringify(data), httpOptions);

  }
  getkpiScore(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/getkpiScore', JSON.stringify(data), httpOptions)
  }


  insertheader(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/insertheader', JSON.stringify(data), httpOptions);
  }
  insertdetails(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/insertdetails', JSON.stringify(data), httpOptions);
  }
  getdetailsdata(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/getdetailsdata', JSON.stringify(data), httpOptions);
  }
  getheaderdata() {
    return this.http.get(this.API_ROOT + '/kpimap/getheaderdata');
  }
  getmaximum(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/getmaximum', JSON.stringify(data), httpOptions)
  }
  insertmapkpi(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/insertmapkpi', JSON.stringify(data), httpOptions)
  }
  editdeleteheader(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/editdeleteheader', JSON.stringify(data), httpOptions)
  }
  editdeletedetails(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/editdeletedetails', JSON.stringify(data), httpOptions)
  }
  editdeletekpi(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/editdeletekpi', JSON.stringify(data), httpOptions)
  }
  getallDetails() {
    return this.http.get(this.API_ROOT + '/kpimap/getallDetails')
  }
  getSchedulerdetails() {
    return this.http.get(this.API_ROOT + '/kpimap/getSchedulerdetails')
  }
  resetScheduler(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/resetScheduler', JSON.stringify(data), httpOptions)
  }
  getEmployeeDetails(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/getEmployeeDetails', JSON.stringify(data), httpOptions)

  }
  getAllRole() {
    return this.http.get(this.API_ROOT + '/kpimap/getAllRole')

  }
  getAllChannel(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/getAllChannel', JSON.stringify(data), httpOptions)


  }
  getAllChannelNew(data: any){
    return this.http.post(this.API_ROOT + '/kpimap/getAllChannelNew', JSON.stringify(data), httpOptions)

  }

  getParamSeqData(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/getParamSeqData', JSON.stringify(data), httpOptions);
  }

  editParamSeq(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/editParamSeq', JSON.stringify(data), httpOptions);
  }


  getVerticals(data:any):any {
    return this.http.post(this.API_ROOT + '/master/getVerticals', JSON.stringify(data), httpOptions)

  }
  getAllRuleData(data:any):any {
    return this.http.post(this.API_ROOT + '/master/getAllRuleData', JSON.stringify(data), httpOptions)

  }
  getallkpi(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/getallkpi', JSON.stringify(data), httpOptions)
  }
  kpimappingDownload(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/kpimappingDownload', JSON.stringify(data), httpOptions)
  }
  getFileDetailsData(data: any) {
    return this.http.post(this.API_ROOT + '/kpimap/getFileDetailsData', JSON.stringify(data), httpOptions)

  }
  generateKpiScore(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/generatekpiScore', JSON.stringify(data), httpOptions)

  }
  approveRejectFile(data: any) {
    return this.http.post(this.API_ROOT + '/audit/approveRejectFile', JSON.stringify(data), httpOptions)

  }
  downloadFileDetailsData(data: any) {
    return this.http.post(this.API_ROOT + '/audit/downloadFileDetailsData', JSON.stringify(data), httpOptions)

  }

  getAuditList(data: any) {
    return this.http.post(this.API_ROOT + '/audit/getAuditList', JSON.stringify(data), httpOptions)
  }
  getFileTypeList(data: any) {
    return this.http.post(this.API_ROOT + '/audit/getFileTypeList', JSON.stringify(data), httpOptions)
  }

  empwise_getkpiScore(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/empwise_getkpiScore', JSON.stringify(data), httpOptions)
  }

  mapEmployeeCode(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/mapping_hom_sdm_SQL', JSON.stringify(data), httpOptions)


  }
  maping_check_bounce_sql(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/maping_check_bounce_sql', JSON.stringify(data), httpOptions)


  }
  maping_receivable_pending_sql(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/maping_receivable_pending_sql', JSON.stringify(data), httpOptions)


  }
  getChannelDetails(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/getChannelDetails', JSON.stringify(data), httpOptions)


  }
  downloadScore(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/download_kpi_score_details', JSON.stringify(data), httpOptions)
  }
  sendMail(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/sendMail_kpi_score_details', JSON.stringify(data), httpOptions)
  }



  remove_mapped_menu(data: any): any {

    return this.http.post(this.API_ROOT + '/users/remove_mapped_menu', JSON.stringify(data), httpOptions);

  }


  




  template_upload(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/createModule', data);
  }
  viewFilter(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/viewFilter', data);
  }

  addFilter(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/addFilter', data);
  }
  getColumn(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/getColumn', data);
  }
  get_validation() {
    return this.http.get(this.API_ROOT + '/moduleCreation/getValidation');
  }
  getParamList(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/getParamList', data);
  }

  getTableName() {
    return this.http.get(this.API_ROOT + '/moduleCreation/getTableName');
  }

  getColumnTable(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/getColumnTable', data);
  }

  addColValidation(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/addColValidation', data);
  }
  // getModule() {
  //   return this.http.get(this.API_ROOT + '/moduleCreation/getModule');
  // }
  // getModule(data: any) {
  //   return this.http.post(this.API_ROOT + '/moduleCreation/getModule', JSON.stringify(data), httpOptions);
  // }
  getModule(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/getModule', JSON.stringify(data), httpOptions);
  }

  addNewCol(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/addNewCol', data);
  }

  updateColMapping(data: any) {
    return this.http.post(this.API_ROOT + '/moduleCreation/updateColMapping', data);
  }

  uploadFile(data: any) { return this.http.post(this.API_ROOT + '/upload/uploadFile', data); }

  fetchAllTableData(data: any): any {
    return this.http.post(this.API_ROOT + '/upload/fetchAllTableData', JSON.stringify(data), httpOptions);
  }
  uploadForAllToDB(data: any) {
    return this.http.post(this.API_ROOT + '/upload/uploadForAllToDB', data);
  }
  getModuleData(data: any): any {
    return this.http.post(this.API_ROOT + '/upload/getModuleData', JSON.stringify(data), httpOptions);
  }
  getChannelList() {
    return this.http.get(this.API_ROOT + '/schedule/getChannelList', httpOptions);
  }
  getFiltypelList() {
    return this.http.get(this.API_ROOT + '/schedule/getFiltypelList', httpOptions);
  }
  get_user_details() {
    return this.http.get(this.API_ROOT + '/schedule/get_user_details', httpOptions);
  }
  getScheduleDetails() {
    return this.http.get(this.API_ROOT + '/schedule/getScheduleDetails', httpOptions);
  }
  insert_schedulerFilelog_details(data: any) {
    return this.http.post(this.API_ROOT + '/schedule/insert_schedulerFilelog_details', JSON.stringify(data), httpOptions);
  }
  deleteScheduler(data: any) {
    return this.http.post(this.API_ROOT + '/schedule/deleteScheduler', JSON.stringify(data), httpOptions);
  }
  editScheduler(data: any) {
    return this.http.post(this.API_ROOT + '/schedule/editScheduler', JSON.stringify(data), httpOptions);
  }
  getScheduleOne(data: any) {
    return this.http.post(this.API_ROOT + '/schedule/getScheduleOne', JSON.stringify(data), httpOptions);
  }
  branchUpload(data: any) {
    return this.http.post(this.API_ROOT + '/master/branchUpload', data);
  }
  getBranchDetails() {
    return this.http.get(this.API_ROOT + '/master/getBranchDetails');
  }
  getState() {
    return this.http.get(this.API_ROOT + '/master/getState');
  }
  employeeUpload(data: any) {
    return this.http.post(this.API_ROOT + '/master/employeeUpload', data);
  }
  addBranchDetails(data: any) {
    return this.http.post(this.API_ROOT + '/master/addBranchDetails', JSON.stringify(data), httpOptions);
  }
  deleteBranchData(data: any) {
    return this.http.post(this.API_ROOT + '/master/deleteBranchData', JSON.stringify(data), httpOptions);
  }
  editBranchData(data: any) {
    return this.http.post(this.API_ROOT + '/master/editBranchData', JSON.stringify(data), httpOptions);
  }
  getColumnName(data: any) {
    return this.http.post(this.API_ROOT + '/master/getColumnName', JSON.stringify(data), httpOptions);
  }
  genericFilter(data: any) {
    return this.http.post(this.API_ROOT + '/master/genericFilter', JSON.stringify(data), httpOptions);
  }
  viewMappedKpi(data: any) { // for mapped kpi page
    return this.http.post(this.API_ROOT + '/kpi/viewMappedKpi', JSON.stringify(data), httpOptions);
  }
  editEmployeeMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/editEmployeeMaster', JSON.stringify(data), httpOptions);
  }
  editProductData(data: any) {
    return this.http.post(this.API_ROOT + '/master/editProductData', JSON.stringify(data), httpOptions);
  }
  
  uploadProductMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/uploadProductMaster', data);
  }
  uploadProducerMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/uploadProducerMaster', data);
  }
  getFilterModuleMaster() {
    return this.http.get(this.API_ROOT + '/master/getFilterModuleMaster');
  }
  addProductMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/addProductMaster', JSON.stringify(data), httpOptions);
  }
  addProducerMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/addProducerMaster', JSON.stringify(data), httpOptions);
  }
  editProducerMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/editProducerMaster', JSON.stringify(data), httpOptions);
  }
  genericDelete(data: any) {
    return this.http.post(this.API_ROOT + '/master/genericDelete', JSON.stringify(data), httpOptions);
  }

  getDistinctProductCategory() {
    return this.http.get(this.API_ROOT + '/master/getDistinctProductCategory');
  }
  getBranch() {
    return this.http.get(this.API_ROOT + '/master/getDistinctBranch');
  }
  getDesignation() {
    return this.http.get(this.API_ROOT + '/master/getDistinctDesignation');
  }
  addEmployeeMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/addEmployeeMaster', JSON.stringify(data), httpOptions);
  }
  editBancaMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/editBancaMaster', JSON.stringify(data), httpOptions);
  }
  addBancaMaster(data: any) {
    return this.http.post(this.API_ROOT + '/master/addBancaMaster', JSON.stringify(data), httpOptions);
  }

  uploadBancaMaster(data: any) { 
    return this.http.post(this.API_ROOT + '/master/uploadBancaMaster', data); }

  uploadDesignationMaster(data: any) {
       return this.http.post(this.API_ROOT + '/master/uploadDesignationMaster', data); }
       
  editDesignationMaster(data: any) {
         return this.http.post(this.API_ROOT + '/master/editDesignationMaster', JSON.stringify(data), httpOptions); }
         
  addDesignationMaster(data: any) { return this.http.post(this.API_ROOT + '/master/addDesignationMaster', JSON.stringify(data), httpOptions); }

  getKpiRowById(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getKpiRowById', JSON.stringify(data), httpOptions); }


  getTemplateModuleMaster(data: any) {
     return this.http.post(this.API_ROOT + '/master/getTemplateModuleMaster',JSON.stringify(data), httpOptions);}

  uploadMapperMaster(data: any) {
     return this.http.post(this.API_ROOT + '/master/uploadMapperMaster', data); }
  
  editMapperMaster(data: any) { return this.http.post(this.API_ROOT + '/master/editMapperMaster', JSON.stringify(data), httpOptions); }
     
  addMapperMaster(data: any) { return this.http.post(this.API_ROOT + '/master/addMapperMaster', JSON.stringify(data), httpOptions); }


  // editFileRowData(data: any) {
    //  return this.http.post(this.API_ROOT + '/audit/editDeleteFileRowData', data);
    //  }
  editDeleteFileRowData(data: any) {
     return this.http.post(this.API_ROOT + '/audit/editDeleteFileRowData', data);
     }


  mappingCall(data: any) {
     return this.http.post(this.API_ROOT + '/master/mappingCall', data);}

  uploadPSU_Heath_GI_Map(data: any) { return this.http.post(this.API_ROOT + '/master/uploadPSU_Heath_GI_Map', data); }

  showPSU_Heath_GI_Map() { return this.http.get(this.API_ROOT + '/master/showPSU_Heath_GI_Map'); }

  editPSU_Heath_GI_Map(data: any) { return this.http.post(this.API_ROOT + '/master/editPSU_Heath_GI_Map', data); }

  mapfiledata(data: any) { //not correct and not completed  
    return this.http.post(this.API_ROOT + '/master/genericMappingFileData', data);}

    
getChannelWiseDesignation(data: any) { 
  return this.http.post(this.API_ROOT + '/master/getChannelWiseDesignation', data);}

getChannelWiseKpiParamList(data:any){
  return this.http.post(this.API_ROOT + '/kpimap/getChannelWiseKpiParamList', data);}



downloadTargetAchievement(data: any) {
  return this.http.post(this.API_ROOT + '/kpi/downloadTragetVsAchievement', JSON.stringify(data), httpOptions);}


channelWiseFileDetails(data: any) { 
return this.http.post(this.API_ROOT + '/kpi/channelWiseFileDetails', data);}

deleteTask(data: any) { 
  return this.http.post(this.API_ROOT + '/audit/deleteTask', data);}

  
channelWiseMappingDetails(data: any) { return this.http.post(this.API_ROOT + '/master/channelWiseMappingDetails', data);}
fileTypeWiseModulleDetails(data: any) { return this.http.post(this.API_ROOT + '/master/fileTypeWiseModulleDetails', data);}
allKpiRuleCopy(data: any) { return this.http.post(this.API_ROOT + '/kpimap/allKpiRuleCopy', data);}
selectiveKpiRuleCopy(data: any) { return this.http.post(this.API_ROOT + '/kpimap/selectiveKpiRuleCopy', data);}
getDistParameterList(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getDistParameterList', data);}
channelWiseModule(data: any) { return this.http.post(this.API_ROOT + '/kpi/channelWiseModule', data);}

fetchUserManualName(data: any) { 
  return this.http.post(this.API_ROOT + '/kpimap/fetchUserManualName', data);}

channelWiseMappingModule(data: any) { 
  return this.http.post(this.API_ROOT + '/kpimap/channelWiseMappingModule', data);}


get_downloadMappedData_fileType(data: any) { 
  return this.http.post(this.API_ROOT + '/kpimap/get_downloadMappedData_fileType', data);}

get_downloadMappedData_verticalValue(data: any) { 
  return this.http.post(this.API_ROOT + '/kpimap/get_downloadMappedData_verticalValue', data);}

getMappedData(data: any) { 
  return this.http.post(this.API_ROOT + '/kpimap/getMappedData', data);}










  
}

