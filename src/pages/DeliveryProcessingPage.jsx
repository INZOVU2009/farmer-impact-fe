import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DeliveryProcessingTable from "../partials/dashboard/DeliveryProcessingTable";

function DeliveryProcessingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

            <DeliveryProcessingTable />
          </div>

          {/* </div> */}
        </main>
      </div>
    </div>
  );
}
export default DeliveryProcessingPage;
