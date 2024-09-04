/* eslint-disable react/prop-types */
import { UserDetails } from "../app/slice/UserSlice";
import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute2 = ({ children }) => {
  const user = useSelector(UserDetails);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  return <>{user.token ? <Navigate to={from.pathname} /> : children}</>;
};

export default PrivateRoute2;
