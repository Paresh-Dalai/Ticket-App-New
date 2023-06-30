

// import './users.css' ;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Customer() {

//   let [user, setUser] = useState({name: "", userType: ""});

//    const navigate = useNavigate();

//   try {
//     useEffect(() => {
//       let token = localStorage.getItem("Token");
  
//       if (token) {
//         let name = localStorage.getItem("UserName");
//         let type = localStorage.getItem("UserType");
  
//         if (name && type && type == "CUSTOMER") {
//           setUser({
//             name: name,
//             userType: type,
//           });
//         } else {
//           navigate("/");
//         }
//       } else {
//         navigate("/");
//       }
//     }, []);
//   } catch(error){
//       console.log(JSON.stringify(error))
//   }
  

//   return (
//     <h1 className="welcome_users">
//       Hello {user?.name} as a {user.userType} welcome to our portal
//     </h1>
//   );
// }

// export default Customer;



import MaterialTable from "@material-table/core"
import { useState, useEffect } from "react";
import { fetchApi , createTicket , updateTicketApi} from "../hooks/getApi";
import { Modal , Button } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import './Customer.css'


function Customer(){
    const [ticketDetails, setTicketDetails] = useState([]);
    const [message , setMessage] = useState("")
    const [TicketModel , setTicketModel] = useState(false)
    const [TicketPriority , setTicketPriority] = useState('')
    const [Status , setStatus] = useState("")
    const [Description , setDescription] = useState("")
    const [Title , setTitle] = useState("")
    const [TicketMessage , setTicketMessage] = useState("")

    const [TicketUpdateModel , setTicketUpdateModel] = useState(false)
    const [currentSelectedTicket, setCurrentSelectedTicket] = useState({})

    const updateCurrentSelectedTicket = (data) => setCurrentSelectedTicket(data)


    const navigator = useNavigate()
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
        }
    ]

    const logOutFunction = async () => {
         await localStorage.clear();
         navigator("/")
    }

    const TicketCreation = async (e) => {

        e.preventDefault();
        const body = {
            status : Status,
            description : Description,
            title : Title,
            ticketPriority : TicketPriority,
            assignee : "eng_01"
        }

      await createTicket(body).then((res) => {
             console.log("Ticket data is " + JSON.stringify(res.data))
             setTicketMessage("A ticket is created successfully")
             setTicketModel(false)
             fetchTicketData();
        })

        console.log("ticket body is " + body)
    }
  

async function fetchTicketData () {
         
    await fetchApi()
      
      .then((res) => {

        setTicketDetails(res.data)
        console.log(res.data)

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
        console.log(statusCount)

       
         })
      
      .catch((err) => {
          console.log("error occured while fetching data" + JSON.stringify(err))
          setMessage(err.message)
      })
  }

    useEffect(() => {
        fetchTicketData();
    }, [])


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
        setTicketUpdateModel(true)
        console.log("Selected ticket details is " + JSON.stringify(currentSelectedTicket))
    }

    const onTicketUpdate = (e) => {
        if(e.target.name === "description"){
            currentSelectedTicket.description = e.target.value
        }else if(e.target.name === "status"){
            currentSelectedTicket.status = e.target.status
        }

        updateCurrentSelectedTicket(Object.assign({}, currentSelectedTicket))
    }

    const updateTicket = (e) => {
        e.preventDefault()

        updateTicketApi(currentSelectedTicket._id, currentSelectedTicket)
        .then((res) => {
            setTicketUpdateModel(false)
            setMessage("Ticket updated successfully")
            fetchTicketData()
        }).catch((err) => {
            setMessage(err.message)
        })
    }


    function Animation_Text () {
        return (
            <div className="Animation">
                <Typewriter
     
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Welcome")
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString(localStorage.getItem("UserName"))
                            .start()
                            
                    }}
                />
            </div>
        );
    }

    return(
      <>
      <div className="upper_container">
            <h3 className="text-center" id="heading">{Animation_Text()}</h3>
     
            <h3 className="text-center">Take a look at all your tickets below!</h3>
            <h2 className="text-center"> facing any issue ? you can raise a ticket by clicking on Raise Ticket</h2>
            <div className="ticket_raising">

          <button className="ticketRaise_buttons_raise" onClick={()=>setTicketModel(true)}>
            Raise Ticket
            </button>
          <button className="ticketRaise_buttons_logout" onClick={logOutFunction}>LogOut</button>
          
          
          
      </div>
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
                title="Tickets raised by you"
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

            
         </div>
        <hr/>
        <p className="message_section">{message}</p>



    {TicketModel ? (

        
        <Modal 
            show={TicketModel}
            onHide={() => setTicketModel(false)}
            
            centered
            backdrop="static"
        >
            
            <Modal.Header closeButton>Create a new ticket</Modal.Header>
            <Modal.Body>
                <form onSubmit={TicketCreation}>
                    <div className="modal_section">
                        <label className="label label-md input-group-text">Title</label>
                        <input className="form-control" 
                        type = "text" 
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title" required/>

                        <label className="label label-md input-group-text">Description</label>
                        <input className="form-control" 
                        type = "text" 
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="title" required/>

                        <label className="label label-md input-group-text">Ticket-Priority</label>
                        <input className="form-control" 
                        type = "text" 
                        value={TicketPriority}
                        onChange={(e) => setTicketPriority(e.target.value)}
                        name="title" 
                        required/>

                        <label className="label label-md input-group-text">Status</label>
                        <input className="form-control" 
                        type = "text" 
                        value={Status}
                        onChange={(e) => setStatus(e.target.value)}
                        name="title" required/>
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setTicketModel(false)} variant="secondary" className="m-1">
                            Cancel
                        </Button>

                        <Button type="submit" variant="success" className="m-1">
                            Create
                        </Button>
                    </div>
                    <h3>{TicketMessage}</h3>
                </form>
            </Modal.Body>
        </Modal>
       
        ) : null}

        {TicketUpdateModel ? (

            <Modal centered show={TicketUpdateModel} onHide={() => setTicketUpdateModel(false)}>

                <Modal.Header closeButton> want To Update a Ticket ?</Modal.Header>
                <Modal.Body>

                <form onSubmit={updateTicket}>
                    <div className="modal_section">
                        <label className="label label-md input-group-text">Title</label>
                        <input className="form-control" 
                        type = "text" 
                        value={currentSelectedTicket.title}
                        disabled
                        name="title" required/>


                        <label className="label label-md input-group-text">Assignee</label>
                        <input type="text" className="form-control" name="assignee" 
                        value={currentSelectedTicket.assignee} disabled />

                        <label className="label label-md input-group-text">Description</label>
                        <input className="form-control" 
                        type = "text" 
                        value={currentSelectedTicket.description}
                        onChange={onTicketUpdate}
                        name="description" required/>

                        <label className="label label-md input-group-text">Priority</label>
                        <input className="form-control" 
                        type = "number" 
                        value={currentSelectedTicket.priority}
                        onChange={onTicketUpdate}
                        name="priority" required/>
                
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
 
        
        </div>

      
    
        
        </>
    )
}

export default Customer;