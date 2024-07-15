import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { fetchReportById } from "../redux/actions/parchnment/reportById.action";
import { fetchReportLotById } from "../redux/actions/parchnment/reportLotById.action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStation } from "../redux/actions/station/allStations.action";
import { Toaster } from "react-hot-toast";
import ParchmentTransportDetailsTable from "../partials/dashboard/ParchmentTransportDetailsTable";

function ParchmentTransportDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const id = useParams();
  const reportId = useParams().reportId;

  const dispatch = useDispatch();
  const [reportById, setReportById] = useState();
  const [reportLotById, setReportLotById] = useState(null);
  const { report } = useSelector((state) => state.fetchReportById);
  const { lot } = useSelector((state) => state.fetchReportLotById);
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const { decodedToken } = useSelector((state) => state.fetchToken);

  useEffect(() => {
    dispatch(fetchReportById(id.reportId));
  }, [dispatch, id.reportId]);

  useEffect(() => {
    if (report) {
      setReportById(report.data);
    }
  }, [report]);

  useEffect(() => {
    dispatch(fetchReportLotById(reportId));
  }, [dispatch, reportId]);

  useEffect(() => {
    if (lot) {
      setReportLotById(lot.data);
    }
  }, [report]);

  useEffect(() => {
    dispatch(fetchAllStation());
  }, [dispatch]);

  useEffect(() => {
    if (stations) {
      setAllStation(stations.data);
    }
  }, [stations]);

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
              <ParchmentTransportDetailsTable
                reportById={reportById}
                reportLotById={reportLotById}
                stationName={getStationName}
                StationID={getStationID}
                decodedToken={decodedToken}
              />
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
export default ParchmentTransportDetailsPage;
