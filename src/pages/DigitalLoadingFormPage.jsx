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


function DigitalLoadingFormPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedParchment, setSelectedParchment] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null)

  // const [selectedOptions, setSelectedOptions] = useState({});
  const token = localStorage.getItem("token");
  const { transactions, loading } = useSelector(
    (state) => state.fetchAllTransactions
  );
  const { allParchments } = useSelector((state) => state.allAssignedParchments);
  const [assignedParchments, setAssignedParchments] = useState();
  const dispatch = useDispatch();
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const { decodedToken } = useSelector((state) => state.fetchToken);
  const [formData, setFormData] = useState({
    tally_sheet_no: "",
    total_number_of_bags: "",
    total_weight: "",
    loading_date: "",
    expected_delivery_date: "",
    stock_init: "",
    stock_bal: "",
    cherry_lot_id: "",
    number_of_bags:"",
    kilograms_loaded:"",
    parchment_left:"",
    left_parchments:""
  });

  useEffect(() => {
    dispatch(fetchAllAssignedParchments());
  }, [dispatch]);

  useEffect(() => {
    if (allParchments) {
      setAssignedParchments(allParchments.data);
    }
  }, [allParchments]);
  console.log("I am assigned", assignedParchments)
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

  // const getKfStation = (cherry_lot_id) => {
  //   const transaction = allTransactions?.find(
  //     (transaction) => transaction.cherry_lot_id === cherry_lot_id
  //   );
  //   return transaction ? transaction._kf_Station : null;
  // };

  // const handleSelectChange = (e, rowIndex) => {
  //   const { value } = e.target;
  //   setSelectedOptions((prevOptions) => ({
  //     ...prevOptions,
  //     [rowIndex]: value, // Update selected option for the specific row
  //   }));
  // };
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedParchment(selectedValue === "Yes" ? e.target.dataset.parchmentId : null);// Update state based on selection
  };

  const handleSelectedOption = (e) => {
    const selected = e.target.value;
    console.log("I am selected", selected)
    setSelectedOption(selected === "yes" ? e.target.name : null); // Update state based on selection
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              // showInputs={showInputs}
              handleSelectChange={handleSelectChange}
              selectedParchment={selectedParchment}
              selectedOption = {selectedOption}
              handleSelectedOption={handleSelectedOption}
              formData={formData}
             handleFormData={handleFormDataChange}
              // KfStation={getKfStation}
              />
            </div>
            {/* <ToastContainer/> */}
          </div>
        </main>
      </div>
    </div>
  );
}
export default DigitalLoadingFormPage;
