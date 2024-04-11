
import {jwtDecode} from 'jwt-decode';
import { fetchToken ,fetchFail,decodeToken} from '../../slices/auth/fetchTokenSlice';

export const handleToken = () => (dispatch) => {
	const token = localStorage.getItem("token")
    if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log("dedd",decodeToken)
          dispatch(fetchToken(token));
          dispatch(decodeToken(decodedToken));
        } catch (error) {
          dispatch(fetchFail());
        }
      } else {
        dispatch(fetchFail());
      }
    };


    

