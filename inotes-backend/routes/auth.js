const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "hellohet";

 


const router = express.Router();

/*Route 1: POST METHOD is used - endpoint for create use[Login is not required]*/
router.post('/createuser', [
    body('name', 'Your name length must be greater than 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password length atleast 5').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    /*If there are errors then return bad request and errors*/
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    try {

        /*check whther user with this email already exists */
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).json({success, "error": "this email already exists" });

        /*Password-Hashing*/
        const salt = await bcrypt.genSalt(10);/*[Why await?] when promis has been resolved,then only go to the next line*/
        const secPass = await bcrypt.hash(req.body.password, salt);//it will retun a promiss

        /*create a user [user is stored in mongoDB]*/
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        //    .then(user=>res.json(user))
        //    .catch(err=>res.json({error: "Enter a unique value of email"}));  


        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        success = true;
        return res.json({success, authtoken });

    } /*if something goes wrong in try block, display error*/
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occured")
    }

});

/*Route 2: Authentication using POST: User login endpoint [Login is not required]*/
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be empty').exists()
], async (req, res) => {
    
    let success = false;
    const errors = validationResult(req);

    /*If there are errors then return bad request and errors*/
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        /*check whther user with this email already exists */
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({success, "error": "user with this email does't exists" });

        /*Password-compare*/
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare)
            return res.status(400).json({success, error: "Please enter the valid password" });


        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        success = true;
        return res.json({ success, authtoken });

    } /*if something goes wrong in try block, display error*/
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occured");
    }

});

/*Route 3: Get the user login details- POST METHOD [Login is required] */
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userID = req.user.id;/*we got user id*/
        const user = await User.findById(userID).select("-password");/*find user with id and get the data except password*/
        res.send(user);/*return user data*/
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occured");
    }
})

module.exports = router;





