

import MaterialTable from "@material-table/core"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal , Button } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { fetchTickets } from "../hooks/getApi";
import "./Admin.css"
function Admin () {

  const [ticketDetails , setticketDetails] = useState([])
  const [errorMessage , seterrorMessage] = useState("")

  const fetchTicketDetails = async () => {
      
      
       try {

        await fetchTickets()
        .then((res) => {
          
          setticketDetails(res.data)
          
          console.log(res.data)
        })
       
       } catch (err) {
          console.log("some error occured while fetching all tickets from DB..." + JSON.stringify(err.message))
          seterrorMessage(err.message)
       }
       

  }

  useEffect(() => {
    fetchTicketDetails()
  } , [] )

  const columns = [
    {
        title: "ID",
        field: "id"
    },
    {
        title: "TITLE",
        field: "title"
    },
    {
        title: "DESCRIPTION",
        field: "description"
    },
    {
        title: "ASSIGNEE",
        field: "assignee"
    },
    {
        title: "PRIORITY",
        field: "ticketPriority"
    },
    {
        title: "STATUS",
        field: "status"
    },
    {
        title: "REPORTER",
        field: "reporter"
    }
]

function Animation_Text () {
  return (
      <div className="Animation">
          <Typewriter

              onInit={(typewriter) => {
                  typewriter
                      .typeString("Welcome")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString(localStorage.getItem("UserName") )
                      .start()
                      
              }}
          />
      </div>
  );
}
 
    
  return (

     <>
     
     <div className="Upper_container">
       <h1 className="Typewritting">{Animation_Text()}</h1>
       <h3>Hello Admin !!! </h3>
       <h3> welcome back to this Page...You Can control Tickets raised by Customers from this page...</h3>

     </div>


     <div className="bg-light vh-100">
         <div className="Material">
            <MaterialTable 
                title="Tickets raised by customers"
                columns={columns}
                data={ticketDetails}
                
            />
           
            
         </div>
         <p>{errorMessage}</p>
     </div>
     </>

  )
}

export default Admin;




// function Admin() {



//   let [user, setUser] = useState({
//     name: "",
//     userType: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     let token = localStorage.getItem("Token");

//     if (token) {
//       let name = localStorage.getItem("UserName");
//       let type = localStorage.getItem("UserType");

//       if (name && type && type == "ADMIN") {
//         setUser({
//           name: name,
//           userType: type,
//         });
//       } else {
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <h1  className="welcome_users">
//       Hello {user?.name} as an {user.userType} welcome to our portal
//     </h1>
//   );
// }

// export default Admin;