

import axios from 'axios'
const URL = "https://crm-backend-5aju.onrender.com"



async function usePostApi(path, body) {
    
    let { data } = await axios.post(URL + path, body)
    console.log(data)
    return data
}

export default usePostApi