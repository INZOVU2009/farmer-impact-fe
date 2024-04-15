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
// import { fetchAllDeliveryReports } from "../redux/actions/parchnment/getAllDeliveryReports.action";
import { fetchSingleReport } from "../redux/actions/parchnment/getSingleReport.action";


function DigitalLoadingFormPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedParchment, setSelectedParchment] = useState(null);
  const [selectedOption, setSelectedOption] = useState([])
  const [parchmentToDeliver, setParchmentToDeliver] = useState([])
  const [allDeliveryReports, setAllDeliveryReports] = useState([]);
  const { deliveryReports } = useSelector((state) => state.allDeliveryReports);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const { transactions, loading } = useSelector(
    (state) => state.fetchAllTransactions
  );
  const { delivery,isloading } = useSelector(
    (state) => state.deliveryReport
  );
  const { allParchments } = useSelector((state) => state.allAssignedParchments);
  const [assignedParchments, setAssignedParchments] = useState();
  const dispatch = useDispatch();
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const { decodedToken } = useSelector((state) => state.fetchToken);
  const [stockbal,setStockbal]=useState(0)
  const [selectedParchments, setSelectedParchments] = useState([]);
  const { singleReport } = useSelector((state) => state.fetchSingleReport);

 


const parchmentid = parchmentToDeliver?.parchment_id
console.log("i am id", parchmentid)
  const wantedGrade = parchmentid?.charAt(parchmentid?.length - 1);
console.log("i am id grade", wantedGrade)
const parchWeight = parchmentToDeliver?.parch_weight
  const [formData, setFormData] = useState({
  tally_sheet_no:"",
  truck_plate:"",
  grade:"",
  weight:"",
  bags:"",
  loaded_by:"",
  inspected_by:"",
  accountant_by:"",
  driver_name:"",
  driver_licence_or_national_id:"",
  bags_of_parchment_left:"",
  final_bags_of_parchment_left:"",
  parch_lot_ID: ""
  });

const finaleWeightLeft = parchWeight - formData.weight
  console.log("I am form data", formData)
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
  // useEffect(() => {
  //   dispatch(fetchAllDeliveryReports());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (deliveryReports) {
  //     setAllDeliveryReports(deliveryReports.data);
  //   }
  // }, [deliveryReports]);

 

  


  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedParchment(selectedValue === "Yes" ? e.target.dataset.parchmentId : null);// Update state based on selection
  };

  // const handleSelectChange = (e) => {
  //   const { value, dataset } = e.target;
  //   const parchmentId = dataset.parchmentId;
  
  //   if (value === "Yes") {
  //     setSelectedParchments((prevSelected) => [...prevSelected, parchmentId]);
  //     console.log("I am ", selectedParchments)
  //   } else {
  //     setSelectedParchments((prevSelected) =>
  //       prevSelected.filter((id) => id !== parchmentId)

  //     );
  //     console.log("I not  am ", selectedParchments)

  //   }
  // };


  // const handleSelectChange = (e) => {
  //   const { value, dataset } = e.target;
  //   const parchmentId = dataset.parchmentId;

  //   if (value === "Yes" && !selectedParchments.includes(parchmentId)) {
  //     setSelectedParchments([...selectedParchments, parchmentId]);
  //   } else if (value === "No" && selectedParchments.includes(parchmentId)) {
  //     setSelectedParchments(selectedParchments.filter((id) => id !== parchmentId));
  //   }
  //   console.log("parchment yes selected", selectedParchments)
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     parch_lot_ID: selectedParchments.join(", "), // Join selected IDs with a separator
  //   }));
  // };

  

  // const handleSelectedOption = (e) => {
  //   const { value, dataset } = e.target;
  //   const parchmentId = dataset.parchmentId;

  //   const selected = e.target.value;
  //   console.log("I am selected", selected)
  //   setSelectedOption(selected === "yes" ? e.target.name : null); // Update state based on selection
  // };

  const handleSelectedOption = (e) => {
    const { value } = e.target;
  
    if (value === 'no') {
      setFormData((prevData) => ({
        ...prevData,
        bags_of_parchment_left: '0', // Set to '0' if 'no' is selected
      }));
      setSelectedOption(value);
    console.log("ssvvvvs", selectedOption, formData)
  }
     else {
      setFormData((prevData) => ({
        ...prevData,
        bags_of_parchment_left: '', // Allow typing by setting to an empty string
      }));
      setSelectedOption(value); // Update state based on selection other than 'no'
    }
    console.log("sss", selectedOption, formData)
  };


  // const handleSelectedOption = (e) => {
  //   const { value, dataset } = e.target;
  //   const parchmentId = dataset.parchmentId;

  //   if (value === "yes" && !selectedOption.includes(parchmentId)) {
  //     setSelectedOption([...selectedOption, parchmentId]);
  //   } else if (value === "no" && selectedOption.includes(parchmentId)) {
  //     setSelectedOption(selectedOption.filter((id) => id !== parchmentId));
  //   }
  //   console.log("option yes selected", selectedOption)
  // };




  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      grade: wantedGrade,
      parch_lot_ID: parchmentid,
      // final_weight_left:finaleWeightLeft,
      final_bags_of_parchment_left:formData.bags_of_parchment_left,

      [name]: value,
    }));
  };

  useEffect(() => {
     
      dispatch(fetchSingleReport());
  }, [dispatch,parchmentid]);
useEffect(()=>{
  if(singleReport)
  {
    setAllDeliveryReports(singleReport.data)
  }
  
},[singleReport])

const getWeightLeft = (parchment) => {
  // Check if the parchment is in the delivered reports
  const deliveredParchment = allDeliveryReports?.filter(
    (report) => report.parch_lot_ID === parchment.parchment_id
  );
console.log("delivery reports", deliveredParchment)
  if (deliveredParchment?.length > 0) {
    // Sort delivery reports by date in descending order to get the latest report
    const latestReport = deliveredParchment.sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    )[0];
console.log("latesttttt", latestReport)
    return latestReport?.final_weight_left;
  } else {
    // If not delivered, return the original parchment weight
    return parchment.parch_weight;
  }
};
 



  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
     dispatch(submitDeliveryReport(formData,token));
     setFormData({});
  };
  useEffect(()=>{
    if(delivery){
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
    bags_of_parchment_left: "",
    final_bags_of_parchment_left: "",
    parch_lot_ID: ""
  });
    }

  },[delivery])


  // const handleClick = (parchment) => {
  //   // const updatedParchments = [...parchmentToDeliver,parchment]
  //   setParchmentToDeliver(parchment)
  //   console.log("I wanted bucket weight,", parchment)
  //   // setParchmentToDeliver(parchment)
  //   // const wantedBucketWeight = allDryWeight.filter((bucketWeight)=> bucketWeight.day_lot_number === journal?.cherry_lot_id)
  //   console.log("parchment to deliver", parchmentToDeliver)
  
  // };

  const handleClick = (parchment) => {
    setParchmentToDeliver(parchment);
    console.log("Parchments to deliver", parchmentToDeliver);
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
             handleSubmit={handleDeliverySubmit}
             handleClick={handleClick}
             Spinner={LoadingSpinner}
             isloading={isloading}
             stockbal={getWeightLeft}
              // KfStation={getKfStation}
              />
            </div>
            {/* <ToastContainer/> */}
          </div>
        </main>
      </div>
      <ToastContainer/>

    </div>
  );
}
export default DigitalLoadingFormPage;