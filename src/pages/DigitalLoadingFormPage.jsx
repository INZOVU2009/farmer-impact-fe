import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { useDispatch, useSelector } from "react-redux";
import DigitalLoadingFormTable from "../partials/dashboard/DigitalLoadingFormTable";
import { fetchAllAssignedParchments } from "../redux/actions/parchnment/allAssignedParchment.action";
import { fetchAllTransactions } from "../redux/actions/transactions/allTransactions.action";
import { fetchAllStation } from "../redux/actions/station/allStations.action";
import { handleToken } from "../redux/actions/auth/fetchToken.action";
import { submitDeliveryReport } from "../redux/actions/parchnment/submitDeliveryReport.action";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import { fetchSingleReport } from "../redux/actions/parchnment/getSingleReport.action";

function DigitalLoadingFormPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedParchment, setSelectedParchment] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [parchmentToDeliver, setParchmentToDeliver] = useState([]);
  const [allDeliveryReports, setAllDeliveryReports] = useState([]);
  const { deliveryReports } = useSelector((state) => state.allDeliveryReports);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { transactions, loading } = useSelector(
    (state) => state.fetchAllTransactions
  );
  const { delivery, isloading } = useSelector((state) => state.deliveryReport);
  const { allParchments } = useSelector((state) => state.allAssignedParchments);
  const [assignedParchments, setAssignedParchments] = useState();
  const dispatch = useDispatch();
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const { decodedToken } = useSelector((state) => state.fetchToken);
  const [stockbal, setStockbal] = useState(0);
  const [selectedParchments, setSelectedParchments] = useState([]);
  const { singleReport } = useSelector((state) => state.fetchSingleReport);
  const [parchments, setParchments] = useState([]);
  const parchmentid = selectedParchments[0];

  const wantedGrade = parchmentid?.charAt(parchmentid?.length - 1);
  console.log("hellll", wantedGrade);

  const parchWeight = parchmentToDeliver?.parch_weight;
  const [formData, setFormData] = useState({
    tally_sheet_no: "",
    truck_plate: "",
    grade: "",
    weight: "",
    bags: "",
    loaded_by: "",
    inspected_by: "",
    accountant_by: "",
    driver_name: "",
    driver_licence_or_national_id: "",
    bags_of_parchment_left: "",
    final_bags_of_parchment_left: "",
    parch_lot_ID: "",
  });

  const finaleWeightLeft = parchWeight - formData.weight;

  useEffect(() => {
    dispatch(fetchAllAssignedParchments());
  }, [dispatch]);

  useEffect(() => {
    if (allParchments) {
      setAssignedParchments(allParchments.data);
    }
  }, [allParchments]);

  useEffect(() => {
    dispatch(fetchAllStation());
  }, [dispatch]);

  useEffect(() => {
    if (stations) {
      setAllStation(stations.data);
    }
  }, [stations]);
  useEffect(() => {
    dispatch(fetchAllTransactions(token));
  }, [dispatch]);

  useEffect(() => {
    if (transactions) {
      setAllTransactions(transactions.data);
    }
  }, [transactions]);

  const getStationName = (_kf_Station) => {
    const station = allStation?.find(
      (station) => station.__kp_Station === _kf_Station
    );
    return station ? station.Name : null;
  };

  const getStationID = (_kf_Station) => {
    const station = allStation?.find(
      (station) => station.__kp_Station === _kf_Station
    );
    return station ? station.StationID : null;
  };

  const handleSelectChange = (e) => {
    const selectedParchmentId = e.target?.dataset.parchmentId;
    const isChecked = e.target?.value === "Yes";

    setSelectedParchments((prevSelected) => {
      if (isChecked) {
        if (!prevSelected.includes(selectedParchmentId)) {
          return [...prevSelected, selectedParchmentId];
        }
      } else {
        return prevSelected.filter((id) => id !== selectedParchmentId);
      }
      return prevSelected;
    });
  };

  const handleSelectedOption = (e) => {
    const { value } = e.target;

    if (value === "no") {
      setFormData((prevData) => ({
        ...prevData,
        bagsofparchmentleft: "0",
      }));
      setSelectedOption(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        bagsofparchmentleft: "",
      }));
      setSelectedOption(value);
    }
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      grade: wantedGrade,
      parch_lot_ID: parchmentid,
      final_weight_left: finaleWeightLeft,
      final_bags_of_parchment_left: formData.bags,

      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchSingleReport());
  }, [dispatch, parchmentid]);
  useEffect(() => {
    if (singleReport) {
      setAllDeliveryReports(singleReport.data);
    }
  }, [singleReport]);

  const getWeightLeft = (parchment_id, parch_weight) => {
    // Check if the parchment is in the delivered reports
    const deliveredParchment = allDeliveryReports?.filter(
      (report) => report.parch_lot_ID === parchment_id
    );

    if (deliveredParchment?.length > 0) {
      // Sort delivery reports by date in descending order to get the latest report
      const latestReport = deliveredParchment.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )[0];

      return latestReport?.final_weight_left;
    } else {
      // If not delivered, return the original parchment weight
      return parch_weight;
    }
  };

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();

    // Create an array to hold the reportsLots data
    const reportsLots = selectedParchments
      .map((parchmentId) => {
        // Find the corresponding parchment object based on the parchmentId
        const parchment = parchments.find((p) => p.id === parchmentId);
        if (!parchment) return null; // Handle case where parchment is not found

        // Calculate final weight left
        const finaleWeightLeft =
          getWeightLeft(parchment.id) - formData[`weight_${parchmentId}`];

        // Calculate grade based on parchment ID
        const grade = parchmentId?.charAt(parchmentId?.length - 1);

        return {
          parch_lot_ID: parchmentId,
          weight: formData[`weight_${parchmentId}`],
          bags_loaded: formData[`bags_${parchmentId}`],
          bags_of_parchment_left:
            formData[`bags_of_parchment_left${parchmentId}`],
          final_bags_of_parchment_left:
            formData[`bags_of_parchment_left${parchmentId}`],
          final_weight_left: finaleWeightLeft,
          grade: grade,
        };
      })
      .filter((item) => item !== null); // Remove null entries from the array

    // Create the final form data object
    const deliveryFormData = {
      tally_sheet_no: formData.tally_sheet_no,
      truck_plate: formData.truck_plate,
      grade: formData.grade,
      weight: formData.weight,
      bags: formData.bags,
      loaded_by: formData.loaded_by,
      inspected_by: formData.inspected_by,
      accountant_by: formData.accountant_by,
      driver_name: formData.driver_name,
      driver_licence_or_national_id: formData.driver_licence_or_national_id,
      reportsLots: reportsLots,
    };
    console.log("delivery", deliveryFormData);
    // Dispatch the action to submit the delivery report with the formatted data
    dispatch(submitDeliveryReport(deliveryFormData, token));

    // Clear the form data after submission
    setFormData({});
  };

  useEffect(() => {
    if (delivery) {
      let newDelivery = delivery.data;
      let currentDelivery = allDeliveryReports;

      let updatedDeliveruReports = [...currentDelivery, newDelivery];

      setAllDeliveryReports(updatedDeliveruReports);
      setFormData({
        tally_sheet_no: "",
        truck_plate: "",
        grade: "",
        weight: "",
        bags: "",
        loaded_by: "",
        inspected_by: "",
        accountant_by: "",
        driver_name: "",
        driver_licence_or_national_id: "",
        bags_of_parchment_left: "",
        final_bags_of_parchment_left: "",
        parch_lot_ID: "",
      });
    }
  }, [delivery]);

  const handleClick = (parchment) => {
    const newParchment = {
      id: parchment.parchment_id,
      weight: parchment.parch_weight,
    };

    // Check if the parchment already exists in the array
    const isAlreadyAdded = parchments.some((p) => p.id === newParchment.id);

    if (!isAlreadyAdded) {
      // Add the new parchment only if it's not already added
      setParchments((prevParchments) => [...prevParchments, newParchment]);
    }

    console.log("I am parchhccc", parchments); // Check the updated array
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
            </div>

            <div className="grid grid-cols-12 gap-6">
              <DigitalLoadingFormTable
                parchments={assignedParchments}
                stationName={getStationName}
                StationID={getStationID}
                decodedToken={decodedToken}
                handleSelectChange={handleSelectChange}
                selectedParchment={selectedParchments}
                selectedOption={selectedOption}
                handleSelectedOption={handleSelectedOption}
                formData={formData}
                handleFormData={handleFormDataChange}
                handleSubmit={handleDeliverySubmit}
                handleClick={handleClick}
                Spinner={LoadingSpinner}
                isloading={isloading}
                stockbal={getWeightLeft}
              />
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
export default DigitalLoadingFormPage;
