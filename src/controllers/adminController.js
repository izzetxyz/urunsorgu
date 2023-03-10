const Companies = require('../models/CompanyModel');
const User = require('../models/userModel');

const showHomePage = async (req, res, next) => {

    try {
        const Company = await Companies.find({active: "1"})

        res.render('admin/homePage', { layout: '../layouts/adminHome_Layout', title: `Admin | IG Priv`, description: ``, keywords: ``,Company })


    } catch (err) {
        console.log(err);
    }
};


const CompanyAdd = async (req, res, next) => {
    try{
        const Count = await Companies.count({Company_Name: req.body.CompanyName})
        if(Count == 0){
            const bilgiler = {
                Company_Name: req.body.CompanyName,
                sqlDbName: req.body.DatabaseName,
                sqlIP: req.body.SqlIP,
                sqlPort: req.body.SQLPort,
                sqlUsername: req.body.sqlUsername,
                sqlPassword: req.body.sqlPassword,
                active: "1"
            }
            const Message_Model = new Companies(
                bilgiler
            );
            await Message_Model.save();
            req.flash('success_message', [{ msg: 'Şirket başarı ile eklendi.' }]);
            res.redirect('../aartigiris')
        }
        else{
            req.flash('validation_error', [{ msg: 'Bu şirket zaten kayıtlı.' }]);
            res.redirect('../aartigiris')
        }
    }
    catch (err){
        console.log(err)
    }
}
const UserAdd = async (req,res,next) => {
    try{
        const bilgiler = {
            Company_Name: req.body.Company_Name,
            Username: req.body.userName,
            Password: req.body.password,
            active: "1"
        }
        const Message_Model = new User(
            bilgiler
        );
        await Message_Model.save();
        res.redirect('../aartigiris')
    }
    catch (err){
        console.log(err)
    }
}

module.exports = {
    showHomePage,
    CompanyAdd,
    UserAdd

}