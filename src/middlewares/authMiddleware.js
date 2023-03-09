const oturumAcilmis = function (req, res, next) {
    if (req.isAuthenticated()) {
        //console.log('AUTH MIDDLEWARE GİRİŞ YAPILMIŞ');
        return next();
    } else {
        req.flash('error', ['Lütfen önce oturum açın'])
        res.redirect('/aartigiris/login');
    }
}

const oturumAcilmamis = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/aartigiris');
    }
}




module.exports = {
    oturumAcilmis,
    oturumAcilmamis
}