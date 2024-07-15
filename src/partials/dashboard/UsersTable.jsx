import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/actions/user/Users.action";
import { fetchAllStaff } from "../../redux/actions/staff/getAllStaff.action";
import { RiKey2Line } from "react-icons/ri";
import { FaToggleOff } from "react-icons/fa6";
import SetCredentialsModel from "../../components/SetCredentialsModel";
import { RiComputerFill } from "react-icons/ri";
import { FaMobileRetro } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { fetchAllUserAccess } from "../../redux/actions/userAccess/fetchAllUserAccess.action";
import { createUserAccess } from "../../redux/actions/userAccess/addUserAccess.action";
import { activateUserAccess } from "../../redux/actions/userAccess/activateUser.action";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
const UsersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPasswordModel, setShowPasswordModel] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allUserAccess, setAllUserAccess] = useState([]);
  const { users, loading } = useSelector((state) => state.users);
  const { staffs } = useSelector((state) => state.fetchAllStaff);
  const { allAccess } = useSelector((state) => state.allUserAccess);
  const { activate } = useSelector((state) => state.activateUser);
  const { access } = useSelector((state) => state.userAccess);

  const itemsPerPage = 20;
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setAllUsers(users.data);
    }
  }, [users]);

  useEffect(() => {
    dispatch(fetchAllStaff());
  }, [dispatch]);

  useEffect(() => {
    if (staffs) {
      setAllStaff(staffs.data);
    }
  }, [staffs]);

  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
  };
  const filteredStaff = searchQuery
    ? allStaff?.filter((staff) =>
        Object.values(staff).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery?.toLowerCase())
        )
      )
    : allStaff;

  const totalPages = Math.ceil(filteredStaff?.length / itemsPerPage);

  // Paginate the user data
  const paginatedStaffs = filteredStaff?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getUserEmailById = (_kf_User) => {
    const user = allUsers?.find((user) => user.__kp_User === _kf_User);
    return user ? user.Email : null;
  };

  const getUserNameById = (_kf_User) => {
    const user = allUsers?.find((user) => user.__kp_User === _kf_User);
    return user ? user.Name_User : null;
  };
  const getUserStatus = (userID) => {
    const user = allUserAccess?.find((user) => user.staff_ID === userID);
    return user ? user.state : null;
  };

  const handleClickAction = (user) => {
    setSelectedUser(user);
    setShowPasswordModel(true);
  };

  const handlePasswordUpdate = (userId, newPassword) => {
    setPassword("");
    setConfirmPassword("");
    setSelectedUser(null);
    setShowPasswordModel(true);
  };

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
    dispatch(fetchAllUserAccess());
  }, [dispatch]);

  useEffect(() => {
    if (allAccess) {
      setAllUserAccess(allAccess.data);
    }
  }, [allAccess]);

  const handleUserAdd = (id) => {
    dispatch(createUserAccess(id));
  };
  useEffect(() => {
    if (access) {
      dispatch(fetchAllUserAccess());
    }
  }, [access, dispatch]);

  const handleActivateUser = (id) => {
    dispatch(activateUserAccess(id));
  };
  useEffect(() => {
    if (activate) {
      dispatch(fetchAllUserAccess());
    }
  }, [dispatch, activate]);

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center mb-4 sm:mb-0 gap-24">
            <form className="sm:pr-3" action="#" method="GET">
              <label htmlFor="products-search" className="sr-only">
                Search
              </label>

              <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="email"
                  id="products-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search for users"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Created Time
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Mobile
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Role
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {paginatedStaffs?.map((staff, index) => (
                    <tr
                      key={staff.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {formatDate(staff.created_at)}
                      </td>
                      <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-900 truncate xl:max-w-xs dark:text-gray-400">
                        {staff.Name}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {/* {staff.Email} */}
                        {getUserEmailById(staff._kf_User)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {getUserNameById(staff._kf_User)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {staff.Phone && staff.Phone.substring(0, 12)}
                      </td>
                      <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {staff.Role}
                      </td>

                      <td className="p-4 space-x-2 whitespace-nowrap">
                        {allUserAccess.some(
                          (userAccess) => userAccess.staff_ID === staff.userID
                        ) ? (
                          getUserStatus(staff?.userID) !== "Inactive" ? (
                            <div className="flex space-x-2">
                              <FaMobileRetro
                                onClick={() =>
                                  navigate(
                                    `/user-administaration/access-controll/mobile-access/${staff.id}`
                                  )
                                }
                                className="text-2xl text-black"
                              />

                              <RiKey2Line
                                onClick={() => handleClickAction(staff)}
                                className="text-2xl text-red-500"
                              />

                              {showPasswordModel && selectedUser && (
                                <SetCredentialsModel
                                  user={selectedUser}
                                  onClose={() => setShowPasswordModel(false)}
                                  onSubmit={handlePasswordUpdate}
                                />
                              )}

                              <RiComputerFill
                                onClick={() =>
                                  navigate(
                                    `/user-administaration/access-controll/module-access/${staff.id}`
                                  )
                                }
                                className="text-2xl text-black"
                              />
                            </div>
                          ) : (
                            <FaToggleOff
                              onClick={() => {
                                handleActivateUser(staff.userID);
                              }}
                              className=" text-2xl text-red-500 w-[50%]"
                            />
                          )
                        ) : (
                          <FaUpload
                            onClick={() => handleUserAdd(staff.id)}
                            className="text-blue-500 w-[50%] text-xl"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ToastContainer />
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
              {Math.min(currentPage * itemsPerPage, allStaff?.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {allStaff?.length}
            </span>
          </span>
        </div>
        <Toaster/>

      </div>
    </div>
  );
};

export default UsersTable;
