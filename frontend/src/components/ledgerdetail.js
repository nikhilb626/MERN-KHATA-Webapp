import React, { useContext,useEffect,useState } from 'react';
import { getLedgerByPhone ,deleteIndividual,deleteLedgers} from '../service/ledgeraxiosapi';
import {useParams} from "react-router-dom";
import AuthContext from '../context/authContext';
import {useNavigate} from "react-router-dom";


const Ledgerdetail = (props) => {

    const navigate=useNavigate();

    const {getPhoneAndName}=useContext(AuthContext);

  let {phone,name}=useParams();

  const [deletemsg,setDeletemsg]=useState("deleteclose");



  const [Data,setData]=useState([]);

    const getPhon=async()=>{
        const response=await getLedgerByPhone(phone,name);
        setData(response.data);
    }

    const price=Data.map((item)=>{
        return (item.price)
    });

    const totalPrice=price.reduce((acc,item)=>(acc+=item),0);


    const handleAdd=()=>{
        getPhoneAndName(phone,name);
        navigate("/addcustomer");

    }


    const deleteIndividualData=async(id)=>{

        if(Data.length<=1){
            await deleteIndividual(id);
            getPhon();
            navigate("/customerlist");
        }
        else{
            await deleteIndividual(id);
            getPhon();
        setDeletemsg("deleteclose open");

        }

    }


    const getDeleteLedgers=async()=>{
        await deleteLedgers(phone);
        getPhon();
        navigate("/customerlist");

    }


    const closeHandle2=()=>{
        setDeletemsg("deleteclose")
    }
    



    useEffect(()=>{
        getPhon();
    },[])


    return (
        <>
        <div className="message_container">
        <div className={deletemsg}> successfully deleted <span onClick={closeHandle2}>X</span></div>
        </div>
      <div className="data_list detail">
        <div className="date_time">
            <div className="date_cont">Due Reciept</div>
        </div> 
        <div className="customer">
            <div className="cust_name">Name: {name}</div>
            <div className="cust_phone">Phone:+91-{phone}</div>
        </div>
    <ul className="list_main">
    <li><span className="product_name_head">Product Name</span><span className="product_Qty_head">Quantity</span>
    <span className="product_price_head">Price</span>
    <span className="action">Action</span>
    </li>

    {
        Data.map((item)=>{
            return (
                <>

                <li key={item._id}><span className="product_name">{item.product}</span><span className="product_Qty">{item.qty}</span>
    <span className="product_price">{item.price}₹</span>
    <span className="del" onClick={()=>deleteIndividualData(item._id)} >delete</span>
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
      

      <div className="universal_action">
          <button onClick={handleAdd}>add Product</button>
          <button className="clear" onClick={getDeleteLedgers}>delete all</button>
      </div>
        </div>
        </>
    )
}

export default Ledgerdetail;
