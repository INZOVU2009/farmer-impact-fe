import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import ParchmentTransportTable from "../partials/dashboard/ParchmentTransportTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDeliveryReports } from "../redux/actions/parchnment/getAllDeliveryReports.action";

function ParchmentTransportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [allDeliveryReports, setAllDeliveryReports] = useState();
  const dispatch = useDispatch();
  const { deliveryReports } = useSelector((state) => state.allDeliveryReports);

  useEffect(() => {
    dispatch(fetchAllDeliveryReports());
  }, [dispatch]);

  useEffect(() => {
    if (deliveryReports) {
      // Create a copy of the deliveryReports array before sorting
      const reportsCopy = [...deliveryReports.data];
      // Sort the copied array in descending order based on entry date
      const sortedReports = reportsCopy.sort((a, b) =>
        a.created_at > b.created_at ? -1 : 1
      );
      setAllDeliveryReports(sortedReports);
    }
  }, [deliveryReports]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
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

            <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <span className="font-large font-bold  ">
                Parchment Transport
              </span>
              <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <div className="flex w-full items-center mb-4  sm:mb-0 ">
                  <table className="min-w-full  divide-y divide-gray-200  mt-2 table-fixed dark:divide-gray-600 border border-gray-300 dark:border-gray-600">
                    <thead className=" dark:bg-gray-700">
                      <tr className="border-b">
                        <th
                          scope="col"
                          className=" p-1 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                        >
                          CWS Name
                        </th>
                        <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                          Nyungwe High Coffee
                        </td>
                      </tr>
                      <tr className="border-b">
                        <th
                          scope="col"
                          className="p-1 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                        >
                          CWS ID
                        </th>
                        <td className="p-1 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                          WS053
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <button
                className="bg-green-500 text-white p-2 rounded-lg mb-4 mt-3"
                onClick={() => {
                  navigate("/user_inventory_management/new_loading_form");
                }}
              >
                {" "}
                New Delivery
              </button>
            </div>

            <div className="py-4 ml-0 mt-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="items-center  justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="flex items-center sm:justify-end">
                    <div className="ml-3">
                      <p>Record</p>
                      <select name="" className="rounded-lg w-40">
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                      </select>
                    </div>
                  </div>
                  <form className="sm:pr-3" action="#" method="GET">
                    <label htmlFor="products-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-48 ml-3 mt-1 sm:w-64  xl:w-96">
                      <span>Cherry Lot ID</span>
                      <input
                        type="text"
                        name="email"
                        id="products-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Sarch for transaction"
                      />
                    </div>
                  </form>
                  <div className="flex space-x-3 -ml-6">
                    <div>
                      <span>From</span>
                      <input
                        type="date"
                        value={new Date().toISOString().split("T")[0]}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <span>To</span>
                      <input
                        type="date"
                        value={new Date().toISOString().split("T")[0]}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row left-4 items-center justify-center  gap-3"></div>

            <ParchmentTransportTable reports={allDeliveryReports} />
          </div>
        </main>
      </div>
    </div>
  );
}
export default ParchmentTransportPage;
