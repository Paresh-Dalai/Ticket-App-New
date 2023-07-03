



import MaterialTable from "@material-table/core"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal , Button } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { fetchTickets , updateTicketApi } from "../hooks/getApi";
import SendEmail from "../hooks/components";
import "./Engineer.css"

function Engineer () {

  const [ticketDetails , setticketDetails] = useState([])
  const [errorMessage , seterrorMessage] = useState("")

  let [showEmail, setShowEmail] = useState(false);
  let [userId, setUserId] = useState("");
  let [ticketId, setTicketId] = useState("");

  const [TicketUpdateModel , setTicketUpdateModel] = useState(false)
  const [currentSelectedTicket, setCurrentSelectedTicket] = useState({})

//   const [MailBox , setMailBox] = useState(false)

//     const [subject, setSubject] = useState("");
  
    
//     const [description, setDescription] = useState("");
//     const [email, setEmail] = useState('');
//     // let [showEmail, setShowEmail] = useState(true);
//     const [userId, setUserId] = useState("");
//     const [ticketId, setTicketId] = useState("");


    const updateCurrentSelectedTicket = (data) => setCurrentSelectedTicket(data)

  const fetchTicketDetails = async () => {
      
      
       try {

        await fetchTickets()
        .then((res) => {
          
          setticketDetails(res.data)
          let data = res.data;
          let statusCount = {}
          for (let i = 0; i < data.length; i++) {
                 let status = data[i].status
            
          if(statusCount[status]){
            statusCount[status]++
          } else {
            statusCount[status] = 1
          }
    
           localStorage.setItem("openStatus" , statusCount.OPEN);
           localStorage.setItem("pendingStatus" ,statusCount.PENDING);
          localStorage.setItem("closedStatus" , 0);
          
         }
          
          console.log(res.data)
        })
       
       } catch (err) {
          console.log("some error occured while fetching all tickets from DB..." + JSON.stringify(err.message))
          seterrorMessage(err.message)
       }
       

  }


//  async function sendEmail() {
//       let body = {
//           ticketId: ticketId,
//           subject: subject,
//           content: description,
//           recipientEmails:email,
//           requester: localStorage.getItem('UserName'),
//       }
  
//       let data = await sendMail(body)
  
//       if(data.accepted){
//          console.log(data)
//       }
       
//     } 
      // console.log(subject,description,email,ticketId,localStorage.getItem('CrmUserName'));
    
  

  useEffect(() => {
    fetchTicketDetails()

  } , [] )

  function print(ticketDetail, str) {
    
    if (str == "email") {
      setShowEmail(true);
      setTicketId(ticketDetail._id);
      setUserId(ticketDetail.reporter);
    }
  }

 


  const editTicket = (ticketDetail) => {

    const ticket = {
        _id: ticketDetail.id,
        title: ticketDetail.title,
        description: ticketDetail.description,
        assignee: ticketDetail.assignee,
        reporter: ticketDetail.reporter,
        priority: ticketDetail.ticketPriority,
        status: ticketDetail.status
    }

    setCurrentSelectedTicket(ticket)
    setTicketUpdateModel(true)
    console.log("Selected ticket details is " + JSON.stringify(currentSelectedTicket))
}

const onTicketUpdate = (e) => {
    
     if(e.target.name === "status"){
        currentSelectedTicket.status = e.target.value
    }

    updateCurrentSelectedTicket(Object.assign({}, currentSelectedTicket))
}

const updateTicket = (e) => {
    e.preventDefault()

    updateTicketApi(currentSelectedTicket._id, currentSelectedTicket)
    .then((res) => {
        setTicketUpdateModel(false)
        seterrorMessage("Ticket updated successfully")
        fetchTicketDetails()
    }).catch((err) => {
        seterrorMessage(err.message)
    })
}



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
       <h3>Hello Engineer !!! </h3>
       <h3> welcome back to this Page...You Can control the Status of Tickets raised by Customers from this page...</h3>

     </div>

     <div className="upper_row_boxes">
      
      <div className="first_box">
        <h2>User_Id</h2>
        <hr/>
        <h3>{localStorage.getItem("UserId")}</h3>
      </div>

      <div className="second_box">
        <h2>STATUS : </h2>
        <hr/>
        <h5> OPEN : {localStorage.getItem("openStatus")}</h5>
        <h5> PENDING : {localStorage.getItem("pendingStatus")}</h5>
        <h5> CLOSED : {localStorage.getItem("closedStatus")}</h5>
       
      </div>

      
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
                    {
                        icon : ()=> <Button type="button">Email</Button>,
                       tooltip: "send an email",
                       onClick: (e, rowData) => {
                        print(rowData, "email");
                        
                       },
                    }

                    
                  ]}
                
            />

{TicketUpdateModel ? (

<Modal centered show={TicketUpdateModel} onHide={() => setTicketUpdateModel(false)}>

    <Modal.Header closeButton> want To Update a Ticket ?</Modal.Header>
    <Modal.Body>

    <form onSubmit={updateTicket}>
        <div className="modal_section">
           
            <label className="label label-md input-group-text">Assignee</label>
            <input type="text" className="form-control" name="assignee" 
            value={currentSelectedTicket.assignee} disabled />


            <label className="label label-md input-group-text">Status</label>
            <input className="form-control" 
            type = "text" 
            value={currentSelectedTicket.status}
            onChange={onTicketUpdate}
            name="status" required/>
    
            </div>

            <div className="d-flex justify-content-space-between">
            <Button onClick={() => setTicketUpdateModel(false)} variant="secondary" className="m-1">
                Cancel
            </Button>

            <Button type="submit" variant="success" className="m-1">
                Update
            </Button>
        </div>
    </form>
    </Modal.Body>

</Modal>

) : null}

{showEmail && (
        <SendEmail
          show={showEmail}
          setShow={setShowEmail}
          userId={userId}
          ticketId={ticketId}
        />
      )}



    {/* {MailBox ? (

<Modal onHide={setMailBox(false)} centered>
<Modal.Header closeButton>
  <Modal.Title>Send An Email</Modal.Title>
</Modal.Header>

<Modal.Body>
  <form onSubmit={sendEmail}>
    <div className="d-flex justify-content-between ">
      <label className="h4 pe-2 text-muted ">Subject</label>
      <input
        value={subject}
        className="p-2 h6 border rounded w-75"
        placeholder="Subject"
        onChange={(e) => setSubject(e.target.value)}
        required
      />
    </div>

    <div className="d-flex justify-content-between ">
      <label className="h4 pe-2 text-muted">Descrpition</label>
      <input
        value={description}
        className="p-2 h6 border rounded w-75"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>
    <Button variant="secondary" onClick={() => setMailBox(false)}>
    Close
  </Button>
  <Button variant="primary" type="submit">
    Send Email
  </Button>
  </form>
</Modal.Body>
</Modal>

):null} */}


            
         </div>
         <p>{errorMessage}</p>
     </div>
     </>

  )
}

export default Engineer;




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






// import './users.css' ;
// import React, { useState , useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Engineer() {
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

//       if (name && type && type == "ENGINEER") {
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
//      Hello {user?.name} as a {user.userType}
//     </h1>
//   );
// }

// export default Engineer;