/* eslint-disable react/prop-types */
import { UserDetails } from "../app/slice/UserSlice";
import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute2 = ({ children }) => {
  const user = useSelector(UserDetails);
  const location = useLocation();

  return (
    <>
      {user.token ? <Navigate to={"/"} state={{ from: location }} /> : children}
    </>
  );
};

export default PrivateRoute2;
