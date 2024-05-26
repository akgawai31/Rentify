const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    area: String,
    city: String,
    state: String,
    pincode: String,
  });

const PropertySchema = new mongoose.Schema({
    property_name : {
        type: String,
        required: true,
    },
    property_type :  {
        type: String,
        required: true,
    },
    location :  {
        type: AddressSchema,
        required: true,
    },
    bhk : {
        type: Number,
        required: true,
    },
    bathrooms:{
        type: Number,
        required: true
    },
    hospital:{
        type:String //can be a multiple
    },
    college: {
        type:String //can be a multiple
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    like_by :{
        type: [mongoose.Schema.Types.ObjectId]
    },
    date: {
        type: Date, 
        default: Date.now, 
    },
})

//create person model
const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;