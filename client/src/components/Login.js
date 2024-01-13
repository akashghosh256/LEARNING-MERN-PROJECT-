import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";


const Login = () => {


  // video 39 toggle login
  const {state, dispatch}  = useContext(UserContext);


  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');


  const loginUser = async (e) => {
    e.preventDefault(); //to avoid reloading of form
   const res = await fetch('/signin', {
    headers:{
      "Content-Type" : "application/json"
    },
    method : "POST",
    body:JSON.stringify({
      email,
      password
    }),
    mode:"cors",
   })



   if (!res.ok) {
    const errorMessage = await res.text();
    console.log("Error:", errorMessage);
    window.alert(errorMessage);
    console.log("Invalid Regist", errorMessage);
  } else {
    const resp = await res.json();
    console.log("response-----------", resp);
    dispatch({type:"USER", payload:true});  // toggling 
    window.alert("Successful Login");
    console.log("Successful login");
    navigate('/');
  }


  }





  return (
   <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form method="POST">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" className="form-control" id="email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" className="form-control" id="password" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" required />
            </div>

            <button type="submit"  onClick={loginUser} className="btn btn-primary btn-block">Login</button>
          </form>
        </div>
      </div>
    </div>
   </>
  )
}

export default Login