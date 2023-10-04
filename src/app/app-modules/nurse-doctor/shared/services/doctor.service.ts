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
import { Injectable } from "@angular/core";
import { Http, RequestOptions, ResponseContentType } from "@angular/http";
import { FormGroup, FormArray } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs/Rx";

import { environment } from "environments/environment";
import { shareReplay } from "rxjs/operators";

@Injectable()
export class DoctorService {
  fileIDs: any; // To store fileIDs
  screeningType: any;
  enableCovidVaccinationButton: boolean;
  covidVaccineAgeGroup: any;
  screeningDetailsResponseFromNurse: any = null;
  isHrpFromNurse: boolean = null;
  reasonHrpFromNurse: any = null;
  enableHRPReasons: boolean = false;
  valueChanged: boolean = false;
  familyPlanningDetailsResponseFromNurse: any = null;
  familyPlanningDetailsResponseForRevisit: any = null;
  birthAndImmunizationDetailsFromNurse: any = null;
  immunizationHistoryValueChanged: boolean = false;
  enableDispenseFlag: boolean = false;
  immunizationServiceFetchDetails: any = null;
  immunizationServiceValueChanged: boolean = false;

  constructor(private http: Http) {}

  screeninDataFromNurse = new BehaviorSubject<any>(null);
  screeningData$ = this.screeninDataFromNurse.asObservable();

  benFamilyPlanningDetails: any = [];
  benfamilyPlanningData = new BehaviorSubject<any>(
    this.benFamilyPlanningDetails
  );
  benFamilyPlanningDetails$ = this.benfamilyPlanningData.asObservable();

  neonatalImmunizationHistoryData: any = [];
  InfantAndImmunizationHistoryDetails = new BehaviorSubject<any>(
    this.neonatalImmunizationHistoryData
  );
  infantAndImmunizationData$ =
    this.InfantAndImmunizationHistoryDetails.asObservable();

  enableHRPStatusAndReasons = new BehaviorSubject<boolean>(
    this.enableHRPReasons
  );
  enableHRPStatusAndReasons$ = this.enableHRPStatusAndReasons.asObservable();

  valueChangedForFamilyPlanning = new BehaviorSubject<boolean>(
    this.valueChanged
  );
  valueChangeForFamilyPlanning$ =
    this.valueChangedForFamilyPlanning.asObservable();

  valueChangedForBirthAndImmunization = new BehaviorSubject<boolean>(
    this.immunizationHistoryValueChanged
  );
  valueChangedForBirthAndImmunizationCheck$ =
    this.valueChangedForBirthAndImmunization.asObservable();

  valueChangedForImmunizationServiceChildhood = new BehaviorSubject<boolean>(
    this.immunizationServiceValueChanged
  );
  valueChangedForImmunizationServiceChildhoodCheck$ =
    this.valueChangedForImmunizationServiceChildhood.asObservable();

  historyResponse: any = [];
  populateHistoryResponse = new BehaviorSubject<any>(this.historyResponse);
  populateHistoryResponse$ = this.populateHistoryResponse.asObservable();

  caserecordResponse = [];
  populateCaserecordResponse = new BehaviorSubject<any>(
    this.caserecordResponse
  );
  populateCaserecordResponse$ = this.populateCaserecordResponse.asObservable();

  confirmedDiseases = [];
  previousVisitConfirmedDiseases = new BehaviorSubject<any>(
    this.confirmedDiseases
  );
  previousVisitConfirmedDiseases$ =
    this.previousVisitConfirmedDiseases.asObservable();


    infantData: boolean = false;
    fetchInfantData = new BehaviorSubject<boolean>(this.infantData);
    fetchInfantDataCheck$ = this.fetchInfantData.asObservable();

    setInfantDataFetch(infantData) {
      this.fetchInfantData.next(infantData);
    }


    familyData: boolean = false;
    fetchFamilyData = new BehaviorSubject<boolean>(this.familyData);
    fetchFamilyDataCheck$ = this.fetchFamilyData.asObservable();

    setFamilyDataFetch(familyData) {
      this.fetchFamilyData.next(familyData);
    }


  setCapturedHistoryByNurse(historyResponse) {
    this.populateHistoryResponse.next(historyResponse);
  }
  setCapturedCaserecordDeatilsByDoctor(caserecordResponse) {
    this.populateCaserecordResponse.next(caserecordResponse);
  }
  setPreviousVisitConfirmedDiseases(confirmedDiseases) {
    this.previousVisitConfirmedDiseases.next(confirmedDiseases);
  }

  getDoctorWorklist() {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let fetchUrl =
      localStorage.getItem("providerServiceID") +
      `/${localStorage.getItem("serviceID")}/${vanID}`;
    return this.http
      .get(environment.doctorWorkList + fetchUrl)
      .map((res) => res.json());
    // return this.http.get(environment.doctorWorkList + localStorage.getItem('providerServiceID'))
    //   .map(res => res.json());
  }

  getPreviousInfantAndImmunizationHistoryDetails(
    neonatalImmunizationHistoryData
  ) {
    this.InfantAndImmunizationHistoryDetails.next(
      neonatalImmunizationHistoryData
    );
  }

  clearPreviousInfantAndImmunizationHistoryDetails() {
    this.InfantAndImmunizationHistoryDetails.next(null);
  }

  getBenFamilyDetailsRevisit(benFamilyPlanningDetails) {
    this.benfamilyPlanningData.next(benFamilyPlanningDetails);
  }

  postNCDscreeningCaseRecordDiagnosis(diagnosisForm, otherDetails) {
    let diagnosisFormData = Object.assign(
      {},
      diagnosisForm.value,
      otherDetails
    );
    return diagnosisFormData;
  }
  postDoctorNCDScreeningDetails(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];

    let NCDScreeningDetails = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postNCDscreeningCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
      patientMedicalForm.controls["provideCounselling"].controls[
        "counsellingProvidedList"
      ].value,
      refer: this.postGeneralRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "Doctor Covid CARE Visit Details",
      JSON.stringify(NCDScreeningDetails, null, 4)
    );

    return this.http
      .post(environment.saveDoctorNCDScreeningDetails, NCDScreeningDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
  }
  getServiceOnState() {
    return this.http
      .post(environment.getServiceOnStateUrl, {})
      .map((res) => res.json());
  }
  updateBeneficiaryArrivalStatus(arrivalStatusDetails) {
    return this.http
      .post(environment.updateBeneficiaryArrivalStatusUrl, arrivalStatusDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  cancelBeneficiaryTCRequest(tcRequest) {
    return this.http
      .post(environment.cancelBeneficiaryTCRequestUrl, tcRequest)
      .map((res) => res.json());
  }

  getSpecialistWorklist() {
    return this.http
      .get(
        environment.specialistWorkListURL +
          localStorage.getItem("providerServiceID") +
          `/${localStorage.getItem("serviceID")}/${localStorage.getItem(
            "userID"
          )}`
      )
      .map((res) => res.json());
  }

  getDoctorFutureWorklist() {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let fetchUrl =
      localStorage.getItem("providerServiceID") +
      `/${localStorage.getItem("serviceID")}/${vanID}`;
    return this.http
      .get(environment.doctorFutureWorkList + fetchUrl)
      .map((res) => res.json());
  }

  getSpecialistFutureWorklist() {
    return this.http
      .get(
        environment.specialistFutureWorkListURL +
          localStorage.getItem("providerServiceID") +
          `/${localStorage.getItem("serviceID")}/${localStorage.getItem(
            "userID"
          )}`
      )
      .map((res) => res.json());
  }

  getRadiologistWorklist() {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let fetchUrl =
      localStorage.getItem("providerServiceID") +
      `/${localStorage.getItem("serviceID")}/${vanID}`;
    return this.http
      .get(environment.radiologistWorklist + fetchUrl)
      .map((res) => res.json());
  }

  getOncologistWorklist() {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let fetchUrl =
      localStorage.getItem("providerServiceID") +
      `/${localStorage.getItem("serviceID")}/${vanID}`;
    return this.http
      .get(environment.oncologistWorklist + fetchUrl)
      .map((res) => res.json());
  }

  confirmStatus(benVisitID: any) {
    return this.http
      .post(environment.updateVisitStatus, { benVisitID: benVisitID })
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  // getPreviousVisitDetails(benRegID) {
  //   return this.http.post(environment.getPreviousVisitDetailsUrl, { benRegID: benRegID })
  //     .map(res => res.json().data);
  // }

  getMMUHistory() {
    const benRegID = localStorage.getItem("beneficiaryRegID");
    return this.http
      .post(environment.previousMMUHistoryUrl, { beneficiaryRegID: benRegID })
      .map((res) => res.json());
  }

  getTMHistory() {
    const benRegID = localStorage.getItem("beneficiaryRegID");
    return this.http
      .post(environment.previousTMHistoryUrl, { beneficiaryRegID: benRegID })
      .map((res) => res.json());
  }

  getMCTSHistory() {
    const benRegID = localStorage.getItem("beneficiaryRegID");
    return this.http
      .post(environment.previousMCTSHistoryUrl, { beneficiaryRegID: benRegID })
      .map((res) => res.json());
  }

  get104History() {
    const benRegID = localStorage.getItem("beneficiaryRegID");
    return this.http
      .post(environment.previous104HistoryUrl, { beneficiaryRegID: benRegID })
      .map((res) => res.json());
  }

  /**
   **************************GENERAL OPD QUICK CONSULT**************************
   */

  postQuickConsultDetails(consultationData, tcRequest, isSpecialist) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let temp = {
      beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
      benVisitID: localStorage.getItem("visitID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      visitCode: localStorage.getItem("visitCode"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };
    let quickConsultation = Object.assign(
      {},
      consultationData.quickConsultation,
      temp
    );

    console.log("qc", JSON.stringify(quickConsultation, null, 4));
    return this.http
      .post(environment.saveDoctorGeneralQuickConsult, { quickConsultation })
      .map((res) => res.json()).pipe(shareReplay(1));
    // return Observable.of({statusCode: 5000, data:{ response: 'furrrr'} , errorMessage: 'furrrr'});
  }

  updateQuickConsultDetails(consultationData, tcRequest, isSpecialist) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let temp = {
      beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
      benVisitID: localStorage.getItem("visitID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      visitCode: localStorage.getItem("visitCode"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };
    let quickConsultation = Object.assign(
      {},
      consultationData.quickConsultation,
      temp
    );

    console.log(
      "updated quick consultation",
      JSON.stringify(quickConsultation, null, 4)
    );
    return this.http
      .post(environment.updateGeneralOPDQuickConsultDoctorDetails, {
        quickConsultation,
      })
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  /**
   **************************END OF GENERAL OPD QUICK CONSULT**************************
   */

  /**
   **************************NCD SCREENING**************************
   */

  getNcdScreeningDetails(beneficiaryID, benVisitID) {
    return this.http
      .post(environment.getNCDScreeningDetails, {
        benRegID: beneficiaryID,
        benVisitID: benVisitID,
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  getNcdScreeningForCbac() {
    return this.http
      .post(environment.getNcdScreeningDetailsForCbac, {
        beneficiaryRegId: localStorage.getItem("beneficiaryRegID"),
        // benVisitId: localStorage.getItem('visitID'),
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  reset() {
    this.screeninDataFromNurse.next(null);
  }

  updateNCDScreeningDetails(ncdScreeningFormValue, patientVisitFormValue) {
    let serviceDetails = {
      beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
      benVisitID: localStorage.getItem("visitID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      modifiedBy: localStorage.getItem("userName"),
      visitCode: localStorage.getItem("visitCode"),
      serviceID: localStorage.getItem("serviceID"),
    };
    let postNCDScreeningFormValue = JSON.parse(
      JSON.stringify(ncdScreeningFormValue)
    );

    // if (postNCDScreeningFormValue.screeningCondition) {
    //   postNCDScreeningFormValue.ncdScreeningConditionID = postNCDScreeningFormValue.screeningCondition.ncdScreeningConditionID;
    //   postNCDScreeningFormValue.screeningCondition = postNCDScreeningFormValue.screeningCondition.ncdScreeningCondition;
    // }

    if (postNCDScreeningFormValue.reasonForScreening) {
      postNCDScreeningFormValue.ncdScreeningReasonID =
        postNCDScreeningFormValue.reasonForScreening.ncdScreeningReasonID;
      postNCDScreeningFormValue.reasonForScreening =
        postNCDScreeningFormValue.reasonForScreening.ncdScreeningReason;
    }

    if (postNCDScreeningFormValue.diabeticStatus) {
      postNCDScreeningFormValue.diabeticStatusID =
        postNCDScreeningFormValue.diabeticStatus.bpAndDiabeticStatusID;
      postNCDScreeningFormValue.diabeticStatus =
        postNCDScreeningFormValue.diabeticStatus.bpAndDiabeticStatus;
    }

    if (postNCDScreeningFormValue.bloodPressureStatus) {
      postNCDScreeningFormValue.bloodPressureStatusID =
        postNCDScreeningFormValue.bloodPressureStatus.bpAndDiabeticStatusID;
      postNCDScreeningFormValue.bloodPressureStatus =
        postNCDScreeningFormValue.bloodPressureStatus.bpAndDiabeticStatus;
    }

    if (postNCDScreeningFormValue.labTestOrders) {
      // procedureName
      let bP = false;
      let bG = false;

      postNCDScreeningFormValue.labTestOrders.filter((item) => {
        if (item.procedureName == "BP Measurement") {
          bP = true;
        }
        if (item.procedureName == "Blood Glucose Measurement") {
          bG = true;
        }
      });
      postNCDScreeningFormValue.isBloodGlucosePrescribed = bG;
      postNCDScreeningFormValue.isBPPrescribed = bP;
    }

    let ncdScreeningDetails = Object.assign(
      {},
      postNCDScreeningFormValue,
      serviceDetails,
      { benFlowID: localStorage.getItem("benFlowID") },
      patientVisitFormValue.patientFileUploadDetailsForm
    );
    console.log(
      "Update NCD Screening Data",
      JSON.stringify(ncdScreeningDetails, null, 4)
    );

    return this.http
      .post(environment.updateNCDScreeningDetails, ncdScreeningDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  /**
   **************************END OF NCD SCREENING**************************
   */

  /**
   **************************ANC**************************
   */

  postDoctorANCDetails(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;

    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];

    let ancVisitDetails = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postANCCaseRecordDiagnosis(diagnosisForm, otherDetails),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
      patientMedicalForm.controls["provideCounselling"].controls[
        "counsellingProvidedList"
      ].value,
      refer: this.postGeneralRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "ANC Doctor Visit Details",
      JSON.stringify(ancVisitDetails, null, 4)
    );

    // return Observable.of(null);
    return this.http
      .post(environment.saveDoctorANCDetails, ancVisitDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  updateANCDetails(patientANCForm, temp) {
    let updatedANCDetails = {
      ancObstetricDetails: this.updateANCDetailsandObstetricFormula(
        patientANCForm,
        temp
      ),
      ancImmunization: this.updateANCImmunization(
        patientANCForm.controls.patientANCImmunizationForm,
        temp
      ),
    };
    return this.http
      .post(
        environment.updateANCDetailsUrl,
        Object.assign({}, updatedANCDetails, temp)
      )
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  updateANCDetailsandObstetricFormula(patientANCForm, temp) {
    let detailedANC = JSON.parse(
      JSON.stringify(patientANCForm.controls.patientANCDetailsForm.value)
    );
    let obstetricFormula = JSON.parse(
      JSON.stringify(patientANCForm.controls.obstetricFormulaForm.value)
    );
    let combinedANCForm = Object.assign(
      {},
      detailedANC,
      {
        gravida_G: obstetricFormula.gravida_G,
        // termDeliveries_T: obstetricFormula.termDeliveries_T,
        // pretermDeliveries_P: obstetricFormula.pretermDeliveries_P,
        para: obstetricFormula.para,
        abortions_A: obstetricFormula.abortions_A,
        stillBirth: obstetricFormula.stillBirth,
        livebirths_L: obstetricFormula.livebirths_L,
        bloodGroup: obstetricFormula.bloodGroup,
      },
      temp
    );

    return combinedANCForm;
  }

  updateANCImmunization(immunizationForm, temp) {
    let immunizationData = Object.assign({}, immunizationForm.value, temp);
    return immunizationData;
  }

  getAncCareDetails(beneficiaryID: string, visitID: string) {
    return this.http
      .post(environment.getANCDetailsUrl, {
        benRegID: beneficiaryID,
        benVisitID: visitID,
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }
  getAncCareDetailsRevisit(beneficiaryID: string) {
    return this.http
      .post(environment.getANCDetailsUrl, {
        benRegID: beneficiaryID,
      })
      .map((res) => res.json());
  }

  /**
   **************************END OF ANC**************************
   */

  /**
   **************************General OPD**************************
   */

  postDoctorGeneralOPDDetails(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    console.log("message", patientMedicalForm);
    let patientVisitDetailForm =  (<FormGroup>(
      patientMedicalForm.controls["patientVisitForm"].controls["patientVisitDetailsForm"]))
    ;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];

    let generalVisitDetails = {
      subVisitCategory: patientVisitDetailForm.controls.subVisitCategory.value,
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postGeneralOPDCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
      patientMedicalForm.controls["provideCounselling"].controls[
        "counsellingProvidedList"
      ].value,
      refer: this.postGeneralRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "Doctor Visit Details",
      JSON.stringify(generalVisitDetails, null, 4)
    );

    return this.http
      .post(environment.saveDoctorGeneralOPDDetails, generalVisitDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
    // return Observable.of({errorMessage: 'furrrr'});
  }

  /**
   **************************END OF GENERAL OPD**************************
   */

  /**
   **************************NCD Care**************************
   */

  postDoctorNCDCareDetails(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];

    let ncdCareVisitDetails = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postNCDCareCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
      patientMedicalForm.controls["provideCounselling"].controls[
        "counsellingProvidedList"
      ].value,
      refer: this.postGeneralRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "Doctor NCD CARE Visit Details",
      JSON.stringify(ncdCareVisitDetails, null, 4)
    );

    return this.http
      .post(environment.saveDoctorNCDCareDetails, ncdCareVisitDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
  }
  /**
   **************************END OF NCD CARE**************************
   */

  postDoctorCovidDetails(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];

    let covidVisitDetails = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postCovidCaseRecordDiagnosis(diagnosisForm, otherDetails),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
      patientMedicalForm.controls["provideCounselling"].controls[
        "counsellingProvidedList"
      ].value,
      refer: this.postGeneralRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "Doctor Covid-19 Screening Visit Details",
      JSON.stringify(covidVisitDetails, null, 4)
    );

    return this.http
      .post(environment.saveDoctorCovidDetails, covidVisitDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  /**
   **************************END OF COVID**************************
   */

  //  postDoctorCovidDetails(patientMedicalForm, otherDetails, tcRequest, isSpecialist) {
  //   let vanID = JSON.parse(localStorage.getItem('serviceLineDetails')).vanID;
  //   let parkingPlaceID = JSON.parse(localStorage.getItem('serviceLineDetails')).parkingPlaceID;
  //   let findingForm = (<FormGroup>patientMedicalForm.controls['patientCaseRecordForm']).controls['generalFindingsForm'];
  //   let investigationForm = (<FormGroup>patientMedicalForm.controls['patientCaseRecordForm']).controls['generalDoctorInvestigationForm'];
  //   let prescriptionForm = (<FormGroup>patientMedicalForm.controls['patientCaseRecordForm']).controls['drugPrescriptionForm'];
  //   let diagnosisForm = (<FormGroup>patientMedicalForm.controls['patientCaseRecordForm']).controls['generalDiagnosisForm'];
  //   let referForm = patientMedicalForm.controls['patientReferForm'];

  //   let covidVisitDetails = {
  //     "findings": this.postGeneralCaseRecordFindings(findingForm, otherDetails),
  //     "diagnosis": this.postCovidCaseRecordDiagnosis(diagnosisForm, otherDetails),
  //     "investigation": this.postGeneralCaseRecordInvestigation(investigationForm, otherDetails),
  //     "prescription": this.postGeneralCaseRecordPrescription(prescriptionForm, otherDetails),
  //     "refer": this.postGeneralRefer(referForm, otherDetails),
  //     "benFlowID": localStorage.getItem('benFlowID'),
  //     "beneficiaryID": localStorage.getItem('beneficiaryID'),
  //     "doctorFlag": localStorage.getItem('doctorFlag'),
  //     "nurseFlag": localStorage.getItem('nurseFlag'),
  //     "pharmacist_flag": localStorage.getItem('pharmacist_flag'),
  //     sessionID: localStorage.getItem('sessionID'),
  //     parkingPlaceID: parkingPlaceID, vanID: vanID,
  //     beneficiaryRegID: "" + localStorage.getItem('beneficiaryRegID'),
  //     providerServiceMapID: localStorage.getItem('providerServiceID'),
  //     visitCode: localStorage.getItem('visitCode'),
  //     benVisitID: localStorage.getItem('visitID'),
  //     serviceID: localStorage.getItem('serviceID'),
  //     createdBy: localStorage.getItem('userName'),
  //     tcRequest: tcRequest,
  //     isSpecialist: isSpecialist
  //   }

  //   console.log("Doctor Covid Visit Details", JSON.stringify(covidVisitDetails, null, 4));

  //   return this.http.post(environment.saveDoctorCovidDetails, covidVisitDetails)
  //     .map(res => res.json());
  // }

  /**
   **************************END OF Covid**************************
   */

  /**
   **************************COMMON TO ANC, GENRAL OPD, NCD CARE, PNC**************************
   */

  getVisitComplaint: any;
  getVisitComplaintDetails(beneficiaryID: string, visitID: string) {
    let visitCategory = localStorage.getItem("visitCategory");
    let otherDetails = Object.assign({
      benRegID: beneficiaryID,
      benVisitID: visitID,
      visitCode: localStorage.getItem("visitCode"),
    });

    if (!this.getVisitComplaint) {
      if (visitCategory == "General OPD (QC)") {
        this.getVisitComplaint = this.http
          .post(environment.getGeneralOPDQuickConsultVisitDetails, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "ANC") {
        this.getVisitComplaint = this.http
          .post(environment.getANCVisitDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "General OPD") {
        this.getVisitComplaint = this.http
          .post(environment.getGeneralOPDVisitDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "NCD screening") {
        this.getVisitComplaint = this.http
          .post(environment.getNCDScreeningVisitDetails, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "NCD care") {
        this.getVisitComplaint = this.http
          .post(environment.getNCDCareVisitDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "PNC") {
        return this.http
          .post(environment.getPNCVisitDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "COVID-19 Screening") {
        this.getVisitComplaint = this.http
          .post(environment.getCovidVisitDetails, otherDetails)
          .map((res) => res.json());
      }

      if (visitCategory == "FP & Contraceptive Services") {
        this.getVisitComplaint = this.http
          .post(environment.getFamilyPlanningVisitDetails, otherDetails)
          .map((res) => res.json());
      }

      if (
        visitCategory.toLowerCase() ==
        "neonatal and infant health care services"
      ) {
        this.getVisitComplaint = this.http
          .post(environment.getNeonatalVisitDetails, otherDetails)
          .map((res) => res.json());
      }

      if (
        visitCategory.toLowerCase() ==
        "childhood & adolescent healthcare services"
      ) {
        this.getVisitComplaint = this.http
          .post(environment.getChildAndAdolescentVisitDetails, otherDetails)
          .map((res) => res.json());
      }
    }
    return this.getVisitComplaint;
  }

  generalHistory: any;
  getGeneralHistoryDetails(benRegID, visitID) {
    let visitCategory = localStorage.getItem("visitCategory");
    let otherDetails = Object.assign({
      benRegID: benRegID,
      benVisitID: visitID,
      visitCode: localStorage.getItem("visitCode"),
    });
    if (!this.generalHistory) {
      if (visitCategory == "ANC") {
        this.generalHistory = this.http
          .post(environment.getANCHistoryDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "General OPD") {
        this.generalHistory = this.http
          .post(environment.getGeneralOPDHistoryDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "NCD care") {
        this.generalHistory = this.http
          .post(environment.getNCDCareHistoryDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "COVID-19 Screening") {
        this.generalHistory = this.http
          .post(environment.getCovidHistoryDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "PNC") {
        this.generalHistory = this.http
          .post(environment.getPNCHistoryDetailsUrl, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "NCD screening") {
        this.generalHistory = this.http
          .post(environment.getNCDScreeningHistoryDetails, otherDetails)
          .map((res) => res.json());
      }
    }
    return this.generalHistory;
  }

  getGenericVitals(beneficiary) {
    let otherDetails = Object.assign({}, beneficiary, {
      visitCode: localStorage.getItem("visitCode"),
    });
    let visitCategory = localStorage.getItem("visitCategory");
    if (visitCategory == "General OPD (QC)") {
      return this.http
        .post(environment.getGeneralOPDQuickConsultVitalDetails, otherDetails)
        .map((res) => res.json().data);
    }
    if (visitCategory == "ANC") {
      return this.http
        .post(environment.getANCVitalsDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }
    if (visitCategory == "General OPD") {
      return this.http
        .post(environment.getGeneralOPDVitalDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }

    if (visitCategory == "NCD care") {
      return this.http
        .post(environment.getNCDCareVitalDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }

    if (visitCategory == "COVID-19 Screening") {
      return this.http
        .post(environment.getCovidVitalDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }

    if (visitCategory == "PNC") {
      return this.http
        .post(environment.getPNCVitalsDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }
    if (visitCategory == "NCD screening") {
      return this.http
        .post(environment.getNCDSceeriningVitalDetails, otherDetails)
        .map((res) => res.json().data);
    }

    if (visitCategory == "FP & Contraceptive Services") {
      return this.http
        .post(environment.getFamilyPlanningVitalDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }

    if (
      visitCategory.toLowerCase() == "neonatal and infant health care services"
    ) {
      return this.http
        .post(environment.getNeonatalVitalsDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }
    if (
      visitCategory.toLowerCase() ==
      "childhood & adolescent healthcare services"
    ) {
      return this.http
        .post(environment.getChildAndAdolescentVitalsDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }
  }
  getRBSPreviousVitals(beneficiary) {
    let visitCategory = localStorage.getItem("visitCategory");
    if (visitCategory == "NCD screening") {
      return this.http
        .post(environment.getNCDSceeriningVitalDetails, beneficiary)
        .map((res) => res.json().data);
    }
  }

  getGenericVitalsForMMULabReport(beneficiary) {
    let otherDetails = Object.assign({}, beneficiary, {
      visitCode: localStorage.getItem("referredVisitCode"),
    });
    let visitCategory = localStorage.getItem("visitCategory");
    if (visitCategory == "General OPD (QC)") {
      return this.http
        .post(environment.getGeneralOPDQuickConsultVitalDetails, otherDetails)
        .map((res) => res.json().data);
    }
    if (visitCategory == "ANC") {
      return this.http
        .post(environment.getANCVitalsDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }
    if (visitCategory == "General OPD") {
      return this.http
        .post(environment.getGeneralOPDVitalDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }

    if (visitCategory == "NCD care") {
      return this.http
        .post(environment.getNCDCareVitalDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }

    if (visitCategory == "COVID-19 Screening") {
      return this.http
        .post(environment.getCovidVitalDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }

    if (visitCategory == "PNC") {
      return this.http
        .post(environment.getPNCVitalsDetailsUrl, otherDetails)
        .map((res) => res.json().data);
    }
    if (visitCategory == "NCD screening") {
      return this.http
        .post(environment.getNCDSceeriningVitalDetails, otherDetails)
        .map((res) => res.json().data);
    }
  }

  getGeneralExamintionData(beneficiaryID: string, visitID: string) {
    let visitCategory = localStorage.getItem("visitCategory");
    let otherDetails = Object.assign({
      benRegID: beneficiaryID,
      benVisitID: visitID,
      visitCode: localStorage.getItem("visitCode"),
    });

    if (visitCategory == "ANC") {
      return this.http
        .post(environment.getANCExaminationDataUrl, otherDetails)
        .map((res) => res.json());
    }
    if (visitCategory == "General OPD") {
      return this.http
        .post(environment.getGeneralOPDExaminationDetailsUrl, otherDetails)
        .map((res) => res.json());
    }
    if (visitCategory == "PNC") {
      return this.http
        .post(environment.getPNCExaminationDataUrl, otherDetails)
        .map((res) => res.json());
    }
  }

  updateGeneralHistory(generalHistoryForm, temp, beneficiaryAge) {
    let visitCategory = localStorage.getItem("visitCategory");
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let updatedHistoryDetails = {
      pastHistory: this.updateGeneralPastHistory(
        generalHistoryForm.controls.pastHistory,
        temp
      ),
      comorbidConditions: this.updateGeneralComorbidityHistory(
        generalHistoryForm.controls.comorbidityHistory,
        temp
      ),
      medicationHistory: this.updateGeneralMedicationHistory(
        generalHistoryForm.controls.medicationHistory,
        temp
      ),
      femaleObstetricHistory: this.updateGeneralPastObstetricHistory(
        generalHistoryForm.controls.pastObstericHistory,
        temp
      ),
      menstrualHistory: this.updateGeneralMenstrualHistory(
        generalHistoryForm.controls.menstrualHistory,
        temp
      ),
      familyHistory: this.updateGeneralFamilyHistory(
        generalHistoryForm.controls.familyHistory,
        temp
      ),
      personalHistory: this.updateGeneralPersonalHistory(
        generalHistoryForm.controls.personalHistory,
        temp
      ),
      childVaccineDetails: this.updateGeneralOtherVaccines(
        generalHistoryForm.controls.otherVaccines,
        temp
      ),
      immunizationHistory: this.updateGeneralImmunizationHistory(
        generalHistoryForm.controls.immunizationHistory,
        temp
      ),
      developmentHistory: this.updateGeneralDevelopmentHistory(
        generalHistoryForm.controls.developmentHistory,
        temp
      ),
      feedingHistory: this.updateGeneralFeedingHistory(
        generalHistoryForm.controls.feedingHistory,
        temp
      ),
      perinatalHistroy: this.updateGeneralPerinatalHistory(
        generalHistoryForm.controls.perinatalHistory,
        temp
      ),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
    };

    console.log(
      "Update General History",
      JSON.stringify(updatedHistoryDetails, null, 4)
    );

    if (visitCategory == "ANC") {
      delete updatedHistoryDetails.feedingHistory;
      delete updatedHistoryDetails.developmentHistory;
      delete updatedHistoryDetails.perinatalHistroy;

      return this.http
        .post(environment.updateANCHistoryDetailsUrl, updatedHistoryDetails)
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "General OPD") {
      return this.http
        .post(
          environment.updateGeneralOPDHistoryDetailsUrl,
          updatedHistoryDetails
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "NCD care") {
      return this.http
        .post(environment.updateNCDCareHistoryDetailsUrl, updatedHistoryDetails)
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "COVID-19 Screening") {
      return this.http
        .post(environment.updateCovidHistoryDetailsUrl, updatedHistoryDetails)
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "PNC") {
      delete updatedHistoryDetails.feedingHistory;
      delete updatedHistoryDetails.developmentHistory;
      delete updatedHistoryDetails.perinatalHistroy;

      return this.http
        .post(environment.updatePNCHistoryDetailsUrl, updatedHistoryDetails)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }

  updateGeneralDevelopmentHistory(developmentHistoryForm, otherDetails) {
    let developmentHistoryFormValue = JSON.parse(
      JSON.stringify(developmentHistoryForm.value)
    );
    let developmentData = Object.assign(
      {},
      developmentHistoryFormValue,
      otherDetails
    );
    return developmentData;
  }

  updateGeneralFeedingHistory(feedingHistoryForm, otherDetails) {
    let feedingHistoryFormValue = JSON.parse(
      JSON.stringify(feedingHistoryForm.value)
    );
    let feedingHistoryData = Object.assign(
      {},
      feedingHistoryFormValue,
      otherDetails,
      {
        foodIntoleranceStatus: +feedingHistoryFormValue.foodIntoleranceStatus,
      }
    );
    return feedingHistoryData;
  }

  updateGeneralPerinatalHistory(perinatalHistroyForm, otherDetails) {
    let temp = JSON.parse(JSON.stringify(perinatalHistroyForm.value));
    if (temp.placeOfDelivery) {
      temp.deliveryPlaceID = temp.placeOfDelivery.deliveryPlaceID;
      temp.placeOfDelivery = temp.placeOfDelivery.deliveryPlace;
    }

    if (temp.typeOfDelivery) {
      temp.deliveryTypeID = temp.typeOfDelivery.deliveryTypeID;
      temp.typeOfDelivery = temp.typeOfDelivery.deliveryType;
    }

    if (temp.complicationAtBirth) {
      temp.complicationAtBirthID = temp.complicationAtBirth.complicationID;
      temp.complicationAtBirth = temp.complicationAtBirth.complicationValue;
    }
    let perinatalHistoryData = Object.assign({}, temp, otherDetails);
    return perinatalHistoryData;
  }

  updateGeneralPastHistory(pastHistory, otherDetails) {
    let pastHistoryForm = JSON.parse(JSON.stringify(pastHistory.value));
    let illness = pastHistoryForm.pastIllness.slice();
    illness.map((item) => {
      let temp = item.illnessType;
      if (temp) {
        item.illnessType = temp.illnessType;
        item.illnessTypeID = "" + temp.illnessID;
        item.timePeriodAgo = item.timePeriodAgo
          ? "" + item.timePeriodAgo
          : null;
      }
    });

    let surgery = pastHistoryForm.pastSurgery.slice();
    surgery.map((item) => {
      let temp = item.surgeryType;
      if (temp) {
        item.surgeryType = temp.surgeryType;
        item.surgeryID = "" + temp.surgeryID;
        item.timePeriodAgo = item.timePeriodAgo
          ? "" + item.timePeriodAgo
          : null;
      }
    });

    let historyData = Object.assign({}, pastHistoryForm.value, otherDetails, {
      pastIllness: illness,
      pastSurgery: surgery,
    });
    return historyData;
  }

  updateGeneralComorbidityHistory(comorbidityHistoryForm, otherDetails) {
    let comorbidityHistoryFormData = JSON.parse(
      JSON.stringify(comorbidityHistoryForm.value)
    );
    let comorbidityConcurrentConditions = Object.assign(
      [],
      comorbidityHistoryFormData.comorbidityConcurrentConditionsList
    );
    comorbidityConcurrentConditions.map((item, i) => {
      let temp = Object.assign({}, item.comorbidConditions);
      if (temp) {
        item.comorbidConditions = undefined;
        item.comorbidCondition = temp.comorbidCondition;
        if (temp.comorbidConditionID) {
          item.comorbidConditionID = "" + temp.comorbidConditionID;
        }
        if (
          item.isForHistory !== undefined &&
          item.isForHistory !== null &&
          item.isForHistory === true
        ) {
          item.isForHistory = false;
        } else {
          item.isForHistory = true;
        }
      }
    });
    let comorbidityData = Object.assign(
      {},
      comorbidityHistoryFormData,
      otherDetails
    );
    return comorbidityData;
  }

  updateGeneralMedicationHistory(medicationHistory, temp) {
    let formValue = JSON.parse(JSON.stringify(medicationHistory.value));
    let apiObject = Object.assign({}, formValue, temp);
    return apiObject;
  }

  updateGeneralPersonalHistory(personalHistoryForm, temp) {
    let personalHistoryFormValue = JSON.parse(
      JSON.stringify(personalHistoryForm.value)
    );
    let tobaccoList = personalHistoryFormValue.tobaccoList;
    if (tobaccoList) {
      tobaccoList.map((item) => {
        if (item.tobaccoUseType) {
          item.tobaccoUseTypeID = item.tobaccoUseType.personalHabitTypeID;
          item.tobaccoUseType = item.tobaccoUseType.habitValue;
        }
      });
    }

    let alcoholList = personalHistoryFormValue.alcoholList;
    if (alcoholList) {
      alcoholList.map((item) => {
        if (item.typeOfAlcohol) {
          item.alcoholTypeID = item.typeOfAlcohol.personalHabitTypeID;
          item.typeOfAlcohol = item.typeOfAlcohol.habitValue;
        }
        if (item.avgAlcoholConsumption)
          item.avgAlcoholConsumption = item.avgAlcoholConsumption.habitValue;
      });
    }

    let allergyList = personalHistoryFormValue.allergicList;
    if (allergyList) {
      allergyList.map((item) => {
        if (item.allergyType) item.allergyType = item.allergyType.allergyType;
        if (item.typeOfAllergicReactions) {
          item.typeOfAllergicReactions.map((value) => {
            value.allergicReactionTypeID = "" + value.allergicReactionTypeID;
          });
        }
      });
    }

    let personalHistoryData = Object.assign(
      {},
      personalHistoryFormValue,
      temp,
      {
        riskySexualPracticesStatus:
          personalHistoryFormValue.riskySexualPracticesStatus != undefined &&
          personalHistoryFormValue.riskySexualPracticesStatus != null
            ? +personalHistoryFormValue.riskySexualPracticesStatus
            : null,
        tobaccoList: tobaccoList,
        alcoholList: alcoholList,
        allergicList: allergyList,
      }
    );
    console.log("docrisky", personalHistoryFormValue);
    console.log("docriskyyy", personalHistoryForm);
    return personalHistoryData;
  }

  updateGeneralFamilyHistory(familyHistoryForm, temp) {
    let familyHistoryFormValue = JSON.parse(
      JSON.stringify(familyHistoryForm.value)
    );
    let familyDiseaseList = familyHistoryFormValue.familyDiseaseList;

    familyDiseaseList.map((item) => {
      if (item.diseaseType) {
        item.diseaseTypeID = "" + item.diseaseType.diseaseTypeID;
        item.diseaseType = item.diseaseType.diseaseType;
        // item.snomedCode = item.diseaseType.snomedCode;
        // item.snomedTerm = item.diseaseType.snomedTerm;
      }
    });
    let familyHistoryData = Object.assign({}, familyHistoryFormValue, temp);
    return familyHistoryData;
  }

  updateGeneralMenstrualHistory(menstrualHistory, otherDetails) {
    let temp = JSON.parse(JSON.stringify(menstrualHistory.value));
    if (temp.menstrualCycleStatus) {
      temp.menstrualCycleStatusID =
        "" + temp.menstrualCycleStatus.menstrualCycleStatusID;
      temp.menstrualCycleStatus = temp.menstrualCycleStatus.name;
    }

    if (temp.cycleLength) {
      temp.menstrualCyclelengthID = "" + temp.cycleLength.menstrualRangeID;
      temp.cycleLength = temp.cycleLength.menstrualCycleRange;
    }

    if (temp.bloodFlowDuration) {
      temp.menstrualFlowDurationID =
        "" + temp.bloodFlowDuration.menstrualRangeID;
      temp.bloodFlowDuration = temp.bloodFlowDuration.menstrualCycleRange;
    }

    // if (temp.problemName) {
    //   temp.menstrualProblemID = "" + temp.problemName.menstrualProblemID;
    //   temp.problemName = temp.problemName.name;
    // }

    if (
      temp.lMPDate == null ||
      temp.lMPDate == undefined ||
      temp.lMPDate == "Invalid Date"
    ) {
      delete temp["lMPDate"];
    }

    let menstrualHistoryData = Object.assign({}, temp, otherDetails);
    return menstrualHistoryData;
  }

  updateGeneralPastObstetricHistory(pastObstetricHistoryForm, temp) {
    let pastObstetricHistoryFormValue = JSON.parse(
      JSON.stringify(pastObstetricHistoryForm.value)
    );
    let pastObstetricList =
      pastObstetricHistoryFormValue.pastObstericHistoryList;

    pastObstetricList.map((item) => {
      // if (item.pregComplicationList) {
      //   item.pregComplicationList.map(complication => {
      //     complication.pregComplicationID = complication.complicationID;
      //     complication.pregComplicationType = complication.complicationType;
      //   })
      // }
      if (item.durationType) {
        item.pregDurationID = item.durationType.pregDurationID;
        item.durationType = item.durationType.durationType;
      }
      if (item.deliveryType) {
        item.deliveryTypeID = item.deliveryType.deliveryTypeID;
        item.deliveryType = item.deliveryType.deliveryType;
      }
      if (item.deliveryPlace) {
        item.deliveryPlaceID = item.deliveryPlace.deliveryPlaceID;
        item.deliveryPlace = item.deliveryPlace.deliveryPlace;
      }
      // if (item.deliveryComplicationType) {
      //   item.deliveryComplicationID = item.deliveryComplicationType.complicationID;
      //   item.deliveryComplicationType = item.deliveryComplicationType.complicationValue;
      // }
      // if (item.postpartumComplicationType) {
      //   item.postpartumComplicationID = item.postpartumComplicationType.complicationID;
      //   item.postpartumComplicationType = item.postpartumComplicationType.complicationValue;
      // }
      if (item.pregOutcome) {
        item.pregOutcomeID = item.pregOutcome.pregOutcomeID;
        item.pregOutcome = item.pregOutcome.pregOutcome;
      }
      // if (item.postNatalComplication) {
      //   item.postNatalComplicationID = item.postNatalComplication.complicationID;
      //   item.postNatalComplication = item.postNatalComplication.complicationValue;
      // }
      if (item.newBornComplication) {
        item.newBornComplicationID = item.newBornComplication.complicationID;
        item.newBornComplication = item.newBornComplication.complicationValue;
      }
    });
    let pastObstetricHistoryData = Object.assign(
      {},
      pastObstetricHistoryFormValue,
      temp,
      {
        femaleObstetricHistoryList:
          pastObstetricHistoryFormValue.pastObstericHistoryList,
        pastObstericHistoryList: undefined,
      }
    );
    return pastObstetricHistoryData;
  }

  updateGeneralImmunizationHistory(immunizationHistoryForm, temp) {
    let immunizationHistoryFormValue = JSON.parse(
      JSON.stringify(immunizationHistoryForm.value)
    );
    let formData = immunizationHistoryFormValue.immunizationList;
    // formData.forEach((item)=>{
    //   item.vaccines.forEach((vaccine)=>{
    //     vaccine.status = ""+vaccine.status
    //   })
    // })
    let immunizationHistoryData = Object.assign(
      {},
      { immunizationList: formData },
      temp
    );
    return immunizationHistoryData;
  }

  updateGeneralOtherVaccines(otherVaccinesForm, temp) {
    let otherVaccinesFormValue = JSON.parse(
      JSON.stringify(otherVaccinesForm.value)
    );
    let otherVaccines = otherVaccinesFormValue.otherVaccines;

    otherVaccines.map((vaccine) => {
      if (vaccine.vaccineName) {
        vaccine.vaccineID = vaccine.vaccineName.vaccineID;
        vaccine.vaccineName = vaccine.vaccineName.vaccineName;
      }
    });
    let otherVaccinesData = Object.assign(
      {},
      { childOptionalVaccineList: otherVaccines },
      temp
    );
    return otherVaccinesData;
  }

  updateGeneralVitals(patientVitalsForm, visitCategory) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let patientVitalData = Object.assign(
      {},
      patientVitalsForm.value,
      patientVitalsForm.getRawValue(),
      {
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        modifiedBy: localStorage.getItem("userName"),
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: parkingPlaceID,
        vanID: vanID,
        beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
        visitCode: localStorage.getItem("visitCode"),
        benVisitID: localStorage.getItem("visitID"),
      }
    );
    console.log("Vitals Form", patientVitalData);
    if (visitCategory == "ANC") {
      return this.http
        .post(environment.updateANCVitalsDetailsUrl, patientVitalData)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (visitCategory == "General OPD") {
      return this.http
        .post(environment.updateGeneralOPDVitalsDetailsUrl, patientVitalData)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (visitCategory == "NCD care") {
      return this.http
        .post(environment.updateNCDCareVitalsDetailsUrl, patientVitalData)
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "COVID-19 Screening") {
      return this.http
        .post(environment.updateCovidVitalsDetailsUrl, patientVitalData)
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "PNC") {
      return this.http
        .post(environment.updatePNCVitalsDetailsUrl, patientVitalData)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (visitCategory == "NCD screening") {
      return this.http
        .post(environment.updateNCDVitalsDetailsUrl, patientVitalData)
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "FP & Contraceptive Services") {
      return this.http
        .post(
          environment.updateFamilyPlanningVitalsDetailsUrl,
          patientVitalData
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }

  updateNeonatalVitals(neonatalVitalsForm, visitCategory) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let patientVitalData = Object.assign(
      {},
      neonatalVitalsForm.value,
      neonatalVitalsForm.getRawValue(),
      {
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        modifiedBy: localStorage.getItem("userName"),
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: parkingPlaceID,
        vanID: vanID,
        beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
        visitCode: localStorage.getItem("visitCode"),
        benVisitID: localStorage.getItem("visitID"),
      }
    );
    console.log("Vitals Form", patientVitalData);
    if (
      visitCategory.toLowerCase() == "neonatal and infant health care services"
    ) {
      return this.http
        .post(environment.updateNeonatalVitalsDetailsUrl, patientVitalData)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (
      visitCategory.toLowerCase() ==
      "childhood & adolescent healthcare services"
    ) {
      return this.http
        .post(
          environment.updateChildAndAdolescentVitalsDetailsUrl,
          patientVitalData
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }

  updatePatientExamination(
    patientExaminationForm,
    visitCategory,
    updateDetails
  ) {
    let updatedExaminationDetails;
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    if (visitCategory == "ANC") {
      updatedExaminationDetails = {
        generalExamination: this.updateGeneralExaminationForm(
          patientExaminationForm.generalExaminationForm,
          updateDetails
        ),
        headToToeExamination: this.updateHeadToToeExaminationForm(
          patientExaminationForm.headToToeExaminationForm,
          updateDetails
        ),
        cardioVascularExamination: this.updateCardioVascularSystemForm(
          patientExaminationForm.systemicExaminationForm
            .cardioVascularSystemForm,
          updateDetails
        ),
        respiratorySystemExamination: this.updateRespiratorySystemForm(
          patientExaminationForm.systemicExaminationForm.respiratorySystemForm,
          updateDetails
        ),
        centralNervousSystemExamination: this.updateCentralNervousSystemForm(
          patientExaminationForm.systemicExaminationForm
            .centralNervousSystemForm,
          updateDetails
        ),
        musculoskeletalSystemExamination: this.updateMusculoSkeletalSystemForm(
          patientExaminationForm.systemicExaminationForm
            .musculoSkeletalSystemForm,
          updateDetails
        ),
        genitoUrinarySystemExamination: this.updateGenitoUrinarySystemForm(
          patientExaminationForm.systemicExaminationForm
            .genitoUrinarySystemForm,
          updateDetails
        ),
        obstetricExamination: this.updateANCObstetricExamination(
          patientExaminationForm.systemicExaminationForm
            .obstetricExaminationForANCForm,
          updateDetails
        ),
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: parkingPlaceID,
        vanID: vanID,
        beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        visitCode: localStorage.getItem("visitCode"),
        benVisitID: localStorage.getItem("visitID"),
      };

      console.log(
        "Update ANC Examination",
        JSON.stringify(updatedExaminationDetails, null, 4)
      );

      return this.http
        .post(
          environment.updateANCExaminationDetailsUrl,
          updatedExaminationDetails
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "PNC") {
      updatedExaminationDetails = {
        generalExamination: this.updateGeneralExaminationForm(
          patientExaminationForm.generalExaminationForm,
          updateDetails
        ),
        headToToeExamination: this.updateHeadToToeExaminationForm(
          patientExaminationForm.headToToeExaminationForm,
          updateDetails
        ),
        gastroIntestinalExamination: this.updateGastroIntestinalSystemForm(
          patientExaminationForm.systemicExaminationForm
            .gastroIntestinalSystemForm,
          updateDetails
        ),
        cardioVascularExamination: this.updateCardioVascularSystemForm(
          patientExaminationForm.systemicExaminationForm
            .cardioVascularSystemForm,
          updateDetails
        ),
        respiratorySystemExamination: this.updateRespiratorySystemForm(
          patientExaminationForm.systemicExaminationForm.respiratorySystemForm,
          updateDetails
        ),
        centralNervousSystemExamination: this.updateCentralNervousSystemForm(
          patientExaminationForm.systemicExaminationForm
            .centralNervousSystemForm,
          updateDetails
        ),
        musculoskeletalSystemExamination: this.updateMusculoSkeletalSystemForm(
          patientExaminationForm.systemicExaminationForm
            .musculoSkeletalSystemForm,
          updateDetails
        ),
        genitoUrinarySystemExamination: this.updateGenitoUrinarySystemForm(
          patientExaminationForm.systemicExaminationForm
            .genitoUrinarySystemForm,
          updateDetails
        ),
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: parkingPlaceID,
        vanID: vanID,
        beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        visitCode: localStorage.getItem("visitCode"),
        benVisitID: localStorage.getItem("visitID"),
      };

      console.log(
        "Update PNC Examination",
        JSON.stringify(updatedExaminationDetails, null, 4)
      );

      return this.http
        .post(
          environment.updatePNCExaminationDetailsUrl,
          updatedExaminationDetails
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (visitCategory == "General OPD") {
      updatedExaminationDetails = {
        generalExamination: this.updateGeneralExaminationForm(
          patientExaminationForm.generalExaminationForm,
          updateDetails
        ),
        headToToeExamination: this.updateHeadToToeExaminationForm(
          patientExaminationForm.headToToeExaminationForm,
          updateDetails
        ),
        // oralDetails: this.updateOralExaminationForm(
        //   patientExaminationForm.oralExaminationForm,
        //   updateDetails
        // ),
        gastroIntestinalExamination: this.updateGastroIntestinalSystemForm(
          patientExaminationForm.systemicExaminationForm
            .gastroIntestinalSystemForm,
          updateDetails
        ),
        cardioVascularExamination: this.updateCardioVascularSystemForm(
          patientExaminationForm.systemicExaminationForm
            .cardioVascularSystemForm,
          updateDetails
        ),
        respiratorySystemExamination: this.updateRespiratorySystemForm(
          patientExaminationForm.systemicExaminationForm.respiratorySystemForm,
          updateDetails
        ),
        centralNervousSystemExamination: this.updateCentralNervousSystemForm(
          patientExaminationForm.systemicExaminationForm
            .centralNervousSystemForm,
          updateDetails
        ),
        musculoskeletalSystemExamination: this.updateMusculoSkeletalSystemForm(
          patientExaminationForm.systemicExaminationForm
            .musculoSkeletalSystemForm,
          updateDetails
        ),
        genitoUrinarySystemExamination: this.updateGenitoUrinarySystemForm(
          patientExaminationForm.systemicExaminationForm
            .genitoUrinarySystemForm,
          updateDetails
        ),
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: parkingPlaceID,
        vanID: vanID,
        beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        visitCode: localStorage.getItem("visitCode"),
        benVisitID: localStorage.getItem("visitID"),
      };

      console.log(
        "Update General OPD Examination",
        JSON.stringify(updatedExaminationDetails, null, 4)
      );

      return this.http
        .post(
          environment.updateGeneralOPDExaminationDetailsUrl,
          updatedExaminationDetails
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }

  updateGeneralExaminationForm(generalExaminationForm, updateDetails) {
    let generalExaminationFormdata = Object.assign(
      {},
      generalExaminationForm,
      updateDetails
    );
    return generalExaminationFormdata;
  }

  updateHeadToToeExaminationForm(headToToeExaminationForm, updateDetails) {
    let headToToeExaminationFormData = Object.assign(
      {},
      headToToeExaminationForm,
      updateDetails
    );
    return headToToeExaminationFormData;
  }

  updateOralExaminationForm(oralExaminationForm, updateDetails) {
    if (oralExaminationForm.dirty) {
      if (oralExaminationForm.preMalignantLesionTypeList != null) {
        let index =
          oralExaminationForm.preMalignantLesionTypeList.indexOf(
            "Any other lesion"
          );
        if (
          index > -1 &&
          index == oralExaminationForm.preMalignantLesionTypeList.length - 1
        ) {
          oralExaminationForm.preMalignantLesionTypeList.pop();
          oralExaminationForm.preMalignantLesionTypeList.push(
            oralExaminationForm.otherLesionType
          );
        }
      }
      oralExaminationForm = Object.assign({}, oralExaminationForm, {
        otherLesionType: undefined,
      });
    }
    let oralExaminationFormData = Object.assign(
      {},
      oralExaminationForm,
      updateDetails
    );
    return oralExaminationFormData;
  }

  updateGastroIntestinalSystemForm(gastroIntestinalSystemForm, updateDetails) {
    let gastroIntestinalSystemFormData = Object.assign(
      {},
      gastroIntestinalSystemForm,
      updateDetails
    );
    return gastroIntestinalSystemFormData;
  }

  updateCardioVascularSystemForm(cardioVascularSystemForm, updateDetails) {
    let cardioVascularSystemFormData = Object.assign(
      {},
      cardioVascularSystemForm,
      updateDetails
    );
    return cardioVascularSystemFormData;
  }

  updateRespiratorySystemForm(respiratorySystemForm, updateDetails) {
    let respiratorySystemFormData = Object.assign(
      {},
      respiratorySystemForm,
      updateDetails
    );
    return respiratorySystemFormData;
  }

  updateCentralNervousSystemForm(centralNervousSystemForm, updateDetails) {
    let centralNervousSystemFormData = Object.assign(
      {},
      centralNervousSystemForm,
      updateDetails
    );
    return centralNervousSystemFormData;
  }

  updateMusculoSkeletalSystemForm(musculoSkeletalSystemForm, updateDetails) {
    let musculoSkeletalSystemFormData = Object.assign(
      {},
      musculoSkeletalSystemForm,
      updateDetails
    );
    return musculoSkeletalSystemFormData;
  }

  updateGenitoUrinarySystemForm(genitoUrinarySystemForm, updateDetails) {
    let genitoUrinarySystemFormData = Object.assign(
      {},
      genitoUrinarySystemForm,
      updateDetails
    );
    return genitoUrinarySystemFormData;
  }

  updateANCObstetricExamination(obstetricExaminationForANCForm, updateDetails) {
    let obstetricExaminationForANCFormData = Object.assign(
      {},
      obstetricExaminationForANCForm,
      updateDetails
    );
    return obstetricExaminationForANCFormData;
  }

  postGeneralCaseRecordFindings(findingForm, otherDetails) {
    let findingFormValue = JSON.parse(JSON.stringify(findingForm.value));
    let complaints = findingFormValue.complaints;
    complaints = complaints.filter((item) => !!item.chiefComplaint);
    complaints.map((item) => {
      if (item.chiefComplaint) {
        item.chiefComplaintID = item.chiefComplaint.chiefComplaintID;
        item.chiefComplaint = item.chiefComplaint.chiefComplaint;
      }
      item.duration = item.duration ? "" + item.duration : null;
      return item;
    });

    let findingFormData = Object.assign(
      {},
      findingFormValue,
      { complaints },
      otherDetails
    );
    return findingFormData;
  }

 
  postANCCaseRecordDiagnosis(diagnosisForm, otherDetails) {
    let diagnosisFormData = Object.assign(
      {},
      diagnosisForm.value,
      otherDetails
    );
    if (diagnosisForm.value.dateOfDeath == null) {
      delete diagnosisFormData["dateOfDeath"];
    }
    return diagnosisFormData;
  }

  postGeneralOPDCaseRecordDiagnosis(diagnosisForm, otherDetails) {
    let diagnosisFormData = Object.assign(
      {},
      diagnosisForm.value,
      otherDetails
    );
    return diagnosisFormData;
  }

  postFamilyPlanningCaseRecordDiagnosis(diagnosisForm, otherDetails) {
    let diagnosisFormData = Object.assign(
      {},
      diagnosisForm.value,
      otherDetails
    );
    return diagnosisFormData;
  }

  postNeonatalCaseRecordDiagnosis(diagnosisForm, otherDetails) {
    let diagnosisFormData = Object.assign(
      {},
      diagnosisForm.value,
      otherDetails
    );
    return diagnosisFormData;
  }

  postChildAndAdolescentCaseRecordDiagnosis(diagnosisForm, otherDetails) {
    let diagnosisFormData = Object.assign(
      {},
      diagnosisForm.value,
      otherDetails
    );
    return diagnosisFormData;
  }

  postCovidCaseRecordDiagnosis(diagnosisForm, otherDetails) {
    let diagnosisFormData = Object.assign(
      {},
      diagnosisForm.value,
      otherDetails
    );
    return diagnosisFormData;
  }

  // postNCDCareCaseRecordDiagnosis(diagnosisForm, otherDetails) {
  //   let diagnosisFormData = JSON.parse(JSON.stringify(diagnosisForm.value));

  //   if (diagnosisFormData.ncdScreeningCondition) {
  //     diagnosisFormData.ncdScreeningConditionID =
  //       diagnosisFormData.ncdScreeningCondition.ncdScreeningConditionID;
  //     diagnosisFormData.ncdScreeningCondition =
  //       diagnosisFormData.ncdScreeningCondition.screeningCondition;
  //   }

  //   if (diagnosisFormData.ncdCareType) {
  //     diagnosisFormData.ncdCareTypeID =
  //       diagnosisFormData.ncdCareType.ncdCareTypeID;
  //     diagnosisFormData.ncdCareType = diagnosisFormData.ncdCareType.ncdCareType;
  //   }

  //   let diagnosisData = Object.assign({}, diagnosisFormData, otherDetails);
  //   return diagnosisData;
  // }

  postNCDCareCaseRecordDiagnosis(diagnosisForm, otherDetails) {
    let diagnosisFormData = JSON.parse(JSON.stringify(diagnosisForm.value));

    if (diagnosisFormData.ncdScreeningCondition) {
      diagnosisFormData.ncdScreeningConditionID =
        diagnosisFormData.ncdScreeningCondition.ncdScreeningConditionID;
      diagnosisFormData.ncdScreeningCondition =
        diagnosisFormData.ncdScreeningCondition.screeningCondition;
    }

    if (diagnosisFormData.ncdCareType) {
      diagnosisFormData.ncdCareTypeID =
        diagnosisFormData.ncdCareType.ncdCareTypeID;
      diagnosisFormData.ncdCareType = diagnosisFormData.ncdCareType.ncdCareType;
    }

    let diagnosisData = Object.assign({}, diagnosisFormData, otherDetails);
    return diagnosisData;
    // let diagnosisFormData = Object.assign(
    //   {},
    //   diagnosisForm.value,
    //   otherDetails
    // );
    // return diagnosisFormData;
  }


  postGeneralCaseRecordInvestigation(investigationForm, otherDetails) {
    let investigationFormValue = JSON.parse(
      JSON.stringify(investigationForm.value)
    );
    let labTest = [];
    if (
      !!investigationFormValue.labTest &&
      !!investigationFormValue.radiologyTest
    ) {
      if (investigationFormValue.radiologyTest == null) {
        labTest = investigationFormValue.labTest;
      } else {
        labTest = investigationFormValue.labTest.concat(
          investigationFormValue.radiologyTest
        );
      }
    }

    let temp = labTest.filter((test) => {
      return !test.disabled;
    });
    labTest = temp.slice();
    let investigationFormData = Object.assign(
      {},
      investigationFormValue,
      otherDetails,
      { laboratoryList: labTest, radiologyTest: undefined, labTest: undefined }
    );

    return investigationFormData;
  }

  postGeneralCaseRecordPrescription(prescriptionForm, otherDetails) {
    const prescriptionFormValue = JSON.parse(
      JSON.stringify(prescriptionForm.value)
    );
    let prescribedDrugs = prescriptionFormValue.prescribedDrugs;
    prescribedDrugs = prescribedDrugs.filter((item) => !!item.createdBy);
    console.log("these to send", prescribedDrugs);
    return prescribedDrugs;
  }

  postFamilyCaseRecordTreatmentOnSideEffects(sideEffectsForm) {
    const treatmentSideEffectsFormValue = JSON.parse(
      JSON.stringify(sideEffectsForm.value)
    );
    let listOfSideEffects =
      treatmentSideEffectsFormValue.treatmentsOnSideEffects;

    return listOfSideEffects;
  }

  deleteMedicine(id) {
    return this.http
      .post(environment.drugDeleteUrl, { id })
      .map((res) => res.json());
    // return Observable.of({
    //   statusCode: 200,
    //   data: {
    //     msg: 'success'
    //   }
    // });
  }

  postGeneralRefer(referForm, otherDetails) {
    console.log("testt1279" + referForm);
    let referFormData = JSON.parse(JSON.stringify(referForm.value));
    if (referFormData.referredToInstituteName) {
      referFormData.referredToInstituteID =
        referFormData.referredToInstituteName.institutionID;
      referFormData.referredToInstituteName =
        referFormData.referredToInstituteName.institutionName;
    }

    if (referFormData.refrredToAdditionalServiceList) {
      let temp = referFormData.refrredToAdditionalServiceList.filter((item) => {
        return !item.disabled;
      });
      referFormData.refrredToAdditionalServiceList = temp.slice();
    }
    if (referFormData.referralReason) {
      referFormData.referralReason = referForm.controls["referralReason"].value;
    }
    if (referFormData.revisitDate) {
      referFormData.revisitDate = referForm.controls["revisitDate"].value;
    }

    let referData = Object.assign({}, referFormData, otherDetails);
    return referData;
  }

  postFamilyPlanningRefer(referForm, otherDetails) {
    let referFormData = JSON.parse(JSON.stringify(referForm.value));
    if (referFormData.referredToInstituteName) {
      referFormData.referredToInstituteID =
        referFormData.referredToInstituteName.institutionID;
      referFormData.referredToInstituteName =
        referFormData.referredToInstituteName.institutionName;
    }

    if (referFormData.otherReferredToInstituteName) {
      referFormData.otherReferredToInstituteName =
        referForm.controls["otherReferredToInstituteName"].value;
    }

    if (referFormData.referralReasonList) {
      referFormData.referralReasonList =
        referForm.controls["referralReasonList"].value;
    }

    if (referFormData.otherReferralReason) {
      referFormData.otherReferralReason =
        referForm.controls["otherReferralReason"].value;
    }
    if (referFormData.revisitDate) {
      referFormData.revisitDate = referForm.controls["revisitDate"].value;
    }

    let referData = Object.assign({}, referFormData, otherDetails);
    return referData;
  }

  /**
   * Post Oncologist Remarks on Cancer Casesheet, Later on, If Required, Move this is Oncologist Service
   */
  postOncologistRemarksforCancerCaseSheet(remarks, visitID, regID) {
    return this.http
      .post(environment.updateOncologistRemarksCancelUrl, {
        beneficiaryRegID: regID,
        benVisitID: visitID,
        modifiedBy: localStorage.getItem("userName"),
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        visitCode: localStorage.getItem("visitCode"),
        provisionalDiagnosisOncologist: remarks,
      })
      .map((res) => res.json());
  }

  getHistoricalTrends() {
    // return this.http.post(this.getHistoricalTrendsUrl,{})
    // .map(res => res.json())
  }

  clearCache() {
    this.generalHistory = null;
    this.getVisitComplaint = null;
    this.caseRecordAndReferDetails = null;
    this.caseRecordAndReferDetails1 = null;
  }

  postDoctorPNCDetails(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];

    let pncVisitDetails = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postANCCaseRecordDiagnosis(diagnosisForm, otherDetails),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
      patientMedicalForm.controls["provideCounselling"].controls[
        "counsellingProvidedList"
      ].value,
      refer: this.postGeneralRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "PNC Doctor Visit Details",
      JSON.stringify(pncVisitDetails, null, 4)
    );

    return this.http
      .post(environment.savePNCDoctorDetailsUrl, pncVisitDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  getPNCDetails(beneficiaryID: string, visitID: string) {
    return this.http
      .post(environment.getPNCDetailsUrl, {
        benRegID: beneficiaryID,
        benVisitID: visitID,
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  getPreviousPNCDetails(beneficiaryID: string) {
    return this.http
      .post(environment.getPNCDetailsUrl, {
        benRegID: beneficiaryID,
      })
      .map((res) => res.json());
  }

  getCovidDetails(beneficiaryID: string, visitID: string) {
    return this.http
      .post(environment.getPNCDetailsUrl, {
        benRegID: beneficiaryID,
        benVisitID: visitID,
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  updatePNCDetails(patientPNCForm, otherDetails) {
    let temp = JSON.parse(JSON.stringify(patientPNCForm.value));
    if (temp.deliveryPlace) {
      temp.deliveryPlaceID = temp.deliveryPlace.deliveryPlaceID;
      temp.deliveryPlace = temp.deliveryPlace.deliveryPlace;
    }

    if (temp.deliveryType) {
      temp.deliveryTypeID = temp.deliveryType.deliveryTypeID;
      temp.deliveryType = temp.deliveryType.deliveryType;
    }

    if (temp.deliveryConductedBy) {
      temp.deliveryConductedByID =
        temp.deliveryConductedBy.deliveryConductedByID;
      temp.deliveryConductedBy = temp.deliveryConductedBy.deliveryConductedBy;
    }

    if (temp.deliveryComplication) {
      temp.deliveryComplicationID = temp.deliveryComplication.complicationID;
      temp.deliveryComplication =
        temp.deliveryComplication.deliveryComplicationType;
    }

    if (temp.pregOutcome) {
      temp.pregOutcomeID = temp.pregOutcome.pregOutcomeID;
      temp.pregOutcome = temp.pregOutcome.pregOutcome;
    }

    if (temp.postNatalComplication) {
      temp.postNatalComplicationID = temp.postNatalComplication.complicationID;
      temp.postNatalComplication = temp.postNatalComplication.complicationValue;
    }

    if (temp.gestationName) {
      temp.gestationID = temp.gestationName.gestationID;
      temp.gestationName = temp.gestationName.name;
    }

    if (temp.newBornHealthStatus) {
      temp.newBornHealthStatusID =
        temp.newBornHealthStatus.newBornHealthStatusID;
      temp.newBornHealthStatus = temp.newBornHealthStatus.newBornHealthStatus;
    }
    // if (!temp.dateOfDelivery || temp.dateOfDelivery == null) {
    //   temp.dateOfDelivery = undefined;
    // }
    let updatedPNCDetails = Object.assign({}, temp, otherDetails);

    console.log(
      "json",
      JSON.stringify({ PNCDetails: updatedPNCDetails }, null, 4)
    );

    return this.http
      .post(environment.updatePNCDetailsUrl, { PNCDetails: updatedPNCDetails })
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  /*
  Get Significiant findings
  */

  getPreviousSignificiantFindings(beneficiaryRegID) {
    return this.http
      .post(environment.getPreviousSignificiantFindingUrl, beneficiaryRegID)
      .map((res) => res.json());
  }

  caseRecordAndReferDetails: any;
  getCaseRecordAndReferDetails(beneficiaryRegID, visitID, visitCategory) {
    let otherDetails;

    // if(localStorage.getItem("referredVisitCode") === "undefined" || localStorage.getItem("referredVisitCode") === null || parseInt(localStorage.getItem('specialist_flag'))==3)
    // {
    otherDetails = Object.assign({
      benRegID: beneficiaryRegID,
      benVisitID: visitID,
      visitCode: localStorage.getItem("visitCode"),
    });
    // } else {

    //   otherDetails = Object.assign({
    //     benRegID: beneficiaryRegID,
    //     benVisitID: localStorage.getItem("referredVisitID"),
    //     visitCode: localStorage.getItem("referredVisitCode")
    //   });
    // }

    if (!this.caseRecordAndReferDetails) {
      if (visitCategory == "General OPD (QC)") {
        this.caseRecordAndReferDetails = this.http
          .post(
            environment.getGeneralOPDQuickConsultDoctorDetails,
            otherDetails
          )
          .map((res) => res.json());
      }
      if (visitCategory == "ANC") {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getANCDoctorDetails, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "General OPD") {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getGeneralOPDDoctorDetails, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "NCD screening") {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getNCDScreeningDoctorDetails, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "NCD care") {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getNCDCareDoctorDetails, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "COVID-19 Screening") {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getCovidDoctorDetails, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "PNC") {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getPNCDoctorDetails, otherDetails)
          .map((res) => res.json());
      }
      if (visitCategory == "FP & Contraceptive Services") {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getFamilyPlanningDoctorDetails, otherDetails)
          .map((res) => res.json());
      }
      if (
        visitCategory.toLowerCase() ==
        "neonatal and infant health care services"
      ) {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getNeonatalAndInfantDetails, otherDetails)
          .map((res) => res.json());
      }
      if (
        visitCategory.toLowerCase() ==
        "childhood & adolescent healthcare services"
      ) {
        this.caseRecordAndReferDetails = this.http
          .post(environment.getChildAndAdolescentDetails, otherDetails)
          .map((res) => res.json());
      }
    }
    return this.caseRecordAndReferDetails;
  }
  caseRecordAndReferDetails1: any;
  getMMUCaseRecordAndReferDetails(
    beneficiaryRegID,
    visitID,
    visitCategory,
    visitcode
  ) {
    let otherDetails;

    otherDetails = Object.assign({
      benRegID: beneficiaryRegID,
      benVisitID: visitID,
      visitCode: visitcode,
    });

    if (visitCategory == "General OPD (QC)") {
      this.caseRecordAndReferDetails1 = this.http
        .post(environment.getGeneralOPDQuickConsultDoctorDetails, otherDetails)
        .map((res) => res.json());
    }
    if (visitCategory == "ANC") {
      this.caseRecordAndReferDetails1 = this.http
        .post(environment.getANCDoctorDetails, otherDetails)
        .map((res) => res.json());
    }
    if (visitCategory == "General OPD") {
      this.caseRecordAndReferDetails1 = this.http
        .post(environment.getGeneralOPDDoctorDetails, otherDetails)
        .map((res) => res.json());
    }
    if (visitCategory == "NCD screening") {
      this.caseRecordAndReferDetails1 = this.http
        .post(environment.getNCDScreeningDoctorDetails, otherDetails)
        .map((res) => res.json());
    }
    if (visitCategory == "NCD care") {
      this.caseRecordAndReferDetails1 = this.http
        .post(environment.getNCDCareDoctorDetails, otherDetails)
        .map((res) => res.json());
    }
    if (visitCategory == "COVID-19 Screening") {
      this.caseRecordAndReferDetails1 = this.http
        .post(environment.getCovidDoctorDetails, otherDetails)
        .map((res) => res.json());
    }
    if (visitCategory == "PNC") {
      this.caseRecordAndReferDetails1 = this.http
        .post(environment.getPNCDoctorDetails, otherDetails)
        .map((res) => res.json());
    }
    return this.caseRecordAndReferDetails1;
  }

  updateDoctorDiagnosisDetails(
    patientMedicalForm,
    visitCategory,
    otherDetails,
    tcRequest
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    console.log("message", patientMedicalForm);
    let patientVisitDetailForm =  (<FormGroup>(
      patientMedicalForm.controls["patientVisitForm"].controls["patientVisitDetailsForm"]))
    ;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];
    console.log("Revisit Value" + referForm.controls["revisitDate"].value);
    let updatedDoctorDiagnosis = {
      subVisitCategory: patientVisitDetailForm.controls.subVisitCategory.value,
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postGeneralCaseRecordDiagnosis(
        diagnosisForm,
        visitCategory,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
      patientMedicalForm.controls["provideCounselling"].controls[
        "counsellingProvidedList"
      ].value,
      refer: this.postGeneralRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: otherDetails.isSpecialist,
    };

    console.log(
      "updated doctor details",
      JSON.stringify(updatedDoctorDiagnosis, null, 4)
    );

    if (visitCategory == "ANC") {
      return this.http
        .post(environment.updateANCDoctorDetails, updatedDoctorDiagnosis)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (visitCategory == "General OPD") {
      return this.http
        .post(environment.updateGeneralOPDDoctorDetails, updatedDoctorDiagnosis)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (visitCategory == "NCD care") {
      return this.http
        .post(environment.updateNCDCareDoctorDetails, updatedDoctorDiagnosis)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (visitCategory == "PNC") {
      return this.http
        .post(environment.updatePNCDoctorDetails, updatedDoctorDiagnosis)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (visitCategory == "COVID-19 Screening") {
      return this.http
        .post(environment.updateCovidDoctorDetails, updatedDoctorDiagnosis)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
    if (visitCategory == "NCD screening") {
      return this.http
        .post(
          environment.updateNCDScreeningDoctorDetails,
          updatedDoctorDiagnosis
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }

  updateFamilyPlanningDoctorDiagnosisDetails(
    patientMedicalForm,
    visitCategory,
    otherDetails,
    tcRequest
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];
    let treatmentsOnSideEffectsFormDet = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["treatmentsOnSideEffectsForm"];
    console.log("Revisit Value" + referForm.controls["revisitDate"].value);
    let updatedDoctorDiagnosis = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postGeneralCaseRecordDiagnosis(
        diagnosisForm,
        visitCategory,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      treatmentsOnSideEffects: this.postFamilyCaseRecordTreatmentOnSideEffects(
        treatmentsOnSideEffectsFormDet
      ),
      refer: this.postFamilyPlanningRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: otherDetails.isSpecialist,
    };

    console.log(
      "updated doctor details",
      JSON.stringify(updatedDoctorDiagnosis, null, 4)
    );

    return this.http
      .post(
        environment.updateFamilyPlanningDoctorDetails,
        updatedDoctorDiagnosis
      )
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  postGeneralCaseRecordDiagnosis(diagnosisForm, visitCategory, otherDetails) {
    let diagnosisDetails;

    if (visitCategory == "ANC") {
      diagnosisDetails = this.postANCCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }
    if (visitCategory == "General OPD") {
      diagnosisDetails = this.postGeneralOPDCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }
    if (visitCategory == "NCD care") {
      diagnosisDetails = this.postNCDCareCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }
    if (visitCategory == "COVID-19 Screening") {
      diagnosisDetails = this.postCovidCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }
    if (visitCategory == "PNC") {
      diagnosisDetails = this.postANCCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }
    if (visitCategory == "NCD screening") {
      diagnosisDetails = this.postNCDscreeningCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }

    if (visitCategory == "FP & Contraceptive Services") {
      diagnosisDetails = this.postFamilyPlanningCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }
    if (
      visitCategory.toLowerCase() == "neonatal and infant health care services"
    ) {
      diagnosisDetails = this.postNeonatalCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }
    if (
      visitCategory.toLowerCase() ==
      "childhood & adolescent healthcare services"
    ) {
      diagnosisDetails = this.postChildAndAdolescentCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      );
    }

    return diagnosisDetails;
  }

  getMMUCasesheetData(caseSheetRequest) {
    console.log("get here in serv", caseSheetRequest);

    return this.http
      .post(environment.getMMUCasesheetDataUrl, caseSheetRequest)
      .map((res) => res.json());
  }

  getTMCasesheetData(caseSheetRequest) {
    console.log("get here in serv", caseSheetRequest);

    return this.http
      .post(environment.getTMCasesheetDataUrl, caseSheetRequest)
      .map((res) => res.json());
  }

  getArchivedReports(ArchivedReports) {
    return this.http
      .post(environment.archivedReportsUrl, ArchivedReports)
      .map((response) => response.json());
  }
  getReportsBase64(obj) {
    return this.http
      .post(environment.ReportsBase64Url, obj)
      .map((response) => response.json());
  }

  getPatientMCTSCallHistory(callDetailID) {
    return this.http
      .post(environment.patientMCTSCallHistoryUrl, callDetailID)
      .map((response) => response.json());
  }

  getMasterSpecialization() {
    return this.http
      .post(environment.getMasterSpecializationUrl, {})
      .map((response) => response.json());
  }

  getSpecialist(specialistReqObj) {
    return this.http
      .post(environment.getSpecialistUrl, specialistReqObj)
      .map((response) => response.json());
  }
  getAvailableSlot(availableSlotReqObj) {
    return this.http
      .post(environment.getAvailableSlotUrl, availableSlotReqObj)
      .map((response) => response.json());
  }

  scheduleTC(schedulerRequest) {
    return this.http
      .post(environment.scheduleTCUrl, schedulerRequest)
      .map((response) => response.json());
  }

  beneficiaryTCRequestStatus(beneficiaryTCRequest) {
    console.log(JSON.stringify(beneficiaryTCRequest));
    return this.http
      .post(environment.beneficiaryTCRequestStatusUrl, beneficiaryTCRequest)
      .map((response) => response.json());
  }

  getSwymedMail() {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    console.log("vanID", vanID);

    return this.http
      .get(environment.getSwymedMailUrl + `/${vanID}`)
      .map((response) => response.json());
  }
  // getCancerScreeningDoctorDetails() {
  //   return this.http.post(environment.getCancerScreeningDoctorDetailsUrl, {})
  // }
  saveSpecialistCancerObservation(specialistDiagonosis, otherDetails) {
    let diagnosisDetails =
      specialistDiagonosis.controls.patientCaseRecordForm.value;
    let referDetails = specialistDiagonosis.controls.patientReferForm.value;
    if (referDetails["referredToInstituteName"]) {
      delete referDetails["referredToInstituteName"];
    }
    let diagnosis = Object.assign(
      {},
      referDetails,
      diagnosisDetails,
      otherDetails
    );
    console.log(
      "saveSpecialistCancerObservation",
      JSON.stringify({ diagnosis }, null, 4)
    );
    return this.http
      .post(environment.saveSpecialistCancerObservationUrl, { diagnosis })
      .map((response) => response.json()).pipe(shareReplay(1));
  }

  updateTCStartTime(tCStartTimeObj) {
    return this.http
      .post(environment.updateTCStartTimeUrl, tCStartTimeObj)
      .map((response) => response.json()).pipe(shareReplay(1));
  }

  invokeSwymedCall(specialistID) {
    let userID = localStorage.getItem("userID");
    return this.http
      .get(environment.invokeSwymedCallUrl + userID + "/" + specialistID)
      .map((response) => response.json());
  }

  invokeSwymedCallSpecialist() {
    let userID = localStorage.getItem("userID");
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    return this.http
      .get(environment.invokeSwymedCallSpecialistUrl + userID + "/" + vanID)
      .map((response) => response.json());
  }
  /* Doctor Signature download */
  downloadSign(userID) {
    let option = new RequestOptions({ responseType: ResponseContentType.Blob });
    return this.http
      .get(environment.downloadSignUrl + userID, option)
      .map((res) => <Blob>res.blob());
  }
  getIDRSDetails(beneficiaryID: string, visitID: string) {
    let visitCategory = localStorage.getItem("visitCategory");
    let otherDetails = Object.assign({
      benRegID: beneficiaryID,
      benVisitID: visitID,
      visitCode: localStorage.getItem("visitCode"),
    });

    if (visitCategory == "NCD screening") {
      return this.http
        .post(environment.getNCDScreeningIDRSDetails, otherDetails)
        .map((res) => res.json());
    }
  }
  updateIDRSDetails(idrsScreeningForm, visitCategory) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let patientIDRSData = Object.assign({}, idrsScreeningForm.value, {
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      modifiedBy: localStorage.getItem("userName"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      createdBy: localStorage.getItem("userName"),
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      deleted: false,
    });

    let idrsDetails = { idrsDetails: patientIDRSData };
    if (visitCategory == "NCD screening") {
      return this.http
        .post(environment.updateNCDScreeningIDRSDetailsUrl, idrsDetails)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }
  updateNCDScreeningHistory(NCDScreeningHistoryForm, temp, beneficiaryAge) {
    let visitCategory = localStorage.getItem("visitCategory");
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let updatedHistoryDetails = {
      familyHistory: this.updateGeneralFamilyHistory(
        NCDScreeningHistoryForm.controls.familyHistory,
        temp
      ),
      physicalActivityHistory: this.updatePhyscialActivityHistory(
        NCDScreeningHistoryForm.controls.physicalActivityHistory,
        temp
      ),
      personalHistory: this.updateGeneralPersonalHistory(
        NCDScreeningHistoryForm.controls.personalHistory,
        temp
      ),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
    };

    console.log(
      "Update NCD Screening History",
      JSON.stringify(updatedHistoryDetails, null, 4)
    );

    if (visitCategory == "NCD screening") {
      return this.http
        .post(
          environment.updateNCDScreeningHistoryDetailsUrl,
          updatedHistoryDetails
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }
  updatePhyscialActivityHistory(physicalActivityHistory, otherDetails) {
    let physicalActivityHistoryForm = Object.assign(
      {},
      physicalActivityHistory.value,
      otherDetails
    );
    // console.log('General examination', JSON.stringify(generalExaminationForm, null, 4));
    return physicalActivityHistoryForm;
  }
  getMMUData(loadMMUData) {
    return this.http
      .post(environment.loadMMUDataUrl, loadMMUData)
      .map((res) => res.json());
  }

  HRPDetails: any;
  getHRPDetails(beneficiaryRegID, visitCode) {
    let reqObj;

    reqObj = Object.assign({
      benRegID: beneficiaryRegID,
      visitCode: visitCode,
    });

    this.HRPDetails = this.http
      .post(environment.loadHRPUrl, reqObj)
      .map((res) => res.json());

    return this.HRPDetails;
  }
  enableButton: any;
  enableVitalsUpdateButton = new BehaviorSubject(this.enableButton);
  enableVitalsUpdateButton$ = this.enableVitalsUpdateButton.asObservable();
  setValueToEnableVitalsUpdateButton(value) {
    this.enableVitalsUpdateButton.next(value);
  }

  setCommonDataForFP() {
    let data = {
      vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
      parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
        .parkingPlaceID,
      beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
      benVisitID: localStorage.getItem("visitID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      modifiedBy: localStorage.getItem("username"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      sessionID: localStorage.getItem("sessionID"),
      benFlowID: localStorage.getItem("benFlowID"),
      visitCode: localStorage.getItem("visitCode"),
    };
  }

  updateFamilyPlanning(medicalForm, visitCategory) {
    let commonData = {
      vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
      parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
        .parkingPlaceID,
      beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
      benVisitID: localStorage.getItem("visitID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      modifiedBy: localStorage.getItem("username"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      sessionID: localStorage.getItem("sessionID"),
      benFlowID: localStorage.getItem("benFlowID"),
      visitCode: localStorage.getItem("visitCode"),
      createdBy: localStorage.getItem("userName"),
    };
    let familyPlanningReproductiveDetailsForm = Object.assign(
      {},
      medicalForm.controls.familyPlanningForm.controls
        .familyPlanningAndReproductiveForm.value,
      commonData
    );
    let iecAndCounsellingDetails = Object.assign(
      {},
      medicalForm.controls.familyPlanningForm.controls.IecCounsellingForm.value,
      commonData
    );
    let dispensationDetails = Object.assign(
      {},
      medicalForm.controls.familyPlanningForm.controls.dispensationDetailsForm
        .value,
      commonData
    );
    let patientFamilyPlanningData = Object.assign(
      {},
      {
        familyPlanningReproductiveDetails:
          familyPlanningReproductiveDetailsForm,
      },
      { iecAndCounsellingDetails: iecAndCounsellingDetails },
      { dispensationDetails: dispensationDetails },
      {
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
          .parkingPlaceID,
        vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
        beneficiaryRegID: localStorage.getItem("beneficiaryID"),
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        visitCode: localStorage.getItem("visitCode"),
        benVisitID: localStorage.getItem("visitID"),
        createdBy: localStorage.getItem("userName"),
      }
    );

    if (visitCategory === "FP & Contraceptive Services") {
      return this.http
        .post(
          environment.updateFamilyPlanningScreenDetailsUrl,
          patientFamilyPlanningData
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }

  updateBirthAndImmunizationHistory(medicalForm, visitCategory) {
    let commonData = {
      vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
      parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
        .parkingPlaceID,
      modifiedBy: localStorage.getItem("username"),
      sessionID: localStorage.getItem("sessionID"),
      visitCode: localStorage.getItem("visitCode"),
      beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
      benVisitID: localStorage.getItem("visitID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
    };
    let infantBirthDetailsForm = Object.assign(
      {},
      medicalForm.controls.infantBirthDetailsForm.value,
      commonData
    );
    let ImmunizationHistoryDetails = Object.assign(
      {},
      medicalForm.controls.immunizationHistory.value,
      commonData
    );
    let birthAndImmunizationHistoryDetails = Object.assign(
      {},
      { infantBirthDetails: infantBirthDetailsForm },
      { immunizationHistory: ImmunizationHistoryDetails },
      {
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
          .parkingPlaceID,
        vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
        beneficiaryRegID: localStorage.getItem("beneficiaryID"),
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        visitCode: localStorage.getItem("visitCode"),
        benVisitID: localStorage.getItem("visitID"),
      }
    );

    if (
      visitCategory.toLowerCase() == "neonatal and infant health care services"
    ) {
      return this.http
        .post(
          environment.updateBirthImmunizationHistoryDetailsUrl,
          birthAndImmunizationHistoryDetails
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }

    if (
      visitCategory.toLowerCase() ==
      "childhood & adolescent healthcare services"
    ) {
      return this.http
        .post(
          environment.updateBirthAndImmunizationHistoryDataUrl,
          birthAndImmunizationHistoryDetails
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }

  updateNCDSreeningDetails(medicalForm, visitCategory) {
    let patientNCDScreeningData = Object.assign(
      {},
      { diabetes: medicalForm.controls.diabetes.value },
      { hypertension: medicalForm.controls.hypertension.value },
      { oral: medicalForm.controls.oral.value },
      { breast: medicalForm.controls.breast.value },
      { cervical: medicalForm.controls.cervical.value },
      {
        benFlowID: localStorage.getItem("benFlowID"),
        beneficiaryID: localStorage.getItem("beneficiaryID"),
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
          .parkingPlaceID,
        modifiedBy: localStorage.getItem("userName"),
        vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
        beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
        benVisitID: localStorage.getItem("visitID"),
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        visitCode: localStorage.getItem("visitCode"),
      }
    );

    if (visitCategory === "NCD screening") {
      return this.http
        .post(environment.updateNCDScreeningDetailsUrl, patientNCDScreeningData)
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }

  enableHrpReasonsStatus(enablingHrp) {
    this.enableHRPStatusAndReasons.next(enablingHrp);
  }

  clearHrpReasonsStatus() {
    this.enableHRPReasons = null;
    this.enableHRPStatusAndReasons.next(null);
  }

  familyPlanningValueChanged(valueChanged) {
    this.valueChangedForFamilyPlanning.next(valueChanged);
  }

  getFamilyPlanningFetchDetails() {
    return this.http
      .post(environment.getFamilyPlanningDetailsUrl, {
        benRegID: localStorage.getItem("beneficiaryRegID"),
        benVisitId: localStorage.getItem("visitID"),
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  getFamilyPlanningFetchDetailsOnRevisit() {
    return this.http
      .post(environment.getFamilyPlanningDetailsUrl, {
        benRegID: localStorage.getItem("beneficiaryRegID"),
      })
      .map((res) => res.json());
  }

  BirthAndImmunizationValueChanged(valueChanged) {
    this.valueChangedForBirthAndImmunization.next(valueChanged);
  }

  getBirthImmunizationHistoryNurseDetails() {
    return this.http
      .post(environment.getBirthImmunizationHistoryDetailsUrl, {
        benRegID: localStorage.getItem("beneficiaryRegID"),
        benVisitId: localStorage.getItem("visitID"),
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  getBirthImmunizationHistoryNurseDetailsForChildAndAdolescent() {
    return this.http
      .post(environment.getBirthImmunizationHistoryDataUrl, {
        benRegID: localStorage.getItem("beneficiaryRegID"),
        benVisitId: localStorage.getItem("visitID"),
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  getPreviousBirthImmunizationHistoryDetails(visitCategory) {
    // let visitCategory = localStorage.getItem("visitCategory");
    if (
      visitCategory.toLowerCase() == "neonatal and infant health care services"
    ) {
      return this.http
        .post(environment.getPreviousBirthImmunizationDetailsUrl, {
          benRegID: localStorage.getItem("beneficiaryRegID"),
        })
        .map((res) => res.json());
    }
    if (
      visitCategory.toLowerCase() ==
      "childhood & adolescent healthcare services"
    ) {
      return this.http
        .post(
          environment.getPreviousBirthImmunizationDataForChildAndAdolascentUrl,
          {
            benRegID: localStorage.getItem("beneficiaryRegID"),
          }
        )
        .map((res) => res.json());
    }
  }

  postDoctorFamilyPlanningetails(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let referForm = patientMedicalForm.controls["patientReferForm"];
    let treatmentsOnSideEffectsFormDet = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["treatmentsOnSideEffectsForm"];

    let generalVisitDetails = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postGeneralOPDCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
      patientMedicalForm.controls["provideCounselling"].controls[
        "counsellingProvidedList"
      ].value,
      treatmentsOnSideEffects: this.postFamilyCaseRecordTreatmentOnSideEffects(
        treatmentsOnSideEffectsFormDet
      ),
      refer: this.postFamilyPlanningRefer(referForm, otherDetails),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "Doctor Visit Details",
      JSON.stringify(generalVisitDetails, null, 4)
    );

    return this.http
      .post(environment.saveDoctorFamilyPlanningDetails, generalVisitDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
    // return Observable.of({errorMessage: 'furrrr'});
  }

  /* Neonatal and infant health care services */
  postFollowUpForImmunization(followUpImmunizationForm, otherDetails) {
    let followUpForImmunization = JSON.parse(
      JSON.stringify(followUpImmunizationForm.value)
    );
    // if (followUpForImmunization.nextDueVaccines) {
    //   followUpForImmunization.nextDueVaccinesID =
    //   followUpForImmunization.nextDueVaccines.id;
    //   followUpForImmunization.nextDueVaccines =
    //   followUpForImmunization.nextDueVaccines.name;
    // }

    // if (followUpForImmunization.locationOfNextImmunization) {
    //   followUpForImmunization.locationOfNextImmunizationID =
    //   followUpForImmunization.locationOfNextImmunization.id;
    //   followUpForImmunization.locationOfNextImmunization =
    //   followUpForImmunization.locationOfNextImmunization.name;
    // }

    if (followUpForImmunization.dueDateForNextImmunization) {
      followUpForImmunization.dueDateForNextImmunization =
        followUpImmunizationForm.controls["dueDateForNextImmunization"].value;
    }

    let followUpImmunizationData = Object.assign(
      {},
      followUpForImmunization,
      otherDetails
    );
    return followUpImmunizationData;
  }

  postDoctorNeonatalAndInfantService(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let followUpImmunizationForm =
      patientMedicalForm.controls["patientFollowUpImmunizationForm"];
    console.log(
      "Due Date For Next Immunization" +
        followUpImmunizationForm.controls["dueDateForNextImmunization"].value
    );

    let generalVisitDetails = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postGeneralOPDCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
        patientMedicalForm.controls["provideCounselling"].controls[
          "counsellingProvidedList"
        ].value,
      followUpForImmunization: this.postFollowUpForImmunization(
        followUpImmunizationForm,
        otherDetails
      ),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "Doctor Visit Details",
      JSON.stringify(generalVisitDetails, null, 4)
    );

    return this.http
      .post(environment.saveDoctorNeonatalAndInfantService, generalVisitDetails)
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  postDoctorChildAndAdolescentService(
    patientMedicalForm,
    otherDetails,
    tcRequest,
    isSpecialist
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let followUpImmunizationForm =
      patientMedicalForm.controls["patientFollowUpImmunizationForm"];
    console.log(
      "Due Date For Next Immunization" +
        followUpImmunizationForm.controls["dueDateForNextImmunization"].value
    );

    let generalVisitDetails = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postGeneralOPDCaseRecordDiagnosis(
        diagnosisForm,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
        patientMedicalForm.controls["provideCounselling"].controls[
          "counsellingProvidedList"
        ].value,
      followUpForImmunization: this.postFollowUpForImmunization(
        followUpImmunizationForm,
        otherDetails
      ),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: isSpecialist,
    };

    console.log(
      "Doctor Visit Details",
      JSON.stringify(generalVisitDetails, null, 4)
    );

    return this.http
      .post(
        environment.saveDoctorChildAndAdolescentService,
        generalVisitDetails
      )
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  /* Neonatal and infant health care services doctor update */
  updateNeonatalAndInfantDoctorDiagnosisDetails(
    patientMedicalForm,
    visitCategory,
    otherDetails,
    tcRequest
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let followUpImmunizationForm =
      patientMedicalForm.controls["patientFollowUpImmunizationForm"];
    console.log(
      "Due Date For Next Immunization" +
        followUpImmunizationForm.controls["dueDateForNextImmunization"].value
    );
    let updatedDoctorDiagnosis = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postGeneralCaseRecordDiagnosis(
        diagnosisForm,
        visitCategory,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
        patientMedicalForm.controls["provideCounselling"].controls[
          "counsellingProvidedList"
        ].value,
      followUpForImmunization: this.postFollowUpForImmunization(
        followUpImmunizationForm,
        otherDetails
      ),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: otherDetails.isSpecialist,
    };

    console.log(
      "updated doctor details",
      JSON.stringify(updatedDoctorDiagnosis, null, 4)
    );

    return this.http
      .post(environment.updateNeonatalAndInfantService, updatedDoctorDiagnosis)
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  updateChildAndAdolescentDoctorDiagnosisDetails(
    patientMedicalForm,
    visitCategory,
    otherDetails,
    tcRequest
  ) {
    let vanID = JSON.parse(localStorage.getItem("serviceLineDetails")).vanID;
    let parkingPlaceID = JSON.parse(
      localStorage.getItem("serviceLineDetails")
    ).parkingPlaceID;
    let findingForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalFindingsForm"];
    let investigationForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDoctorInvestigationForm"];
    let prescriptionForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["drugPrescriptionForm"];
    let diagnosisForm = (<FormGroup>(
      patientMedicalForm.controls["patientCaseRecordForm"]
    )).controls["generalDiagnosisForm"];
    let followUpImmunizationForm =
      patientMedicalForm.controls["patientFollowUpImmunizationForm"];
    console.log(
      "Due Date For Next Immunization" +
        followUpImmunizationForm.controls["dueDateForNextImmunization"].value
    );
    let updatedDoctorDiagnosis = {
      findings: this.postGeneralCaseRecordFindings(findingForm, otherDetails),
      diagnosis: this.postGeneralCaseRecordDiagnosis(
        diagnosisForm,
        visitCategory,
        otherDetails
      ),
      investigation: this.postGeneralCaseRecordInvestigation(
        investigationForm,
        otherDetails
      ),
      prescription: this.postGeneralCaseRecordPrescription(
        prescriptionForm,
        otherDetails
      ),
      counsellingProvidedList:
        patientMedicalForm.controls["provideCounselling"].controls[
          "counsellingProvidedList"
        ].value,
      followUpForImmunization: this.postFollowUpForImmunization(
        followUpImmunizationForm,
        otherDetails
      ),
      benFlowID: localStorage.getItem("benFlowID"),
      beneficiaryID: localStorage.getItem("beneficiaryID"),
      doctorFlag: localStorage.getItem("doctorFlag"),
      nurseFlag: localStorage.getItem("nurseFlag"),
      pharmacist_flag: localStorage.getItem("pharmacist_flag"),
      sessionID: localStorage.getItem("sessionID"),
      parkingPlaceID: parkingPlaceID,
      vanID: vanID,
      beneficiaryRegID: "" + localStorage.getItem("beneficiaryRegID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
      visitCode: localStorage.getItem("visitCode"),
      benVisitID: localStorage.getItem("visitID"),
      serviceID: localStorage.getItem("serviceID"),
      createdBy: localStorage.getItem("userName"),
      tcRequest: tcRequest,
      isSpecialist: otherDetails.isSpecialist,
    };

    console.log(
      "updated doctor details",
      JSON.stringify(updatedDoctorDiagnosis, null, 4)
    );

    return this.http
      .post(
        environment.updateChildAndAdolescentServiceDoctor,
        updatedDoctorDiagnosis
      )
      .map((res) => res.json()).pipe(shareReplay(1));
  }
  /*Neonatal Immunization Service */
  fetchImmunizationServiceDeatilsFromNurse() {
    return this.http
      .post(environment.fetchNeonatalImmunizationService, {
        benRegID: localStorage.getItem("beneficiaryRegID"),
        benVisitId: localStorage.getItem("visitID"),
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  /*Oral Vitamin A Immunization Service */
  fetchOralVitaminADeatilsFromNurse() {
    return this.http
      .post(environment.fetchChildAndAdolescentService, {
        benRegID: localStorage.getItem("beneficiaryRegID"),
        benVisitId: localStorage.getItem("visitID"),
        visitCode: localStorage.getItem("visitCode"),
      })
      .map((res) => res.json());
  }

  updateImmunizationServices(immunizationServiceForm) {
    let commonData = {
      vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
      parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
        .parkingPlaceID,
      modifiedBy: localStorage.getItem("username"),
      sessionID: localStorage.getItem("sessionID"),
      visitCode: localStorage.getItem("visitCode"),
      beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
      benVisitID: localStorage.getItem("visitID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
    };
    let updateImmunizationService = Object.assign(
      {},
      immunizationServiceForm.value,
      commonData
    );
    let immunizationService = {
      immunizationServices: updateImmunizationService,
    };
    return this.http
      .post(environment.updateNeonatalImmunizationService, immunizationService)
      .map((res) => res.json()).pipe(shareReplay(1));
  }

  immunizationServiceChildhoodValueChanged(valueChanged) {
    this.valueChangedForBirthAndImmunization.next(valueChanged);
  }

  updateChildhoodImmunizationServices(medicalForm, visitCategory) {
    let commonData = {
      vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
      parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
        .parkingPlaceID,
      modifiedBy: localStorage.getItem("username"),
      sessionID: localStorage.getItem("sessionID"),
      visitCode: localStorage.getItem("visitCode"),
      beneficiaryRegID: localStorage.getItem("beneficiaryRegID"),
      benVisitID: localStorage.getItem("visitID"),
      providerServiceMapID: localStorage.getItem("providerServiceID"),
    };
    let immunizationServicesForm = Object.assign(
      {},
      medicalForm.controls.immunizationServicesForm.value,
      commonData
    );
    let oralVitaminAFormDeatils = Object.assign(
      {},
      medicalForm.controls.oralVitaminAForm.value,
      commonData
    );
    let immunizationServiceChildhoodDetails = Object.assign(
      {},
      { immunizationServices: immunizationServicesForm },
      { oralVitaminAProphylaxis: oralVitaminAFormDeatils },
      {
        sessionID: localStorage.getItem("sessionID"),
        parkingPlaceID: JSON.parse(localStorage.getItem("serviceLineDetails"))
          .parkingPlaceID,
        vanID: JSON.parse(localStorage.getItem("serviceLineDetails")).vanID,
        beneficiaryRegID: localStorage.getItem("beneficiaryID"),
        providerServiceMapID: localStorage.getItem("providerServiceID"),
        visitCode: localStorage.getItem("visitCode"),
        benVisitID: localStorage.getItem("visitID"),
      }
    );

    if (
      visitCategory.trim().toLowerCase() ==
      "childhood & adolescent healthcare services"
    ) {
      return this.http
        .post(
          environment.updateChildAndAdolescentService,
          immunizationServiceChildhoodDetails
        )
        .map((res) => res.json()).pipe(shareReplay(1));
    }
  }


  getAssessment(benRegID) {
    // let url = "{%3FpatientId%3D}";
   //   // let swaasaurl = unescape(url + +encodeURIComponent($scope.entityId));
   //   // const encodedSyntax = encodeURIComponent('/{patientId}?patientId=');
   //   // return this.http.get(`${environment.getAssessmentIdUrl}/${'patientId'}?patientId=${benRegID}`);
     return this.http.get(environment.getAssessmentIdUrl + '/' + benRegID)
     .map((res) => res.json());  
   } 

  getAssessmentDet(assessmentId) {
    return this.http.get(environment.getAssessmentUrl + "/" +assessmentId)
    .map((res) => res.json());
  }
}
