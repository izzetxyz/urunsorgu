const jwt = require('jsonwebtoken');
const Barcode = require('../models/barcodeModel');
const fs = require('fs');
const { queryDatabase } = require('../config/configsql')
const Companies = require('../models/CompanyModel');
const User = require('../models/userModel');

// GET

const homeShow = async (req, res, next) => {
    try {
        
        try {
            const result = await queryDatabase("SELECT * FROM urunsorgula WHERE Barcode = '8690000159321'")
            
            res.send(result)
          } catch (err) {
            console.error(err)
            res.status(500).send('Internal server error')
          }


    } catch (err) {
        console.log(err);
    }
};
const getBarcode_v2 = async (req,res,next) => {
    try{
        const CompanyFind = await Companies.find({Company_Name: req.body.Company_Name})
        const sqlConfig = {
            user: CompanyFind[0].sqlUsername,
            password:  CompanyFind[0].sqlPassword,
            database: CompanyFind[0].sqlDbName,
            server: CompanyFind[0].sqlIP,
            port: Number(CompanyFind[0].sqlPort),
            pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
            },
            options: {
            encrypt: false, // for azure
            trustServerCertificate: false // change to true for local dev / self-signed certs
            }
        }
        const barcode = req.body.barcode
        const result = await queryDatabase("SELECT * FROM urunsorgula WHERE Barcode LIKE '%"+barcode+"%'",sqlConfig)      
        res.json(result['recordset'][0])
    }
    catch (err){
        console.log(err)
    }
}
const getBarcode = async (req, res, next) => {

    try {
        const bulunandeger = await Barcode.find({Product_Barcode:req.body.barcode})
        res.json(bulunandeger)
    } catch (err) {
        console.log(err);
    }
};





// POST
const loginPost = async (req,res,next) => {
    try{
        const UserFind = await User.count({Username: req.body.Username})
        if(UserFind > 0){
            const UserFind = await User.find({Username: req.body.Username})
            if(UserFind[0].Password == req.body.Password){
                const data = {
                    time: Date(),
                    password: req.body.Password,
                    }
                const jwtToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
                const bilgiler = {
                    status: "Giriş Başarı İle Yapıldı",
                    jwtToken: jwtToken,
                    loggedCompany: UserFind[0].Company_Name,
                    Secret_KEY: process.env.JWT_SECRET_KEY
                }
                res.json(bilgiler)
            }
            else{
                const bilgiler = {
                    status: "Şifrenizi yanlış girdiniz."
                }
                res.json(bilgiler)
            }
        }
        else{
            const bilgiler = {
                status: "Böyle bir kullanıcı bulunamadı."
            }
            res.json(bilgiler)
        }
    }
    catch (err){
        console.log(err)
    }
}
const dbekle = async (req, res, next) => {
    try {
        
        const adi = req.body.urunadi
        const barcode_no = req.body.barcode_number
        const fiyat = req.body.fiyat
        const urun = {
            Product_Name: adi,
            Product_Barcode: barcode_no,
            Product_Price: fiyat
        }
        const Message_Model = new Barcode(
            urun
        );
        await Message_Model.save();
        res.redirect('/')



    } catch (err) {
        console.log(err);
    }
};
const getOthers = async (req,res,next) => {
    try{
        const CompanyFind = await Companies.find({Company_Name: req.body.Company_Name})
        const sqlConfig = {
            user: CompanyFind[0].sqlUsername,
            password:  CompanyFind[0].sqlPassword,
            database: CompanyFind[0].sqlDbName,
            server: CompanyFind[0].sqlIP,
            port: Number(CompanyFind[0].sqlPort),
            pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
            },
            options: {
            encrypt: false, // for azure
            trustServerCertificate: false // change to true for local dev / self-signed certs
            }
        }
        const others = await queryDatabase("SELECT * FROM urunsorgula WHERE UrunAdi = '"+req.body.UrunAdi+"'",sqlConfig)
        res.json(others['recordsets'])
    }
    catch (err){
        console.log(err)
    }
}

module.exports = {
    homeShow,
    getBarcode,
    dbekle,
    loginPost,
    getBarcode_v2,
    getOthers
}