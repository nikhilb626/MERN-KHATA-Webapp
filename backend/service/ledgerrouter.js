const express=require("express");
const {deleteAllLedger,deleteIndividual,addLedger,getLedger,getLedgerByPhone,getIndividual}=require("../controller/ledgercontroller");

const auth=require("../middleware/auth");
const isShopkeeper=require("../middleware/admin");


const router=express.Router();

router.post("/add",auth,isShopkeeper,addLedger);

router.get("/showLedger",auth,isShopkeeper,getLedger);

router.get("/show/:phone/:name",auth,isShopkeeper,getLedgerByPhone);

router.delete("/:id",auth,isShopkeeper,deleteIndividual);

router.delete("/delete/:phone",auth,isShopkeeper,deleteAllLedger);


router.get("/showIndividual/:phone",auth,getIndividual);





module.exports=router;