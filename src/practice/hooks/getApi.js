


import axios from "axios";

 const URL = "https://crm-backend-5aju.onrender.com"


export function fetchApi () {

     const getApiData =  axios.get(`${URL}/crm/app/v1/tickets` , {
          
        headers : {
             "x-access-token" : localStorage.getItem("Token")
        }
        
     })
    
     console.log(getApiData)
     return getApiData;
     
}

export async function createTicket (body) {

     let headers = {
          headers: {
              'x-access-token': localStorage.getItem('Token')
          }
      }
      
     const createTicketData = await axios.post(`${URL}/crm/api/v1/tickets` , body , headers) 

     console.log(createTicketData)
     return createTicketData;
}

// export  async function updateTicketApi(body, id) {
//      let headers = {
//          headers: {
//              'x-access-token': localStorage.getItem('Token')
//          }
//      }
//      try {
//           const data = await axios.put(URL + `/crm/api/v1/tickets/${id}`, body, headers)
//           console.log(data)
//           return data
 
//      } catch (err) {
//          console.log(err)
//      }
//  }


 export async function updateTicketApi(ticketId, data){
    return await axios.put(`${URL}/crm/app/v1/tickets/${ticketId}`, data, {
        headers:{
            'x-access-token' : localStorage.getItem("Token")
        }
    })
}

export function fetchTickets () {

    try{
        const Tickets =  axios.get(`${URL}/crm/app/v1/tickets` , {
         
            headers : {
                 "x-access-token" : localStorage.getItem("Token")
            }
           
         })
         console.log(Tickets)
         return Tickets;
        
        

    }catch(err){
        console.log(err.message)
    }
    
    
}

export async function notificationApi(data){
    return await axios.post(`${URL}/crm/app/v1/notificationSend`, data, {
        headers:{
            'x-access-token' : localStorage.getItem("Token")
        }
    })
}



export async function sendMail(body) {
    try {
        
        let { data }= await axios.post("https://notification-service-1ggi.onrender.com/ticketNotificationService/api/v1/notification", body)
        return data
    } catch (err) {
        console.log(err.message)
    }
} 



 export async function userDetails(userId) {
  
  try {
    let headers = {
      headers: {
        'x-access-token': localStorage.getItem('Token')
      }
    }
    // let data  = await axios.get(`https://notification-service-1ggi.onrender.com/ticketNotificationService/api/v1/notifications/${userId}`,headers)
    let {data}  = await axios.get(URL+`/crm/api/v1/users/${userId}`,headers)
    return data
  } catch (err) {
    console.log(err.message)
  }
}

export async function getAllUsers () {
    try{

        const allUsers = axios.get(`${URL}/crm/api/v1/users`)

        console.log(allUsers)
        return allUsers;
        
    }catch(error){
         console.log(error.message)
    }
   

}

export async function updateUserDetails (userId,data) {
    try{
       
     let userData = axios.put(`${URL}/crm/api/v1/users/${userId}`, data , {
        headers:{
            'x-access-token' : localStorage.getItem("Token")
        }})
      console.log(userData)
      return userData;
    }catch(errror){
        console.log(errror.message)
    }

}

export async function getUsersByUserType (UserType) {

     try{
         const foundUsers = axios.get(`${URL}/crm/api/v1/users/${UserType}`)
         console.log(foundUsers)
         return foundUsers;
     }catch(err){
         console.log(err.message)
     }
}

export async function fetchLeads () {
     
    try {

        const Leads = axios.get(`${URL}/crm/app/v1/Leads` , {
          
            headers : {
                 "x-access-token" : localStorage.getItem("Token")
                       }
            
         })
    
         console.log(Leads)
         return Leads;

    } catch (error) {
         console.log("Error occured while fetching Leads... " + JSON.stringify(error.message))
    }
    
}

export async function createLead (LeadData) {
     
    try {
        let Lead = axios.post(`${URL}/crm/app/v1/createLeads` , LeadData)
        console.log(Lead)
        return Lead;
    } catch (error) {
        console.log("error occured in creating Lead..." + JSON.stringify(error.message))
    }

}

export async function updateLead (leadId,LeadData) {
      
    try {
        const updateData = axios.put(`${URL}/crm/app/v1/Leads/${leadId}` , LeadData , {
            headers:{
                'x-access-token' : localStorage.getItem("Token")
            }})

            console.log(updateData)
            return updateData;
    }catch(err) {
        console.log("error occures while updating a Lead... " + err.message)
    }
     
}