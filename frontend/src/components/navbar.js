import React, { useContext } from 'react';
import {NavLink} from "react-router-dom";
import AuthContext from '../context/authContext';
import { logoutUser } from '../service/useraxios';
import {useNavigate} from "react-router-dom";


const Navbar = () => {
   
   const {loggedIn,shopkeeper,getLoggedIn}=useContext(AuthContext);

   const navigate=useNavigate();

   const handleLogout=async(e)=>{
       e.preventDefault();
       try{

           await logoutUser();
           await getLoggedIn();
    
           navigate("/");
       }
       catch(err){
           console.log(err);
       }
   }

   
   
    return (
        <>
        <div className="navbar">
        {
            loggedIn && shopkeeper?(
                <>
        <NavLink activeClassName="active" to="/addcustomer" ><i class="fas fa-folder-open"></i></NavLink>
        <NavLink activeClassName="active" to="/customerlist"><i class="fas fa-list"></i></NavLink>

        <button className="logoutBtn" onClick={handleLogout}><i class="fas fa-sign-out-alt"></i></button>

                </>
            ):loggedIn?(
                <>
        <NavLink activeClassName="active" to="/individual"><i class="fas fa-file-alt"></i></NavLink>
        <button className="logoutBtn" onClick={handleLogout}><i class="fas fa-sign-out-alt"></i></button>

                </>

            ):(
                <>
        <NavLink activeClassName="active" exact to="/"><i class="fas fa-user"></i></NavLink>


                </>
            )
        }
        </div>  
        </>
    )
}

export default Navbar;
