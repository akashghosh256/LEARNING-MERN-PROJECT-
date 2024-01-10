// import React from 'react'

// const About = () => {
//   return (
   
//     <>
    
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-8 offset-md-2">
//           <ul className="nav nav-tabs">
//             <li className="nav-item">
//               <a className="nav-link active" id="about-tab" data-toggle="tab" href="#about">
//                 About
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" id="timeline-tab" data-toggle="tab" href="#timeline">
//                 Timeline
//               </a>
//             </li>
//           </ul>

//           <div className="tab-content mt-3">
//             {/* About Tab */}
//             <div className="tab-pane fade show active" id="about">
//               <div className="card">
//                 <div className="card-header">
//                   <h2 className="text-center">About Us</h2>
//                 </div>
//                 <div className="card-body">
//                   {/* About Us Content */}
//                 </div>
//               </div>
//             </div>

//             {/* Timeline Tab */}
//             <div className="tab-pane fade" id="timeline">
//               <div className="card">
//                 <div className="card-header">
//                   <h2 className="text-center">Timeline</h2>
//                 </div>
//                 <div className="card-body">
//                   {/* Timeline Content */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default About


import React, {useEffect, useState } from 'react'
import profilePic from '../components/images/eee.jpeg'
import aboutPic from '../components/images/eee.jpeg' //use different iamge 
import { useNavigate} from 'react-router-dom';



const About = () => {


  // work for authentication ----------------------
  const navigate = useNavigate();
 const [userData, setUserData] = useState();  //useState({}) declaring empty object

  const callAboutPage = async () => {

    try{
const res = await fetch('/about',{
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

setUserData(data);


if(!res.status === 200 ){
  const error = new Error(res.error);
  throw error;
 
}
    }
    catch(err){
console.log("Error from Aboutjs ----------> ",err);
navigate('/login');
    }


  }

  // it will get call automatically when about us page is visited
  useEffect(() => {
    callAboutPage();
  }, []);

// end of authentication -------------------------------------------------------------
  return (

    <>
 <div className='container mt-5'>
      <div className='card'>
        <form method="GET">
          <div className='row'>
            <div className='col-md-4'>
              <img src={profilePic} alt="profile pic" className='card-img-top' />
            </div>
            <div className='col-md-6'>
              <div className='card-body'>
                <div className='profile-head'>
                <h5>{userData && userData.name}</h5>

                  <h6>Web Dev</h6>
                  <p className='pprofile-rating mt-3 mb-5'>RANKINGS <span>1/10</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-2'>
          <input type="submit" className='profile-edit-btn' name="btnAddMore" value="Edit profile" />
        </div>

          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home">Active</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile">Timeline</a>
            </li>
          </ul>

          <div className="row">
            {/* left side url */}
<div className="col-md-4">
  <div className='profile-work'>
    <p>
      work link
    </p>
    {/* Note the addition of rel="noopener noreferrer" in the a tags. 
    This is important for security reasons,
     and it's recommended to include it when using target="_blank". */}
    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">linkedin</a><br/>
    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">Youtube</a>
<br/>
  </div>
</div>

<div className='col-md-8 pl-5 about-info'>
  <div className='tab-content profile-tab' id="myTabContent" >
    <div className='tab-pane fade show active' id="home" role="tabpanel" aria-labelledby='home-tab'>
     <div className='row'>
      <div className='col-md-6'>
        <label>User id </label>
      </div>
      <div className='col-md-6'>
        <p>{userData && userData._id}</p>
      </div>
    </div>

    <div className='row mt-3'>
      <div className='col-md-6'>
        <label>Name </label>
      </div>
      <div className='col-md-6'>
        <p>{userData && userData.name}</p>
      </div>
    </div>

    <div className='tab-pane fade show active' id="profile" role="tabpanel" aria-labelledby='profile-tab'>
     <div className='row'>
      <div className='col-md-6'>
        <label>Email</label>
      </div>
      <div className='col-md-6'>
        <p>{userData && userData.email}</p>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6'>
        <label>Phone</label>
      </div>
      <div className='col-md-6'>
        <p>{userData && userData.phone}</p>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6'>
        <label>Email</label>
      </div>
      <div className='col-md-6'>
        <p>1aaaaa@gmail</p>
      </div>
    </div>

    <div className='row mt-3'>
      <div className='col-md-6'>
        <label>profession</label>
      </div>
      <div className='col-md-6'>
        <p>{userData && userData.work}</p>
      </div>
    </div>
</div>


  </div>
</div>
</div>
          </div>
          
        </form>
    
      </div>
    </div>

    </>
  )
}

export default About