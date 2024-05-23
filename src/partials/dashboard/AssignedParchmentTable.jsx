import React, { useState, useEffect } from "react";
import UpdateItemDrawer from "./UpdateItemDrawer";
import DeleteItemDrawer from "./DeleteItemDrawer";
import AddItemDrawer from "./AddItemDrawer";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PerchmentAssignment from "../../components/PerchmentAssignment";
import { fetchAllAssignedParchments } from "../../redux/actions/parchnment/allAssignedParchment.action";
import { fetchAllStation } from "../../redux/actions/station/allStations.action";
import { handleToken } from "../../redux/actions/auth/fetchToken.action";
import { fetchAllTransactions } from "../../redux/actions/transactions/allTransactions.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignedParchmentTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parchment, isloading } = useSelector((state) => state.newParchment);
  const { allParchments } = useSelector((state) => state.allAssignedParchments);
  const [assignedParchments, setAssignedParchments] = useState();
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const { decodedToken } = useSelector((state) => state.fetchToken);
  const { transactions, loading } = useSelector(
    (state) => state.fetchAllTransactions
  );

  useEffect(() => {
    dispatch(fetchAllAssignedParchments());
  }, [dispatch]);

  useEffect(() => {
    if (allParchments) {
      setAssignedParchments(allParchments.data);
    }
  }, [allParchments]);

  useEffect(() => {
    dispatch(handleToken());
  }, [dispatch]);
  console.log("I am parchm", assignedParchments);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
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

  const getTransactionState = (cherry_lot_id) => {
    const transaction = allTransactions?.find(
      (transaction) => transaction.cherry_lot_id === cherry_lot_id
    );
    return transaction ? transaction.state : null;
  };
  //all transactions
  useEffect(() => {
    dispatch(fetchAllTransactions(token));
  }, [dispatch]);

  useEffect(() => {
    if (transactions) {
      setAllTransactions(transactions.data);
    }
  }, [transactions]);

  const dryingParchments = assignedParchments?.filter(
    (parchment) => getTransactionState(parchment.cherry_lot_id) == "in-drying"
  );
  const inDryStorageParchments = assignedParchments?.filter(
    (parchment) =>
      getTransactionState(parchment.cherry_lot_id) == "in-dry-storage"
  );
  const inTransitParchments = assignedParchments?.filter(
    (parchment) => getTransactionState(parchment.cherry_lot_id) == "in-transit"
  );
  const inDeliveredParchments = assignedParchments?.filter(
    (parchment) => getTransactionState(parchment.cherry_lot_id) == "delivered"
  );
  const parchmentA = assignedParchments?.filter(
    (parchment) => parchment.parch_grade == "Grade A"
  );
  const parchmentB = assignedParchments?.filter(
    (parchment) => parchment.parch_grade == "Grade B"
  );
  const parchmentC = assignedParchments?.filter(
    (parchment) => parchment.parch_grade == "Grade C"
  );
  const dryingParchmentA = parchmentA?.filter(
    (parchA) => getTransactionState(parchA.cherry_lot_id) == "in-drying"
  );
  const inDryStorageParchmentA = parchmentA?.filter(
    (parchA) => getTransactionState(parchA.cherry_lot_id) == "in-dry-storage"
  );
  const inTransitParchmentA = parchmentA?.filter(
    (parchA) => getTransactionState(parchA.cherry_lot_id) == "in-transit"
  );
  const inDeliveredParchmentA = parchmentA?.filter(
    (parchA) => getTransactionState(parchA.cherry_lot_id) == "delivered"
  );
  const dryingParchmentB = parchmentB?.filter(
    (parchB) => getTransactionState(parchB.cherry_lot_id) == "in-drying"
  );
  const inDryStorageParchmentB = parchmentB?.filter(
    (parchB) => getTransactionState(parchB.cherry_lot_id) == "in-dry-storage"
  );
  const inTransitParchmentB = parchmentB?.filter(
    (parchB) => getTransactionState(parchB.cherry_lot_id) == "in-transit"
  );
  const inDeliveredParchmentB = parchmentB?.filter(
    (parchB) => getTransactionState(parchB.cherry_lot_id) == "delivered"
  );
  const dryingParchmentC = parchmentC?.filter(
    (parchC) => getTransactionState(parchC.cherry_lot_id) == "in-drying"
  );
  const inDryStorageParchmentC = parchmentC?.filter(
    (parchC) => getTransactionState(parchC.cherry_lot_id) == "in-dry-storage"
  );
  const inTransitParchmentC = parchmentC?.filter(
    (parchC) => getTransactionState(parchC.cherry_lot_id) == "in-transit"
  );
  const inDeliveredParchmentC = parchmentC?.filter(
    (parchC) => getTransactionState(parchC.cherry_lot_id) == "delivered"
  );

  const totalWeightDrying = dryingParchments?.reduce(
    (total, parchment) => total + parseInt(parchment.parch_weight),
    0
  );
  const totalWeightInDryStorage = inDryStorageParchments?.reduce(
    (total, parchment) => total + parseInt(parchment.parch_weight),
    0
  );
  const totalWeightInTransit = inTransitParchments?.reduce(
    (total, parchment) => total + parseInt(parchment.parch_weight),
    0
  );
  const totalWeightInDelivered = inDeliveredParchments?.reduce(
    (total, parchment) => total + parseInt(parchment.parch_weight),
    0
  );

  const totalDryingA = dryingParchmentA?.reduce(
    (total, parchA) => total + parseInt(parchA.parch_weight),
    0
  );
  const totalDryStorageA = inDryStorageParchmentA?.reduce(
    (total, parchA) => total + parseInt(parchA.parch_weight),
    0
  );
  const totalTransitA = inTransitParchmentA?.reduce(
    (total, parchA) => total + parseInt(parchA.parch_weight),
    0
  );
  const totalDeliveredA = inDeliveredParchmentA?.reduce(
    (total, parchA) => total + parseInt(parchA.parch_weight),
    0
  );

  const totalDryingB = dryingParchmentB?.reduce(
    (total, parchB) => total + parseInt(parchB.parch_weight),
    0
  );
  const totalDryStorageB = inDryStorageParchmentB?.reduce(
    (total, parchB) => total + parseInt(parchB.parch_weight),
    0
  );
  const totalTransitB = inTransitParchmentB?.reduce(
    (total, parchB) => total + parseInt(parchB.parch_weight),
    0
  );
  const totalDeliveredB = inDeliveredParchmentB?.reduce(
    (total, parchB) => total + parseInt(parchB.parch_weight),
    0
  );

  const totalDryingC = dryingParchmentC?.reduce(
    (total, parchC) => total + parseInt(parchC.parch_weight),
    0
  );
  const totalDryStorageC = inDryStorageParchmentC?.reduce(
    (total, parchC) => total + parseInt(parchC.parch_weight),
    0
  );
  const totalTransitC = inTransitParchmentC?.reduce(
    (total, parchC) => total + parseInt(parchC.parch_weight),
    0
  );
  const totalDeliveredC = inDeliveredParchmentC?.reduce(
    (total, parchC) => total + parseInt(parchC.parch_weight),
    0
  );
  console.log("I am total weight", totalWeightDrying);

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <span className="font-large font-bold  ">Assigned Parchment</span>
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
      <div className="flex flex-row left-4 items-center justify-center py-8 gap-3">
        <PerchmentAssignment
          cardTitle="TOTAL PARCHMENT ASSIGNMENT"
          drying={totalWeightDrying?.toLocaleString()}
          dryStorange={totalWeightInDryStorage?.toLocaleString()}
          transit={totalWeightInTransit?.toLocaleString()}
          delivered={totalWeightInDelivered?.toLocaleString()}
          // floaters={50}
        />
        <PerchmentAssignment
          cardTitle="A GRADE PARCHMENT ASSIGNMENTS"
          drying={totalDryingA?.toLocaleString()}
          dryStorange={totalDryStorageA?.toLocaleString()}
          transit={totalTransitA?.toLocaleString()}
          delivered={totalDeliveredA?.toLocaleString()}
          // floaters={50}
        />
        <PerchmentAssignment
          cardTitle="B GRADE PARCHMENT ASSIGNMENTS"
          drying={totalDryingB?.toLocaleString()}
          dryStorange={totalDryStorageB?.toLocaleString()}
          transit={totalTransitB?.toLocaleString()}
          delivered={totalDeliveredB?.toLocaleString()}
          // floaters={50}
        />
        <PerchmentAssignment
          cardTitle="C GRADE PARCHMENT ASSIGNMENTS"
          drying={totalDryingC?.toLocaleString()}
          dryStorange={totalDryStorageC?.toLocaleString()}
          transit={totalTransitC?.toLocaleString()}
          delivered={totalDeliveredC?.toLocaleString()}
          // floaters={50}
        />
      </div>

      <div>
        <button
          className="bg-green-500 text-white p-2 rounded-lg mb-4"
          onClick={() => {
            navigate("/user_inventory_management/new_parchment_assignement");
          }}
        >
          {" "}
          New parchment lot
        </button>
      </div>

      <div className="py-4 ml-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <div className="items-center  justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="flex items-center sm:justify-end">
              <div className="flex pl-2 space-x-1 mt-1">
                <div>
                  <span>Record</span>
                  <select
                    name=""
                    // value={itemsPerPage}
                    // onChange={handleItemsPerPageChange}
                    className="rounded-lg w-40"
                  >
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                  </select>
                </div>

                <div>
                  <span>Status</span>
                  <select
                    name=""
                    // value={selectedStatus}
                    // onChange={handleStatusChange}
                    className="rounded-lg w-40"
                  >
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
            <form className="sm:pr-3" action="#" method="GET">
              <label htmlFor="products-search" className="sr-only">
                Search
              </label>
              <div className="relative w-48 ml-3 mt-1 sm:w-64 mr-1 xl:w-96">
                <span>Search by Cherry Lot ID ...</span>
                <input
                  type="text"
                  name="email"
                  // onChange={handleSearch}
                  id="products-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-[60%]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search for products"
                />
              </div>
            </form>
            <div className="flex space-x-1 -ml-36">
              <div>
                <span>From</span>
                <input
                  value={new Date().toISOString().split("T")[0]}
                  type="date"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-30  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <span>To</span>
                <input
                  value={new Date().toISOString().split("T")[0]}
                  type="date"
                  class="bg-gray-50 border border-gray-300 mr-2 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-30  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row left-4 items-center justify-center py-8 gap-3"></div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4">
                      PARC-LOT.ID
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      CERTIFICATION
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      CH-LOT.IDs ASSIGNED
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      DATE LOT WAS CREATED
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      GRADE
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      WEIGHT
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {assignedParchments?.map((parchment, index) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.parchment_id}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {getTransactionState(parchment.cherry_lot_id)}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.certificate === "1" ? "CP" : "NC"}
                      </td>

                      <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        {parchment.cherry_lot_id}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {formatDate(parchment.created_at)}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.parch_grade.charAt(
                          parchment.parch_grade.length - 1
                        )}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {parchment.parch_weight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-20
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              2290
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="w-5 h-5 mr-1 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Next
            <svg
              className="w-5 h-5 ml-1 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      {/* update drawer */}
      <UpdateItemDrawer />

      {/* Delete Product Drawer */}
      <DeleteItemDrawer />

      {/* Add Product Drawer */}
      <AddItemDrawer />
    </div>
  );
};

export default AssignedParchmentTable;
