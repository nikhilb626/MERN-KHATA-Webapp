import React, { useState,useContext } from 'react';
import {Link} from "react-router-dom";
import { loginUser } from '../service/useraxios';
import {useNavigate} from "react-router-dom";
import AuthContext from '../context/authContext';

const Login = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const {getLoggedIn,getShop,getPhone,getName}=useContext(AuthContext);


    const [error,setError]=useState("");


    const handleLogin=async(e)=>{
        e.preventDefault();


        try{

            if(email==="" || password===""){
                // console.log("please fill the form properly");
                setError("please fill the form properly");
            }
            else if(email!=="" && password!==""){
                const logObj={
                    email,password
                }

               const userDetail=await loginUser(logObj);

            //    console.log("this is user detail ",userDetail.data.isShopkeeper);
               setEmail("");
                setPassword("");

                setError("");
                await getLoggedIn();
                await getShop(userDetail.data.isShopkeeper);
                await getPhone(userDetail.data.phone);
                await getName(userDetail.data.name);

                if(userDetail.data.isShopkeeper===true){

                    navigate("/addcustomer");
                    // console.log("navigate in add customer")

                }
            else if(userDetail.data.isShopkeeper===false)
                navigate("/individual");

                // console.log("navigate to individual");


            }


        }
        catch(err){
            console.log(err);
            setError(err.response.data.errorMessage);
        }


    }


    return (
        <>
        <fieldset className="form">
            <legend>Login</legend>
          
        <div className="user_logo"><i class="fas fa-user-circle"></i></div>
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />

            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />

            <div className="error_container">{error}</div>

        <button onClick={handleLogin}>Login</button>

            <div className="link">don't have any account ? <Link to="/signup">Sign UP</Link></div>
        </fieldset>

        </>
    )
}

export default Login;
