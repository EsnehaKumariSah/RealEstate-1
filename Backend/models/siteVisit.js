
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const siteVisitSchema = new Schema({
  
  Property_Id:{type:Number},
  Visitor_name:{type:String},
  Contact_no:{type:String},
  Agent_Id:{type:String},
  Sheduled_date:{type:String},
  Visit_status:{type:String},
},{ timestamps: true }
); // Correct placement of timestamps

const siteVisit= model('siteVisit',siteVisitSchema);

export default siteVisit;
