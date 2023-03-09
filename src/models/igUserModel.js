const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Message_ID:{
        type: String,
        trim: true,
    },
    Message_Content: {
        type: Array,
        trim: true
    },
   
}, { collection: 'barcodes', timestamps: true });

const Admin = mongoose.model('barcodes', UserSchema);

module.exports = Admin;