import React,{useState} from 'react';
import {Link} from "react-router-dom";
import { addLedger } from '../service/ledgeraxiosapi';
import AuthContext from '../context/authContext';
import { useContext } from 'react';

const Addcustomer = () => {


    const {PreName,PrePhone,getPhoneAndName}=useContext(AuthContext);

    const [toggleForm,setToggleForm]=useState("form form1");

    const [toggleForm2,setToggleForm2]=useState("form form2 show");

    const [toggleList,setToggleList]=useState("data_list none")
    const [date,setDate]=useState("");


    const [error,setError]=useState("");






    const [items,setItems]=useState([]);


    // ledger inputs
    const [name,setName]=useState(PreName);
    const [phone,setPhone]=useState(PrePhone);
    const [product,setProduct]=useState("");
    const [qty,setQty]=useState(0);
    const [price,setPrice]=useState(0);


    const handleNext=()=>{
        setToggleForm("form form1 show");
        setToggleForm2("form form2");

    }



    const priceTag=items.map((item)=>{
        return parseInt(item.price)
    });

    const totalPrice=priceTag.reduce((acc,item)=>(acc+=item),0);


    const PreBlank="";

    const handleAnother=()=>{
        setToggleForm("form form1");
        setToggleForm2("form form2  show");
        setToggleList("data_list none");


        setName("");
        setPhone("");
        getPhoneAndName(PreBlank,PreBlank);
        setItems([]);
        setError("");
    }





    const handleAdd=async(e)=>{
        e.preventDefault();
     

        try{
            if(name==="" || phone==="" || product==="" || qty===0 || price===0){
                // console.log("please fill form properly");
                setError("please fill the form properly");
            }
            else if(name!=="" && phone!=="" && product!=="" && qty!==0 && price!==0){
                const ledgerObj={
                    name,phone,product,qty,price
                }

                await addLedger(ledgerObj);

                setToggleList("data_list");
                setDate(new Date().toLocaleString());
                setProduct("");
                setQty(0);
                setPrice(0);
                setError("");


                const temproryobj={
                    product,qty,price
                }

                setItems([...items,temproryobj]);
            }
        }
        catch(err){
            // console.log(err);
            setError(err.response.data.errorMessage);
        }
        


    }

    return (
        <>
        <fieldset className={toggleForm}>
            <legend>Add new Ledger</legend>
          
        <div className="custom_new"><i class="fas fa-book"></i></div>
            <input type="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder=" Customer name" />

            <input type="name" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder=" Customer Phone" />


        <button onClick={handleNext}>Next</button>
        <div className="link">Already a Customer ? <Link to="/customerlist">Customer list</Link></div>

        </fieldset>

        <fieldset className={toggleForm2}>
            <legend>Next step</legend>

          
            <input type="text" value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="product" />
            <div className="numbers">


            <div className="inputs">
            <label htmlFor="qty">quantity</label>

            <input type="number"  value={qty} onChange={(e)=>setQty(e.target.value)} name="qty" />
            </div>

            <div className="inputs">
            <label htmlFor="qty">price</label>

            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} name="Price" />
            </div>


            </div>

            <div className="error_container">{error}</div>


        <button onClick={handleAdd}>Add data</button>
       <button className="another" onClick={handleAnother}>
           Another Customer
       </button>

        </fieldset>

        <div className={toggleList}>
        <div className="date_time">
            <div className="date_cont">Date:{date}</div>
        </div> 
        <div className="customer">Customer Name:{name}</div>
    <ul className="list_main">
    {
        items.map((elem)=>{
            return (
                <>
                <li><span className="product_name">{elem.product}</span><span className="product_Qty">{elem.qty}</span>
    <span className="product_price">{elem.price}₹</span>
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

export default Addcustomer;
