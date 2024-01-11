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

  setUserData({...userData,[name]:value }); // (key : value) getting dynamic data from text box
}
// send the data to backend  11:40

const contactForm = async (e) => {
  e.preventDefault();  // prevents page from refreshing
 const {name, email, phone, message} = userData;
  const res = await fetch('/contact', {
    method : "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      name, email, phone, message
    })
  });

  //15:43

  // const data = await res.json();

  // if(!data){
  //   console.log("messsage not send ");
  // }else{
  //   alert("Message Send");
  //   setUserData({...userData, message:""});
  // }

  if (!res.ok) {
    const errorMessage = await res.text();
    console.log("Error:", errorMessage);
    window.alert(errorMessage);
    console.log("Invalid Regist", errorMessage);
  } else {
    const resp = await res.json();
    console.log("response-----------", resp);
    window.alert("Successful message");
    console.log("Successful message");
    setUserData({...userData, message:""});
   
  }

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
          <form method="POST">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name"
              name="name"
              value={userData.name}
              onChange={handleInputs}
              placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email"
              name="email"
              value={userData.email}
              onChange={handleInputs}
              placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number"
              name="phone"
              value={userData.phone}
              onChange={handleInputs}
              required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea className="form-control" id="message"
              name="message"  
              value={userData.message}
              onChange={handleInputs}
              rows="4" placeholder="Enter your message" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block"
            onClick={contactForm}
            >Send Message</button>
          </form>
        </div>
      </div>
    </div>

    </>
  )
}

export default Contact