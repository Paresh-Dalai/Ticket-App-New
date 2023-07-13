


import MaterialTable from "@material-table/core"
import React from "react";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal , Button } from "react-bootstrap";
import { fetchLeads , createLead , updateLead} from "../hooks/getApi";
import "./Sales_Rep.css"

 export function Sales_Rep() {

    const [LeadsData , setLeadsData] = useState([])
    const [LeadsModel , setLeadsModel] = useState(false)
    const [Name , setName] = useState("")
    const [Address , setAddress] = useState("")
    const [Gender , setGender] = useState("")
    const [Contact , setContact] = useState("")
    const [Email , setEmail] = useState("")
    const [editTicketModel , setEditTicketModel] = useState(false)

    const [currentSelectedTicket, setCurrentSelectedTicket] = useState({})

    const updateCurrentSelectedTicket = (data) => setCurrentSelectedTicket(data)

    const navigator = useNavigate()
    
     const logOut = async () => {
        await localStorage.clear();
         navigator("/")
     }

    const columns = [
        {
            title : "Name",
            field : "name"
        },
        {
            title : "Address",
            field : "Address"
        } ,
        {
            title : "Contact",
            field : "Contact"
        },
        {
            title : "Email",
            field : "Email"
        },
        {
            title : "Gender",
            field : "Gender"
        }
    ]

    const addLead = async (e) => {
         
        e.preventDefault();
        let LeadData = {
            name : Name,
            Address : Address,
            Contact : Contact,
            Email : Email,
            Gender : Gender
        }
       
        await createLead(LeadData)
        .then((res) => console.log(res.data))
        setLeadsModel(false)
        fetchAllLeads()
    }

    const editTicket = async (ticketDetail) => {
            
        const Lead = { 
            _id : ticketDetail._id,
            name : ticketDetail.name,
            Address : ticketDetail.Address,
            Gender : ticketDetail.Gender,
            Email : ticketDetail.Email,
            Contact : ticketDetail.Contact
        }

        setCurrentSelectedTicket(Lead)
        setEditTicketModel(true)
        console.log("Data for editLead is " + JSON.stringify(currentSelectedTicket) )
    }

    const onLeadUpdate = (e) => {
        if(e.target.name === "address"){
            currentSelectedTicket.Address = e.target.value
        }else if(e.target.name === "mail"){
            currentSelectedTicket.Email = e.target.value
        }else if(e.target.name === "contact"){
            currentSelectedTicket.Contact = e.target.value
        }
    
        updateCurrentSelectedTicket(Object.assign({}, currentSelectedTicket))
    }

    const LeadUpdate = async (e) => {

        e.preventDefault();
        updateLead(currentSelectedTicket._id , currentSelectedTicket)
        .then((res) => {
            setEditTicketModel(false)
            fetchAllLeads();
        })
    }


    const fetchAllLeads = async () => {
        try{
            await fetchLeads()
            .then((response) => {
             setLeadsData(response.data)
             console.log(response.data)
             for(let i = 0 ; i < response.data.length ; i++ ){
                 localStorage.setItem("length" , response.data.length)
             }
         })

        } catch (error) {
            console.log("error occured while fetching Leads..." + JSON.stringify(error.message))
        }
          

    }

    useEffect (() => {
        fetchAllLeads()
    },[])
     
    return (
           <>
   <div className="first_row">
       <h1 style={{display:"flex" , justifyContent:"center"}}> Hello , {localStorage.getItem("UserName")} , Welcome back to this portal</h1>
       <h3 style={{display:"flex" , justifyContent:"flex-end" , marginRight:"2rem", color:"rgb(238, 145, 23)" }}>Role : Sales Representative</h3>
       <h4 style={{display:"flex" , justifyContent:"flex-end" , marginRight:"2rem", color:"rgb(238, 145, 23)" }}>Total Leads : {localStorage.getItem("length")}</h4>
   </div>

   <div className="second_row">
     <Button onClick={() => setLeadsModel(true)} style={{backgroundColor:"green" , marginRight:"2rem"}}>Enter Lead</Button>
     <Button style={{backgroundColor:"red"}} onClick={() => logOut()}> Log Out</Button>
   </div>

         <div className="Material_table">
             <MaterialTable 
               title = "Leads Data"
               data={LeadsData} 
               columns={columns}  
               actions={
                [
                    {
                  
                      icon : ()=> <Button type="button" style={{backgroundColor:"darkviolet"}}>Edit</Button>,
                      tooltip: "Edit Ticket",
                       onClick: (e, rowData) => {
                         editTicket(rowData);
                       },
                    },
                  ]
               }

             />

    {LeadsModel ? (
        
        <Modal 
            show={LeadsModel}
            onHide={() => setLeadsModel(false)}
            
            centered
            backdrop="static"
        >
            
            <Modal.Header closeButton> Want to enter a lead ? (Please fill all details) </Modal.Header>
            <Modal.Body>
                <form onSubmit={addLead}>
                    <div className="modal_section">
                        <label style={{backgroundColor:"brown" , color:"whitesmoke" , display:"flex" , flexDirection: 'row'}} className="label label-md input-group-text">Name</label>
                        <input className="form-control" 
                        type = "text" 
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        name="name" required/>

                        <label style={{backgroundColor:"brown" , color:"whitesmoke"}} className="label label-md input-group-text">Contact</label>
                        <input className="form-control" 
                        type = "text" 
                        value={Contact}
                        onChange={(e) => setContact(e.target.value)}
                        name="contact" required/>

                        <label  style={{backgroundColor:"brown" , color:"whitesmoke"}} className="label label-md input-group-text">Email</label>
                        <input className="form-control" 
                        type = "text" 
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="mail" 
                        required/>

                        <label style={{backgroundColor:"brown" , color:"whitesmoke"}} className="label label-md input-group-text">Address</label>
                        <input className="form-control" 
                        type = "text" 
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        name="address" required/>

                        <label style={{backgroundColor:"brown" , color:"whitesmoke"}} className="label label-md input-group-text">Gender</label>
                        <input className="form-control" 
                        type = "text" 
                        value={Gender}
                        onChange={(e) => setGender(e.target.value)}
                        name="gender" required/>
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setLeadsModel(false)} variant="secondary" className="m-1">
                            Cancel
                        </Button>

                        <Button type="submit" variant="success" className="m-1">
                            Create
                        </Button>
                    </div>
                   
                </form>
            </Modal.Body>
        </Modal>
       


    ) : null}

{editTicketModel ? (

<Modal centered show={editTicketModel} onHide={() => setEditTicketModel(false)}>

<Modal.Header closeButton> want To Update a Lead ? please fill all details...</Modal.Header>
<Modal.Body>

<form onSubmit={LeadUpdate} className="edit_form">
    <div className="modal_section_1">
        <label className="label label-md input-group-text mt-2 bg-dark text-white">Name</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.name}
        onChange={onLeadUpdate}
        name="name" disabled/>


        <label className="label label-md input-group-text mt-2 bg-dark text-white">Address</label>
        <input type="text" className="form-control mt-1" name="address" 
        value={currentSelectedTicket.Address} required />

        <label className="label label-md input-group-text mt-2 bg-dark text-white">Contact</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.Contact}
         onChange={onLeadUpdate}
        name="contact" required/>

        <label className="label label-md input-group-text mt-2 bg-dark text-white">Email</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.Email}
        onChange={onLeadUpdate}
        name="email" required/>

        <label className="label label-md input-group-text mt-2 bg-dark text-white">Gender</label>
        {/* <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.Gender}
        onChange={onLeadUpdate}
        name="gender" required/> */}

 <select style={{backgroundColor:"goldenrod"}} name="gender_options" id="gender" onChange={onLeadUpdate}>
                                    <option value={currentSelectedTicket.Gender}>Male</option>
                                    <option value={currentSelectedTicket.Gender}>FEMALE</option>
                                    
                                </select> 

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
         </>
    )
}