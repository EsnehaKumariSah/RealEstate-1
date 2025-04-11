
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  emailId:{type:String},
  password:{type:String},
  
},{ timestamps: true }
); // Correct placement of timestamps

const User= model('User',userSchema);

export default User;