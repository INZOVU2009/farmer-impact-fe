import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBucket } from "../redux/actions/bucketing/getSingleBuketByDayLotNumber.action";
import { editBucket } from "../redux/actions/bucketing/updateBucket.action";

const EditBucketsModal = ({ isOpen, onClose, onSave, journal }) => {
  const [gradeA, setGradeA] = useState(journal?.gradeA || "");
  const [gradeB, setGradeB] = useState(journal?.gradeB || "");
  const [gradeC, setGradeC] = useState(journal?.gradeC || "");
  const dispatch = useDispatch();
  const { bucket } = useSelector(
    (state) => state.getSingleBucketByDayLotNumber
  );

  useEffect(() => {
    if (isOpen && journal.cherry_lot_id) {
      dispatch(getSingleBucket(journal.cherry_lot_id));
    }
  }, [isOpen, journal?.cherry_lot_id, dispatch]);

  useEffect(() => {
    if (bucket) {
      setGradeA(bucket.data.bucketA || "");
      setGradeB(bucket.data.bucketB || "");
      setGradeC(bucket.data.bucketC || "");
    }
  }, [bucket]);

  const handleSave = () => {
    const data = {
      bucketA: parseFloat(gradeA),
      bucketB: parseFloat(gradeB),
      bucketC: parseFloat(gradeC),
    };

    dispatch(editBucket(journal.cherry_lot_id, data));
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg  w-[50%]">
        <h2 className="text-xl font-bold mb-4">Edit Grades</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            Grade A
          </label>
          <input
            type="number"
            value={gradeA}
            onChange={(e) => setGradeA(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            Grade B
          </label>
          <input
            type="number"
            value={gradeB}
            onChange={(e) => setGradeB(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            Grade C
          </label>
          <input
            type="number"
            value={gradeC}
            onChange={(e) => setGradeC(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBucketsModal;
