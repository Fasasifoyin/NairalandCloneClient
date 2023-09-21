/* eslint-disable react/prop-types */
import { UserDetails } from "../app/slice/UserSlice";
import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector(UserDetails);
  const location = useLocation();

  return (
    <>
      {user.token ? (
        children
      ) : (
        <Navigate
          to={"/signin"}
          state={{ from: location }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
