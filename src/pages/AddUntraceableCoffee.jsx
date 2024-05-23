import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { addUntraceableCoffee } from "../redux/actions/untraceableCoffee/addUntraceableCoffee.action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function AddUntraceableCoffee({ onSubmit }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isloading } = useSelector((state) => state.addUntraceableCoffee);
  const [formData, setFormData] = useState({
    kilograms: "",
    unitprice: "",
    cash_paid: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addUntraceableCoffee(formData, token));
      onSubmit(formData);
      setFormData({
        kilograms: "",
        unitprice: "",
        cash_paid: "",
      });
    } catch (error) {
      console.error("Adding untraceable coffee failed", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
          </div>
          <div className="flex items-center justify-center h-[60%] ">
            <div className="bg-white w-[45%] flex flex-col  border-2 rounded-md ">
              <div className="p-5 border-b-3 w-full">
                <p className=" text-green-500">Add Untraceable Coffee</p>
              </div>
              <div className="p-4">
                <form action="" className=" space-y-4">
                  <input
                    type="number"
                    className="w-full rounded-md"
                    name="kilograms"
                    placeholder="Enter kilograms"
                    value={formData.kilograms}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    className="w-full rounded-md"
                    name="unitprice"
                    placeholder="Enter unit price"
                    value={formData.unitprice}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    className="w-full rounded-md"
                    placeholder="Enter the amount paid "
                    name="cash_paid"
                    value={formData.cash_paid}
                    onChange={handleInputChange}
                  />
                  <div className=" flex justify-center">
                    <button
                      className=" bg-green-500 text-white rounded-md w-48 p-2"
                      onClick={handleAddSubmit}
                    >
                      {isloading ? "loading..." : "Save Coffee"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
export default AddUntraceableCoffee;
