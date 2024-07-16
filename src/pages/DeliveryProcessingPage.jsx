import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DeliveryProcessingTable from "../partials/dashboard/DeliveryProcessingTable";
import { fetchAllDeliveryReports } from "../redux/actions/parchnment/getAllDeliveryReports.action";
import { useDispatch, useSelector } from "react-redux";
import { fetchloadedWeightByReportId } from "../redux/actions/deliveryProcessing/getLoadedWeightByReportId.action";
import { fetchAllTransactions } from "../redux/actions/transactions/allTransactions.action";
import { fetchReportById } from "../redux/actions/parchnment/reportById.action";
import { fetchAllStation } from "../redux/actions/station/allStations.action";
import { processContribution } from "../redux/actions/deliveryProcessing/processContribution.action";
import { fetchAllProcessedContributions } from "../redux/actions/deliveryProcessing/getProcessedContributions.action";
import { Toaster } from "react-hot-toast";

function DeliveryProcessingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allDeliveryReports, setAllDeliveryReports] = useState();
  const { deliveryReports } = useSelector((state) => state.allDeliveryReports);
  const { loadedWeights, loading } = useSelector(
    (state) => state.fetchloadedWeightById
  );
  const [allLoadedWeight, setAllLoadedWeight] = useState();
  const [isProcessingStarted, setIsProcessingStarted] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const { transactions } = useSelector((state) => state.fetchAllTransactions);
  const { processedContribution } = useSelector(
    (state) => state.processedContributions
  );
  const [allProcessedContributions, SetAllProcessedContributions] = useState();
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDeliveryReports());
  }, [dispatch]);

  useEffect(() => {
    if (deliveryReports) {
      const deliveredReports = deliveryReports.data.filter(
        (report) => report.status === "delivered"
      );
      const reportsCopy = [...deliveredReports];

      const sortedReports = reportsCopy.sort((a, b) =>
        a.created_at > b.created_at ? -1 : 1
      );

      setAllDeliveryReports(sortedReports);
    }
  }, [deliveryReports]);

  useEffect(() => {
    dispatch(fetchAllTransactions(token));
  }, [dispatch]);

  useEffect(() => {
    if (transactions) {
      setAllTransactions(transactions.data);
    }
  }, [transactions]);

  useEffect(() => {
    if (stations) {
      setAllStation(stations.data);
    }
  }, [stations]);
  useEffect(() => {
    dispatch(fetchAllTransactions(token));
  }, [dispatch]);

  const getStationName = (_kf_Station) => {
    const station = allStation?.find(
      (station) => station.__kp_Station === _kf_Station
    );
    return station ? station.Name : null;
  };

  const handleStart = async (report) => {
    const id = report.deliveryid.split("-").pop();

    try {
      const response = await dispatch(fetchloadedWeightByReportId(id));
      const loadedWeightsData = response.data;

      const wantedReport = await dispatch(fetchReportById(id));

      const loadedWeightsWithTransactions = await Promise.all(
        loadedWeightsData.map(async (loadedWeight) => {
          const transactionId = loadedWeight.rtc_transaction_id;
          const transaction = allTransactions.find(
            (transaction) =>
              transaction.id === transactionId &&
              transaction.fm_approval === 1 &&
              transaction.status === 0 &&
              transaction.certified === 1
          );

          if (transaction) {
            let Parch_Weight;
            let parch_ratio;
            let certification;

            if (wantedReport.data.grade === "A") {
              Parch_Weight = transaction.parchID_A_Weight;
              parch_ratio = transaction.parch_ratioA;
            } else if (wantedReport.data.grade === "B") {
              Parch_Weight = transaction.parchID_A_Weight;
              parch_ratio = transaction.parch_ratioB;
            } else if (wantedReport.data.grade === "C") {
              Parch_Weight = transaction.parchID_A_Weight;
              parch_ratio = transaction.parch_ratioC;
            } else {
              Parch_Weight = 0;
              parch_ratio = 0;
            }
            if (transaction.certification === "CP") {
              certification = "Cafe Practice";
            } else if (transaction.certification === "RF") {
              certification = "Rain Forest";
            } else {
              certification = "Non Certified";
            }
            return {
              ...loadedWeight,
              farmer_id: transaction.farmerid,
              farmer_name: transaction.farmername,
              CherryWeight: transaction.kilograms,
              floaters: transaction.bad_kilograms,
              unit_price: transaction.unitprice,
              amount_paid: transaction.cash_paid,
              Certification: certification,
              station: transaction._kf_Station,
              parch_weight: Parch_Weight,
              parch_ratio: parch_ratio,
            };
          }
          return null;
        })
      );

      const validLoadedWeights = loadedWeightsWithTransactions.filter(
        (loadedWeight) => loadedWeight !== null
      );

      if (validLoadedWeights.length > 0) {
        // Dispatch processContribution only if there is at least one valid loaded weight
        const processingResponse = await dispatch(
          processContribution(validLoadedWeights)
        );

        setIsProcessingStarted(true);
      } else {
        toast.error("No valid transactions found for loaded weights.");
      }
    } catch (error) {
      console.error("Error fetching loaded weight:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllProcessedContributions());
  }, [dispatch]);

  useEffect(() => {
    if (processedContribution) {
      SetAllProcessedContributions(processedContribution.data);
    }
  }, [processedContribution]);

  const getUniqueValues = (arr, key) => {
    const uniqueValues = [];
    const uniqueKeys = new Set();

    arr?.forEach((item) => {
      const value = item[key];

      if (!uniqueKeys.has(value)) {
        uniqueKeys.add(value);
        uniqueValues.push(item);
      }
    });

    return uniqueValues;
  };

  const filteredContributions = getUniqueValues(
    allProcessedContributions,
    "rtc_delivery_reports_id"
  );

  const getStatus = (id) => {
    const status = allProcessedContributions?.find(
      (status) => status.rtc_delivery_reports_id == id
    );
    return status ? status.status : null;
  };
  const getprocessingStartedDate = (id) => {
    const contribution = allProcessedContributions?.find(
      (contribution) => contribution.rtc_delivery_reports_id == id
    );
    return contribution ? contribution.started_at : "0000-00-00 00:00:00";
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

            {/* <div className="grid grid-cols-12 gap-6"> */}
            <div className=" font-extrabold text-2xl">
              <h1>Deliveries processing</h1>
            </div>

            <div>
              <button
                className="bg-green-500 text-white p-2 rounded-lg mb-4 mt-3"
                onClick={() => {
                  navigate(
                    "/user_inventory_management/new_parchment_assignement"
                  );
                }}
              >
                {" "}
                Add Delivery ID
              </button>
            </div>

            <div className="flex flex-row left-4 items-center justify-center  gap-3"></div>

            <DeliveryProcessingTable
              parchments={allDeliveryReports}
              handleStart={handleStart}
              hasProcessingStarted={isProcessingStarted}
              startDate={getprocessingStartedDate}
              status={getStatus}
            />
          </div>

          {/* </div> */}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
export default DeliveryProcessingPage;
