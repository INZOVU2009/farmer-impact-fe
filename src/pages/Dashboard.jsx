import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import FilterButton from "../components/DropdownFilter";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import CherryPurchasedCard from "../partials/dashboard/CherryPurchasedCard";
import ProjectedParchmentCard from "../partials/dashboard/ProjectedParchmentCard";
import AvgPriceCard from "../partials/dashboard/AvgPriceCard";
import ApprovedPriceCard from "../partials/dashboard/ApprovedPriceCard";
import FarmerPriceCard from "../partials/dashboard/FarmerPriceCard";
import { assignedModules } from "../redux/actions/accessModules/getAssignedModules.action";
import { getModules } from "../redux/actions/accessModules/getAllModules.action";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [allAssignedModules, setAllAssignedModules] = useState();
  const [retrievedModules, setRetrievedModules] = useState();

  const { modulesAssigned } = useSelector((state) => state.fetchAssignedModules);

  const { modules } = useSelector((state) => state.fetchAllModules);
  const dispatch = useDispatch();
  // close on click outside

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  useEffect(() => {
    if (modules) {
      setRetrievedModules(modules.data);
    }
  }, [modules]);
  useEffect(() => {
    dispatch(assignedModules(token));
  }, [dispatch]);

  useEffect(() => {
    if (modulesAssigned) {
      setAllAssignedModules(modulesAssigned.data);
    }
  }, [modulesAssigned]);
  const assignedModuleIds = allAssignedModules?.map((mod) => mod.modeleid) || [];
  const filteredModules = retrievedModules?.filter((module) => assignedModuleIds.includes(module.id));

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
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton />
                
                {filteredModules?.some((module) => module.module_name === "Supplier Inventory") && (
                <NavLink end to="/user_supply_inventory_details">
                  <button className="btn bg-black hover:bg-black text-white">
                    <span className="hidden xs:block ml-2">
                      See supply Inventory Detail
                    </span>
                  </button>
                </NavLink>
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />

              <CherryPurchasedCard />

              <ProjectedParchmentCard />
              <AvgPriceCard />
              <ApprovedPriceCard />
              <FarmerPriceCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
