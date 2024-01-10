import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
//const cors = require('cors');
// import signpic from "../components/images/bluebird.jpg"
const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

// handle data from frontend and sends to server------------------------------------------------

let name,value;
const handleInputs = (e) => {

  // console.log(e);
  name = e.target.name;
  value = e.target.value;
setUser({...user, [name]:value})

};

//fetch api------------------
const PostData = async (e) =>{
console.log("fetching");
e.preventDefault(); //to avoid reloading of form
const {   name,
email,
phone,
work,
password,
cpassword} = user;

//http://localhost:3000/register
const res = await fetch("/register",{
  headers:{
    "Content-Type" : "application/json"
  },
  method : "POST",

  // converting json data to string because sever doesnt understand json data
  body:JSON.stringify({
    
    name,
    email,
    phone,
    work,
    password,
    cpassword
  
  
  }),
  mode:"cors",
});

// const resp = await res.json();  // response for succesfull registering ?
// console.log("response-----------", resp);
// if(resp.status === 422 || !resp){
// window.alert("Invalid Regist");
// console.log("Invalid Regist");
// }else{
//   window.alert("Succefull Regist");
// console.log("successfull Regist");
// navigate('/login');

// }

if (!res.ok) {
  const errorMessage = await res.text();
  console.log("Error:", errorMessage);
  window.alert(errorMessage);
  console.log("Invalid Regist", errorMessage);
} else {
  const resp = await res.json();
  console.log("response-----------", resp);
  window.alert("Successful Registration");
  console.log("Successful Registration");
  navigate('/login');
}


}


  return (
    <>
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form method="POST">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text"  name="name" className="form-control" id="name" 
              value={user.name}
              onChange={handleInputs}
              placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email"name = "email" className="form-control" id="email"
                 value={user.email}
                 onChange={handleInputs}
              placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">phone Number:</label>
              <input type="tel" name="phone" className="form-control" id="phone" 
                 value={user.phone}
                 onChange={handleInputs}
                 placeholder="Enter your phone number" required />
            </div>

            <div className="form-group">
              <label htmlFor="work">Profession:</label>
              <input type="text" name="work" className="form-control" id="work"    
              value={user.work}
              onChange={handleInputs}
              placeholder="Enter your profession" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" className="form-control" id="password"
                 value={user.password}
                 onChange={handleInputs}
                  placeholder="Enter your password" required />
            </div>

            <div className="form-group">
              <label htmlFor="cpassword">Confirm Password:</label>
              <input type="password" name="cpassword" className="form-control" id="cpassword" 
                 value={user.cpassword}
                 onChange={handleInputs}
                 placeholder="Confirm your password" required />
            </div>

            <button type="submit" className="btn btn-primary btn-block"  onClick={PostData}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Signup