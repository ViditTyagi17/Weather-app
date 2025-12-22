import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
 
  useEffect(() => {
     if (authStatus === null) return;
  // If still checking authentication, don't do anything yet
    // Page requires login but user isn't logged in
    if (authentication && !authStatus) {
      navigate("/login");
    }
    // Page is public (like login/signup) but user IS logged in
    else if (!authentication && authStatus) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return (loader ? <h1>Loading...</h1> : <>{children}</>);
}
