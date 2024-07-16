import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import ParchmentStockTable from "../partials/dashboard/ParchmentStockTable";
import { fetchAllAssignedParchments } from "../redux/actions/parchnment/allAssignedParchment.action";
import { fetchAllTransactions } from "../redux/actions/transactions/allTransactions.action";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStation } from "../redux/actions/station/allStations.action";

import ParchmentAdjustmentModel from "../components/ParchmentAdjustmentModel";

function ParchmentStockPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const { transactions, loading } = useSelector(
    (state) => state.fetchAllTransactions
  );
  const { allParchments } = useSelector((state) => state.allAssignedParchments);
  const [assignedParchments, setAssignedParchments] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [showAdjustmentModel, setShowAdjustmentModel] = useState(false);
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const { decodedToken } = useSelector((state) => state.fetchToken);
  const dispatch = useDispatch();
  const { adjustment } = useSelector((state) => state.adjustParchment);

  const handleClickAction = () => {
    setShowAdjustmentModel(true);
  };

  const handleParchmentAdjustment = () => {
    setShowAdjustmentModel(true);
  };

  useEffect(() => {
    dispatch(fetchAllAssignedParchments());
  }, [dispatch]);

  useEffect(() => {
    if (allParchments) {
      setAssignedParchments(allParchments.data);
    }
  }, [allParchments]);

  useEffect(() => {
    dispatch(fetchAllTransactions(token));
  }, [dispatch]);

  useEffect(() => {
    if (transactions) {
      setAllTransactions(transactions.data);
    }
  }, [transactions]);

  useEffect(() => {
    if (adjustment) {
      setShowAdjustmentModel(false);
      dispatch(fetchAllTransactions(token));
    }
  }, [adjustment]);

  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
  };

  const getUniqueValues = (arr, key) => {
    const uniqueValues = [];
    const uniqueKeys = new Set();

    arr.forEach((item) => {
      const value = item[key];

      if (!uniqueKeys.has(value)) {
        uniqueKeys.add(value);
        uniqueValues.push(item);
      }
    });

    return uniqueValues;
  };

  const filteredTransactions = allTransactions.filter(
    (transaction) =>
      assignedParchments &&
      assignedParchments.some(
        (parchment) => transaction.cherry_lot_id === parchment.cherry_lot_id
      )
  );

  const filteredTransaction = searchQuery
    ? getUniqueValues(
        filteredTransactions?.filter((transaction) =>
          Object.values(transaction).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(searchQuery?.toLowerCase())
          )
        ),
        "cherry_lot_id"
      )
    : getUniqueValues(filteredTransactions, "cherry_lot_id");

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

  const totoalCherryWeight = () => {
    const totalCherry = {};

    filteredTransactions.forEach((transaction) => {
      const cherry = transaction.cherry_lot_id;
      const kilograms = transaction.kilograms || 0;
      const badKilograms = transaction.bad_kilograms || 0;
      if (!totalCherry[cherry]) {
        totalCherry[cherry] = 0;
      }

      totalCherry[cherry] += parseInt(kilograms) + parseInt(badKilograms);
    });

    return totalCherry;
  };

  const totalCherry = totoalCherryWeight();

  const totalParchWeightB = () => {
    const parch_weightB = {};

    filteredTransactions.forEach((transaction) => {
      const cherry = transaction.cherry_lot_id;

      const parchWeightB = transaction.parchID_B_Weight || 0;

      // Check if the JOURNAL# exists in the sumMap

      if (!parch_weightB[cherry]) {
        parch_weightB[cherry] = 0;
      }

      // Add kilograms to the sumMap

      parch_weightB[cherry] += Math.floor(parchWeightB);
    });

    return parch_weightB;
  };

  // Call the calculateTotalKilogramsByJournal function to get the sum
  const parch_weightB = totalParchWeightB();

  const totalParchWeightA = () => {
    const parch_weightA = {};

    // Iterate through transactions
    filteredTransactions.forEach((transaction) => {
      const cherry = transaction.cherry_lot_id;

      const parchWeightA = transaction.parchID_A_Weight || 0;

      // Check if the JOURNAL# exists in the sumMap

      if (!parch_weightA[cherry]) {
        parch_weightA[cherry] = 0;
      }

      // Add kilograms to the sumMap

      parch_weightA[cherry] += Math.floor(parchWeightA);
    });

    return parch_weightA;
  };

  // Call the calculateTotalKilogramsByJournal function to get the sum
  const parch_weightA = totalParchWeightA();

  const totalParchWeightC = () => {
    const parch_weightC = {};

    // Iterate through transactions
    filteredTransactions.forEach((transaction) => {
      const cherry = transaction.cherry_lot_id;

      const parchWeightC = transaction.parchID_C_Weight || 0;

      // Check if the JOURNAL# exists in the sumMap

      if (!parch_weightC[cherry]) {
        parch_weightC[cherry] = 0;
      }

      // Add kilograms to the sumMap

      parch_weightC[cherry] += Math.floor(parchWeightC);
    });

    return parch_weightC;
  };

  // Call the calculateTotalKilogramsByJournal function to get the sum
  const parch_weightC = totalParchWeightC();

  const totalParchWeight = () => {
    const parch_weight = {};

    // Iterate through transactions
    filteredTransactions.forEach((transaction) => {
      const cherry = transaction.cherry_lot_id;

      const parchWeightA = transaction.parchID_A_Weight || 0;
      const parchWeightB = transaction.parchID_B_Weight || 0;
      const parchWeightC = transaction.parchID_C_Weight || 0;

      // Check if the JOURNAL# exists in the sumMap

      if (!parch_weight[cherry]) {
        parch_weight[cherry] = 0;
      }

      // Add kilograms to the sumMap

      parch_weight[cherry] +=
        Math.floor(parchWeightA) +
        Math.floor(parchWeightB) +
        Math.floor(parchWeightC);
    });

    return parch_weight;
  };

  // Call the calculateTotalKilogramsByJournal function to get the sum
  const parch_weight = totalParchWeight();

  const totalRatio = () => {
    const cherryRatio = {};

    // Iterate through transactions
    filteredTransactions.forEach((transaction) => {
      const cherry = transaction.cherry_lot_id;
      const parchWeightA = transaction.parchID_A_Weight || 0;
      const parchWeightB = transaction.parchID_B_Weight || 0;
      const parchWeightC = transaction.parchID_C_Weight || 0;
      const kilograms = transaction.kilograms || 0;
      const badKilograms = transaction.bad_kilograms || 0;

      // Check if the JOURNAL# exists in the sumMap

      if (!cherryRatio[cherry]) {
        cherryRatio[cherry] = 0;
      }

      // Add kilograms to the sumMap

      cherryRatio[cherry] +=
        (parchWeightA + parchWeightB + parchWeightC) /
        (kilograms + badKilograms);
    });

    return cherryRatio;
  };

  // Call the calculateTotalKilogramsByJournal function to get the sum
  const cherryRatio = totalRatio();

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

            {/* <div className="grid grid-cols-12 gap-6"> */}
            <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <span className="font-large font-bold  ">Parchment Stock</span>
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
                          {getStationName(decodedToken?.staff._kf_Station)}
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
                          {getStationID(decodedToken?.staff._kf_Station)}
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
                  handleClickAction();
                }}
              >
                {" "}
                +/- Adjust Parchment
              </button>
              {showAdjustmentModel && (
                <ParchmentAdjustmentModel
                  // transaction={selectedUser}
                  onClose={() => setShowAdjustmentModel(false)}
                  onSubmit={handleParchmentAdjustment}
                />
              )}
            </div>

            <div className="py-4 ml-0 mt-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="items-center  justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="flex items-center sm:justify-end">
                    <div className="ml-3">
                      <p>Record</p>
                      <select
                        name=""
                        //  value={itemsPerPage}
                        //  onChange={handleItemsPerPageChange}
                        className="rounded-lg w-30"
                      >
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                      </select>
                    </div>
                    <div className="ml-3">
                      <p>Status</p>
                      <select
                        name=""
                        //  value={itemsPerPage}
                        //  onChange={handleItemsPerPageChange}
                        className="rounded-lg w-40"
                      >
                        <option value="All">All</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
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

            <ParchmentStockTable
              cherryWeight={totalCherry}
              parchWeightA={parch_weightA}
              parchWeightB={parch_weightB}
              parchWeightC={parch_weightC}
              parchWeight={parch_weight}
              transactions={filteredTransaction}
              cherryRatio={cherryRatio}
              formatDate={formatDate}
            />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
export default ParchmentStockPage;
