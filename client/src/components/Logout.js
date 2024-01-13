import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";


const Logout = () => {
    
const {state, dispatch}  = useContext(UserContext);



    // promises
    const navigate = useNavigate();
    useEffect(() =>{
        fetch('/logout',{
            method:'get',
            // to send cookie to backend 
            credentials:"include"
          
        }).then(function(res) {
            dispatch({type:"USER", payload:false});  // toggling 
            navigate('/login');
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }


            // if (!res.ok) {

            //     console.log("Error logout");
            //   } else {
             
           
            //     window.alert("Successful logout");
            //     console.log("Successful logout");
            //   ;
               
            //   }

        }).catch(function(err){
            console.log(err);
        });
    })



  return (
    <>
    <h1>Logging out...</h1>
    </>
  )
}

export default Logout