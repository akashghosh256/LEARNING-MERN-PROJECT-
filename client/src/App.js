import React, { createContext, useReducer } from 'react'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Errorpage from "./components/Errorpage"; 
import {Routes, Route} from 'react-router-dom';
import Logout from "./components/Logout";
import "./App.css";
import  {initialState, reducer } from "../src/components/reducer/UseReducer";

// video 39 work on toggling login,logout and register button
  // 1: Context api 
export const UserContext = createContext();



const App = () => {
  const [state , dispatch] = useReducer(reducer, initialState);







  return (
 <>
 <UserContext.Provider  value={{state,dispatch}}>





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
 <Route path="/logout" element={<><Navbar/> <div className='container'>
<Logout/>
 </div> </>} />

 {/* Add a generic catch-all route for 404 errors */}
 <Route path="*" element={<><Navbar /><div className='container'><Errorpage /></div></>} />
     


</Routes>
</UserContext.Provider>
 </>
  )
}

export default App





