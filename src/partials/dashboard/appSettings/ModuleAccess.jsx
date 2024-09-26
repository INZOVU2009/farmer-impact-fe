import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { getModules } from "../../../redux/actions/accessModules/getAllModules.action";
import { createNewModule } from "../../../redux/actions/accessModules/createNewModule.action";
import EditAccessModel from "../../../components/EditAccessModuleModel";
import { Toaster } from "react-hot-toast";

const AccessModuleTable = ({ onSubmit }) => {
  const userId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [retrievedModules, setRetrievedModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showEditAccessModel, setShowAccessModel] = useState(false);
  const [formData, setFormData] = useState({
    module_name: "",
    platform: "",
    type: "",
    parent_module: "",
  });

  const { modules } = useSelector((state) => state.fetchAllModules);
  const { update, create } = useSelector((state) => ({
    update: state.updateModule,
    create: state.createModule,
  }));

  // Fetch modules when component mounts
  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  // Set retrieved modules when modules are fetched
  useEffect(() => {
    if (modules) {
      setRetrievedModules(modules.data);
      console.log("Fetched modules:", modules.data); // Check API response
    }
  }, [modules]);

  // Handle action when clicking on edit
  const handleClickAction = (module) => {
    setSelectedModule(module);
    setShowAccessModel(true);
  };

  // Update module list after creation or update
  useEffect(() => {
    if (update || create) {
      dispatch(getModules());
    }
  }, [update, create, dispatch]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevModule) => ({
      ...prevModule,
      [name]: value,
    }));
    console.log(`Updated ${name}: ${value}`); // Log the change
  };

  // Handle form submission to create a new module
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createNewModule(formData));
      onSubmit(formData);
      setFormData({
        module_name: "",
        platform: "",
        type: "",
        parent_module: "",
      });
    } catch (error) {
      console.error("Adding new module failed", error);
    }
  };

  // Filter modules based on the selected type
  const availableParentModules =
    formData.type === "Sub-Menu"
      ? retrievedModules.filter((module) => module.type === "Menu")
      : [];

  useEffect(() => {
    console.log("Available Parent Modules:", availableParentModules); // Log the filtered modules
  }, [formData.type, retrievedModules]);

  return (
    <div className="flex flex-col col-span-full xl:col-span-12">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          {/* Add new access control form */}
          <div className="w-[85%] flex flex-col ml-18 mb-4 border-2 rounded-md">
            <div className="p-5 border-b-3 w-full">
              <p className="text-green-500">Add new access control</p>
            </div>
            <div className="p-2">
              <form className="space-y-2" onSubmit={handleAddSubmit}>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    className="w-1/2 rounded-md"
                    name="module_name"
                    placeholder="Enter module name"
                    value={formData.module_name}
                    onChange={handleInputChange}
                  />

                  <select
                    className="w-1/2 rounded-md"
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Platform</option>
                    <option value="dashboard">Dashboard</option>
                    <option value="mobile">Mobile</option>
                  </select>

                  <select
                    className="w-1/2 rounded-md"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type</option>
                    <option value="Menu">Menu</option>
                    <option value="Sub-Menu">Sub-Menu</option>
                  </select>

                  {/* Only show the parent module dropdown if the type is "Sub-Menu" */}
                  {formData.type === "Sub-Menu" && (
                    <select
                      className="w-1/2 rounded-md"
                      name="parent_module"
                      value={formData.parent_module}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Parent Module</option>
                      {availableParentModules.map((module) => (
                        <option key={module.id} value={module.id}>
                          {module.module_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white rounded-md w-48 p-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Modules table */}
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-bold text-left text-black uppercase dark:text-gray-400"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-bold text-left text-black uppercase dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-bold text-left text-black uppercase dark:text-gray-400"
                    >
                      Platform
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-bold text-left text-black uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {retrievedModules.map((module, index) => (
                    <tr
                      key={module.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {index + 1}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {module.module_name}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {module.platform}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        <CiEdit
                          className="text-blue-500 text-3xl"
                          onClick={() => handleClickAction(module)}
                        />
                        {showEditAccessModel && selectedModule && (
                          <EditAccessModel
                            module={selectedModule}
                            onClose={() => setShowAccessModel(false)}
                            onSubmit={handleModuleNameUpdate}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default AccessModuleTable;
