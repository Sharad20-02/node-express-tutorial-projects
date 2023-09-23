// check username, password in post(login) request
// if they are provided => create new JWT
// send back to front-end either error message or the created JWT
// the front-end upon receiving JWT can then send another ('GET-request' with a JWT token) to access secret info.

// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const {CustomAPIError,BadRequestError,UnauthenticatedError} = require('../errors');

const login = async (req,res)=>{
    const {username, password} = req.body;
    console.log(username,password);

    // mongoose validation
    // joi
    // check in the controller
    if(!username || !password){
        throw new BadRequestError('Please provide e-mail and password');
    }

    // just for demo, normally provided by DB
    const id = new Date().getDate();

    // try to keep payload small, better experience for user
    // just for Demo, in production use long, complex and unguessable string value!!!!!!!
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

    res.status(200).json({msg:"user created", token});
};

const dashboard = async (req,res)=>{
    const luckyNumber = Math.floor( Math.random() * 100 );
    res.status(200).json({msg:`Hello ${req.user.username}`, secret:`Here is your authorized data, your lucky number is: ${luckyNumber}`});
};

module.exports = {
    login,
    dashboard
}