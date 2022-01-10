import axios from "axios";

const userUrl=`http://localhost:5000/ledgerapi`;

export const addLedger=async(ledger)=>{
    return await axios.post(`${userUrl}/add`,ledger);
}

export const getLedger=async()=>{
    return await axios.get(`${userUrl}/showLedger`);
}


export const getLedgerByPhone=async(phone,name)=>{
    return await axios.get(`${userUrl}/show/${phone}/${name}`);
}

export const getIndividualLedger=async(phone)=>{
    return await axios.get(`${userUrl}/showIndividual/${phone}`);
}


export const deleteIndividual=async(id)=>{
    return await axios.delete(`${userUrl}/${id}`);
}


export const deleteLedgers=async(phone)=>{
    return await axios.delete(`${userUrl}/delete/${phone}`);
}