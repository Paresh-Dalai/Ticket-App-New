
// import "./login.css"
import React from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { userLogin , userSignUp } from "./auth";
import usePostApi from "./hooks/usePostApi.js";
import "./login.css"
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Animation from "./Pages/animation-text/animation";


function LoginComponent () {

    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [showSignUp, setShowSignUp] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const LoginFn = async (e) => {

      e.preventDefault();
      const body = {
        userId: userId,
        password: password,

      };
      let data = await usePostApi("/crm/api/v1/auth/signin", body);

      if (data.accessToken) {
        localStorage.setItem("Token", data.accessToken);
        localStorage.setItem("UserName", data.name);
        localStorage.setItem("UserType", data.userTypes);
        localStorage.setItem("UserId" , data.userId);

        setMessage("Success");
        console.log("Data is " + JSON.stringify(data));
        navigate(`/${data.userTypes}`);
      } else {
        setMessage("facing some issue while logging in...");
      }
    };



  //   const loginFn = (e) => {
  //     e.preventDefault()
  //     const data = {
  //         userId: userId,
  //         password: password,
  //     }

  //     userLogin(data).then((response) => {
  //         localStorage.setItem("name", response.data.name);
  //         localStorage.setItem("userId", response.data.userId);
  //         localStorage.setItem("email", response.data.email);
  //         localStorage.setItem("userTypes", response.data.userTypes);
  //         localStorage.setItem("userStatus", response.data.userStatus);
  //         localStorage.setItem("token", response.data.accessToken);
  //         if (response.data.userTypes === "CUSTOMER") navigate("/customer");
  //         else if (response.data.userTypes === "ENGINEER") navigate("/engineer");
  //         else if (response.data.userTypes === "ADMIN") navigate("/admin");
  //         else navigate("/");
  //         console.log("Login data is " + JSON.stringify(response.data))
  //         console.log("Login is successful")
  //         setMessage("Login is successful")
  //     }).catch((error) => {
  //         console.log("Error occured during login " + JSON.stringify(error))
  //         setMessage(JSON.stringify(error.message))
  //     })

  //     console.log("Login data is " + JSON.stringify(data))
  // }


    // const signUp = (e) => {
    //     e.preventDefault()
    //     const data = {
    //         userId: userId,
    //         password: password,
    //         name: userName,
    //         email: userEmail,
    //         userType: userType,
    //         userStatus: "APPROVED"
    //     }

    //     userSignUp(data).then((res) => {
    //         console.log("Sign up done..")
    //         setMessage("successfully signup !!!")
    //     }).catch((error) => {
    //         console.log("Error occured while signup " +  JSON.stringify(error))
    //         setMessage(error.message)
    //     })

    //     console.log("Signup data is " + JSON.stringify(data))
    // }

    const SignupFn = async (e) => {
      e.preventDefault();
      const body = {
        name: userName,
        userId: userId,
        email: userEmail,
        userType: userType,
        password: password,
       userStatus: "APPROVED",
      };
      let data = await usePostApi("/crm/api/v1/auth/signup", body);
      setMessage("sign-up process completed successfully");
      setShowSignUp(false);
      console.log("Data is " + JSON.stringify(data));
    };

    useEffect(() => {
        let token = localStorage.getItem("Token");
        if (token) {
        }
      }, []);
    

    return (
      <div className="total_page">
        <div className="image_container">
          <h1 className="heading">
            <strong>
            <Animation/>
            </strong>
           
          </h1>
           <img src="https://camo.githubusercontent.com/a4c584bce1c41271485d28f92aaf9f581b3c88b68ca723b6edfd58b4ba988c2b/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f313138373833362f73637265656e73686f74732f363533393432392f70726f6772616d65722e676966" alt="image_tab"></img>
        </div>
        <div className="main_container">
        <h2>{showSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={showSignUp ? SignupFn : LoginFn}>
          <div className="form-group">
            <label for="userId">userId:</label>
            <input type="text" id="userId" name="userIdText" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

       {
     showSignUp && (
        <>

        <div className="form-group"> 
        <label for="Email"> Email:</label>
        <input type="email" id="email" name="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        </div>

        <div className="form-group"> 
        <label for="name"> userName:</label>
        <input type="text" id="name" name="name" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
           
        <div className="form-group">
          <label for="userType">userType: </label>
                      <select
                        className="form-control"
                        defaultValue={"ENGINEER"}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        {["CUSTOMER", "ENGINEER", "ADMIN"].map((option, i) =>
                          option == "ENGINEER" ? (
                            <option
                              key={i}
                              defaultValue={"ENGINEER"}
                              value={option}
                            >
                              {option}
                            </option>
                          ) : (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </select>
                    </div>
        {/* <div className='row input-group'>

<div className='col md-6'>
<span className='mx-1 md-1'>User Type</span>
</div>

<div className='col md-2'>
<DropdownButton align='end' title={userType} id='userType' onSelect={(e) => setUserType(e)} variant='light'>
<Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
<Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
</DropdownButton>
</div>
</div> */}
        </>
                )
            }
          <div className="form-group">
            <button type="submit"> {showSignUp ? "Sign Up" : "Login" } </button>
          </div>
        </form>
        <div className="form-group_2" onClick={(e) => setShowSignUp(!showSignUp)}>
                                    <button className='signup_logIn_button'>
                                    {showSignUp? "Already have an account? Login": "Don't have an account? Signup"}
                                    </button>
                                    
                                </div>
                                <div className='message'>
                                    {message}
                                </div>
      </div>
    
      </div>
     
        // <div className="login_Page">
        //      <div className='left_side_of_login_page'>
        //             <img src='https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-music_516790-719.jpg' alt='pic'/>
        //      </div>
        //      <div className='right_side_of_login_page'>
        //             <div className='login_Form'>
                        
        //                 <form className='form'>
        //                 <h1>Signin</h1>
        //                      <input id='input' type='text' placeholder='userId'></input>
                             
        //                      <input id='input' type='password' placeholder='password'></input>
        //                      <button type='submit' className='submit_btn'>signIn</button>
        //                 </form>
        //             </div>
        //      </div>
        // </div>
       
    )  
        }


        


export default LoginComponent;