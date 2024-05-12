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
import fetchAllAssignedParchmentsSlice from './slices/parchment/allAssignedParchmentSlice';
import adjustParchmentSlice from "./slices/parchment/adjustParchmentSlice";
import submitDeliveryReportSlice from './slices/parchment/deliveryReportSlice'
import getAllDeliveryReportsSlice from "./slices/parchment/getAllDeliveryReportsSlice";
import fetchSingleReportSlice from './slices/parchment/getSingleReportSlice'
import fetchReportByIdSlice from './slices/parchment/reportByIdSlice'
import fetchReportLotByIdSlice from './slices/parchment/reportLotByIdSlice'
import updateDeliveryReportSlice from "./slices/parchment/updateDeliveryReportSlice";
import getLoadedWeightByReportIdSlice from './slices/deliveryProcessing/getLoadedWeightByReportIdSlice'
import processingContributionSlice from "./slices/deliveryProcessing/processingContributionSlice";
import getProcessedContributionsSlice from "./slices/deliveryProcessing/getProcessedContributionsSlice";
import fetchProcessedContributionByIdSlice from "./slices/deliveryProcessing/fetchProcessedContributionByIdSlice";
import untraceableCoffeeSlice from "./slices/untraceableCoffee/untraceableCoffeeSlice";
import saveCherryToSubmitSlice from "./slices/submitCherry/saveCherryToSubmitSlice";
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
    fetchAllJournalsByCherryLotId: journalsByCherryLotSlice,
    addPermissions: addPermissionsSlice,
    fetchAllTransactionsByCherryLot: transactionByCherryLotSlice,
    transactionBucket: transactionBucketSlice,
    allBuckets: allBucketsSlice,
    bucketWeighting: bucketWeightingSlice,
    dryWeighting: dryWeightingSlice,
    fetchAllGeneralHarvest: allGeneralHarvestSlice,
    fetchAllSeasons: allSeasonSlice,
    fetchAllDrying:allDryingsSlice,
    newParchment:assignNewParchmetnSlice,
    selectedCertification:setCertificationSlice,
    newParchmentGrade:assignParchmentGradeSlice,
    allAssignedParchments:fetchAllAssignedParchmentsSlice,
    adjustParchment:adjustParchmentSlice,
    deliveryReport:submitDeliveryReportSlice,
    allDeliveryReports:getAllDeliveryReportsSlice,
    fetchSingleReport:fetchSingleReportSlice,
    fetchReportById:fetchReportByIdSlice,
    fetchReportLotById:fetchReportLotByIdSlice,
    updateDeliveryReport:updateDeliveryReportSlice,
    fetchloadedWeightById:getLoadedWeightByReportIdSlice,
    processContribution:processingContributionSlice,
    processedContributions:getProcessedContributionsSlice,
    processedContributionById:fetchProcessedContributionByIdSlice,
    addUntraceableCoffee: untraceableCoffeeSlice,
    saveCherryToSubmit:saveCherryToSubmitSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default store;
