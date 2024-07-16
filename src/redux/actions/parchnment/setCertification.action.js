// selectedCertificationActions.js
import { setSelectedCertification, clearSelectedCertification } from "../../slices/parchment/setCertificationSlice";

// Action creator to set selected certification
export const setCertification = (certificationData) => (dispatch) => {
  dispatch(setSelectedCertification(certificationData));
};

// Action creator to clear selected certification
export const clearCertification = () => (dispatch) => {
  dispatch(clearSelectedCertification());
};
