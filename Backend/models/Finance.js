
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const financeSchema = new Schema({
  
    name: {type:String},
     amount: {type:Number},
     transactionType: {type:String},
     catogery: {type:String},
     PaymentMode:{type:String},
     TransactionDate:{type:String},
    status:{type:String},
  

  
}, 
{ timestamps: true }
); // Correct placement of timestamps

const Finance = model('Finance',financeSchema);

export default Finance;