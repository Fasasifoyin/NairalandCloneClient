/* eslint-disable react/prop-types */
import { UserDetails } from "../app/slice/UserSlice";
import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute2 = ({ children }) => {
  const user = useSelector(UserDetails);
  const location = useLocation();
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectURL ? redirectURL : "/";

  return (
    <>
      {user.token ? <Navigate to={redirect} state={{ from: location }} /> : children}
    </>
  );
};

export default PrivateRoute2;
