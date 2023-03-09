const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Company_Name:{
        type: String,
        trim: true,
    },
    Username: {
        type: String,
        trim: true
    },
    Password: {
        type: String,
        trim: true
    },
    active: {
        type: String,
    }
   
}, { collection: 'Users', timestamps: true });

const Admin = mongoose.model('Users', UserSchema);

module.exports = Admin;