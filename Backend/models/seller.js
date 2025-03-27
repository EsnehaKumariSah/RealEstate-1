
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

constsellerSchema = new Schema({
    name: {type:String},
    email: {type:String},
    phone: {type:Number},
    address: {type:String},
   sellerId :{type:String},
    ListedPrice:{type:Number},
    status:{type:String},
  
  
}, { timestamps: true }); // Correct placement of timestamps

const Seller= model('Seller',sellerSchema);

export default Seller;