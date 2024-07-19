import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import AccessControlMobile from "./pages/AccessControlMobile";
import { useParams } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
import { Toaster } from "react-hot-toast";

// Import pages
import Dashboard from "./pages/Dashboard";
import UserSupplyInventoryDetails from "./pages/UserSupplyInventoryDetails";
import UserTransactions from "./pages/UserTransactions";
import CwsDailyJournal from "./pages/CwsDailyJournal";
import LoginPage from "./pages/LoginPage";
import Users from "./pages/Users";
import AccessControl from "./pages/AccessControl";
import TransactionDetails from "./pages/TransactionDetails";
import AddUntraceableCoffee from "./pages/AddUntraceableCoffee";
import AssignedParchment from "./pages/AssignedParchment";
import GeneralHarvestPage from "./pages/GeneralHarvestPage";
import SiteHarvestPage from "./pages/SiteHarvestPage";
import CherryLotDetails from "./pages/CherryLotDetails";
import SiteDayLotDetails from "./pages/SiteDayLotDetails";
import LotsInAdayLot from "./pages/LotsInAdayLot";
import AssignNewParchment from "./pages/AssignNewParchmentPage";
import ParchmentStockPage from "./pages/ParchmentStockPage";
import DeliveryProcessingPage from "./pages/DeliveryProcessingPage";
import ParchmentTransportPage from "./pages/ParchmentTransportPage";
import ParchmentReceptionPage from "./pages/ParchmentReceptionPage";
import DigitalLoadingFormPage from "./pages/DigitalLoadingFormPage";
import ReceivingDeliveryFormPage from "./pages/ReceivingDeliveryFormPage";
import ParchmentTransportDetailsPage from "./pages/ParchmentTransportDetailsPage";
import ParchmentReceptionDetailsPage from "./pages/ParchmentReceptionDetailsPage";
import ProcessedContribution from "./pages/ProcessedContribution";
import UserInspectionsPage from "./pages/UserInspectionsPage";
import SimpleUserInspectionsPage from "./pages/SimpleUserInspectionsPage";
import WetMillAuditsPage from "./pages/WetMillAuditsPage";
import FarmerDetailsPage from "./pages/FarmerDetailsPage";
import TrainingsPage from "./pages/training/TrainingCoursesPage";
import TrainingSessionsPage from "./pages/training/TrainingSessionsPage";
import TrainingParticipantsPage from "./pages/training/TrainingParticipantsPage";
import RecentFarmers from "./pages/RecentFarmers";
import ApprovedFarmers from "./pages/ApprovedFarmersPage";
import AccessModulePage from "./pages/appSetting/AccessModulePage";
import HouseholdTreesPage from "./pages/household/HouseHoldTreesPage";
import SyncedFarmersPage from "./pages/SyncedFarmersPage";
import TransalationsPage from "./pages/appSetting/TranslationsPage";
import EvaluationsPage from "./pages/appSetting/EvaluationsPage";
import InspectionAnswersPage from "./pages/appSetting/InspectionAnswersPage";
import PendingFarmersPage from "./pages/PendingFarmersPage";
import RecentRegistrationsPage from "./pages/RecentRgistrationsPage";
import VerifiedRegistrationsPage from "./pages/VerifiedRegistrationsPage";
import ApprovedRegistrationsPage from "./pages/ApproveRegistrationsPage";

function App() {
  const location = useLocation();
  const userId = useParams();
  const journalId = useParams();
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route
          exact
          path="/user_registration/recent_farmers"
          element={<RecentFarmers />}
        />
        <Route
          exact
          path="/user_supply_inventory_details"
          element={<UserSupplyInventoryDetails />}
        />
        <Route exact path="/user_transactions" element={<UserTransactions />} />
        <Route
          exact
          path="/user-transactions/cws-daily-journals"
          element={<CwsDailyJournal />}
        />
        <Route exact path="/user-administration" element={<Users />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route
          exact
          path="/user-administaration/access-controll/module-access/:userId"
          element={<AccessControl />}
        />
        <Route
          exact
          path="/user-administaration/access-controll/mobile-access/:userId"
          element={<AccessControlMobile />}
        />
        <Route
          exact
          path="/user_transactions/staff_lot_details/:journalId"
          element={<TransactionDetails />}
        />
        <Route
          exact
          path="/user-transactions/cherry_lot_details/:cherryLotId"
          element={<CherryLotDetails />}
        />{" "}
        <Route
          exact
          path="/user-transactions/site_day_lot_details/:journalId"
          element={<SiteDayLotDetails />}
        />
        <Route
          exact
          path="/user-transactions/lots_in_a_day_lot/:cherryLotId"
          element={<LotsInAdayLot />}
        />
        <Route
          exact
          path="/user_transaction/add_untraceable_coffee"
          element={<AddUntraceableCoffee />}
        />
        <Route
          exact
          path="/user_inventory_management/assigned_parchment"
          element={<AssignedParchment />}
        />
        <Route
          exact
          path="/user_registration/general_harvest"
          element={<GeneralHarvestPage />}
        />
        <Route
          exact
          path="/user_registration/site_harvest"
          element={<SiteHarvestPage />}
        />
        <Route
          exact
          path="/user_inventory_management/new_parchment_assignement"
          element={<AssignNewParchment />}
        />
        <Route
          exact
          path="/user_inventory_management/parchment_stock"
          element={<ParchmentStockPage />}
        />
        <Route
          exact
          path="/user_inventory_management/deliveries_processing"
          element={<DeliveryProcessingPage />}
        />
        <Route
          exact
          path="/user_inventory_management/parchment_transport"
          element={<ParchmentTransportPage />}
        />
        <Route
          exact
          path="/user_inventory_management/parchment_reception"
          element={<ParchmentReceptionPage />}
        />
        <Route
          exact
          path="/user_inventory_management/new_loading_form"
          element={<DigitalLoadingFormPage />}
        />
        <Route
          exact
          path="/user_inventory_management/edit_parchment_reception_details/:reportId"
          element={<ReceivingDeliveryFormPage />}
        />
        <Route
          exact
          path="user_inventory_management/parchment_transport_details/:reportId"
          element={<ParchmentTransportDetailsPage />}
        />
        <Route
          exact
          path="user_inventory_management/delivery_processing/:id"
          element={<ProcessedContribution />}
        />
        <Route
          exact
          path="user_inventory_management/print_parchment_reception_details/:reportId"
          element={<ParchmentReceptionDetailsPage />}
        />
        <Route
          exact
          path="user_inspection/full_inspections"
          element={<UserInspectionsPage />}
        />
        <Route
          exact
          path="user_inspection/simple_inspections"
          element={<SimpleUserInspectionsPage />}
        />
        <Route
          exact
          path="user_inspection/user_wet_mill_audit"
          element={<WetMillAuditsPage />}
        />
        <Route
          exact
          path="user_registration/farmer_details/overview/:farmerid"
          element={<FarmerDetailsPage />}
        />
        <Route
          exact
          path="user_trainings/user_translator"
          element={<TrainingsPage />}
        />
        <Route
          exact
          path="user_trainings/sessions"
          element={<TrainingSessionsPage />}
        />
        <Route
          exact
          path="user_trainings/recent_participants"
          element={<TrainingParticipantsPage />}
        />
        <Route
          exact
          path="app_setting/access_modules"
          element={<AccessModulePage />}
        />
        <Route
          exact
          path="/user_registration/approved_farmers"
          element={<ApprovedFarmers />}
        />
        <Route
          exact
          path="household/household_trees"
          element={<HouseholdTreesPage />}
        />
        <Route
          exact
          path="/user_registration/synced_farmers"
          element={<SyncedFarmersPage />}
        />
        <Route
          exact
          path="/app_setting/user_translator"
          element={<TransalationsPage />}
        />
        <Route
          exact
          path="/app_setting/inspection_questions"
          element={<EvaluationsPage />}
        />
        <Route
          exact
          path="/app_setting/inspection_questions/:id"
          element={<InspectionAnswersPage />}
        />
        <Route
          exact
          path="/user_registration/pending_farmers"
          element={<PendingFarmersPage />}
        />
         <Route
          exact
          path="/farmer_registrations/recent_registrations"
          element={<RecentRegistrationsPage />}
        />
          <Route
          exact
          path="/farmer_registrations/verified_registrations"
          element={<VerifiedRegistrationsPage />}
        />
          <Route
          exact
          path="/farmer_registrations/approved_registrations"
          element={<ApprovedRegistrationsPage />}
        />
      </Routes>
      <Toaster/>
    </>
  );
}
export default App;
