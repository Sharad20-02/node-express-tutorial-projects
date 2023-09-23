const jwt = require('jsonwebtoken');
const {CustomAPIError,BadRequestError,UnauthenticatedError} = require('../errors');

const authenticationMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token Provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;
        req.user = {id,username};
        console.log("Req.user:=>", req.user);
        next();
    } catch (error) {
        throw new UnauthenticatedError('No Authorization to access this route');
    }
};

module.exports = authenticationMiddleware;