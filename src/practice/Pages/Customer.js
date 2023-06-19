

import './users.css' ;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Customer() {

  let [user, setUser] = useState({name: "", userType: ""});

   const navigate = useNavigate();

  try {
    useEffect(() => {
      let token = localStorage.getItem("Token");
  
      if (token) {
        let name = localStorage.getItem("UserName");
        let type = localStorage.getItem("UserType");
  
        if (name && type && type == "CUSTOMER") {
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
  } catch(error){
      console.log(JSON.stringify(error))
  }
  

  return (
    <h1 className="welcome_users">
      Hello {user?.name} as a {user.userType} welcome to our portal
    </h1>
  );
}

export default Customer;