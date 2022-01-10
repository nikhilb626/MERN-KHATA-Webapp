import React from 'react'
import {Routes,Route} from "react-router-dom";
import Login from "./components/login";
import Addcustomer from './components/addcustomer';
import Customerlist from './components/customerlist';
import Signup from './components/signup';
import Ledgerdetail from './components/ledgerdetail';
import Individualdetail from "./components/individualdetail";

import AuthContext from './context/authContext';
import { useContext } from 'react';

const NavRoute = () => {

    const {shopkeeper,loggedIn}=useContext(AuthContext);

    return (
        <>
        <Routes>
        {
            loggedIn && shopkeeper?(
                <>
            <Route  path="/addcustomer" element={<Addcustomer/>} />
            <Route path="/customerlist" element={<Customerlist/>} />
            <Route path="/customerdetail/:phone/:name" element={<Ledgerdetail />} />

                </>
            ):loggedIn?(
                <>
            <Route path="/individual" element={<Individualdetail />} />

                </>
            ):(
                <>

            <Route exact path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
                </>
            )
        }
        </Routes>
        </>
    )
}

export default NavRoute;
