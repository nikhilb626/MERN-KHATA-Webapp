const jwt=require('jsonwebtoken');
const User=require("../model/user.js");

async function isShopkeeper(req,res,next){
    try{
        const token=req.cookies.token;

        if(token){
            const verified=jwt.verify(token,process.env.JWT_SECRET);


            const userData=await User.find({_id:verified.user});

            if(userData[0].isShopkeeper){
                next();
            }
            else{
            
                return  res.status(401).json({
                    errorMessage:"unauthorized Shopkeeper"
                });
            }

        }else{
            return res.status(401).json({
                errorMessage:"unauthorized shopkeeper"
            })
        }
    }
    catch(err){
        console.log(err);
     res.status(401).json({
           errorMessage:"Unauthorized"
       })
    }
}


module.exports=isShopkeeper;