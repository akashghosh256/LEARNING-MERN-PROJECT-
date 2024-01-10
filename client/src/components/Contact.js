import React, {useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';

const Contact = () => {

  const navigate = useNavigate();
 const [userData, setUserData] = useState({name:"", email:"",phone:"", message:""});  //useState({}) declaring empty object

  const callContactPage = async () => {

    try{
const res = await fetch('/getdata',{   //
  method:"GET",
  headers:{
    Accept:"application/json",
    "Content-Type" :"application/json"
  },
  // to send cookie to backend 
  credentials:"include"

});

const data = await res.json();
console.log(data);

//setUserData(data);
setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

if(!res.status === 200 ){
  const error = new Error(res.error);
  throw error;
 
}
    }
    catch(err){
console.log("Error from Contact js ----------> ",err);
navigate('/login');
    }


  }

  // it will get call automatically when about us page is visited
  useEffect(() => {
    callContactPage();
  }, []);

  // video 36------------------------
// we are storing data in states

const handleInputs = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  setUserData({...userData, name:userData.name, email:userData.email, phone:userData.phone});
}



  return (
    <>
 <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="box">
            <h4>Name</h4>
            <p>{userData && userData.name}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box">
            <h4>Email</h4>
            <p>{userData && userData.email}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box">
            <h4>Phone</h4>
            <p>{userData && userData.phone}</p>
          </div>
        </div>
      </div>

      {/* Rest of your contact page content goes here */}
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <h2 className="text-center mb-4">Get in Touch</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name"
              onChange={handleInputs}
              placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email"
              onChange={handleInputs}
              placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number"
              onChange={handleInputs}
              required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea className="form-control" id="message"  
              value={userData.message}
              onChange={handleInputs}
              rows="4" placeholder="Enter your message" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
          </form>
        </div>
      </div>
    </div>

    </>
  )
}

export default Contact