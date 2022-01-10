import React,{useState,useEffect,createContext} from 'react';
import { loggedInUser} from '../service/useraxios';


const AuthContext=createContext();


const AuthContextProvider = (props) => {


    const [loggedIn,setLoggedIn]=useState(undefined);

    const [shopkeeper,setShopkeeper]=useState(undefined);

    const [phone,setPhone]=useState(undefined);


    const [PrePhone,setPrePhone]=useState("");
    const [PreName,setPreName]=useState("");

    const [loggedName,setName]=useState("unknown");

    const getLoggedIn=async()=>{
        const loggedInRes=await loggedInUser();
        setLoggedIn(loggedInRes.data);
        console.log("loggedInUser- ",loggedInRes.data);
    }


    const getPhone=async(isPhone)=>{
        setPhone(isPhone)
        // console.log("this is phone- ",isPhone);
    }
    

    const getShop=async(isShop)=>{
        setShopkeeper(isShop);
    }

    const getName=async(name)=>{
        setName(name);
    }


    const getPhoneAndName=async(prephone,prename)=>{
        setPrePhone(prephone);
        setPreName(prename);
    }



    useEffect(()=>{
        getLoggedIn();
    },[]);


    return (
      <AuthContext.Provider value={{loggedIn,shopkeeper,PrePhone,PreName,loggedName,phone,getLoggedIn,getShop,getName,getPhone,getPhoneAndName}} >
          {props.children}
      </AuthContext.Provider>
    )
}


export default AuthContext;
export {AuthContextProvider};
