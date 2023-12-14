const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


const fetchuser = (req, res, next) => {
    
    /*get a token from request header*/
    const token = req.header('auth-token');
    
    if (!token)
        return res.status(401).send({ error: 'Please authenticate using valid token' });

    try {
        /*extract the user id from jwt-token*/
        const data = jwt.verify(token, JWT_SECRET);/*{ data = user: { id: '*****' }, iat: ****** }*/
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(401).send({ error: 'Please authenticate using valid token' });
    }
}

module.exports = fetchuser;