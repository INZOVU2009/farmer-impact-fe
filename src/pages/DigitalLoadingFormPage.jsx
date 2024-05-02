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

  const [selectedOption, setSelectedOption] = useState([]);
  const [parchmentToDeliver, setParchmentToDeliver] = useState([]);
  const [allDeliveryReports, setAllDeliveryReports] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const { deliveryReports } = useSelector((state) => state.allDeliveryReports);
  const [selectedValue, setSelectedVaue] = useState("");
  const [assignedParchments, setAssignedParchments] = useState();
  const [stockbal, setStockbal] = useState(0);
  const [selectedParchments, setSelectedParchments] = useState([]);
  const [allStation, setAllStation] = useState([]);

  const [parchmentOriginal, setParchmentOriginal] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { transactions, loading } = useSelector(
    (state) => state.fetchAllTransactions
  );
  const { delivery, isloading } = useSelector((state) => state.deliveryReport);
  const { allParchments } = useSelector((state) => state.allAssignedParchments);

  const dispatch = useDispatch();
  const { stations } = useSelector((state) => state.fetchAllStations);

  const { decodedToken } = useSelector((state) => state.fetchToken);

  const { singleReport } = useSelector((state) => state.fetchSingleReport);

  const parchmentid = parchmentToDeliver?.parchment_id;

  const wantedGrade = parchmentid?.charAt(parchmentid?.length - 1);

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
    reportsLots: [
      {
        weight: "",
        bags_loaded: "",
        bagsOfParchmentLeft: "",
        final_bags_of_parchment_left: "",
        final_weight_left: "",
        parch_lot_ID: "",
        grade: "",
      },
    ],
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
  // console.log("I am assigned", assignedParchments);
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
    const { value, dataset } = e.target;

    const parchmentId = dataset.parchmentId;

    if (value === "Yes" && !selectedParchments.includes(parchmentId)) {
      setSelectedParchments([...selectedParchments, parchmentId]);
    } else if (value === "No" && selectedParchments.includes(parchmentId)) {
      setSelectedParchments(
        selectedParchments.filter((id) => id !== parchmentId)
      );
    }
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;

    const splitStr = name.split("_");

    const parchID = splitStr[1];

    const updatedItems = parchmentOriginal.map((item) => {
      if (selectedParchments.includes(item.parch_lot_ID.toString())) {
        return { ...item, [splitStr[0]]: value };
      } else {
        return item;
      }
    });

    if (updatedItems.length < 1) {
      setParchmentOriginal([
        ...parchmentOriginal,
        { parch_lot_ID: parchID, [splitStr[0]]: value },
      ]);
    } else {
      setParchmentOriginal(updatedItems);
    }

    setFormData((prevData) => ({
      ...prevData,
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

  const getWeightLeft = (parchment) => {
    const deliveredParchment = allDeliveryReports?.filter(
      (report) => report.parch_lot_ID === parchment.parchment_id
    );
    if (deliveredParchment?.length > 0) {
      const latestReport = deliveredParchment.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )[0];
      return latestReport?.final_weight_left;
    } else {
      return parchment.parch_weight;
    }
  };

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    let reportsLots = [];

    // for (const selectedLot of selectedParchments) {
    //   for (const lotOriginal of parchmentOriginal) {
    //     if (selectedLot === lotOriginal.parch_lot_ID) {
    //       reportsLots.push(lotOriginal);
    //     }
    //   }
    // }

    const data = {
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
      final_bags_of_parchment_left: formData.final_bags_of_parchment_left,
      reportsLots: parchmentOriginal,
    };

    console.log("hehe ", data);
    // await dispatch(submitDeliveryReport(data, token));

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
        bagsOfParchmentLeft: "",
        final_bags_of_parchment_left: "",
        parch_lot_ID: "",
      });
    }
  }, [delivery]);

  const handleClick = (parchment) => {
    setParchmentToDeliver(parchment);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
            <div className="sm:flex sm:justify-between sm:items-center mb-8"></div>

            <div className="grid grid-cols-12 gap-6">
              <DigitalLoadingFormTable
                parchments={assignedParchments}
                stationName={getStationName}
                StationID={getStationID}
                decodedToken={decodedToken}
                handleSelectChange={handleSelectChange}
                selectedParchment={selectedParchments}
                selectedOption={selectedOption}
                formData={formData}
                handleFormData={handleFormDataChange}
                handleSubmit={handleDeliverySubmit}
                handleClick={handleClick}
                Spinner={LoadingSpinner}
                isloading={isloading}
                stockbal={getWeightLeft}
                selectedValue={selectedValue}
              />
            </div>
            {/* <ToastContainer/> */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
export default DigitalLoadingFormPage;
