import React, { useState, useEffect } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { updateModuleName } from "../redux/actions/accessModules/updateModule.action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditAccessModel({ module, onClose, onSubmit }) {
  const [editedModule, setEditedModule] = useState({
    module_name: "",
  });


  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedModule((prevModule) => ({
      ...prevModule,
      [name]: value,
    }));
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateModuleName(editedModule, module?.id));
      toast.success("module updated successfully");
      onClose();
      onSubmit(editedModule);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update module name");
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center   z-50">
      <div className="fixed inset-0 bg-black opacity-5"></div>

      <div className="bg-white rounded-lg text-left overflow-hidden shadow-l transform transition-all sm:max-w-lg sm:w-full relative z-10">
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>
        <div className="bg-white p-4 flex flex-col ">
          <p className="  -mt-8 mb-2   ">Edit Access Model</p>
          <hr className="mb-4 border border-gray-200" />
          <br />
          <input
            type="text"
            name="module_name"
            value={editedModule.module_name}
            onChange={handleInputChange}
            placeholder="Module name"
            className="rounded-lg"
          />
          <br />
          <ToastContainer />
          <button
            className="bg-green-400 w-48 h-10 flex items-center justify-center rounded-lg"
            onClick={handleEditSubmit}
          >
            Edit module
          </button>
        </div>
      </div>
    </div>
  );
}
