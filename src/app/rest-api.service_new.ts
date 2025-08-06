import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  //----------------------------------------------------------------tataaig---------------------------------------------
  // API_ROOT = 'http://10.33.195.171:5000';
  // tata aig new redhat server
  // API_ROOT = 'http://10.35.12.201:5000';

  API_ROOT = 'http://192.168.1.7:5020';
  file_path = this.API_ROOT + '/static';

  constructor(private http: HttpClient, private common: CommonService) {}

  // Header with user id for all APIs except login
  private getHttpOptions() {
    // const userId = this.common.getUserId();
    const userId = 12345;
    const headers: any = { 'Content-Type': 'application/json' };
    if (userId) {
      headers['kpi_user_id'] = userId;
    }
    return { headers: new HttpHeaders(headers) };
  }

  private attachHeaders(data?: any) {
    return data ? JSON.stringify(data) : undefined;
  }

  // LOGIN API (NO USER ID HEADER)
  login(data: any) {
    return this.http.post(
      this.API_ROOT + '/users/login',
      this.attachHeaders(data),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
  

  // USER & MENU MANAGEMENT
  get_menu_list() { return this.http.get(this.API_ROOT + '/users/menu_list', this.getHttpOptions()); }
  deleteMenu(data: any) { return this.http.post(this.API_ROOT + '/users/deleteMenu', JSON.stringify(data), this.getHttpOptions()); }
  deletesubMenu(data: any) { return this.http.post(this.API_ROOT + '/users/deletesubMenu', JSON.stringify(data), this.getHttpOptions()); }
  addMenu(data: any) { return this.http.post(this.API_ROOT + '/users/addMenu', JSON.stringify(data), this.getHttpOptions()); }
  addsubMenu(data: any) { return this.http.post(this.API_ROOT + '/users/addsubMenu', JSON.stringify(data), this.getHttpOptions()); }
  show_menu_data(data: any) { return this.http.post(this.API_ROOT + '/users/access_right1', JSON.stringify(data), this.getHttpOptions()); }
  get_sub_menu_list(data: any) { return this.http.post(this.API_ROOT + '/users/sub_menu_list', JSON.stringify(data), this.getHttpOptions()); }
  menu_mapping_user_name_landingPage() { return this.http.get(this.API_ROOT + '/users/menu_mapping_user_name_landingPage', this.getHttpOptions()); }
  menu_mapping_user_name_search(data: any) { return this.http.post(this.API_ROOT + '/users/menu_mapping_user_name_search', JSON.stringify(data), this.getHttpOptions()); }
  create_user_menu_mapping(data: any) { return this.http.post(this.API_ROOT + '/users/create_user_menu_mapping', JSON.stringify(data), this.getHttpOptions()); }
  update_access(data: any) { return this.http.post(this.API_ROOT + '/users/update_access', JSON.stringify(data), this.getHttpOptions()); }
  update_view(data: any) { return this.http.post(this.API_ROOT + '/users/update_view', JSON.stringify(data), this.getHttpOptions()); }
  update_insert(data: any) { return this.http.post(this.API_ROOT + '/users/update_insert', JSON.stringify(data), this.getHttpOptions()); }
  update_modify(data: any) { return this.http.post(this.API_ROOT + '/users/update_modify', JSON.stringify(data), this.getHttpOptions()); }
  update_delete(data: any) { return this.http.post(this.API_ROOT + '/users/update_delete', JSON.stringify(data), this.getHttpOptions()); }
  remove_mapped_menu(data: any) { return this.http.post(this.API_ROOT + '/users/remove_mapped_menu', JSON.stringify(data), this.getHttpOptions()); }

  // SEARCH & REPORT
  getFields() { return this.http.get(this.API_ROOT + '/search/getFields', this.getHttpOptions()); }
  singleSearch(data: any) { return this.http.post(this.API_ROOT + '/search/singleSearch', JSON.stringify(data), this.getHttpOptions()); }
  singleSearchDownload(data: any) { return this.http.post(this.API_ROOT + '/search/singleSearchDownload', JSON.stringify(data), this.getHttpOptions()); }
  uploadBulkFile(data: any) { return this.http.post(this.API_ROOT + '/search/uploadBulkFile', data, this.getHttpOptions()); }
  bulkSearch(data: any) { return this.http.post(this.API_ROOT + '/search/bulkSearch', JSON.stringify(data), this.getHttpOptions()); }
  bulkSearchDownload(data: any) { return this.http.post(this.API_ROOT + '/search/bulkSearchDownload', JSON.stringify(data), this.getHttpOptions()); }
  getFieldsData(data: any) { return this.http.post(this.API_ROOT + '/report/getFileds', JSON.stringify(data), this.getHttpOptions()); }
  uploadBulkFile_v2(data: any) { return this.http.post(this.API_ROOT + '/report/uploadBulkFile', data, this.getHttpOptions()); }
  search(data: any) { return this.http.post(this.API_ROOT + '/report/search', data, this.getHttpOptions()); }
  search_v2(data: any) { return this.http.post(this.API_ROOT + '/report/search_v2', data, this.getHttpOptions()); }

  // KPI MAP & MAIL
  addChannelWiseMail(data: any) { return this.http.post(this.API_ROOT + '/kpimap/addChannelWiseMail', JSON.stringify(data), this.getHttpOptions()); }
  viewChannelWiseMail(data: any) { return this.http.post(this.API_ROOT + '/kpimap/viewChannelWiseMail', JSON.stringify(data), this.getHttpOptions()); }
  editChannelWiseMail(data: any) { return this.http.post(this.API_ROOT + '/kpimap/editChannelWiseMail', JSON.stringify(data), this.getHttpOptions()); }

  // USER MANAGEMENT
  userList(data: any) { return this.http.post(this.API_ROOT + '/users/getUserDetails', JSON.stringify(data), this.getHttpOptions()); }
  userInsert(data: any) { return this.http.post(this.API_ROOT + '/users/addUser', JSON.stringify(data), this.getHttpOptions()); }
  userUpdate(data: any) { return this.http.post(this.API_ROOT + '/users/updateUser', JSON.stringify(data), this.getHttpOptions()); }
  userDelete(data: any) { return this.http.post(this.API_ROOT + '/users/deleteUser', JSON.stringify(data), this.getHttpOptions()); }

  // DEPARTMENT
  department_fetch(data: any) { return this.http.post(this.API_ROOT + '/department/fetch', JSON.stringify(data), this.getHttpOptions()); }

  // AUDIT
  createNewBatch() { return this.http.get(this.API_ROOT + '/audit/createNewBatch', this.getHttpOptions()); }
  resetTask(data: any) { return this.http.post(this.API_ROOT + '/audit/resetTask', data, this.getHttpOptions()); }
  truncateAll(data: any) { return this.http.post(this.API_ROOT + '/audit/truncateAll', data, this.getHttpOptions()); }
  getAllTask(data: any) { return this.http.post(this.API_ROOT + '/audit/getAllTask', data, this.getHttpOptions()); }
  addTask(data: any) { return this.http.post(this.API_ROOT + '/audit/addTask', data, this.getHttpOptions()); }
  monthYearChangeForNullMonthYear(data: any) { return this.http.post(this.API_ROOT + '/audit/monthYearChangeForNullMonthYear', data, this.getHttpOptions()); }
  sendDeleteReq(data: any) { return this.http.post(this.API_ROOT + '/audit/sendDeleteReq', data, this.getHttpOptions()); }
  checkFileExist_status(data: any) { return this.http.post(this.API_ROOT + '/audit/checkFileExist_status', data, this.getHttpOptions()); }
  getPendingReq(data: any) { return this.http.post(this.API_ROOT + '/audit/getPendingReq', data, this.getHttpOptions()); }
  getAllDelReq(data: any) { return this.http.post(this.API_ROOT + '/audit/getAllDelReq', data, this.getHttpOptions()); }
  approverejectReq(data: any) { return this.http.post(this.API_ROOT + '/audit/approverejectReq', data, this.getHttpOptions()); }
  addMonthWiseControlPanel(data: any) { return this.http.post(this.API_ROOT + '/audit/addMonthWiseControlPanel', data, this.getHttpOptions()); }
  approveRejectFile(data: any) { return this.http.post(this.API_ROOT + '/audit/approveRejectFile', JSON.stringify(data), this.getHttpOptions()); }
  downloadFileDetailsData(data: any) { return this.http.post(this.API_ROOT + '/audit/downloadFileDetailsData', JSON.stringify(data), this.getHttpOptions()); }
  getAuditList(data: any) { return this.http.post(this.API_ROOT + '/audit/getAuditList', JSON.stringify(data), this.getHttpOptions()); }
  getFileTypeList(data: any) { return this.http.post(this.API_ROOT + '/audit/getFileTypeList', JSON.stringify(data), this.getHttpOptions()); }
  editDeleteFileRowData(data: any) { return this.http.post(this.API_ROOT + '/audit/editDeleteFileRowData', data, this.getHttpOptions()); }
  deleteTask(data: any) { return this.http.post(this.API_ROOT + '/audit/deleteTask', data, this.getHttpOptions()); }

  // KPI UPLOADS & FETCH
  sales_target(data: any) { return this.http.post(this.API_ROOT + '/kpi/upload_target_to_DB', data, this.getHttpOptions()); }
  sdm(data: any) { return this.http.post(this.API_ROOT + '/kpi/upload_SDM_to_DB', data, this.getHttpOptions()); }
  check_bounce(data: any) { return this.http.post(this.API_ROOT + '/kpi/upload_check_bounce_to_DB', data, this.getHttpOptions()); }
  mapping_hom(data: any) { return this.http.post(this.API_ROOT + '/kpi/upload_mapping_mst_hom_producer_to_DB', data, this.getHttpOptions()); }
  bankassurance(data: any) { return this.http.post(this.API_ROOT + '/kpi/upload_banca_universal_to_DB', data, this.getHttpOptions()); }
  receivable_pending(data: any) { return this.http.post(this.API_ROOT + '/kpi/upload_receivable_pending_to_DB', data, this.getHttpOptions()); }
  sales_target_fetch(data: any) { return this.http.post(this.API_ROOT + '/kpi/getSalesTarget', JSON.stringify(data), this.getHttpOptions()); }
  sdm_fetch(data: any) { return this.http.post(this.API_ROOT + '/kpi/getSdm', JSON.stringify(data), this.getHttpOptions()); }
  bankassur_fetch(data: any) { return this.http.post(this.API_ROOT + '/kpi/getBankAssur', JSON.stringify(data), this.getHttpOptions()); }
  mappingmst_fetch(data: any) { return this.http.post(this.API_ROOT + '/kpi/getMappingMst', JSON.stringify(data), this.getHttpOptions()); }
  cheqbounce_fetch(data: any) { return this.http.post(this.API_ROOT + '/kpi/getCheqBounce', JSON.stringify(data), this.getHttpOptions()); }
  resvmst_fetch(data: any) { return this.http.post(this.API_ROOT + '/kpi/getResvMst', JSON.stringify(data), this.getHttpOptions()); }
  checkSchedulerFileUpload(data: any) { return this.http.post(this.API_ROOT + '/kpi/checkSchedulerFileUpload', JSON.stringify(data), this.getHttpOptions()); }
  getkpiScore(data: any) { return this.http.post(this.API_ROOT + '/kpi/getkpiScore', JSON.stringify(data), this.getHttpOptions()); }
  generateKpiScore(data: any) { return this.http.post(this.API_ROOT + '/kpi/generatekpiScore', JSON.stringify(data), this.getHttpOptions()); }
  checkScoringConfig(data: any) { return this.http.post(this.API_ROOT + '/kpi/checkScoringConfig', JSON.stringify(data), this.getHttpOptions()); }
  generatekpiScore_new(data: any) { return this.http.post(this.API_ROOT + '/kpi/generatekpiScore_new', JSON.stringify(data), this.getHttpOptions()); }
  empwise_getkpiScore(data: any) { return this.http.post(this.API_ROOT + '/kpi/empwise_getkpiScore', JSON.stringify(data), this.getHttpOptions()); }
  downloadScore(data: any) { return this.http.post(this.API_ROOT + '/kpi/download_kpi_score_details', JSON.stringify(data), this.getHttpOptions()); }
  sendMail(data: any) { return this.http.post(this.API_ROOT + '/kpi/sendMail_kpi_score_details', JSON.stringify(data), this.getHttpOptions()); }
  downloadTargetAchievement(data: any) { return this.http.post(this.API_ROOT + '/kpi/downloadTragetVsAchievement', JSON.stringify(data), this.getHttpOptions()); }
  channelWiseFileDetails(data: any) { return this.http.post(this.API_ROOT + '/kpi/channelWiseFileDetails', data, this.getHttpOptions()); }
  channelWiseModule(data: any) { return this.http.post(this.API_ROOT + '/kpi/channelWiseModule', data, this.getHttpOptions()); }

  // KPI MAP DETAILS
  insertheader(data: any) { return this.http.post(this.API_ROOT + '/kpimap/insertheader', JSON.stringify(data), this.getHttpOptions()); }
  insertdetails(data: any) { return this.http.post(this.API_ROOT + '/kpimap/insertdetails', JSON.stringify(data), this.getHttpOptions()); }
  getdetailsdata(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getdetailsdata', JSON.stringify(data), this.getHttpOptions()); }
  getheaderdata() { return this.http.get(this.API_ROOT + '/kpimap/getheaderdata', this.getHttpOptions()); }
  getmaximum(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getmaximum', JSON.stringify(data), this.getHttpOptions()); }
  insertmapkpi(data: any) { return this.http.post(this.API_ROOT + '/kpimap/insertmapkpi', JSON.stringify(data), this.getHttpOptions()); }
  editdeleteheader(data: any) { return this.http.post(this.API_ROOT + '/kpimap/editdeleteheader', JSON.stringify(data), this.getHttpOptions()); }
  editdeletedetails(data: any) { return this.http.post(this.API_ROOT + '/kpimap/editdeletedetails', JSON.stringify(data), this.getHttpOptions()); }
  editdeletekpi(data: any) { return this.http.post(this.API_ROOT + '/kpimap/editdeletekpi', JSON.stringify(data), this.getHttpOptions()); }
  getallDetails() { return this.http.get(this.API_ROOT + '/kpimap/getallDetails', this.getHttpOptions()); }
  getSchedulerdetails() { return this.http.get(this.API_ROOT + '/kpimap/getSchedulerdetails', this.getHttpOptions()); }
  resetScheduler(data: any) { return this.http.post(this.API_ROOT + '/kpimap/resetScheduler', JSON.stringify(data), this.getHttpOptions()); }
  getEmployeeDetails(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getEmployeeDetails', JSON.stringify(data), this.getHttpOptions()); }
  getAllRole() { return this.http.get(this.API_ROOT + '/kpimap/getAllRole', this.getHttpOptions()); }
  getAllBand() { return this.http.get(this.API_ROOT + '/kpimap/getAllBand', this.getHttpOptions()); }
  addBand(data: any) { return this.http.post(this.API_ROOT + '/kpimap/addBand', JSON.stringify(data), this.getHttpOptions()); }
  getAllChannel(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getAllChannel', JSON.stringify(data), this.getHttpOptions()); }
  getAllChannelNew(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getAllChannelNew', JSON.stringify(data), this.getHttpOptions()); }
  getParamSeqData(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getParamSeqData', JSON.stringify(data), this.getHttpOptions()); }
  editParamSeq(data: any) { return this.http.post(this.API_ROOT + '/kpimap/editParamSeq', JSON.stringify(data), this.getHttpOptions()); }
  getallkpi(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getallkpi', JSON.stringify(data), this.getHttpOptions()); }
  kpimappingDownload(data: any) { return this.http.post(this.API_ROOT + '/kpimap/kpimappingDownload', JSON.stringify(data), this.getHttpOptions()); }
  getFileDetailsData(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getFileDetailsData', JSON.stringify(data), this.getHttpOptions()); }
  getKpiRowById(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getKpiRowById', JSON.stringify(data), this.getHttpOptions()); }
  viewMappedKpi(data: any) { return this.http.post(this.API_ROOT + '/kpi/viewMappedKpi', JSON.stringify(data), this.getHttpOptions()); }
  getChannelWiseKpiParamList(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getChannelWiseKpiParamList', data, this.getHttpOptions()); }
  get_downloadMappedData_fileType(data: any) { return this.http.post(this.API_ROOT + '/kpimap/get_downloadMappedData_fileType', data, this.getHttpOptions()); }
  get_downloadMappedData_verticalValue(data: any) { return this.http.post(this.API_ROOT + '/kpimap/get_downloadMappedData_verticalValue', data, this.getHttpOptions()); }
  getMappedData(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getMappedData', data, this.getHttpOptions()); }
  fetchUserManualName(data: any) { return this.http.post(this.API_ROOT + '/kpimap/fetchUserManualName', data, this.getHttpOptions()); }
  channelWiseMappingModule(data: any) { return this.http.post(this.API_ROOT + '/kpimap/channelWiseMappingModule', data, this.getHttpOptions()); }
  allKpiRuleCopy(data: any) { return this.http.post(this.API_ROOT + '/kpimap/allKpiRuleCopy', data, this.getHttpOptions()); }
  selectiveKpiRuleCopy(data: any) { return this.http.post(this.API_ROOT + '/kpimap/selectiveKpiRuleCopy', data, this.getHttpOptions()); }
  getDistParameterList(data: any) { return this.http.post(this.API_ROOT + '/kpimap/getDistParameterList', data, this.getHttpOptions()); }
  maping_check_bounce_sql(data: any) {return this.http.post(this.API_ROOT + '/kpi/maping_check_bounce_sql', data, this.getHttpOptions()); }
  maping_receivable_pending_sql(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/maping_receivable_pending_sql',  data, this.getHttpOptions())


  }
  getChannelDetails(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/getChannelDetails',  data, this.getHttpOptions())


  }
  mapEmployeeCode(data: any) {
    return this.http.post(this.API_ROOT + '/kpi/mapping_hom_sdm_SQL',  data, this.getHttpOptions())


  }

  // MASTER DATA
  getVerticals(data: any) { return this.http.post(this.API_ROOT + '/master/getVerticals', JSON.stringify(data), this.getHttpOptions()); }
  getAllRuleData(data: any) { return this.http.post(this.API_ROOT + '/master/getAllRuleData', JSON.stringify(data), this.getHttpOptions()); }
  branchUpload(data: any) { return this.http.post(this.API_ROOT + '/master/branchUpload', data, this.getHttpOptions()); }
  getBranchDetails() { return this.http.get(this.API_ROOT + '/master/getBranchDetails', this.getHttpOptions()); }
  getState() { return this.http.get(this.API_ROOT + '/master/getState', this.getHttpOptions()); }
  employeeUpload(data: any) { return this.http.post(this.API_ROOT + '/master/employeeUpload', data, this.getHttpOptions()); }
  addBranchDetails(data: any) { return this.http.post(this.API_ROOT + '/master/addBranchDetails', JSON.stringify(data), this.getHttpOptions()); }
  deleteBranchData(data: any) { return this.http.post(this.API_ROOT + '/master/deleteBranchData', JSON.stringify(data), this.getHttpOptions()); }
  editBranchData(data: any) { return this.http.post(this.API_ROOT + '/master/editBranchData', JSON.stringify(data), this.getHttpOptions()); }
  getColumnName(data: any) { return this.http.post(this.API_ROOT + '/master/getColumnName', JSON.stringify(data), this.getHttpOptions()); }
  genericFilter(data: any) { return this.http.post(this.API_ROOT + '/master/genericFilter', JSON.stringify(data), this.getHttpOptions()); }
  editEmployeeMaster(data: any) { return this.http.post(this.API_ROOT + '/master/editEmployeeMaster', JSON.stringify(data), this.getHttpOptions()); }
  editProductData(data: any) { return this.http.post(this.API_ROOT + '/master/editProductData', JSON.stringify(data), this.getHttpOptions()); }
  uploadProductMaster(data: any) { return this.http.post(this.API_ROOT + '/master/uploadProductMaster', data, this.getHttpOptions()); }
  uploadProducerMaster(data: any) { return this.http.post(this.API_ROOT + '/master/uploadProducerMaster', data, this.getHttpOptions()); }
  getFilterModuleMaster() { return this.http.get(this.API_ROOT + '/master/getFilterModuleMaster', this.getHttpOptions()); }
  addProductMaster(data: any) { return this.http.post(this.API_ROOT + '/master/addProductMaster', JSON.stringify(data), this.getHttpOptions()); }
  addProducerMaster(data: any) { return this.http.post(this.API_ROOT + '/master/addProducerMaster', JSON.stringify(data), this.getHttpOptions()); }
  editProducerMaster(data: any) { return this.http.post(this.API_ROOT + '/master/editProducerMaster', JSON.stringify(data), this.getHttpOptions()); }
  genericDelete(data: any) { return this.http.post(this.API_ROOT + '/master/genericDelete', JSON.stringify(data), this.getHttpOptions()); }
  getDistinctProductCategory() { return this.http.get(this.API_ROOT + '/master/getDistinctProductCategory', this.getHttpOptions()); }
  getBranch() { return this.http.get(this.API_ROOT + '/master/getDistinctBranch', this.getHttpOptions()); }
  getDesignation() { return this.http.get(this.API_ROOT + '/master/getDistinctDesignation', this.getHttpOptions()); }
  addEmployeeMaster(data: any) { return this.http.post(this.API_ROOT + '/master/addEmployeeMaster', JSON.stringify(data), this.getHttpOptions()); }
  editBancaMaster(data: any) { return this.http.post(this.API_ROOT + '/master/editBancaMaster', JSON.stringify(data), this.getHttpOptions()); }
  addBancaMaster(data: any) { return this.http.post(this.API_ROOT + '/master/addBancaMaster', JSON.stringify(data), this.getHttpOptions()); }
  uploadBancaMaster(data: any) { return this.http.post(this.API_ROOT + '/master/uploadBancaMaster', data, this.getHttpOptions()); }
  uploadDesignationMaster(data: any) { return this.http.post(this.API_ROOT + '/master/uploadDesignationMaster', data, this.getHttpOptions()); }
  editDesignationMaster(data: any) { return this.http.post(this.API_ROOT + '/master/editDesignationMaster', JSON.stringify(data), this.getHttpOptions()); }
  addDesignationMaster(data: any) { return this.http.post(this.API_ROOT + '/master/addDesignationMaster', JSON.stringify(data), this.getHttpOptions()); }
  getTemplateModuleMaster(data: any) { return this.http.post(this.API_ROOT + '/master/getTemplateModuleMaster', JSON.stringify(data), this.getHttpOptions()); }
  uploadMapperMaster(data: any) { return this.http.post(this.API_ROOT + '/master/uploadMapperMaster', data, this.getHttpOptions()); }
  editMapperMaster(data: any) { return this.http.post(this.API_ROOT + '/master/editMapperMaster', JSON.stringify(data), this.getHttpOptions()); }
  addMapperMaster(data: any) { return this.http.post(this.API_ROOT + '/master/addMapperMaster', JSON.stringify(data), this.getHttpOptions()); }
  mappingCall(data: any) { return this.http.post(this.API_ROOT + '/master/mappingCall', data, this.getHttpOptions()); }
  mappingCallAll(data: any) { return this.http.post(this.API_ROOT + '/master/mappingCallAll', data, this.getHttpOptions()); }
  uploadPSU_Heath_GI_Map(data: any) { return this.http.post(this.API_ROOT + '/master/uploadPSU_Heath_GI_Map', data, this.getHttpOptions()); }
  showPSU_Heath_GI_Map() { return this.http.get(this.API_ROOT + '/master/showPSU_Heath_GI_Map', this.getHttpOptions()); }
  editPSU_Heath_GI_Map(data: any) { return this.http.post(this.API_ROOT + '/master/editPSU_Heath_GI_Map', data, this.getHttpOptions()); }
  mapfiledata(data: any) { return this.http.post(this.API_ROOT + '/master/genericMappingFileData', data, this.getHttpOptions()); }
  getChannelWiseDesignation(data: any) { return this.http.post(this.API_ROOT + '/master/getChannelWiseDesignation', data, this.getHttpOptions()); }
  channelWiseMappingDetails(data: any) { return this.http.post(this.API_ROOT + '/master/channelWiseMappingDetails', data, this.getHttpOptions()); }
  fileTypeWiseModulleDetails(data: any) { return this.http.post(this.API_ROOT + '/master/fileTypeWiseModulleDetails', data, this.getHttpOptions()); }

  // MODULE CREATION
  template_upload(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/createModule', data, this.getHttpOptions()); }
  viewFilter(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/viewFilter', data, this.getHttpOptions()); }
  addFilter(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/addFilter', data, this.getHttpOptions()); }
  getColumn(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/getColumn', data, this.getHttpOptions()); }
  get_validation() { return this.http.get(this.API_ROOT + '/moduleCreation/getValidation', this.getHttpOptions()); }
  getParamList(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/getParamList', data, this.getHttpOptions()); }
  getTableName() { return this.http.get(this.API_ROOT + '/moduleCreation/getTableName', this.getHttpOptions()); }
  getColumnTable(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/getColumnTable', data, this.getHttpOptions()); }
  addColValidation(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/addColValidation', data, this.getHttpOptions()); }
  getModule(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/getModule', JSON.stringify(data), this.getHttpOptions()); }
  addNewCol(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/addNewCol', data, this.getHttpOptions()); }
  updateColMapping(data: any) { return this.http.post(this.API_ROOT + '/moduleCreation/updateColMapping', data, this.getHttpOptions()); }

  // FILE UPLOADS & DATA
  uploadFile(data: any) {
    const userId = this.common.getUserId();
    let headers = new HttpHeaders();
    if (userId) {
      headers = headers.set('kpi_user_id', userId);
    }
    return this.http.post(this.API_ROOT + '/upload/uploadFile', data, { headers });
  }
  fetchAllTableData(data: any) { return this.http.post(this.API_ROOT + '/upload/fetchAllTableData', JSON.stringify(data), this.getHttpOptions()); }
  uploadForAllToDB(data: any) { return this.http.post(this.API_ROOT + '/upload/uploadForAllToDB', data, this.getHttpOptions()); }
  getModuleData(data: any) { return this.http.post(this.API_ROOT + '/upload/getModuleData', JSON.stringify(data), this.getHttpOptions()); }

  // SCHEDULER
  getChannelList() { return this.http.get(this.API_ROOT + '/schedule/getChannelList', this.getHttpOptions()); }
  getFiltypelList() { return this.http.get(this.API_ROOT + '/schedule/getFiltypelList', this.getHttpOptions()); }
  get_user_details() { return this.http.get(this.API_ROOT + '/schedule/get_user_details', this.getHttpOptions()); }
  getScheduleDetails() { return this.http.get(this.API_ROOT + '/schedule/getScheduleDetails', this.getHttpOptions()); }
  insert_schedulerFilelog_details(data: any) { return this.http.post(this.API_ROOT + '/schedule/insert_schedulerFilelog_details', JSON.stringify(data), this.getHttpOptions()); }
  deleteScheduler(data: any) { return this.http.post(this.API_ROOT + '/schedule/deleteScheduler', JSON.stringify(data), this.getHttpOptions()); }
  editScheduler(data: any) { return this.http.post(this.API_ROOT + '/schedule/editScheduler', JSON.stringify(data), this.getHttpOptions()); }
  getScheduleOne(data: any) { return this.http.post(this.API_ROOT + '/schedule/getScheduleOne', JSON.stringify(data), this.getHttpOptions()); }

  // LOGS
  getLog(data: any) { return this.http.post(this.API_ROOT + '/master/viewLog', data, this.getHttpOptions()); }
}
