import React, { useState, useEffect } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { updateTransaction } from "../redux/actions/transactions/updateTransaction.action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { fetchAllTransactionsByJournal } from "../redux/actions/transactions/transactionsByJournal.action";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { adjustParchment } from "../redux/actions/parchnment/adjustParchment.action";

const token = localStorage.getItem("token")
export default function ParchmentAdjustmentModel({
  // transaction,
  onClose,
  onSubmit,
}) {

  const dispatch = useDispatch();
  const journalId = useParams();
  const [parchmentToAdjust, setParchmentToAdjust] = useState({
    cherrylotid:"",
    grade: "",
    kilogram: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParchmentToAdjust((prevParchment) => ({
      ...prevParchment,
      [name]: value,
    }));
  };
  const {isloading } = useSelector(
    (state) => state.adjustParchment
  );

console.log("I am parchment", parchmentToAdjust)
 

  const handleAdjustSubmit = async (e) => {
    e.preventDefault();
    try {
       dispatch(adjustParchment(parchmentToAdjust));
      // toast.success("Parchment adjusted successfully");
      onClose();
      onSubmit(parchmentToAdjust);
  
      // Fetch transactions after successful update
      // dispatch(fetchAllTransactionsByJournal(token, journalId.journalId.replace(":", "")));
  
    } catch (error) {
      console.error("Adjust failed:", error);
      toast.error("Failed to adjust parchment");
    }
  };
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white  rounded-lg shadow-md ">

        {/* Modal */}

        <div className="flex justify-end ">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>

        <div className=" px-16 space-y-3 mb-4" >
          <p className="text-green-500">ADJUST PARCHMENT</p>
          <hr className="mb-4 border border-gray-200 " />
          <p>ENTER CHERRY LOT ID</p>
          <input
            className="rounded-lg   w-80"
            type="text"
            placeholder="Enter cherry lot id"
            value={parchmentToAdjust.cherrylotid}
            onChange={handleInputChange}
            name="cherrylotid"

            // readOnly
          />

      
          <p>SELECT GRADE</p>
          <select
            name="grade"
            value={parchmentToAdjust.grade}
            onChange={handleInputChange}
            className="rounded-lg w-80"
            placeholder="select grade"
          >
            <option value="Grade A">Grade A</option>
            <option value="Grade B">Grade B</option>
            <option value="Grade C">Grade C</option>
          </select>

         
          <p>KILOGRAMS (-/+)</p>
          <input
            type="text"
            name="kilogram"
            value={parchmentToAdjust.kilogram}
            onChange={handleInputChange}
            placeholder="Enter kilograms"
            className="rounded-lg w-80"
          />

          <ToastContainer />

          <button
            className="bg-green-400 w-48 h-10  flex items-center justify-center rounded-lg"
            onClick={handleAdjustSubmit}
          >
           {isloading? "...Loading":"Adjust"}
          </button>
        </div>

      </div>
    </div>

  );
}
