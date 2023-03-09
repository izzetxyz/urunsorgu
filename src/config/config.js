const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useNewUrlParser: true
})
.then(()=>console.log('Veritabanına bağlanıldı'))
.catch(hata => console.log(`Veritabanı bağlantı hatası ${hata}`));

const newSchemaa = mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
})

const collection = mongoose.model("collection", newSchemaa)

module.exports=collection