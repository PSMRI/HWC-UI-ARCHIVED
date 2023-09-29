/*
* AMRIT – Accessible Medical Records via Integrated Technology 
* Integrated EHR (Electronic Health Records) Solution 
*
* Copyright (C) "Piramal Swasthya Management and Research Institute" 
*
* This file is part of AMRIT.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see https://www.gnu.org/licenses/.
*/
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.





const commonIP = 'http://10.208.122.38:8080';
const identityIP = 'http://10.208.122.38:8080/';
const tmIP = 'http://10.208.122.38:8080/';
const IP104 = 'http://10.208.122.38:8080/';
// const tmIP = 'http://localhost:8080/';
const mmuIP = 'http://10.208.122.38:8080/';
const schedulerIP = 'http://10.208.122.38:8080/';
const adminIP = 'http://10.208.122.38:8080/';
const FHIRIP ='http://10.208.122.38:8080/';

// const SERVER_IP = '10.208.122.38';

const SERVER_IP = "10.208.122.39";

const SWYMED_IP = "swymed://14.143.13.109";

// With API MAN Configuration
// const COMMON_API_OPEN = `http://${IP}:8080/apiman-gateway/IEMR/Common/open/`;
// const COMMON_API = `http://${IP}:8080/apiman-gateway/IEMR/Common/1.0/`;
// const TM_API = `http://${IP}:8080/apiman-gateway/IEMR/TM/1.0/`;
// const MMU_API = `http://${IP}:8080/apiman-gateway/IEMR/MMU/1.0/`
// const SCHEDULER_API = `http://${IP}:8080/apiman-gateway/IEMR/Scheduling/1.0/`;

// Without API MAN Configuration
const COMMON_API_OPEN = `${commonIP}/commonapi-v1.0/`;
const COMMON_API = `${commonIP}/commonapi-v1.0/`;
const IDENTITY_API = `${identityIP}/identity-0.0.1/`;
// const COMMON_API_OPEN = `http://localhost:8080/`;  
// const COMMON_API = `http://localhost:8080/`;  
const TM_API = `${tmIP}/hwc-facility-service/`;
// const TM_API = `${tmIP}/hwc-facility-service/`;

const API104 = `${IP104}/104api-v1.0/`;
// const TM_API = `http://localhost:8082/`;   
const MMU_API = `${mmuIP}/mmuapi-v1.0/`;
const COMMON_API_OPEN_SYNC = `http://${SERVER_IP}:8080/commonapi-v1.0/`;
const SCHEDULER_API = `${schedulerIP}/schedulerapi-v1.0/`;
const mmuUICasesheet = "http://localhost:4200/";
const ADMIN_API = `${adminIP}/adminapi-v1.0`;

const IOT_API = `${ADMIN_API}/diagnostics/biologicalScreeningDevice`; 

 const FHIR_API = `${FHIRIP}/fhirapi-v1.0/`;

export const environment = {
  production: false,
  app: `MMU`,
  RBSTest:`RBS Test`,
  visualAcuityTest:`Visual Acuity Test`,
  haemoglobinTest : `Hemoglobin Test`,
  abhaExtension: `@abdm`,
  diabetes: `Diabetes Mellitus`,
  hypertension: `Hypertension`,
  oral:`Oral cancer`,
  breast: `Breast cancer`,
  cervical: `Cervical cancer`,
  IdrsOrCbac: ['IDRS', 'CBAC'],


  parentAPI: `${TM_API}`,

  INVENTORY_URL: "http://localhost:5000/#/redirin?",
  fallbackUrl: `/pharmacist/redirfallback`,
  redirInUrl: `/pharmacist/redirin`,

  TELEMEDICINE_URL: "http://localhost:4300/#/?",
  fallbackMMUUrl: `/logout-tm`,
  redirInMMUUrl: `/common/tcspecialist-worklist`,

  getSessionExistsURL: `${COMMON_API_OPEN}user/getLoginResponse`,
  extendSessionUrl: `${TM_API}common/extend/redisSession`,
  getLanguageList: `${COMMON_API}beneficiary/getLanguageList`,
  /**
   * comman API for fetching state and cities
   */

  getStateName: `${COMMON_API}location/states/`,
  getDistrictName: `${COMMON_API}location/districts/`,
  getSubDistrictName: `${COMMON_API}location/taluks/`,
  getCountryName: `${TM_API}location/get/countryMaster`,
  getCityName: `${TM_API}location/get/countryCityMaster/`,

  /**
   * Login and Logout Urls
   */
  syncLoginUrl: `${COMMON_API_OPEN_SYNC}user/userAuthenticate`,
  loginUrl: `${COMMON_API_OPEN}user/userAuthenticate`,
  logoutUrl: `${COMMON_API_OPEN}user/userLogout`,
  userLogoutPreviousSessionUrl:  `${COMMON_API_OPEN}user/logOutUserFromConcurrentSession`,

  /**
   * Security Question and Forgot password Url
   */
  getUserSecurityQuestionsAnswerUrl: `${COMMON_API_OPEN}user/forgetPassword`,
  getSecurityQuestionUrl: `${COMMON_API_OPEN}user/getsecurityquetions`,
  saveUserSecurityQuestionsAnswerUrl: `${COMMON_API_OPEN}user/saveUserSecurityQuesAns`,
  setNewPasswordUrl: `${COMMON_API_OPEN}user/setForgetPassword`,

  servicePointUrl: `${TM_API}user/getUserVanSpDetails`,
  servicePointVillages: `${TM_API}user/getServicepointVillages`,

  registerBeneficiaryUrl: `${TM_API}registrar/registrarBeneficaryRegistration/`,
  updateBeneficiaryUrl: `${TM_API}registrar/update/BeneficiaryDetails`,
  submitBeneficiaryIdentityUrl: `${TM_API}registrar/registrarBeneficaryRegistrationNew`,
  updateBeneficiaryIdentityUrl: `${TM_API}registrar/update/BeneficiaryUpdate`,

  registrarMasterDataUrl: `${TM_API}registrar/registrarMasterData`,
  quickSearchUrl: `${TM_API}registrar/quickSearch`,
  identityQuickSearchUrl: `${TM_API}registrar/quickSearchNew`,
  advanceSearchUrl: `${TM_API}registrar/advanceSearch`,
  advanceSearchIdentityUrl: `${TM_API}registrar/advanceSearchNew`,
  externalSearchIdentityUrl: `${FHIR_API}patient/data/profile/search/demographic`,
  patientRevisitSubmitToNurse: `${TM_API}common/update/benDetailsAndSubmitToNurse`,
  identityPatientRevisitSubmitToNurseURL: `${TM_API}registrar/create/BenReVisitToNurse`,
  /**
   * Master Data Urls
   */

  getDistrictListUrl: `${TM_API}location/get/districtMaster/`,
  getSubDistrictListUrl: `${TM_API}location/get/districtBlockMaster/`,
  getVillageListUrl: `${TM_API}location/get/villageMasterFromBlockID/`,
  demographicsCurrentMasterUrl: `${TM_API}location/getLocDetailsBasedOnSpIDAndPsmID`,
  visitDetailMasterDataUrl: `${TM_API}master/get/visitReasonAndCategories`,
  nurseMasterDataUrl: `${TM_API}master/nurse/masterData/`,
  doctorMasterDataUrl: `${TM_API}master/doctor/masterData/`,
  snomedCTRecordURL: `${TM_API}/snomed/getSnomedCTRecord`,
  /**
   * Lab Data Urls
   */

  getprescribedTestDataUrl: `${TM_API}labTechnician/get/prescribedProceduresList`,
  labSaveWork: `${TM_API}labTechnician/save/LabTestResult`,

  /**
   * Worklist Urls
   */

  nurseWorklist: `${TM_API}common/getNurseWorklistNew/`,
  getNurseTMWorklistUrl: `${TM_API}common/getNurseWorkListTcCurrentDate/`,
  getNurseTMFutureWorklistUrl: `${TM_API}common/getNurseWorkListTcFutureDate/`,
  labWorklist: `${TM_API}common/getLabWorklistNew/`,
  doctorWorkList: `${TM_API}common/getDocWorklistNew/`,
  doctorFutureWorkList: `${TM_API}common/getDocWorkListNewFutureScheduledForTM/`,
  specialistWorkListURL: `${TM_API}common/getTCSpecialistWorklist/`,
  specialistFutureWorkListURL: `${TM_API}common/getTCSpecialistWorklistFutureScheduled/`,
  radiologistWorklist: `${TM_API}common/getRadiologist-worklist-New/`,
  oncologistWorklist: `${TM_API}common/getOncologist-worklist-New/`,
  pharmacistWorklist: `${TM_API}common/getPharma-worklist-New/`,
  mmuNurseWorklist: `${TM_API}common/getMmuNurseWorklistNew/`,
  // New API
  getBeneficiaryDetail: `${TM_API}registrar/get/benDetailsByRegIDForLeftPanelNew`,

  getCompleteBeneficiaryDetail: `${TM_API}registrar/get/beneficiaryDetails`,

  // getBeneficiaryImage: `${TM_API}registrar/get/beneficiaryImage`,
  // New API
  getBeneficiaryImage: `${TM_API}registrar/getBenImage`,
  getPreviousVisitDetailsUrl: `${TM_API}casesheet/getBeneficiaryCaseSheetHistory`,
  updateVisitStatus: `${TM_API}doctor/updateBeneficiaryStatus`,

  // printCancerCase_sheet_url: `${mmuUICasesheet}`,
  // updateOncologistRemarksCancelUrl: `${TM_API}oncologist/update/examinationScreen/diagnosis`,
  updateOncologistRemarksCancelUrl: `${TM_API}CS-cancerScreening/update/examinationScreen/diagnosis`,
  //commented by NEERAJ on 06-03-2018, because modified the url
  //getStatesURL: `${COMMON_API}location/states/`,
  //getDistrictsURL: `${COMMON_API}location/districts/`,

  getnurse104referredworklistURL: `${TM_API}location/get/stateMaster`,
  getStatesURL: `${TM_API}location/get/stateMaster`,
  getDistrictsURL: `${TM_API}location/get/districtMaster/`,
  countryId: 1,

  /**
   * NCD SCREENING API URLs
   */
  postNCDScreeningDetails: `${TM_API}NCD/save/nurseData`,
  // getNCDScreeningVisitDetails: `${TM_API}CS-cancerScreening/getBenDataFrmNurseToDocVisitDetailsScreen`,
  updateNCDVitalsDetailsUrl:`${TM_API}NCD/update/vitalScreen`,
  getNCDScreeningVisitDetails: `${TM_API}NCD/getBenVisitDetailsFrmNurseNCDScreening`,
  getNCDScreeningDetails: `${TM_API}NCD/get/nurseData`,
  updateNCDScreeningDetails: `${TM_API}NCD/update/nurseData`,
  updateNCDScreeningHistoryDetailsUrl :`${TM_API}NCD/update/historyScreen`,
  getCbacDetailsUrl :`${TM_API}/NCD/getCbacDetails`,
  getNcdScreeningDetailsForCbac: `${TM_API}/NCD/get/ncd/screening/data`,
  updateNCDScreeningDetailsUrl: `${TM_API}NCD/update/ncd/screening/data`,

  /**
   * GENERAL OPD QUICK CONSULT API URLs
   */
  saveNurseGeneralQuickConsult: `${TM_API}genOPD-QC-quickConsult/save/nurseData`,
  saveDoctorGeneralQuickConsult: `${TM_API}genOPD-QC-quickConsult/save/doctorData`,

  getGeneralOPDQuickConsultVisitDetails: `${TM_API}genOPD-QC-quickConsult/getBenDataFrmNurseToDocVisitDetailsScreen`,
  getGeneralOPDQuickConsultVitalDetails: `${TM_API}genOPD-QC-quickConsult/getBenVitalDetailsFrmNurse`,

  /**
   * ANC API URLs
   */
  saveNurseANCDetails: `${TM_API}ANC/save/nurseData`,
  saveDoctorANCDetails: `${TM_API}ANC/save/doctorData`,

  getANCVisitDetailsUrl: `${TM_API}ANC/getBenVisitDetailsFrmNurseANC`,
  getANCDetailsUrl: `${TM_API}ANC/getBenANCDetailsFrmNurseANC`,
  getANCVitalsDetailsUrl: `${TM_API}ANC/getBenANCVitalDetailsFrmNurseANC`,
  getANCHistoryDetailsUrl: `${TM_API}ANC/getBenANCHistoryDetails`,
  getANCExaminationDataUrl: `${TM_API}ANC/getBenExaminationDetailsANC`,
  getHrpStatusURL: `${TM_API}ANC/getHRPStatus`,
  getHrpFollowUpURL: `${TM_API}ANC/getHrpInformation`,

  updateANCVisitDetailsUrl: `${TM_API}ANC/update/visitDetailsScreen`,
  updateANCDetailsUrl: `${TM_API}ANC/update/ANCScreen`,
  updateANCVitalsDetailsUrl: `${TM_API}ANC/update/vitalScreen`,
  updateANCHistoryDetailsUrl: `${TM_API}ANC/update/historyScreen`,
  updateANCExaminationDetailsUrl: `${TM_API}ANC/update/examinationScreen`,

  /**ANC foetalMonitor API URLs */
  savefetosenseTestDetailsUrl: `${TM_API}/foetalMonitor/sendMotherTestDetailsToFoetalMonitor`,
  getPrescribedFetosenseTests: `${TM_API}/foetalMonitor/fetch/foetalMonitorDetails/`,
  getESanjeevaniDetailsUrl: `${COMMON_API}esanjeevani/getESanjeevaniUrl/`,


 
  previousVisitDataUrl:`${TM_API}common/getBenSymptomaticQuestionnaireDetails`,
  
  /**
   * GENERAL OPD API URLs
   */
  saveNurseGeneralOPDDetails: `${TM_API}generalOPD/save/nurseData`,

  updateGeneralOPDHistoryDetailsUrl: `${TM_API}generalOPD/update/historyScreen`,
  updateGeneralOPDVitalsDetailsUrl: `${TM_API}/generalOPD/update/vitalScreen`,
  updateGeneralOPDExaminationDetailsUrl: `${TM_API}/generalOPD/update/examinationScreen`,

  saveDoctorGeneralOPDDetails: `${TM_API}generalOPD/save/doctorData`,

  getGeneralOPDVisitDetailsUrl: `${TM_API}generalOPD/getBenVisitDetailsFrmNurseGOPD`,
  getGeneralOPDHistoryDetailsUrl: `${TM_API}generalOPD/getBenHistoryDetails`,
  getGeneralOPDVitalDetailsUrl: `${TM_API}generalOPD/getBenVitalDetailsFrmNurse`,
  getGeneralOPDExaminationDetailsUrl: `${TM_API}generalOPD/getBenExaminationDetails`,

  /**
   * NCD Care API Urls
   */
  saveNurseNCDCareDetails: `${TM_API}NCDCare/save/nurseData`,

  saveDoctorNCDCareDetails: `${TM_API}NCDCare/save/doctorData`,

  updateNCDCareHistoryDetailsUrl: `${TM_API}NCDCare/update/historyScreen`,
  updateNCDCareVitalsDetailsUrl: `${TM_API}NCDCare/update/vitalScreen`,

  getNCDCareVisitDetailsUrl: `${TM_API}NCDCare/getBenVisitDetailsFrmNurseNCDCare`,
  getNCDCareHistoryDetailsUrl: `${TM_API}NCDCare/getBenNCDCareHistoryDetails`,
  getNCDCareVitalDetailsUrl: `${TM_API}NCDCare/getBenVitalDetailsFrmNurseNCDCare`,
  

  /**
   * Covid-19 API Urls
   */
  saveNurseCovidDetails: `${TM_API}pandemic/covid/save/nurseData`,
  getCovidVisitDetails: `${TM_API}pandemic/covid/getBenVisitDetailsFrmNurseCovid`,
  saveDoctorCovidDetails: `${TM_API}pandemic/covid/save/doctorData`,
  updateCovidHistoryDetailsUrl: `${TM_API}pandemic/covid/update/historyScreen`,
  updateCovidVitalsDetailsUrl: `${TM_API}pandemic/covid/update/vitalScreen`,
  getCovidVisitDetailsUrl: ``,
  getCovidHistoryDetailsUrl: `${TM_API}pandemic/covid/getBenCovid19HistoryDetails`,
  getCovidVitalDetailsUrl: `${TM_API}pandemic/covid/getBenVitalDetailsFrmNurseCovid`,
  getCovidDoctorDetails: `${TM_API}pandemic/covid/getBenCaseRecordFromDoctorCovid`,
  updateCovidDoctorDetails: `${TM_API}pandemic/covid/update/doctorData`,

  /**
   * PNC Urls
   */
  savePNCNurseDetailsUrl: `${TM_API}PNC/save/nurseData`,
  savePNCDoctorDetailsUrl: `${TM_API}PNC/save/doctorData`,

  getPNCVisitDetailsUrl: `${TM_API}PNC/getBenVisitDetailsFrmNursePNC`,
  getPNCDetailsUrl: `${TM_API}PNC//getBenPNCDetailsFrmNursePNC`,
  getPNCVitalsDetailsUrl: `${TM_API}PNC/getBenVitalDetailsFrmNurse`,
  getPNCHistoryDetailsUrl: `${TM_API}PNC/getBenHistoryDetails`,
  getPNCExaminationDataUrl: `${TM_API}PNC/getBenExaminationDetailsPNC`,
  getNCDSceeriningVitalDetails : `${TM_API}NCD/getBenVitalDetailsFrmNurse`,
  updatePNCDetailsUrl: `${TM_API}PNC/update/PNCScreen`,
  updatePNCHistoryDetailsUrl: `${TM_API}PNC/update/historyScreen`,
  updatePNCVitalsDetailsUrl: `${TM_API}PNC/update/vitalScreen`,
  updatePNCExaminationDetailsUrl: `${TM_API}PNC/update/examinationScreen`,
  getNCDScreeningHistoryDetails : `${TM_API}NCD/getBenHistoryDetails`,
  /*
   */
  getPreviousSignificiantFindingUrl: `${TM_API}common/getDoctorPreviousSignificantFindings`,

  getNCDScreeningDoctorDetails: `${TM_API}NCD/getBenCaseRecordFromDoctorNCDScreening`,
  getGeneralOPDQuickConsultDoctorDetails: `${TM_API}genOPD-QC-quickConsult/getBenCaseRecordFromDoctorQuickConsult`,
  getANCDoctorDetails: `${TM_API}ANC/getBenCaseRecordFromDoctorANC`,
  getGeneralOPDDoctorDetails: `${TM_API}generalOPD/getBenCaseRecordFromDoctorGeneralOPD`,
  getNCDCareDoctorDetails: `${TM_API}NCDCare/getBenCaseRecordFromDoctorNCDCare`,
  getPNCDoctorDetails: `${TM_API}PNC/getBenCaseRecordFromDoctorPNC`,

  updateCancerScreeningDoctorDetails: `${TM_API}CS-cancerScreening/update/doctorData`,
  updateNCDScreeningDoctorDetails: `${TM_API}/NCD/update/doctorData`,
  updateGeneralOPDQuickConsultDoctorDetails: `${TM_API}genOPD-QC-quickConsult/update/doctorData`,
  updateANCDoctorDetails: `${TM_API}ANC/update/doctorData`,
  updateGeneralOPDDoctorDetails: `${TM_API}generalOPD/update/doctorData`,
  updateNCDCareDoctorDetails: `${TM_API}NCDCare/update/doctorData`,
  updatePNCDoctorDetails: `${TM_API}PNC/update/doctorData`,

  getTMCasesheetDataUrl: `${TM_API}common/get/Case-sheet/printData`,
  getMMUCasesheetDataUrl: `${MMU_API}common/get/Case-sheet/printData`,

  previousPastHistoryUrl: `${TM_API}common/getBenPastHistory`,
  previousMedicationHistoryUrl: `${TM_API}common/getBenMedicationHistory`,
  previousTobaccoHistoryUrl: `${TM_API}common/getBenTobaccoHistory`,
  previousAlcoholHistoryUrl: `${TM_API}common/getBenAlcoholHistory`,
  previousAllergyHistoryUrl: `${TM_API}common/getBenAllergyHistory`,
  previousFamilyHistoryUrl: `${TM_API}common/getBenFamilyHistory`,
  previousPastObstetricHistoryUrl: `${TM_API}common/getBenPastObstetricHistory`,
  previousMestrualHistoryUrl: `${TM_API}common/getBenMenstrualHistory`,
  previousComorbidityHistoryUrl: `${TM_API}common/getBenComorbidityConditionHistory`,
  previousImmunizationHistoryUrl: `${TM_API}common/getBenChildVaccineHistory`,
  previousOtherVaccineHistoryUrl: `${TM_API}common/getBenOptionalVaccineHistory`,
  previousPerinatalHistory: `${TM_API}common/getBenPerinatalHistory`,
  previousDevelopmentHistory: `${TM_API}common/getBenDevelopmentHistory`,
  previousFeedingHistory: `${TM_API}common/getBenFeedingHistory`,
  previousPhyscialactivityHistoryUrl : `${TM_API}common/getBenPhysicalHistory`,
  previousDiabetesHistoryUrl: `${TM_API}common/getBenPreviousDiabetesHistoryDetails`,
  previousReferredHistoryUrl: `${TM_API}common/getBenPreviousReferralHistoryDetails`,
  previousImmunizationServiceDataUrl: `${TM_API}common/getBenImmunizationServiceHistory`,
  /* */
  archivedReportsUrl: `${TM_API}labTechnician/get/labResultForVisitcode`,
  ReportsBase64Url: `${TM_API}foetalMonitor/fetch/reportGraphBase64`,
  previousMMUHistoryUrl: `${MMU_API}common/getBeneficiaryCaseSheetHistory`,
  previousTMHistoryUrl: `${TM_API}common/getBeneficiaryCaseSheetHistory`,
  previousMCTSHistoryUrl: `${COMMON_API}mctsOutboundHistoryController/getMctsCallHistory`,
  previous104HistoryUrl: `${COMMON_API}beneficiary/get104BenMedHistory`,
  patientMCTSCallHistoryUrl: `${COMMON_API}mctsOutboundHistoryController/getMctsCallResponse`,
  drugDeleteUrl: `${TM_API}common/doctor/delete/prescribedMedicine`,
  newTaburl: `${mmuUICasesheet}`,

  getDataSYNCGroupUrl: `${TM_API}dataSyncActivity/getSyncGroupDetails`,
  syncDataUploadUrl: `${TM_API}dataSyncActivity/van-to-server`,
  syncDataDownloadUrl: `${TM_API}dataSyncActivity/startMasterDownload`,
  syncDownloadProgressUrl: `${TM_API}dataSyncActivity/checkMastersDownloadProgress`,
  getNcdScreeningVisitCountUrl: `${TM_API}NCD/getNcdScreeningVisitCount/`,
  getVanDetailsForMasterDownloadUrl: `${TM_API}dataSyncActivity/getVanDetailsForMasterDownload`,

  getMasterSpecializationUrl: `${SCHEDULER_API}/specialist/masterspecialization`,
  getSpecialistUrl: `${SCHEDULER_API}/specialist/getSpecialist`,
  getAvailableSlotUrl: `${SCHEDULER_API}/schedule/getavailableSlot`,
  getSwymedMailUrl: `${SCHEDULER_API}/van/getvan`,

  updateBeneficiaryArrivalStatusUrl: `${TM_API}tc/update/benArrivalStatus`,
  cancelBeneficiaryTCRequestUrl: `${TM_API}tc/cancel/benTCRequest`,
  scheduleTCUrl: `${TM_API}tc/create/benTCRequestWithVisitCode`,
  beneficiaryTCRequestStatusUrl: `${TM_API}tc/check/benTCRequestStatus`,
  swymedUrl: `${SWYMED_IP}`,
  saveSpecialistCancerObservationUrl: `${TM_API}CS-cancerScreening/update/doctorData`,
  getSwymedMailLoginUrl: `${TM_API}videoConsultation/login/`,
  invokeSwymedCallUrl: `${TM_API}videoConsultation/call/`,
  invokeSwymedCallSpecialistUrl: `${TM_API}videoConsultation/callvan/`,
  getSwymedLogoutUrl: `${TM_API}videoConsultation/logout`,
  updateTCStartTimeUrl: `${TM_API}tc/startconsultation`,
  snomedCTRecordListURL: `${TM_API}snomed/getSnomedCTRecordList`,
  getServiceOnStateUrl: `${COMMON_API}service/serviceList`,
  licenseUrl: `${COMMON_API}license.html`,
  apiVersionUrl: `${TM_API}version`,
  snomedCTRecordListURL1: `${COMMON_API}snomed/getSnomedCTRecordList`,
  getCalibrationStrips: `${ADMIN_API}/fetchCalibrationStrips`,
  updateNCDScreeningIDRSDetailsUrl :`${TM_API}NCD/update/idrsScreen`,
  getNCDScreeningIDRSDetails : `${TM_API}NCD/getBenIdrsDetailsFrmNurse`,
  saveDoctorNCDScreeningDetails: `${TM_API}NCD/save/doctorData`,
  //file upload
  saveFile: `${COMMON_API}kmfilemanager/addFile`,
  viewFileData: `${TM_API}common/getKMFile`,
  ioturl: `${IOT_API}`,
  deviceStatusurl: `${IOT_API}/api/v1/bluetooth/hub/connection_status`,
  deviceDisconnectUrl:`${IOT_API}/api/v1/bluetooth/hub/disconnect`,
  deviceBluetoothurl: `${IOT_API}/api/v1/bluetooth/service_discovery`,
  connectdeviceBluetoothurl: `${IOT_API}/api/v1/bluetooth/hub_connection`,

  startWeighturl: "/api/v1/physical_tests/weight",
  startTempurl: "/api/v1/physical_tests/temperature",
  startPulseurl: "/api/v1/physical_tests/pulse_oxymetry",
  startBPurl: "/api/v1/physical_tests/blood_pressure",
  startHemoglobinurl: "/api/v1/wbpoct_tests/hemoglobin",
  startBloodGlucoseurl: "/api/v1/wbpoct_tests/blood_glucose",
  startRBSurl: '/api/v1/wbpoct_tests/blood_glucose',

  /*Doctor signature download */
  downloadSignUrl: `${COMMON_API}signature1/`,

  /*Load MMU Provider Specific Data */
  loadMMUDataUrl:`${TM_API}common/getProviderSpecificData`,

   /*Load HRP Details */
   loadHRPUrl:`${TM_API}ANC/getHRPStatus`,

  /*Health ID OTP Generation URL*/
  otpGenerationUrl: `${FHIR_API}healthID/generateOTP`,
  otpGenerationWithUIDUrl: `${FHIR_API}healthIDWithUID/generateOTP`,
  healthIdGenerationUrl: `${FHIR_API}healthID/verifyOTPAndGenerateHealthID`,
  healthIdGenerationWithUIDUrl: `${FHIR_API}healthIDWithUID/createHealthIDWithUID`,
  verifyOTPUrl: `${FHIR_API}/healthIDWithUID/verifyOTP`,
  checkAndGenerateMobileOTPUrl: `${FHIR_API}healthIDWithUID/checkAndGenerateMobileOTP`,
  verifyMobileOTPUrl: `${FHIR_API}healthIDWithUID/verifyMobileOTP`,
  gethealthIdDetailsUrl: `${FHIR_API}healthID/getBenhealthID`,
  mapHealthIdUrl: `${FHIR_API}healthID/mapHealthIDToBeneficiary`,

  /*Health ID - care context Mapping*/
  careContextGenerateOtpUrl: `${FHIR_API}careContext/generateOTPForCareContext`,
  verifyOtpForMappingContextUrl:`${FHIR_API}careContext/validateOTPAndCreateCareContext`,

  /*Health ID Validation URL*/
  generateOTPForHealthIDValidation: `${FHIR_API}validate/generateOTPForHealthIDValidation`,
  verifyOTPForHealthIDValidation:`${FHIR_API}validate/verifyOTPForHealthIDValidation`,

  /* Health ID Card Generation*/
  generateOTPForHealthIDCard: `${FHIR_API}healthIDCard/generateOTP`,
  verifyOTPAndGenerateHealthCard:`${FHIR_API}healthIDCard/verifyOTPAndGenerateHealthCard`,

  /*Get Patient CBAC details*/
  getBenCBACDetails: `${COMMON_API}doortodoorapp/getSuspectedData_HRP_TB_NCD`,

  updateAmritIDInMongo: `${FHIR_API}/patient/data/patient/updateAmritIdMongo`,

  /*Get patient higher health facility previous clinical records */
  higherHealthFacilityPreviousVisitDeatilsUrl: `${FHIR_API}higher/health/facility/get/clinical/data`,
  
  /*Calculate BMI for minors */
  calculateBmiStatus:  `${TM_API}common/calculateBMIStatus`,

  /* Validate users based on security questions */
  validateSecurityQuestions: `${COMMON_API}user/validateSecurityQuestionAndAnswer`,

  /* TransactionID for changing password */
  getTransacIDForPasswordChange: `${COMMON_API}user/getTransactionIdForChangePassword`,

    /*Covid vaccination Urls */
    vaccinationTypeAndDoseMasterUrl: `${COMMON_API}covid/master/VaccinationTypeAndDoseTaken`,
    saveCovidVaccinationDetailsUrl: `${COMMON_API}covid/saveCovidVaccinationDetails`,
    previousCovidVaccinationUrl: `${COMMON_API}covid/getCovidVaccinationDetails`,

    /* Screening Masters API */
    getOralCavityFindings: `${COMMON_API}/getOralCavityData`,
    getMouthOpeningUrl: `${COMMON_API}/getMouthOpeningData`,
    getPalpationOralCavityUrl: `${COMMON_API}/getPalpationOfOralCavity`,
    getTemporomandibularUrl: `${COMMON_API}/getTemperomandibularJoinData`,
    getCervicalLymphNodeUrl: `${COMMON_API}/getCervicalLymph`,
    /*Family Tagging Urls */
    relationShipUrl: `${TM_API}registrar/registrarMasterData`,
    saveFamilyTaggingUrl: `${IDENTITY_API}/family/addTag`,
    editFamilyTaggingUrl: `${IDENTITY_API}/family/editFamilyTagging`,
    untagFamilyUrl: `${IDENTITY_API}/family/untag`,
    familySearchUrl: `${IDENTITY_API}/family/searchFamily`,
    createFamilyUrl: `${IDENTITY_API}/family/createFamily`,
    getFamilyMemberUrl: `${IDENTITY_API}/family/getFamilyDetails`,
    /*Hypertension Screening Url */
    bloodPressureStatusUrl: `${TM_API}/screeningOutcome/hypertension`,

    /* Diabetes screening outcome Url */
    diabetesStatusUrl: `${TM_API}/screeningOutcome/diabetes`,

    confirmedDiseaseUrl: `${TM_API}NCD/get/ncd/screening/data`,

    previousVisitConfirmedUrl: `${TM_API}NCD/fetchConfirmedScreeningDisease`,

    // fpMasterReferralUrl: ${TM_API}NCD/fetchConfirmedScreeningDisease


    /* Family Planning Urls*/
    getFamilyPlanningVisitDetails: `${TM_API}family-planning/getBenVisitDetails-Nurse-FamilyPlanning`,
    saveNurseFamilyPlanningDetails: `${TM_API}family-planning/save-family-planning-nurse-data`,
    getFamilyPlanningVitalDetailsUrl: `${TM_API}family-planning/getBenVitalDetailsFrmNurseFamilyPlanning`,
    updateFamilyPlanningVitalsDetailsUrl: `${TM_API}/family-planning/update/vitalScreen`,
    updateFamilyPlanningScreenDetailsUrl: `${TM_API}/family-planning/update/FamilyPlanningScreen`,
    getFamilyPlanningDetailsUrl: `${TM_API}/family-planning/getBenFPDetailsFrmNurseFamilyPlanning`,
    saveDoctorFamilyPlanningDetails: `${TM_API}family-planning/save-family-planning-doctor-data`,
    getFamilyPlanningDoctorDetails: `${TM_API}family-planning/getBenCaseRecordFromDoctor`,
    updateFamilyPlanningDoctorDetails: `${TM_API}family-planning/update/doctorData`,
    
    /* Neonatal And Infant Services Urls*/
    saveNurseNeonatalAndInfantDetails: `${TM_API}neonatal-infant-services/save/nurseData`,
    getBirthImmunizationHistoryDetailsUrl: `${TM_API}neonatal-infant-services/getBenHistoryDetails`,
    updateBirthImmunizationHistoryDetailsUrl: `${TM_API}/neonatal-infantServices/update/BirthAndImmunizationHistoryScreen`,
    getNeonatalVitalsDetailsUrl : `${TM_API}neonatal-infant-services/getBenVitalDetailsFrmNurse`,
    updateNeonatalVitalsDetailsUrl: `${TM_API}/neonatal-infantServices/update/vitalScreen`,
    getPreviousBirthImmunizationDetailsUrl: `${TM_API}neonatal-infant-services/getBenHistoryDetails`,
    saveDoctorNeonatalAndInfantService: `${TM_API}neonatal-infant-services/save-neo-natal-doctor-data`,
    updateNeonatalAndInfantService: `${TM_API}/neonatal-infantServices/update/doctorData`,
    getNeonatalAndInfantDetails: `${TM_API}neonatal-infant-services/getBenCaseRecordFromDoctor`,
    vaccineListUrl: `${TM_API}master/common/masterData/getVaccine/`,
    fetchNeonatalImmunizationService: `${TM_API}neonatal-infant-services/getBenImmunizationServiceDetails`,
    updateNeonatalImmunizationService: `${TM_API}neonatal-infantServices/update/ImmunizationServicesScreen`,
    getNeonatalVisitDetails: `${TM_API}/neonatal-infant-services/getBenVisitDetailsFrmNurseNNI`,

    /* Child And Adolescent Urls */
    saveNurseChildAndAdloescentDetails: `${TM_API}/child-adolescent-care/save/nurseData`,
    getChildAndAdolescentVisitDetails: `${TM_API}/child-adolescent-care/getBenVisitDetailsFrmNurseCAC`,
    getChildAndAdolescentVitalsDetailsUrl : `${TM_API}/child-adolescent-care/getBenVitalDetailsFrmNurse`,
    getPreviousBirthImmunizationDataForChildAndAdolascentUrl: `${TM_API}/child-adolescent-care/getBenHistoryDetails`,
    updateChildAndAdolescentVitalsDetailsUrl: `${TM_API}/child-adolescent-care/update/vitalScreen`,
    getChildAndAdolescentDetails: `${TM_API}/child-adolescent-care/getBenCaseRecordFromDoctor`,
    saveDoctorChildAndAdolescentService: `${TM_API}/child-adolescent-care/save/doctorData`,
    updateChildAndAdolescentServiceDoctor: `${TM_API}/child-adolescent-care/update/doctorData`,
    updateChildAndAdolescentService: `${TM_API}/child-adolescent-care/update/ImmunizationServicesScreen`,
    fetchChildAndAdolescentService: `${TM_API}/child-adolescent-care/getBenImmunizationServiceDetails`,
    updateBirthAndImmunizationHistoryDataUrl: `${TM_API}/child-adolescent-care/update/BirthAndImmunizationHistoryScreen`,
    getBirthImmunizationHistoryDataUrl: `${TM_API}/child-adolescent-care/getBenHistoryDetails`,

    /* SWAASA Urls*/ 
    getResultStatusURL: `${COMMON_API}lungAssessment/startAssesment`,
    getAssessmentUrl: `${COMMON_API}lungAssessment/getAssesment`,
    getAssessmentIdUrl: `${COMMON_API}lungAssessment/getAssesmentDetails`,

    /* CDSS Urls */
    getCdssQuestionsUrl: `${API104}CDSS/getQuestions`,
    getCdssAnswersUrl: `${API104}CDSS/getResult`,
    getSnomedCtRecordUrl: `${API104}snomed/getSnomedCTRecord`,
    getCheifComplaintsSymptomsUrl: `${API104}CDSS/Symptoms`,
    getActionMasterUrl: `${TM_API}uptsu/get/action-master`,
    closeVisitSaveComplaintsUrl: `${TM_API}uptsu/submit/closevisit`,
    getnurse104referredworklisturls: `${TM_API}uptsu/getWorklistByVanID`,

};
