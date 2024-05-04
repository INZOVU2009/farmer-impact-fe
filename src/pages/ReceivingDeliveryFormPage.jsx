import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { fetchReportById } from "../redux/actions/parchnment/reportById.action";
import { fetchReportLotById } from "../redux/actions/parchnment/reportLotById.action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAssignedParchments } from "../redux/actions/parchnment/allAssignedParchment.action";
import { fetchAllStation } from "../redux/actions/station/allStations.action";
import { updateReport } from "../redux/actions/parchnment/updateDeliveryReport.action";
import { ToastContainer, toast } from "react-toastify";

function ReceivingDeliveryFormPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const id = useParams();
  const reportId = useParams().reportId;

  const dispatch = useDispatch();
  const [reportById, setReportById] = useState();
  const [reportLotById, setReportLotById] = useState(null);
  const { report } = useSelector((state) => state.fetchReportById);
  const { lot } = useSelector((state) => state.fetchReportLotById);
  const { allParchments } = useSelector((state) => state.allAssignedParchments);
  const [assignedParchments, setAssignedParchments] = useState();
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const { decodedToken } = useSelector((state) => state.fetchToken);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    receiving_form_id: "",
    bag_type: "",
    total_bags_received: "",
    weight_parch_received: "",
    moisture: "",
  });

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

  const getCherrylotid = (parchment_id) => {
    const parchment = assignedParchments?.find(
      (parchment) => parchment.parchment_id === parchment_id
    );
    return parchment ? parchment.cherry_lot_id : null;
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeliveryUpdatesSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateReport(formData, id.reportId, token));
    setFormData({});
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

            <div className="grid grid-cols-12 gap-6"></div>
          </div>
          <div className=" mx-9 -mt-16  block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex w-full items-center  sm:mb-0 ">
              <table className="min-w-full  divide-y divide-gray-200  mt-6 table-fixed dark:divide-gray-600 border border-gray-300 dark:border-gray-600">
                <thead className=" dark:bg-gray-700">
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Loading Form ID:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      {reportById?.deliveryid}
                    </td>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Receiving Form ID:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input
                        type="text"
                        className="rounded-lg w-full"
                        name="receiving_form_id"
                        value={formData.receiving_form_id}
                        onChange={handleFormDataChange}
                        // placeholder="Enter the name of the loader"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      CWS Name
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      {getStationName(decodedToken?.staff._kf_Station)}
                    </td>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Bag Type:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input
                        type="text"
                        className="rounded-lg w-full"
                        name="bag_type"
                        value={formData.bag_type}
                        onChange={handleFormDataChange}
                        // placeholder="Enter the name of the loader"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      CWS ID
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      {getStationID(decodedToken?.staff._kf_Station)}
                    </td>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      # of Bags Received:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input
                        type="text"
                        className="rounded-lg w-full"
                        name="total_bags_received"
                        value={formData.total_bags_received}
                        onChange={handleFormDataChange}
                        // placeholder="Enter the name of the loader"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      # of Bags Delivered:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      {reportById?.bags} bags
                    </td>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Weight of Parch. Received:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input
                        type="text"
                        className="rounded-lg w-full"
                        name="weight_parch_received"
                        value={formData.weight_parch_received}
                        onChange={handleFormDataChange}
                        // placeholder="Enter the name of the loader"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Net Weight of Parch. Delivered:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      {reportById?.weight} kgs
                    </td>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Loading date:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      {reportById?.loading_date}
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-100">
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Expected Delivery date
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      {reportById?.expected_delivery_date}
                    </td>
                    <th
                      scope="col"
                      className=" p-2 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                    >
                      Moisture:
                    </th>
                    <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                      <input
                        type="text"
                        className="rounded-lg w-full"
                        name="moisture"
                        value={formData.moisture}
                        onChange={handleFormDataChange}
                        // placeholder="Enter the name of the loader"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="  mx-8 mt-10 flex flex-col col-span-full xl:col-span-12">
            <div className="flex flex-row left-4 items-center justify-center py-3 gap-3"></div>

            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow">
                    <table className="min-w-full divide-y divide-gray-200  table-fixed dark:divide-gray-600 ">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr className=""></tr>

                        <tr>
                          <th
                            scope="col"
                            className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            PARC LOT No.
                          </th>
                          <th
                            scope="col"
                            className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            CHERRY LOT ID
                          </th>
                          <th
                            scope="col"
                            className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            # OF BAGS
                          </th>
                          <th
                            scope="col"
                            className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            WEIGHT (KGs)
                          </th>
                          <th
                            scope="col"
                            className="p-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            # OF BAGS LEFT
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {reportLotById?.map((report, index) => (
                          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="p-4 space-x-2 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {report.parch_lot_ID}
                            </td>
                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {getCherrylotid(report.parch_lot_ID)}
                            </td>
                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {report.bags_loaded}
                            </td>

                            <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {report.weight}
                            </td>
                            <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {report.final_bags_of_parchment_left}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-center mt-3 items-center mb-6">
                  {/* {isloading ? (
        <Spinner className="h-8 w-8 text-green-500" />
      ) : ( */}
                  <button
                    className="bg-green-500 text-white py-3 px-7 rounded-lg"
                    onClick={handleDeliveryUpdatesSubmit}
                  >
                    Receipt Delivery
                  </button>
                  {/* )} */}
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        </main>
      </div>
    </div>
  );
}
export default ReceivingDeliveryFormPage;
