import React, { useEffect, useState } from "react";
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import { useDispatch,useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSingleBucketWeight } from '../redux/actions/bucketing/getSingleBuketWeightByDayLotNumber.action';

export default function EditBucketWeightingModel({ isOpen,journal, onClose, onSave }) {
  const { bucket } = useSelector(
    (state) => state.getSingleBucketWeightByDayLotNumber
  );
  const dispatch = useDispatch();
  const [grades, setGrades] = useState({
    FinalGradeA: journal.FinalGradeA || '',
    FinalGradeB: journal.FinalGradeB || '',
    FinalGradeC: journal.FinalGradeC || '',
    FinalGradeA_taken: journal.FinalGradeA_taken || 'before',
    FinalGradeB_taken: journal.FinalGradeB_taken || 'before',
    FinalGradeC_taken: journal.FinalGradeC_taken || 'before',
  });


  useEffect(() => {
    if (isOpen && journal.cherry_lot_id) {
      dispatch(getSingleBucketWeight(journal.cherry_lot_id));
    }
  }, [isOpen, journal?.cherry_lot_id, dispatch]);

console.log("yuhu", bucket)  
useEffect(() => {
  if (bucket) {
    setGrades({
      FinalGradeA: Math.round(bucket.data.FinalGradeA) || '',
      FinalGradeB: Math.round(bucket.data.FinalGradeB) || '',
      FinalGradeC: Math.round(bucket.data.FinalGradeC) || '',
      FinalGradeA_taken: bucket.data.gradeAtaken || 'before',
      FinalGradeB_taken: bucket.data.gradeBtaken || 'before',
      FinalGradeC_taken: bucket.data.gradeCtaken || 'before',
    });
  }
}, [bucket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   await dispatch(updateGrades(grades));
    //   toast.success('Grades updated successfully');
    //   onClose();
    //   onSubmit();
    // } catch (error) {
    //   console.error('Update failed:', error);
    //   toast.error('Failed to update grades');
    // }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-[40%]">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <AiTwotoneCloseCircle />
          </button>
        </div>

        <h2 className="text-lg mb-4">Edit Grades</h2>

        <div className="mb-4">
          <label htmlFor="FinalGradeA" className="block text-gray-700">Grade A</label>
          <input
            id="FinalGradeA"
            type="text"
            name="FinalGradeA"
            value={grades.FinalGradeA}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 w-full mb-2 p-2"
          />
          <label htmlFor="grade_a_weight_taken">Grade A Weight Taken</label>

          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="FinalGradeA_taken_before"
              name="FinalGradeA_taken"
              value="before"
              checked={grades.FinalGradeA_taken }
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeA_taken_before" className="mr-4">Before Drying</label>
            <input
              type="radio"
              id="FinalGradeA_taken_after"
              name="FinalGradeA_taken"
              value="after"
              checked={grades.FinalGradeA_taken }
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeA_taken_after">After Drying</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="FinalGradeB" className="block text-gray-700">Grade B</label>
          <input
            id="FinalGradeB"
            type="text"
            name="FinalGradeB"
            value={grades.FinalGradeB}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 w-full mb-2 p-2"
          />
          <label htmlFor="grade_a_weight_taken">Grade B Weight Taken</label>

          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="FinalGradeB_taken_before"
              name="FinalGradeB_taken"
              value="before"
              checked={grades.FinalGradeB_taken }
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeB_taken_before" className="mr-4">Before Drying</label>
            <input
              type="radio"
              id="FinalGradeB_taken_after"
              name="FinalGradeB_taken"
              value="after"
              checked={grades.FinalGradeB_taken}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeB_taken_after">After Drying</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="FinalGradeC" className="block text-gray-700">Grade C</label>
          <input
            id="FinalGradeC"
            type="text"
            name="FinalGradeC"
            value={grades.FinalGradeC}
            onChange={handleInputChange}
            className="rounded-lg border border-gray-300 w-full mb-2 p-2"
          />
          <label htmlFor="grade_a_weight_taken">Grade C Weight Taken</label>

          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="FinalGradeC_taken_before"
              name="FinalGradeC_taken"
              value="before"
              checked={grades.FinalGradeC_taken}
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeC_taken_before" className="mr-4">Before Drying</label>
            <input
              type="radio"
              id="FinalGradeC_taken_after"
              name="FinalGradeC_taken"
              value="after"
              checked={grades.FinalGradeC_taken }
              onChange={handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="FinalGradeC_taken_after">After Drying</label>
          </div>
        </div>

        <ToastContainer />

        <button
          onClick={handleSubmit}
          className="bg-green-400 w-full h-10 flex items-center justify-center rounded-lg text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
