import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../../redux/actions/transactions/allTransactions.action";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllTransactionsByCherryLot } from "../../redux/actions/transactions/transactionsByCherryLot.action ";
import { Toaster } from "react-hot-toast";
const LotsInAdaylotTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const itemsPerPage = 20;
  const journalId = useParams();
  const cherryLotId = useParams();

  const [journals, setJournals] = useState([]);

  const { journal } = useSelector(
    (state) => state.fetchAllTransactionsByCherryLot
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [allTransactions, setAllTransactions] = useState([]);
  const { transactions, loading } = useSelector(
    (state) => state.fetchAllTransactions
  );

  const [additionalInfo, setAdditionalInfo] = useState({
    commissionFee: 10,
    transportFee: 10,
    commissionUntraced: 10,
    transportCherry: 10,
    transportFloaters: 10,
  });

  //all transactions
  useEffect(() => {
    dispatch(fetchAllTransactions(token));
  }, [dispatch]);

  useEffect(() => {
    if (transactions) {
      setAllTransactions(transactions.data);
    }
  }, [transactions]);

  // Function to get unique values from an array
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

  //single journal
  const filteredJournal = getUniqueValues(
    allTransactions,
    cherryLotId.cherryLotId
  );

  const formatter = new Intl.NumberFormat("en-US");

  useEffect(() => {
    dispatch(
      fetchAllTransactionsByCherryLot(
        token,
        cherryLotId.cherryLotId.replace(":", "")
      )
    );
  }, [dispatch, token, journalId]);

  useEffect(() => {
    if (journal) {
      setJournals(journal.data);
    }
  }, [journal]);

  const calculateTotalKilogramsByJournal = () => {
    const sumByJournal = {};

    // Iterate through transactions
    journals.forEach((transaction) => {
      const journal = transaction.site_day_lot;
      const kilograms = transaction.kilograms || 0;

      // Check if the JOURNAL# exists in the sumMap
      if (!sumByJournal[journal]) {
        sumByJournal[journal] = 0;
      }

      // Add kilograms to the sumMap
      sumByJournal[journal] += kilograms;
    });

    return sumByJournal;
  };

  const sumByJournal = calculateTotalKilogramsByJournal();

  const calculateTotalPrice = () => {
    const totalPriceByTransaction = {};

    journals.forEach((transaction) => {
      const transactionId = transaction.id;
      const totalPrice =
        transaction.kilograms * transaction.unitprice +
          transaction.bad_kilograms * transaction.bad_unit_price || 0;

      if (!totalPriceByTransaction[transactionId]) {
        totalPriceByTransaction[transactionId] = 0;
      }

      totalPriceByTransaction[transactionId] = totalPrice;
    });

    return totalPriceByTransaction;
  };

  const totalPriceByTransaction = calculateTotalPrice();

  const calculateTotalMomoAmount = () => {
    const totalMomoAmountByTransaction = {};

    journals.forEach((transaction) => {
      const transactionId = transaction.id;
      const cash = transaction.total_mobile_money_payment_paid || 0;

      if (!totalMomoAmountByTransaction[transactionId]) {
        totalMomoAmountByTransaction[transactionId] = 0;
      }

      totalMomoAmountByTransaction[transactionId] += cash;
    });

    return totalMomoAmountByTransaction;
  };

  const totalMomoAmountByTransaction = calculateTotalMomoAmount();

  const calculateTotalKilogramsPurchased = (transaction) => {
    const certifiedKG =
      transaction.certified === 1 ? transaction.kilograms || 0 : 0;
    const uncertifiedKG =
      transaction.certified === 1 ? 0 : transaction.kilograms || 0;
    const floatersKG = transaction.bad_kilograms || 0;

    return certifiedKG + uncertifiedKG + floatersKG;
  };

  const totalPages = Math.ceil(journals?.length / itemsPerPage);

  const paginatedTransactions = journals?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const allPaperReceipts = journals.map((transaction) => transaction.username);

  const isUniquePaperSlip = (username) => {
    const occurrences = allPaperReceipts.filter(
      (value) => value === username
    ).length;

    return occurrences === 1;
  };

  const filteredSiteCollectors = getUniqueValues(allPaperReceipts, "username");

  const calculateTotalValues = () => {
    const totalValues = {
      uploadedTime: 0,
      transactionDate: "",
      totalFloaters: 0,
      averagePrice: 0,
      totalCertified: 0,
      totalUncertified: 0,
      totalCoffeeValue: 0,
      totalUnTraceableKg: 0,
      totalKgs: 0,
      siteCollector: "",
    };

    journals.forEach((transaction) => {
      totalValues.transactionDate = transaction.transaction_date;

      totalValues.uploadedTime = transaction.uploaded_at;

      if (transaction.certified === 1) {
        totalValues.totalCertified += transaction.kilograms;
        totalValues.totalUncertified = 0;
      } else {
        totalValues.totalUncertified += transaction.kilograms;
        totalValues.totalCertified = 0;
      }
      totalValues.totalFloaters += transaction.bad_kilograms;
      totalValues.averagePrice = transaction.unitprice;
      totalValues.totalCoffeeValue +=
        transaction.kilograms * transaction.unitprice +
        transaction.bad_kilograms * transaction.bad_unit_price;
      totalValues.totalKgs =
        totalValues.totalCertified +
        totalValues.totalUncertified +
        totalValues.totalFloaters;
    });

    return totalValues;
  };
  //calculating totals
  const totalValues = calculateTotalValues();
  const totalCommission = additionalInfo.commissionFee * totalValues.totalKgs;
  const transportFeesCherry =
    additionalInfo.transportFee * totalValues.totalCertified;
  const transportFeesFloaters =
    additionalInfo.transportFee * totalValues.totalFloaters;
  const totals = totalCommission + transportFeesCherry + transportFeesFloaters;

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formattedTransportFeesCherry =
    formatNumberWithCommas(transportFeesCherry);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const handleDownload = () => {
    const table = document.querySelector(".table-fixed");
    const rows = table.querySelectorAll("tr");

    const data = [];

    const headers = Array.from(rows[0].querySelectorAll("th")).map(
      (header) => header.innerText
    );
    data.push(headers.join(","));

    rows.forEach((row, index) => {
      if (index !== 0) {
        const rowData = [];
        const cells = row.querySelectorAll("td");
        cells.forEach((cell) => {
          rowData.push(cell.innerText);
        });
        data.push(rowData.join(","));
      }
    });

    const csvContent = "data:text/csv;charset=utf-8," + data.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Cherry_Lot_Summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <span className="font-large font-bold ml-12 ">Cherry lot summary</span>
        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex w-full items-center mb-4  sm:mb-0 ">
            <table className="min-w-full  divide-y divide-gray-200  mt-8  dark:divide-gray-600 border border-gray-300 dark:border-gray-600">
              <thead className=" dark:bg-gray-700">
                <tr className="border-b">
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    CHERRY DAY LOT
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {cherryLotId.cherryLotId.replace(":", "")}
                  </td>
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r "
                  >
                    UPLOADED TIME
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {formatDate(totalValues.uploadedTime)}
                  </td>
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    BUY DATE
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                    {totalValues.transactionDate}
                  </td>
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    TOTAL KG PURCHASED
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                    {totalValues.totalKgs.toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    TOTAL CONTRIBUTING FARMERS
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                    {journals.length}
                  </td>
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    AVERAGE PRICE
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {totalValues.averagePrice}
                  </td>
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    NUMBER OF CONTRIBUTING AGENTS
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white border-r">
                    {filteredSiteCollectors.length} AGENT(S)
                  </td>
                </tr>
                <tr className="border-b">
                  <th
                    scope="col"
                    className="p-4 text-xs font-bold text-left text-gray-500 uppercase dark:text-gray-400 border-r"
                  >
                    TOTAL AGENT VOLUME COMMISSION
                  </th>
                  <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                    {filteredSiteCollectors.length} AGENT(S)
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <p className="mt-3 font-bold">Farmer Contributions</p>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4">
                      CHERRY.LOT.NO
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      FARMER
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      CERT.ID
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      DELIVERY.SITE
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      KG.DELIVERED
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      FARMER.PYT
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      FTR
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      PAPER.RECEIPT
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      PAYMENT TYPE
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      EDITED.
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {paginatedTransactions?.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {transaction.cherry_lot_id}
                      </td>

                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        [ {transaction.farmerid} , {transaction.farmername}]
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {transaction.farmerid}
                      </td>

                      <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                        [{journal?.staffData[0].Name} ,{" "}
                        {journal?.staffData[0].userID}]
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {transaction.kilograms + transaction.bad_kilograms}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {transaction.cash_paid.toLocaleString()}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {transaction.lotnumber}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {transaction.paper_receipt}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        CASH
                      </td>
                      <td class="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {transaction.edited === 1 ? "YES" : "NO"}
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
            onClick={handlePrevPage}
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
            onClick={handleNextPage}
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
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(currentPage * itemsPerPage, journals?.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {journals?.length}
            </span>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-green-500 p-4 mt-5 rounded-lg text-white"
          onClick={handleDownload}
        >
          DOWNLOAD REPORT
        </button>
      </div>
      <Toaster/>

    </div>
  );
};

export default LotsInAdaylotTable;
