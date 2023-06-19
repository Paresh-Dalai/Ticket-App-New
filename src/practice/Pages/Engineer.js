
import './users.css' ;
import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Engineer() {
  let [user, setUser] = useState({
    name: "",
    userType: "",
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("Token");
    if (token) {
      let name = localStorage.getItem("UserName");
      let type = localStorage.getItem("UserType");

      if (name && type && type == "ENGINEER") {
        setUser({
          name: name,
          userType: type,
        });
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <h1  className="welcome_users">
     Hello {user?.name} as a {user.userType}
    </h1>
  );
}

export default Engineer;