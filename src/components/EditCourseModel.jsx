import React, { useState, useEffect } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const token = localStorage.getItem("token");
export default function EditCourseModel({ course, onClose, onSubmit }) {
  const dispatch = useDispatch();

  const [editedCourse, setEditedCourse] = useState({
    Name: "",
    Name_rw: "",
    Name_fr: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  //   const handleEditSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //        dispatch(updateCourse(token, transaction.id, editedTransaction));
  //       toast.success("course updated successfully");
  //       onClose();
  //       onSubmit(editedCourse);

  //     } catch (error) {
  //       console.error("Update failed:", error);
  //       toast.error("Failed to update course");
  //     }
  //   };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white  rounded-lg shadow-md mt-auto mb-16">
        {/* Modal */}

        <div className="flex justify-end ">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>

        <div className=" px-16 space-y-3 mb-4">
          <p className="text-green-500">Edit Course Name</p>
          <hr className="mb-4 border border-gray-200 " />
          <p>Course Name in English</p>
          <input
            name="Name"
            className="rounded-lg   w-80"
            type="text"
            value={editedCourse.Name}
            onChange={handleInputChange}
          />

          <p>Course Name in Kinyarwanda</p>

          <input
            name="Name_rw"
            className="rounded-lg   w-80"
            type="text"
            value={editedCourse.Name_rw}
            onChange={handleInputChange}
          />

          <p>Course Name in French</p>

          <input
            name="Name_fr"
            className="rounded-lg   w-80"
            type="text"
            value={editedCourse.Name_fr}
            onChange={handleInputChange}
          />

         

          <ToastContainer />

          {/* Button to submit password */}
          <button
            className="bg-green-400 w-48 h-10  flex items-center justify-center rounded-lg"
            // onClick={handleEditSubmit}
          >
           Edit Course Name
          </button>
        </div>
      </div>
    </div>
  );
}
