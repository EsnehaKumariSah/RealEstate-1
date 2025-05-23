
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sellerSchema = new Schema({
    name: {type:String},
    email: {type:String},
    phone: {type:Number , min:10},
    address: {type:String},
     Id:{type:String},
    ListedPrice:{type:Number},
    status:{type:String},
  
  
},{ timestamps: true }
); // Correct placement of timestamps

const Seller= model('Seller',sellerSchema);

export default Seller;