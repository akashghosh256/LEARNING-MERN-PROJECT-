import React, {useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
 const [userData, setUserData] = useState({name:"", email:"",phone:"", message:""});  //useState({}) declaring empty object

 const [show , setShow] = useState(false);
  const userHome = async () => {

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
setShow(true);


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
   userHome();
  },[]);










  return (
 <>
 <div className= "home-page">
<div className="home-div">
<p className="pt-5">WELCOME</p>
<h1>{userData && userData.name}</h1>
<h1>{ show ? 'Happy to see you back Chumptiya': 'Login kar BSDK'  }</h1>
</div>
</div>
 </>
  )
}

export default Home














