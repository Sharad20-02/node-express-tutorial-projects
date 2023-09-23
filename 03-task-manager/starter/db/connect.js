
const mongoose = require('mongoose');

const connectDB = (url)=>{
    return mongoose.connect(url,{writeConcern: { w: 'majority', wtimeout: 0, provenance: 'clientSupplied' }});
};

module.exports = connectDB;