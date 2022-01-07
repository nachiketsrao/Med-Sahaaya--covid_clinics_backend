var mongoose = require('mongoose');

// we define the schema of a JSON doc here
let clinics_schema = new mongoose.Schema({
        district: {
            type: String,
            required: true,
            trim: true
        },
        clinic_type: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: Number,
            required: true,
        },
        block: {
            type: String,
            required: false,
            trim: true
        }
    });

// we call the 'model' constructor on the mongoose instance and feed it the name of the collection 
//    and a reference to the schema definition.
var clinics = module.exports =  mongoose.model('fever_clinics', clinics_schema)