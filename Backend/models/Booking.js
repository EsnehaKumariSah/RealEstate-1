
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
   
    name:{type: String},
    email: {type:String},
    mobileNo: {type:Number},
    address:{type: String},
    check_in_date :{type:String},
    check_out_date:{type:String},
    TotalAmountUnit: {
        type:String,
        required: true,
        min: 0,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Active', 'Failed'],
        default: 'Pending',
    },
    Bookingstatus: {
        type: String,
        enum: ['Confirmed', 'Cancelled', 'Completed'],
        default: 'Confirmed',
    },
  
},
 { timestamps: true }); // Correct placement of timestamps

const Booking = model('Booking', bookingSchema);

export default Booking;