const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Company_Name:{
        type: String,
        trim: true,
    },
    sqlDbName: {
        type: String,
        trim: true
    },
    sqlIP: {
        type: String,
        trim: true
    },
    sqlPort: {
        type: String,
        trim: true
    },
    sqlUsername: {
        type: String,
        trim: true
    },
    sqlPassword: {
        type: String,
        trim: true
    },
    active: {
        type: String
    }
   
}, { collection: 'Companies', timestamps: true });

const Admin = mongoose.model('Companies', UserSchema);

module.exports = Admin;