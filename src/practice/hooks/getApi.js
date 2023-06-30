


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

    const Tickets =  axios.get(`${URL}/crm/app/v1/tickets/getAllTickets` , {
         
       headers : {
            "x-access-token" : localStorage.getItem("Token")
       }
       
    })
   
    console.log(Tickets)
    return Tickets;
    
}