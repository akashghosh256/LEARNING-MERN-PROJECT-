import React from 'react'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Errorpage from "./components/Errorpage"; 
import {Routes, Route} from 'react-router-dom';
import "./App.css";

const App = () => {
  return (
 <>
 <Routes>
 


 <Route path="/" element={<><Navbar/> <div className='container'>
<Home/>
 </div> </>} />

 <Route path="/about" element={<><Navbar/> <div className='container'>
<About/>
 </div> </>} />
 <Route path="/login" element={<><Navbar/> <div className='container'>
<Login/>
 </div> </>} />
 <Route path="/contact" element={<><Navbar/> <div className='container'>
<Contact/>
 </div> </>} />
 <Route path="/signup" element={<><Navbar/> <div className='container'>
<Signup/>
 </div> </>} />

 {/* Add a generic catch-all route for 404 errors */}
 <Route path="*" element={<><Navbar /><div className='container'><Errorpage /></div></>} />
     


</Routes>

 </>
  )
}

export default App





