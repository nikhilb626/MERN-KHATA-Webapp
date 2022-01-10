const Ledger = require("../model/ledger.js");

const addLedger=async(req,res)=>{
    try{
        const {name,phone,product,qty,price}=req.body;

        const newLedger=new Ledger({
            name,phone,product,qty,price
        });

        const savedLedger=await newLedger.save();

        res.json(savedLedger);
    } 
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}

const getLedger=async(req,res)=>{
    try{
        const AllLedger=await Ledger.find();
        res.json(AllLedger);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}


const getLedgerByPhone=async(req,res)=>{
    const phone=req.params.phone;
    const name=req.params.name;

    try{
        const LedgerIndividual=await Ledger.find({phone:phone,name:name});

        res.json(LedgerIndividual);
    }catch(err){
        console.log(err);
        res.status(500).send();
    }

}


const getIndividual=async(req,res)=>{
    const phone=req.params.phone;
    try{
        const IndividualLedger=await Ledger.find({phone:phone})

        res.json(IndividualLedger);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }

}

const deleteAllLedger=async(req,res)=>{
    try{
        const phone=req.params.phone;
        await Ledger.deleteMany({phone:phone});
        res.status(201).json("deleted successfully");

    }
    catch(err){
        res.status(409).json({message:err.message});
    }
}

const deleteIndividual=async(req,res)=>{
    try{
        await Ledger.deleteOne({_id:req.params.id});
        res.status(201).json("ledger deleted successfully");

    }
    catch(err){
        res.status(409).json({message:err.message});
    }
}



module.exports={addLedger,getLedger,getLedgerByPhone,getIndividual,deleteIndividual,deleteAllLedger};