import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom";
import { getLedger } from '../service/ledgeraxiosapi';

const Customerlist = () => {



    const [ledger,setLedger]=useState([]);


    const getAllLedgers=async()=>{
        const response=await getLedger();
        // console.log("this is ledger list- ",response.data);
        setLedger(response.data);
    }

    useEffect(()=>{
        getAllLedgers();
    },[])

 


    return (
        <>
    <h1 className="list_heading">My customers list</h1>

    {
        ledger.length<1?(
            <>
        <div className="empty_container">
            <div className="head">No Customer to Show</div>
            <div className="head2">Add Ledger first</div>
        </div>
            </>
        ):(
            <>
            <ul className="customer_list_here">
    {
        ledger.map((user)=>{
            return (
                <>
                <li key={user._id} ><span className="customer_name">{user.name}</span><span className="customer_phone">+91-{user.phone}</span><Link to={`/customerdetail/${user.phone}/${user.name}`} className="customer_action">detail</Link></li>
                </>
            )
        })
    }
       

       
    </ul>


            </>
        )
    }

   


        </>
    )
}

export default Customerlist;
