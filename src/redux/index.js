import { configureStore } from "@reduxjs/toolkit";
import login from "../redux/slices/auth/loginSlice";
import users from "../redux/slices/user/allUsersSlice";
import fetchTokenSlice from "../redux/slices/auth/fetchTokenSlice";
import updateUserSlice from "../redux/slices/user/updateUserSlice";
import getSingleUserSlice from "../redux/slices/user/singleUserSlice";
import fetchAllModulesSlice from "../redux/slices/accessModules/getAllModulesSlice";
import logoutSlice from "../redux/slices/auth/logoutSlice";
import fetchAllStaffSlice from "./slices/staff/fetchAllStaffSlice";
import allTransactionsSlice from "./slices/transactions/allTransactionsSlice";
import removeTransactionSlice from "./slices/transactions/removeTransactionSlice";
import transactionByJournalSlice from "./slices/transactions/transactionByJournalSlice";
import updateTransactionSlice from "./slices/transactions/updateTransaction";
import commissionPriceSlice from "./slices/transactions/addCommisionPrice";
import commissionFeesSlice from "./slices/transactions/addCommissionFees";
import commissionSlice from "./slices/transactions/addCommisionPrice";
import approveJournalSlice from "./slices/transactions/approveJournalSlice";
import allStationSlice from "./slices/station/allStationsSlice";
import allSupplierSlice from "./slices/supplier/allSupplierSlice";
import journalsByCherryLotSlice from "./slices/transactions/journalsByCherryLotSlice";
import addPermissionsSlice from "./slices/accessModules/addPermissionsSlice";
import transactionByCherryLotSlice from "./slices/transactions/transactionByCherryLotSlice";
import transactionBucketSlice from "./slices/transactions/transactionBucketSlice";
import allBucketsSlice from "./slices/transactions/allBucketsSlice";
import bucketWeightingSlice from "./slices/transactions/bucketWeightingSlice";
import dryWeightingSlice from "./slices/transactions/dryWeightingSlice";
import allGeneralHarvestSlice from "./slices/generalHarvest/allGeneralHarvestSlice";
import allSeasonSlice from "./slices/season/allSeasonSlice";
import allDryingsSlice from "./slices/dryings/allDryingsSlice";
import assignNewParchmetnSlice from "./slices/parchment/assignNewParchmetnSlice";
import setCertificationSlice from "./slices/parchment/setCertificationSlice";
import assignParchmentGradeSlice from "./slices/parchment/assignParchmentGradeSlice";
import fetchAllAssignedParchmentsSlice from "./slices/parchment/allAssignedParchmentSlice";
import adjustParchmentSlice from "./slices/parchment/adjustParchmentSlice";
import submitDeliveryReportSlice from "./slices/parchment/deliveryReportSlice";
import getAllDeliveryReportsSlice from "./slices/parchment/getAllDeliveryReportsSlice";
import fetchSingleReportSlice from "./slices/parchment/getSingleReportSlice";
import fetchReportByIdSlice from "./slices/parchment/reportByIdSlice";
import fetchReportLotByIdSlice from "./slices/parchment/reportLotByIdSlice";
import updateDeliveryReportSlice from "./slices/parchment/updateDeliveryReportSlice";
import getLoadedWeightByReportIdSlice from "./slices/deliveryProcessing/getLoadedWeightByReportIdSlice";
import processingContributionSlice from "./slices/deliveryProcessing/processingContributionSlice";
import getProcessedContributionsSlice from "./slices/deliveryProcessing/getProcessedContributionsSlice";
import fetchProcessedContributionByIdSlice from "./slices/deliveryProcessing/fetchProcessedContributionByIdSlice";
import untraceableCoffeeSlice from "./slices/untraceableCoffee/untraceableCoffeeSlice";
import saveCherryToSubmitSlice from "./slices/submitCherry/saveCherryToSubmitSlice";
import fetchInspectionsSlice from "./slices/inspections/fetchInspectionsSlice";
import fetchAllFarmersSlice from "./slices/farmers/fetchAllFarmersSlice";
import fetchAllGroupsSlice from "./slices/groups/fetchAllGroupsSlice";
import fetchAllHouseholdsSlice from "./slices/households/fetchAllHouseholdsSlice";
import fetchAllTrainingsSlice from "./slices/trainings/fetchAllTrainingsSlice";
import fetchAllAttendencesSlice from "./slices/trainingAttendance/fetchAllAttendencesSlice";
import fetchAllAttendanceSheetSlice from "./slices/trainingAttendance/fetchAllAttendanceSheetSlice";
import all_field_farmerSlice from "./slices/farmers/all_field_farmerSlice";
import approveFarmerSlice from "./slices/farmers/approveFarmerSlice";
import addUserAccessSlice from "./slices/userAccess/addUserAccessSlice";
import fetchAllUserAccessSllice from "./slices/userAccess/fetchAllUserAccessSlice";
import activateUserSlice from "./slices/userAccess/activateUserSlice";
import updateModule from "./slices/accessModules/updateModuleSlice";
import createNewModuleSlice from "./slices/accessModules/createNewModuleSlice";
import getAllNewTreeServeySlice from "./slices/householdTrees/getAllNewTreeServeySlice";
import getAssignedModulesSlice from "./slices/accessModules/getAssignedModulesSlice";
import fetchAllTranslationsSlice from "./slices/translations/fetchAllTranslationsSlice";
import deleteTranslationSlice from "./slices/translations/deleteTranslationSlice";
import updateTranslationSlice from "./slices/translations/updateTranslationSlice";
import addNewPhraseSlice from "./slices/translations/addNewPhraseSlice";
import fetchAllEvaluatiosSlice from "./slices/evaluations/fetchAllEvaluatiosSlice";
import getSingleInspectionAnswerSlice from "./slices/inspectionAnswers/getSingleInspectionAnswerSlice";
import addNewInspectionAnswerSlice from "./slices/inspectionAnswers/addNewInspectionAnswerSlice";
import deleteInspectionAnswerSlice from "./slices/inspectionAnswers/deleteInspectionAnswerSlice";
import updateInspectionAnswerSlice from "./slices/inspectionAnswers/updateInspectionAnswerSlice";
import getAssignedModulesForSingleUserSlice from "./slices/accessModules/getAssignedModulesForSingleUserSlice";
import fetchSingleStaffSlice from "./slices/staff/fetchSingleStaffSlice";
import approveApprovedFarmerSlice from "./slices/farmers/approveApprovedFarmerSlice";
import deactivateUserSlice from "./slices/userAccess/deactivateUserSlice";
import fetchAllFarmerRegistrationSlice from "./slices/registrations/fetchAllFarmerRegistrationSlice";
import verifyRegistrationSlice from "./slices/registrations/verifyRegistrationSlice";
import approveRegistrationSlice from "./slices/registrations/approveRegistrationSlice";
import proceedRegistrationsSlice from "./slices/registrations/proceedRegistrationsSlice";
import getSingleBucketByDayLotNumberSlice from "./slices/bucketing/getSingleBucketByDayLotNumberSlice";
import updateBucketSlice from "./slices/bucketing/updateBucketSlice";
import getSingleBucketWeightByDayLotNumberSlice from "./slices/bucketing/getSingleBucketWeightByDayLotNumberSlice";
import updateBucketWeightSlice from "./slices/bucketing/updateBucketWeightSlice";
import registerNewFarmersSlice from "./slices/farmers/registerNewFarmersSlice";
import addInspectionQuestionSlice from "./slices/evaluations/addInspectionQuestionSlice";
import fetchWeeklyReportSlice from "./slices/trainings/fetchWeeklyReportSlice";
import approveHouseholdTreesSlice from "./slices/householdTrees/approveHouseholdTreesSlice";
import verifyHouseholdTreesSlice from "./slices/householdTrees/verifyHouseholdTreesSlice";
import fetchTreeDetailsSlice from "./slices/householdTrees/fetchTreeDetailsSlice";
import getHouseholdTreeSurveyByDateSlice from "./slices/householdTrees/getHouseholdTreeSurveyByDateSlice";
import fetchAllPendingFarmersSlice from "./slices/farmers/fetchPendingFarmersSlice";
import fetchAllApprovedFarmersSlice from "./slices/farmers/fetchApprovedFarmersSlice";
import fetchAllApprovedRegistrationSlice from "./slices/registrations/fetchApprovedRegistrationSlice";
import fetchAllVerifiedRegistrationsSlice from "./slices/registrations/fetchVerifiedRegistrationsSlice";
import getAllApprovedHouseholdTreesSlice from "./slices/householdTrees/getAllApprovedHouseholdTreesSlice";
import getAllVerifiedHouseholdTreesSlice from "./slices/householdTrees/getAllVerifiedHouseholdTreesSlice";
import deleteRegistrationSlice from "./slices/registrations/deleteRegistrationSlice";
import deleteHouseholdTreesSlice from "./slices/householdTrees/deleteHouseholdTreesSlice";
import createNewGroupSlice from "./slices/groups/createNewGroupSlice";
import approveNewGroupSlice from "./slices/groups/approveNewGroupSlice";
import toggleGroupSlice from "./slices/groups/toggleGroupSlice";
import createNewCourseSlice from "./slices/trainings/createNewCourseSlice";

const store = configureStore({
  reducer: {
    login,
    users,
    fetchToken: fetchTokenSlice,
    updateUser: updateUserSlice,
    fetchSingleUser: getSingleUserSlice,
    fetchAllModules: fetchAllModulesSlice,
    logout: logoutSlice,
    fetchAllStaff: fetchAllStaffSlice,
    fetchAllTransactions: allTransactionsSlice,
    removeTransaction: removeTransactionSlice,
    fetchAllTransactionsByJournal: transactionByJournalSlice,
    updateTransaction: updateTransactionSlice,
    commission: commissionSlice,
    addCommissionPrice: commissionPriceSlice,
    commissionFees: commissionFeesSlice,
    approveJournal: approveJournalSlice,
    fetchAllStations: allStationSlice,
    Suppliers: allSupplierSlice,
    fetchAllJournalsByCherryLotId: journalsByCherryLotSlice,
    addPermissions: addPermissionsSlice,
    fetchAllTransactionsByCherryLot: transactionByCherryLotSlice,
    transactionBucket: transactionBucketSlice,
    allBuckets: allBucketsSlice,
    bucketWeighting: bucketWeightingSlice,
    dryWeighting: dryWeightingSlice,
    fetchAllGeneralHarvest: allGeneralHarvestSlice,
    fetchAllSeasons: allSeasonSlice,
    fetchAllDrying: allDryingsSlice,
    newParchment: assignNewParchmetnSlice,
    selectedCertification: setCertificationSlice,
    newParchmentGrade: assignParchmentGradeSlice,
    allAssignedParchments: fetchAllAssignedParchmentsSlice,
    adjustParchment: adjustParchmentSlice,
    deliveryReport: submitDeliveryReportSlice,
    allDeliveryReports: getAllDeliveryReportsSlice,
    fetchSingleReport: fetchSingleReportSlice,
    fetchReportById: fetchReportByIdSlice,
    fetchReportLotById: fetchReportLotByIdSlice,
    updateDeliveryReport: updateDeliveryReportSlice,
    fetchloadedWeightById: getLoadedWeightByReportIdSlice,
    processContribution: processingContributionSlice,
    processedContributions: getProcessedContributionsSlice,
    processedContributionById: fetchProcessedContributionByIdSlice,
    addUntraceableCoffee: untraceableCoffeeSlice,
    saveCherryToSubmit: saveCherryToSubmitSlice,
    fetchAllInspections: fetchInspectionsSlice,
    fetchAllFarmers: fetchAllFarmersSlice,
    fetchAllGroups: fetchAllGroupsSlice,
    createFarmerGroup: createNewGroupSlice,
    approveFarmerGroup: approveNewGroupSlice,
    activateFarmerGroup: toggleGroupSlice,
    fetchAllHouseHolds: fetchAllHouseholdsSlice,
    fetchAllTrainings: fetchAllTrainingsSlice,
    fetchAllAttendences: fetchAllAttendencesSlice,
    fetchAllAttendenceSheet: fetchAllAttendanceSheetSlice,
    Field_Farmer: all_field_farmerSlice,
    approveFarmer: approveFarmerSlice,
    userAccess: addUserAccessSlice,
    allUserAccess: fetchAllUserAccessSllice,
    activateUser: activateUserSlice,
    updateModule: updateModule,
    createModule: createNewModuleSlice,
    fetchAllTrees: getAllNewTreeServeySlice,
    fetchAssignedModules: getAssignedModulesSlice,
    fetchAllTranslations: fetchAllTranslationsSlice,
    deleteTranslation: deleteTranslationSlice,
    updateTranslation: updateTranslationSlice,
    addNewPhrase: addNewPhraseSlice,
    fetchAllEvaluations: fetchAllEvaluatiosSlice,
    getSingleInspectionAnswer: getSingleInspectionAnswerSlice,
    addNewInspectionAnswer: addNewInspectionAnswerSlice,
    deleteInspectionAnswer: deleteInspectionAnswerSlice,
    updateInspectionAnswer: updateInspectionAnswerSlice,
    getAssignedModulesForSingleUser: getAssignedModulesForSingleUserSlice,
    fetchSingleStaff: fetchSingleStaffSlice,
    approveApprovedFarmer: approveApprovedFarmerSlice,
    deactivateUser: deactivateUserSlice,
    fetchAllFarmerRegistrations: fetchAllFarmerRegistrationSlice,
    verifyRegistration: verifyRegistrationSlice,
    approveRegistration: approveRegistrationSlice,
    proceedRegistration: proceedRegistrationsSlice,
    getSingleBucketByDayLotNumber: getSingleBucketByDayLotNumberSlice,
    updateBucket: updateBucketSlice,
    getSingleBucketWeightByDayLotNumber:
      getSingleBucketWeightByDayLotNumberSlice,
    updateBucketWeight: updateBucketWeightSlice,
    registerNewFarmers: registerNewFarmersSlice,
    addNewInspectionQuestion: addInspectionQuestionSlice,
    fetchWeeklyReport: fetchWeeklyReportSlice,
    createNewCourse: createNewCourseSlice,
    approveHouseholdTrees: approveHouseholdTreesSlice,
    verifyHouseholdTrees: verifyHouseholdTreesSlice,
    fetchTreeDetails: fetchTreeDetailsSlice,
    getHouseholdTreeSurveyByDate: getHouseholdTreeSurveyByDateSlice,
    fetchAllApprovedFarmers: fetchAllApprovedFarmersSlice,
    fetchAllPendingFarmers: fetchAllPendingFarmersSlice,
    fetchAllApprovedRegistrations: fetchAllApprovedRegistrationSlice,
    fetchAllVerifiedRegistrations: fetchAllVerifiedRegistrationsSlice,
    fetchAllApprovedHouseholdTrees: getAllApprovedHouseholdTreesSlice,
    fetchAllVerifiedHouseholdTrees: getAllVerifiedHouseholdTreesSlice,
    deleteRegistration: deleteRegistrationSlice,
    deleteHouseholdTrees: deleteHouseholdTreesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default store;
