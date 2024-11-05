import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import { RiDashboard3Line } from "react-icons/ri";
import { FaRegIdCard } from "react-icons/fa6";
import { FcInspection } from "react-icons/fc";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiCoffeescript } from "react-icons/si";
import { MdStoreMallDirectory } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { FaUsersLine } from "react-icons/fa6";
import { TbBuildingFortress } from "react-icons/tb";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { assignedModules } from "../redux/actions/accessModules/getAssignedModules.action";
import { useDispatch, useSelector } from "react-redux";
import { getModules } from "../redux/actions/accessModules/getAllModules.action";
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const token = localStorage.getItem("token");
  const [allAssignedModules, setAllAssignedModules] = useState();
  const [retrievedModules, setRetrievedModules] = useState();
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const { modulesAssigned } = useSelector(
    (state) => state.fetchAssignedModules
  );
  const { modules } = useSelector((state) => state.fetchAllModules);
  const dispatch = useDispatch();
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
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
  const assignedModuleIds =
    allAssignedModules?.map((mod) => mod.moduleid) || [];
  const filteredModules = retrievedModules?.filter((module) =>
    assignedModuleIds.includes(module.id)
  );

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink
            end
            to="/"
            className="block"
            style={{ display: "flex", marginTop: "-1rem" }}
          >
            <img src={logo} height={55} width={55} alt="logo" />
            <h1
              style={{
                marginTop: "2rem",
                fontSize: "1.35rem",
                color: "GrayText",
              }}
            >
              Farmer Impact
            </h1>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8 " style={{ marginTop: "-2rem" }}>
          <div>
            <ul className="mt-3">
              <SidebarLinkGroup
                activecondition={
                  pathname === "/" ||
                  pathname.includes("dashboard") ||
                  pathname.includes("user_supply_inventory_details")
                }
              >
                {(handleClick, open) => {
                  const isDashboardActive =
                    pathname.includes("dashboard") ||
                    pathname.includes("user_supply_inventory_details");
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/dashboard"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          open ? "hover:text-slate-200" : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          // Use navigate to go directly to the dashboard
                          navigate("/dashboard");
                          // Close the sidebar if needed
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center  ">
                            <RiDashboard3Line className="text-black" />
                            <span className="text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              DASHBOARD
                            </span>
                          </div>
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "Register"
              ) && (
                <SidebarLinkGroup
                  activecondition={pathname.includes("user_registration")}
                >
                  {(handleClick, open) => {
                    const isRecentFarmerActive =
                      pathname.includes("recent_farmers");
                    const isApprovedFarmers =
                      pathname.includes("approved_farmers");
                    const isPendingFarmers =
                      pathname.includes("pending_farmers");
                    const isSyncedFarmersActive =
                      pathname.includes("synced_farmers");
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FaRegIdCard className="text-black" />
                              <span className="text-sm  text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Registers
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-2 ${!open && "hidden"}`}>
                            {filteredModules.some(
                              (module) =>
                                module.module_name === "Recent Registrations"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_registration/recent_farmers"
                                  style={
                                    isRecentFarmerActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Recent Registrations
                                  </span>
                                </NavLink>
                              </li>
                            )}{" "}
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "Updated farmers"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_registration/approved_farmers"
                                  style={
                                    isApprovedFarmers
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Approved Registrations
                                  </span>
                                </NavLink>
                              </li>
                            )}
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "Pending farmers"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_registration/pending_farmers"
                                  style={
                                    isPendingFarmers ? { color: "#4F46E5" } : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Pending Registrations
                                  </span>
                                </NavLink>
                              </li>
                            )}
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "Synced farmers"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  style={
                                    isSyncedFarmersActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  to="/user_registration/synced_farmers"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Synced Farmers
                                  </span>
                                </NavLink>
                              </li>
                            )}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "Register"
              ) && (
                <SidebarLinkGroup
                  activecondition={pathname.includes("farmer_registrations")}
                >
                  {(handleClick, open) => {
                    const isRecentRegistrationsActive = pathname.includes(
                      "recent_registrations"
                    );
                    const isVerifiedRegistrations = pathname.includes(
                      "farmer_registrations/verified_registrations"
                    );
                    const isApprovedRegistrationsActive = pathname.includes(
                      "farmer_registrations/approved_registrations"
                    );
                    const isSyncedFarmersActive =
                      pathname.includes("synced_farmers");
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FaRegIdCard className="text-black" />
                              <span className="text-sm  text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Farmers
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-2 ${!open && "hidden"}`}>
                            {filteredModules.some(
                              (module) =>
                                module.module_name === "Recent Registrations"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/farmer_registrations/recent_registrations"
                                  style={
                                    isRecentRegistrationsActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Recent Farmers
                                  </span>
                                </NavLink>
                              </li>
                            )}{" "}
                            {filteredModules.some(
                              (module) =>
                                module.module_name === "Verified Registrations"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/farmer_registrations/verified_registrations"
                                  style={
                                    isVerifiedRegistrations
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Verfied Farmers
                                  </span>
                                </NavLink>
                              </li>
                            )}{" "}
                            {filteredModules.some(
                              (module) =>
                                module.module_name === "Approved Registrations"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/farmer_registrations/approved_registrations"
                                  style={
                                    isApprovedRegistrationsActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Approved Farmers
                                  </span>
                                </NavLink>
                              </li>
                            )}{" "}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>

            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "Household"
              ) && (
                <SidebarLinkGroup
                  activecondition={pathname.includes("household")}
                >
                  {(handleClick, open) => {
                    const isHouseholdTreesActive =
                      pathname.includes("household_trees");
                    const isApprovedTreesActive =
                      pathname.includes("approved_trees");
                    const isVerifiedTreesActive =
                      pathname.includes("verified_trees");
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <TbBuildingFortress className="text-black" />
                              <span className="text-sm  text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tree Census Servey
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-2 ${!open && "hidden"}`}>
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "Household Trees"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/household/household_trees"
                                  style={
                                    isHouseholdTreesActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Recent trees servey
                                  </span>
                                </NavLink>
                              </li>
                            )}

                            {filteredModules?.some(
                              (module) =>
                                module.module_name ===
                                "Approved Household Tress"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/household/approved_trees"
                                  style={
                                    isApprovedTreesActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Approved tree servey
                                  </span>
                                </NavLink>
                              </li>
                            )}

                            {filteredModules?.some(
                              (module) =>
                                module.module_name ===
                                "Approved Household Tress"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/household/verified_trees"
                                  style={
                                    isVerifiedTreesActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Final Servey Trees
                                  </span>
                                </NavLink>
                              </li>
                            )}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "Inspections"
              ) && (
                <SidebarLinkGroup
                  activecondition={pathname.includes("user_inspection")}
                >
                  {(handleClick, open) => {
                    const isInspectionActive =
                      pathname.includes("full_inspections");
                    const isSimpleActice =
                      pathname.includes("simple_inspections");
                    const isWetmillauditActive = pathname.includes(
                      "user_wet_mill_audit"
                    );
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FcInspection className="text-black " />
                              <span className="text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Inspections
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black  ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "Full Inspection"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_inspection/full_inspections"
                                  style={
                                    isInspectionActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Full Inspections
                                  </span>
                                </NavLink>
                              </li>
                            )}
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "Simple inspection"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_inspection/simple_inspections"
                                  style={
                                    isSimpleActice ? { color: "#4F46E5" } : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Simple Inspections
                                  </span>
                                </NavLink>
                              </li>
                            )}

                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "Wet Mill Audit"
                            )}
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/user_inspection/user_wet_mill_audit"
                                style={
                                  isWetmillauditActive
                                    ? { color: "#4F46E5" }
                                    : {}
                                }
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Wet Mill Audits
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "Trainings"
              ) && (
                <SidebarLinkGroup
                  activecondition={pathname.includes("user_trainings")}
                >
                  {(handleClick, open) => {
                    const isTrainingsActive =
                      pathname.includes("user_translator");
                    const isSessionsActive = pathname.includes("sessions");
                    const isParticipantsActive = pathname.includes(
                      "recent_participants"
                    );
                    const isWeeklyReportActive =
                      pathname.includes("weekly_report");
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <LiaChalkboardTeacherSolid className="text-black" />
                              <span className="text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Trainings
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black  ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            {filteredModules?.some(
                              (module) => module.module_name === "participants"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_trainings/recent_participants"
                                  style={
                                    isParticipantsActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Participants
                                  </span>
                                </NavLink>
                              </li>
                            )}
                            {filteredModules?.some(
                              (module) => module.module_name === "courses"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_trainings/user_translator"
                                  style={
                                    isTrainingsActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Courses
                                  </span>
                                </NavLink>
                              </li>
                            )}
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "weekly report" ||
                                module.module_name === "Weekly Report" ||
                                module.module_name === "WEEKLY REPORT"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_trainings/weekly_report"
                                  style={
                                    isWeeklyReportActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Weekly Report
                                  </span>
                                </NavLink>
                              </li>
                            )}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "Coffee Purchases"
              ) && (
                <SidebarLinkGroup
                  activecondition={
                    pathname.includes("user_transactions") ||
                    pathname.includes("cws-daily-journals") ||
                    pathname.includes("add_untraceable_coffee") ||
                    pathname.includes("lots_in_a_day_lot") ||
                    pathname.includes("cherry_lot_details") ||
                    pathname.includes("site_day_lot_details") ||
                    pathname.includes("general_harvest") ||
                    pathname.includes("site_harvest")
                  }
                >
                  {(handleClick, open) => {
                    const isSCDailyJournalsActive =
                      pathname.includes("user_transactions");
                    const isCwsDailyJournalsActive =
                      pathname.includes(
                        "user-transactions/cws-daily-journals"
                      ) ||
                      pathname.includes("lots_in_a_day_lot") ||
                      pathname.includes("cherry_lot_details") ||
                      pathname.includes("site_day_lot_details");
                    const isAddUntraceableCoffeeActive = pathname.includes(
                      "user_transaction/add_untraceable_coffee"
                    );
                    const isGeneralHarvestActive =
                      pathname.includes("general_harvest");
                    const isSiteHarvestActive =
                      pathname.includes("site_harvest");

                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200  truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between ">
                            <div className="flex items-center  ">
                              <SiCoffeescript className="text-black" />
                              <span className="text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Coffee Purchases
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black  ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block ">
                          <ul className={`pl-9 mt-2 ${!open && "hidden"}`}>
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "Add Untraceable Coffee"
                            ) && (
                              <li className="mb-3 last:mb-0">
                                <NavLink
                                  end
                                  style={
                                    isAddUntraceableCoffeeActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  to="/user_transaction/add_untraceable_coffee"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Add Untraceable coffee
                                  </span>
                                </NavLink>
                              </li>
                            )}

                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "sc_daily_journals"
                            ) && (
                              <li className="mb-3 last:mb-0">
                                <NavLink
                                  end
                                  to="/user_transactions"
                                  style={
                                    isSCDailyJournalsActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    SC Daily Journals
                                  </span>
                                </NavLink>
                              </li>
                            )}
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "cws_daily_journals"
                            ) && (
                              <li className="mb-3 last:mb-0">
                                <NavLink
                                  end
                                  style={
                                    isCwsDailyJournalsActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  to="/user-transactions/cws-daily-journals"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    CWS Daily Journals
                                  </span>
                                </NavLink>
                              </li>
                            )}

                            <li className="mb-3 last:mb-0">
                              <NavLink
                                end
                                style={
                                  isGeneralHarvestActive
                                    ? { color: "#4F46E5" }
                                    : {}
                                }
                                to="/user_registration/general_harvest"
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  General Harvest
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-3 last:mb-0">
                              <NavLink
                                end
                                style={
                                  isSiteHarvestActive
                                    ? { color: "#4F46E5" }
                                    : {}
                                }
                                to="/user_registration/site_harvest"
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Site Harvest
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "coffee_inventory"
              ) && (
                <SidebarLinkGroup
                  activecondition={pathname.includes(
                    "user_inventory_management"
                  )}
                >
                  {(handleClick, open) => {
                    const isActive = pathname.includes("assigned_parchment");
                    const isDeliveryProcessingActive = pathname.includes(
                      "deliveries_processing"
                    );
                    const isParchmentStockActive =
                      pathname.includes("parchment_stock");
                    const isParchmentTransportActive =
                      pathname.includes("parchment_transport") ||
                      pathname.includes("new_loading_form");
                    const isParchmentReceptionActive = pathname.includes(
                      "parchment_reception"
                    );
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <MdStoreMallDirectory className="text-black" />
                              <span className="text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Coffee Inventory
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "assigned_parchment"
                            ) && (
                              <li className="mb-3 last:mb-0">
                                <NavLink
                                  end
                                  style={isActive ? { color: "#4F46E5" } : {}}
                                  to="/user_inventory_management/assigned_parchment"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Assigned Parchment
                                  </span>
                                </NavLink>
                              </li>
                            )}

                            <li className="mb-3 last:mb-0">
                              <NavLink
                                end
                                style={
                                  isParchmentStockActive
                                    ? { color: "#4F46E5" }
                                    : {}
                                }
                                to="/user_inventory_management/parchment_stock"
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Parchment Stock
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-3 last:mb-0">
                              <NavLink
                                end
                                style={
                                  isDeliveryProcessingActive
                                    ? { color: "#4F46E5" }
                                    : {}
                                }
                                to="/user_inventory_management/deliveries_processing"
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Deliveries Processing
                                </span>
                              </NavLink>
                            </li>
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "parchment_transport"
                            ) && (
                              <li className="mb-3 last:mb-0">
                                <NavLink
                                  end
                                  style={
                                    isParchmentTransportActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  to="/user_inventory_management/parchment_transport"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Parchement Transport
                                  </span>
                                </NavLink>
                              </li>
                            )}

                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "parchment_reception"
                            ) && (
                              <li className="mb-3 last:mb-0">
                                <NavLink
                                  end
                                  style={
                                    isParchmentReceptionActive
                                      ? { color: "#4F46E5" }
                                      : {}
                                  }
                                  to="/user_inventory_management/parchment_reception"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Parchement Reception
                                  </span>
                                </NavLink>
                              </li>
                            )}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "cws_finance"
              ) && (
                <SidebarLinkGroup>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FaMoneyCheckDollar className="text-black" />
                              <span className="text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                CWS Finances
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black  ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            {filteredModules?.some(
                              (module) => module.module_name === "reports"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/signin"
                                  className="block text-black hover:text-slate-200 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    New Report
                                  </span>
                                </NavLink>
                              </li>
                            )}
                            {filteredModules?.some(
                              (module) =>
                                module.module_name === "weekly_report_forms"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/signup"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    View Report Forms
                                  </span>
                                </NavLink>
                              </li>
                            )}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "cash_requisition"
              ) && (
                <SidebarLinkGroup>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <SiCashapp className="text-black" />
                              <span className="text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Cash Requisition
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black  ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            {filteredModules?.some(
                              (module) =>
                                module.module_name ===
                                "cash_requisition_request"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/signin"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    New Cash Request
                                  </span>
                                </NavLink>
                              </li>
                            )}

                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/signup"
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  View Cash Requests
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/reset-password"
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Pending Requisitions
                                </span>
                              </NavLink>
                            </li>
                            {filteredModules?.some(
                              (module) =>
                                module.module_name ===
                                "cash_requisition_approval"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/reset-password"
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Approved Requisitions
                                  </span>
                                </NavLink>
                              </li>
                            )}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "App Settings"
              ) && (
                <SidebarLinkGroup
                  activecondition={pathname.includes("app_setting")}
                >
                  {(handleClick, open) => {
                    const isAccessModulesActive =
                      pathname.includes("access_modules");
                    const isTranslationsActive =
                      pathname.includes("user_translator");
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FiSettings className="text-black" />
                              <span className="text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                App Settings
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black  ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/app_setting/user_translator"
                                style={
                                  isTranslationsActive
                                    ? { color: "#4F46E5" }
                                    : {}
                                }
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Translations
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/app_setting/inspection_questions"
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Inspection Questions
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/app_setting/access_modules"
                                style={
                                  isAccessModulesActive
                                    ? { color: "#4F46E5" }
                                    : {}
                                }
                                className="block ttext-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Access Modules
                                </span>
                              </NavLink>
                            </li>
                            <div
                              style={{
                                margin: "15px 0",
                                height: "1.3px",
                                width: "120px",
                                content: "",
                                backgroundColor: "grey",
                              }}
                            />
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/app_setting/groups"
                                className="block text-black hover:text-slate-400 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Groups Management
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
            <ul className="mt-3">
              {filteredModules?.some(
                (module) => module.module_name === "Manage Users"
              ) && (
                <SidebarLinkGroup
                  activecondition={
                    pathname.includes("administration") ||
                    pathname.includes(
                      "user-administaration/access-controll/mobile-access"
                    ) ||
                    pathname.includes(
                      "user-administaration/access-controll/module-access"
                    )
                  }
                >
                  {(handleClick, open) => {
                    const isActive = pathname.includes("user-administration");

                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            open ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FaUsersLine className="text-black" />
                              <span
                                className={`text-sm text-black font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                              >
                                Manage Users
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-black  ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            {filteredModules?.some(
                              (module) => module.module_name === "List Users"
                            ) && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user-administration"
                                  style={isActive ? { color: "#4F46E5" } : {}}
                                  className="block text-black hover:text-slate-400 transition duration-150 truncate"
                                >
                                  <span
                                    className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                                  >
                                    List Users
                                  </span>
                                </NavLink>
                              </li>
                            )}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-black"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-black" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
