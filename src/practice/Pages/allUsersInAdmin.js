




import MaterialTable from "@material-table/core"
import React, { useEffect, useState } from "react";
import { getAllUsers , updateUserDetails ,getUsersByUserType} from "../hooks/getApi";
import { Modal , Button } from "react-bootstrap";



function AllUsers() {

    const [userType, setUserType] = useState('');
    

   
    const [userDetails , setuserDetails] = useState([])

    const [EditUserUpdateModel , setEditUserUpdateModel] = useState(false)
    const [currentSelectedTicket, setCurrentSelectedTicket] = useState({})

    const updateCurrentSelectedTicket = (data) => setCurrentSelectedTicket(data)

    // const fetchAllUsers = async () => {
    //      try{
    //         await getAllUsers()
    //         .then((response) => {
    //              setuserDetails(response.data)
    //         })
    //      }catch(error){
    //          console.log(error.message)
    //      }
    // }


    const fetchData = async () => {
        try {
          await getUsersByUserType(userType)
          .then((response) => {
            setuserDetails(response.data); 
            console.log(response.data)
          })
          
        } catch (error) {
          console.error('Error fetching data:', error);
         
        }
      };

      const handleInputChange = (event) => {
        setUserType(event.target.value); 
      };
    
      const handleFormSubmit = (event) => {
        event.preventDefault(); 
        fetchData(); 
      };

    const editTicket = (ticketDetail) => {

        const ticket = {
            userId: ticketDetail.userId,
            name:ticketDetail.name,
            email: ticketDetail.email,
            userStatus: ticketDetail.userStatus,
            userTypes: ticketDetail.userType,
        }

        setCurrentSelectedTicket(ticket)
        setEditUserUpdateModel(true)
        console.log("Selected ticket details is " + JSON.stringify(currentSelectedTicket))
        
    }

    const onTicketUpdate = (e) => {
        if(e.target.name === "userStatus"){
            currentSelectedTicket.userStatus = e.target.value
        }else if(e.target.name === "userType"){
            currentSelectedTicket.userType = e.target.value
        }
    
        updateCurrentSelectedTicket(Object.assign({}, currentSelectedTicket))
    }


    const updateTicket = (e) => {
        e.preventDefault()
    
        updateUserDetails(currentSelectedTicket.userId, currentSelectedTicket)
        .then((res) => {
            setEditUserUpdateModel(false)
            
           fetchData()
        }).catch((err) => {
            console.log(err.message)
        })
    }

    // useEffect(() =>{
    //     fetchAllUsers()
       
    // },[])

    const columns = [
        {
            title: "USER_ID",
            field: "userId"
        },
        {
            title: "NAME",
            field: "name"
        },
        {
            title: "EMAIL",
            field: "email"
        },
        {
            title: "USERTYPES",
            field: "userType"
        },
        {
            title: "USER_STATUS",
            field: "userStatus"
        },
    ]
    return(

        <>
            <div className="bg-light vh-100">

            <div className="UserType" >
            
            <form style={{display:"flex" , justifyContent:"space-evenly" , flexDirection:"row"}} onSubmit={handleFormSubmit}>
            <label>
              User Type:
              <select name="userType_options" id="userTypes" onChange={handleInputChange}>
                                    <option value="CUSTOMER">CUSTOMER</option>
                                    <option value="ENGINEER">ENGINEER</option>
                                    
                                </select> 
            </label>
            <button type="submit" style={{backgroundColor:"green" , border:"2px solid red" , borderRadius:"2px" , color:"white"}}>get Users</button>
            </form>
            </div>

               
              {/* <div className="Material"> */}
              <div style={{display:"flex" , justifyContent:"center"}}>

                    <MaterialTable 
                         title="Here is the complete list of Our Usres..."
                         columns={columns}
                         data={userDetails}
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



{EditUserUpdateModel ? (

<Modal centered show={EditUserUpdateModel} onHide={() => setEditUserUpdateModel(false)}>

<Modal.Header closeButton> want To Update a Ticket ? please fill all details...</Modal.Header>
<Modal.Body>

<form onSubmit={updateTicket} className="edit_form">
    <div className="modal_section_1">
        <label className="label label-md input-group-text mt-2 bg-dark text-white">userId</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.userId}
        onChange={onTicketUpdate}
        name="userId" required/>


        <label className="label label-md input-group-text mt-2 bg-dark text-white">Name</label>
        <input type="text" className="form-control mt-1" name="name" 
        value={currentSelectedTicket.name} disabled />

        <label className="label label-md input-group-text mt-2 bg-dark text-white">Email</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.email}
         onChange={onTicketUpdate}
        name="email" required/>

        <label className="label label-md input-group-text mt-2 bg-dark text-white">userType</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.userTypes}
        onChange={onTicketUpdate}
        name="userType" required/>

        <label className="label label-md input-group-text mt-2 bg-dark text-white">userStatus</label>
        <input className="form-control mt-1" 
        type = "text" 
        value={currentSelectedTicket.userStatus}
        onChange={onTicketUpdate}
        name="userStatus" required/>

        </div>

        <div className="d-flex justify-content-space-between">
        <Button onClick={() => setEditUserUpdateModel(false)} variant="secondary" className="m-1">
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
                     </div>

       </>
    )
        }
export default AllUsers;