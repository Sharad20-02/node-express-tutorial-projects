const mongoose = require('mongoose');

const connectDB = (url)=>{
    return mongoose.connect(url,{writeConcern: { w: 'majority', wtimeout: 0, provenance: 'clientSupplied', useUnifiedTopology: true, useNewUrlParser: true }});
};

module.exports = connectDB;

// const mongoose = require('mongoose')

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
// }

// module.exports = connectDB


// const mongoose = require('mongoose');

// const connectDB = (url) => {
//     return mongoose.connect(url, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//     });
// };

// module.exports = connectDB;


