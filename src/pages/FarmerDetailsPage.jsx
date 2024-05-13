import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import WetMillAuditsTable from "../partials/dashboard/WetMillAuditsTable";
import { useParams } from "react-router-dom";
import { fetchAllFarmers } from "../redux/actions/farmers/fetchAllFarmers.action";
import { useSelector, useDispatch } from "react-redux";

function FarmerDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allFarmers, setAllFarmers] = useState(null);
  const { farmers } = useSelector((state) => state.fetchAllFarmers);
  const farmerId = useParams().farmerid;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFarmers());
  }, [dispatch]);

  useEffect(() => {
    if (farmers) {
      setAllFarmers(farmers.data);
    }
  }, [farmers]);

  const selectedFarmer = allFarmers?.find((farmer) => farmer.farmerid === farmerId);
  console.log("selected",selectedFarmer)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />

            <div className="sm:flex sm:justify-between sm:items-center mb-8"></div>
            <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
                <div className="flex gap-20  ml-40">
                    <div className="grid">
                        <p className="mt-3">
                            Farmer ID
                        </p>
                        <input type="text" value= {farmerId}className="rounded-lg mb-2" />
                    </div>
                    <div className="grid ">
                        <p className="mt-3">
                            Full Name
                        </p>
                        <input type="text" value={selectedFarmer?.Name} className="rounded-lg mb-2" />
                    </div>
                </div>

            </div>
            <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20  ml-40">
           <div className="grid  ">
               <p className="mt-3">
               Date of Birth
               </p>
               <input type="text" value={selectedFarmer?.Year_Birth} className="rounded-lg mb-2" />
           </div>
           <div className="grid  ">
               <p className="mt-3">
               Contact Number

               </p>
               <input type="text"   value={selectedFarmer?.phone} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20  ml-40">
       <div className="grid ">
               <p className="mt-3">
               Gender
               </p>
               <input type="text" value={selectedFarmer?.Gender} className="rounded-lg mb-2" />
           </div>  
           <div className="grid  ">
               <p className="mt-3">
               National.ID
               </p>
               <input type="text" value={selectedFarmer?.National_ID_t} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20  ml-40">
           <div className="grid ">
               <p className="mt-3">
               Position
               </p>
               <input type="text" value={selectedFarmer?.Position} className="rounded-lg mb-2" />
           </div>
           <div className="grid  ">
               <p className="mt-3">
               CAFE_ID

               </p>
               <input type="text" value={selectedFarmer?.CAFE_ID} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20  ml-40">
           <div className="grid  ">
               <p className="mt-3">
               SAN_ID
               </p>
               <input type="text" value={selectedFarmer?.SAN_ID} className="rounded-lg mb-2" />
           </div>
           <div className="grid ">
               <p className="mt-3">
               UTZ_ID
               </p>
               <input type="text" value={selectedFarmer?.UTZ_ID} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20  ml-40">
           <div className="grid ">
               <p className="mt-3">
               Trees
               </p>
               <input type="text" value={selectedFarmer?.Trees} className="rounded-lg mb-2" />
           </div>
           <div className="grid ">
               <p className="mt-3">
               Trees producing

               </p>
               <input type="text" value={selectedFarmer?.Trees_Producing} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20 ml-40">
           <div className="grid ">
               <p className="mt-3">
               Children
               </p>
               <input type="text" className="rounded-lg mb-2" />
           </div>
           <div className="grid ">
               <p className="mt-3">
               
Number Of Plots
               </p>
               <input type="text" value={selectedFarmer?.number_of_plots_with_coffee} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20  ml-40">
           <div className="grid  ">
               <p className="mt-3">
               Marital_Status
               </p>
               <input type="text" value={selectedFarmer?.Marital_Status} className="rounded-lg mb-2" />
           </div>
           <div className="grid ">
               <p className="mt-3">
               Reading Skills
               </p>
               <input type="text" value={selectedFarmer?.Reading_Skills||"No Reading Skills"} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20  ml-40">
           <div className="grid  ">
               <p className="mt-3">
               Math_Skills
               </p>
               <input type="text" value={selectedFarmer?.Reading_Skills||"No Math Skills"} className="rounded-lg mb-2" />
           </div>
           <div className="grid ">
               <p className="mt-3">
               Group ID
               </p>
               <input type="text" className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20 ml-40">
           <div className="grid  ">
               <p className="mt-3">
               Updated at
               </p>
               <input type="text" value={selectedFarmer?.updated_at||""} className="rounded-lg mb-2" />
           </div>
           <div className="grid ">
               <p className="mt-3">
               Uploaded at 
               </p>
               <input type="text" value={selectedFarmer?.uploaded_at||""} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
   <div className=" dark:bg-slate-800  rounded-sm border border-slate-200 dark:border-slate-700 mb-2">
       
       <div className="flex gap-20 ml-40">

           <div className="grid  ">
               <p className="mt-3">
              Registered by
               </p>
               <input type="text" value={selectedFarmer?.created_by} className="rounded-lg mb-2" />
           </div>
       </div>

   </div>
 </div>
         
        </main>
      </div>
    </div>
  );
}
export default FarmerDetailsPage;
