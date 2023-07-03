

import MaterialTable from "@material-table/core"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal , Button } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { fetchTickets , updateTicketApi } from "../hooks/getApi";
import "./Admin.css"
function Admin () {

  const [ticketDetails , setticketDetails] = useState([])
  const [errorMessage , seterrorMessage] = useState("")
  const [editTicketModel , setEditTicketModel] = useState(false)

  const [currentSelectedTicket, setCurrentSelectedTicket] = useState({})

  const updateCurrentSelectedTicket = (data) => setCurrentSelectedTicket(data)

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

  const editTicket = (ticketDetail) => {

    const ticket = {
        _id: ticketDetail._id,
        title: ticketDetail.title,
        description: ticketDetail.description,
        assignee: ticketDetail.assignee,
        reporter: ticketDetail.reporter,
        priority: ticketDetail.ticketPriority,
        status: ticketDetail.status
    }

    setCurrentSelectedTicket(ticket)
    setEditTicketModel(true)
    console.log("Selected ticket details is " + JSON.stringify(currentSelectedTicket))
}

const onTicketUpdate = (e) => {
    if(e.target.name === "description"){
        currentSelectedTicket.description = e.target.value
    }else if(e.target.name === "status"){
        currentSelectedTicket.status = e.target.value
    }else if(e.target.name === "title"){
        currentSelectedTicket.title = e.target.value
    }

    updateCurrentSelectedTicket(Object.assign({}, currentSelectedTicket))
}

const updateTicket = (e) => {
    e.preventDefault()

    updateTicketApi(currentSelectedTicket._id, currentSelectedTicket)
    .then((res) => {
        setEditTicketModel(false)
        seterrorMessage("Ticket updated successfully")
        fetchTicketDetails()
    }).catch((err) => {
        seterrorMessage(err.message)
    })
}

  useEffect(() => {
    fetchTicketDetails()
  } , [] )

  const columns = [
    {
        title: "ID",
        field: "_id"
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
                actions={[
                    {
                  
                      icon : ()=> <Button type="button">Edit</Button>,
                      tooltip: "Edit Ticket",
                       onClick: (e, rowData) => {
                         editTicket(rowData);
                       },
                    },
                  ]}
                
            />

{editTicketModel ? (

<Modal centered show={editTicketModel} onHide={() => setEditTicketModel(false)}>

<Modal.Header closeButton> want To Update a Ticket ? please fill all details...</Modal.Header>
<Modal.Body>

<form onSubmit={updateTicket} className="edit_form">
    <div className="modal_section_1">
        <label className="label label-md input-group-text mt-2 bg-dark text-white">Title</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.title}
        onChange={onTicketUpdate}
        name="title" required/>


        <label className="label label-md input-group-text mt-2 bg-dark text-white">Assignee</label>
        <input type="text" className="form-control mt-1" name="assignee" 
        value={currentSelectedTicket.assignee} disabled />

        <label className="label label-md input-group-text mt-2 bg-dark text-white">Description</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.description}
         onChange={onTicketUpdate}
        name="description" required/>

        <label className="label label-md input-group-text mt-2 bg-dark text-white">Priority</label>
        <input className="form-control mt-1" 
        type = "number" 
        value={currentSelectedTicket.priority}
        onChange={onTicketUpdate}
        name="priority" required/>

        <label className="label label-md input-group-text mt-2 bg-dark text-white">Status</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.status}
        onChange={onTicketUpdate}
        name="status" required/>

        </div>

        <div className="d-flex justify-content-space-between">
        <Button onClick={() => setEditTicketModel(false)} variant="secondary" className="m-1">
            Cancel
        </Button>

        <Button type="submit" variant="success" className="m-1">
            Update
        </Button>
    </div>
</form>
</Modal.Body>

</Modal>

):null}

           
            
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