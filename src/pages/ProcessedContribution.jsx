import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import ProcessedContributionTable from "../partials/dashboard/ProcessedContributionTable";
import { fetchProcessedContribution } from "../redux/actions/deliveryProcessing/fetchProcessedContributionById.action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllStation } from "../redux/actions/station/allStations.action";
import { fetchAllUsers } from "../redux/actions/user/Users.action";

function ProcessedContribution() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [processedContribution, setProcessedContribution] = useState([]);
  const { contribution } = useSelector(
    (state) => state.processedContributionById
  );
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const id = useParams();

  useEffect(() => {
    dispatch(fetchProcessedContribution(id.id));
  }, [dispatch]);

  useEffect(() => {
    if (contribution) {
      setProcessedContribution(contribution.data);
    }
  }, contribution);

  useEffect(() => {
    dispatch(fetchAllStation());
  }, [dispatch]);
  useEffect(() => {
    if (stations) {
      setAllStation(stations.data);
    }
  }, [stations]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setAllUsers(users.data);
    }
  }, [users]);

  const getStationName = (_kf_Station) => {
    const station = allStation?.find(
      (station) => station.__kp_Station === _kf_Station
    );
    return station ? station.Name : null;
  };

  const getUserNameById = (id) => {
    const user = allUsers?.find((user) => user.id == id);
    return user ? user.Name_Full : null;
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

            <div className=" font-extrabold text-2xl">
              <h1>Processed Delivery Details</h1>
            </div>

            <div className="flex flex-row left-4 items-center justify-center  gap-3"></div>

            <ProcessedContributionTable
              processedContributions={processedContribution}
              getStationName={getStationName}
              getUserName={getUserNameById}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
export default ProcessedContribution;
