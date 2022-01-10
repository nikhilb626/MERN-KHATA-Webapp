const mongoose=require("mongoose");

const autoIncrement=require("mongoose-auto-increment");

const ledgerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    phone:{type:String,required:true},
    product:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true}
});

autoIncrement.initialize(mongoose.connection);
ledgerSchema.plugin(autoIncrement.plugin,'ledger');

const Ledger=mongoose.model('ledger',ledgerSchema);


module.exports=Ledger;