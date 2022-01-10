import React,{useState} from 'react';
import {Link,useNavigate} from "react-router-dom";
import { addUser } from '../service/useraxios';

const Signup = () => {
    const navigate=useNavigate();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");



    const [error,setError]=useState("");



    const handleSignup=async(e)=>{
        e.preventDefault();
       try{
        if(name==="" || email==="" || phone==="" || password==="" ||  cpassword===""){
            // console.log("please fill the form properly");
            setError("please fill the form properly");
        }
        else if(name!=="" && email!=="" && phone!=="" && password!=="" && cpassword!==""){
            if(password===cpassword){
                const signObj={
                    name,email,phone,password
                }
              await addUser(signObj);
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setCpassword("");
            setError("");

            navigate("/");


            }else{
                // console.log("confirm password does not match");
                setError("confirm password does not match");
            }
        }

       }
       catch(err){
        //    console.log(err);
        setError(err.response.data.errorMessage);
       }

    }




    return (
        <>
           <fieldset className="form up">
            <legend>Sign up</legend>

           <div className="user_plus"> <i class="fas fa-user-plus"></i></div>

            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Enter name" />


            <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter email" />

            <input type="text"  value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Phone No." />

            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter password" />

            <input type="password"  value={cpassword} onChange={(e)=>setCpassword(e.target.value)} placeholder="Confirm password" />

        <div className="error_container">
            {error}
        </div>
        <button onClick={handleSignup}>Sign up</button>

            <div className="link">Already have an account ? <Link to="/">Login</Link></div>
        </fieldset>
        </>
    )
}

export default Signup;
