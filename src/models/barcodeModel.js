const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Product_Name:{
        type: String,
        trim: true,
    },
    Product_Barcode: {
        type: String,
        trim: true
    },
    Product_Price: {
        type: String,
        trim: true
    },
   
}, { collection: 'barcodes', timestamps: true });

const Admin = mongoose.model('barcodes', UserSchema);

module.exports = Admin;