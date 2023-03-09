const jwt = require('jsonwebtoken');
const Barcode = require('../models/barcodeModel');
const fs = require('fs');
const { queryDatabase } = require('../config/configsql')



// GET

const homeShow = async (req, res, next) => {
    try {
        
        try {
            const result = await queryDatabase("SELECT * FROM urunsorgula WHERE Barcode LIKE '%1200000185595%'")
            
            res.send(result)
          } catch (err) {
            console.error(err)
            res.status(500).send('Internal server error')
          }


    } catch (err) {
        console.log(err);
    }
};
const getBarcode_v2 = async (req,res,next) =>
{
try{
    const barcode = req.body.barcode
    const result = await queryDatabase("SELECT * FROM urunsorgula WHERE Barcode LIKE '%"+barcode+"%'")      
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


module.exports = {
    homeShow,
    getBarcode,
    dbekle,
    getBarcode_v2
}