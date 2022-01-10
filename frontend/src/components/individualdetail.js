import React, { useEffect } from 'react';
import { useState } from 'react';
import { getIndividualLedger } from '../service/ledgeraxiosapi';
import AuthContext from "../context/authContext";
import { useContext } from 'react';


const Individualdetail = () => {

    const {phone,loggedName}=useContext(AuthContext);

    const [Data,setData]=useState([]);


    const getLedger=async()=>{
        const response=await getIndividualLedger(phone);
        setData(response.data);
    }


    const price=Data.map((item)=>{
        return (item.price)
    });

    const totalPrice=price.reduce((acc,item)=>(acc+=item),0);


    useEffect(()=>{
        getLedger();
    },[])

  



    return (
        <>
           <div className="data_list detail">
        <div className="date_time">
            <div className="date_cont">Due Reciept</div>
        </div> 
        <div className="customer">
            <div className="cust_name">Name:{loggedName}</div>
            <div className="cust_phone">Phone:+91-{phone}</div>
        </div>
    <ul className="list_main">
 
    <li><span className="product_name_head">Product Name</span><span className="product_Qty_head">Quantity</span>
    <span className="product_price_head">Price</span>
    </li>

    {
        Data.map((item)=>{
            return (
                <>
        <li><span className="product_name">{item.product}</span><span className="product_Qty">{item.qty}</span>
    <span className="product_price">{item.price}₹</span>
    </li> 
                </>
            )
        })
    }

  

 
    
    </ul> 

    <div className="total_temp">
        <ul>
      
        
        <li>
        <div className="total_name">Total</div>
        <div className="total_here">{totalPrice}₹</div>
        </li>

        <li>
        <div className="total_name">Tax</div>
        <div className="total_here">00.00₹</div>
        </li>
        </ul>
    </div>
      

        </div>   
        </>
    )
}

export default Individualdetail;
