const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');



router.post('/register', (req, res) => {
    const {name, phoneNumber, email, password, password2, userType} = req.body;

    if(!name|| !phoneNumber|| !email|| !password|| !password2|| !userType) {
        return res.status(400).json({msg: "Please fill in all the required fields"})
    }

    if(password !== password2) {
        return res.status(400).json({ msg: "your password did not Match"})
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: "this Email Already Exist"});

        const newUser = new User({
            name, phoneNumber, email, password, userType
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) console.log(err);
                newUser.password = hash;
                newUser.save()
                .then(user => {

                    jwt.sign(
                        { id: user.id },
                        process.env.jwtSecret,
                        { expiresIn: 9600 },
                        (err, token) => {
                            if(err) throw err;
                            res.status(200).json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
                .catch(err => console.log(err));
            });
        });
    })
    .catch(err => console.log(err)); 

});

router.post('/auth', (req, res) => {
    const {email, password} = req.body;

    if(!email ||!password) {
        return res.status(400).json({msg: "Please fill in all the required fields"})
    }

    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg: "this Email does not Exist"});

       bcrypt.compare(password, user.password)
       .then(match => {
           if(!match) return res.status(400).json({msg: "invalid Password"});

            jwt.sign(
                { id: user.id },
                process.env.jwtSecret,
                { expiresIn: 9600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            )
       })
       .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

});

router.post('/forgotpassword', async (req, res) => {
    const email = req.body.email;
    
    if (!email) {
        return res.status(400).json({msg: "Please Enter your Email"})
    }
    
    try {
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({msg: "this Email does not Exist"});

        const payload = {
            id: user._id,
            email: user.email
        };

        jwt.sign(
            payload, 
            process.env.jwtSecret,
            { expiresIn: 3000 },
            (err, token) => {
                if(err) throw err;

                res.json({id: payload.id, token});

                //! send the user an Email Link validation
                // const auth = {
                //     auth: {
                //         api_key: "",
                //         domain: ""
                //     }
                // };

                // const tarnsporter = nodemailer.createTransport(mailGun(auth));

                // const mailOptions = {
                //     from: "www.Sokna.com",
                //     to: "ahorob57@gmail.com",
                //     subject: "password reset",
                //     text: '<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>'
                // };

                // tarnsporter.sendMail(mailOptions, (err, data) => {
                //     if(err) {
                //         console.log(err)
                //     } else {
                //         console.log('Message sent..')
                //     }
                // })
            }
        )
    } catch(err) {
        if(err) console.log(err);
    } 

});

router.post('/resetpassword/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const payload = await jwt.verify(token, process.env.jwtSecret);
        const user = await User.findById(payload.id);
        const {password, password2} = req.body;

        if(!user) return res.status(400).json({msg: "this Email does not Exist"});

        if(!password || !password2) {
            return res.status(400).json({msg: "please provide and confirm your new password"});
        }

        if(password !== password2) {
            return res.status(400).json({msg: "your password did not match"});
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) console.log(err);
                user.password = hash;
                user.save();
                return res.status(200).json({msg: "Your password has been Successfully changed."})
            });
        });

    } catch(err) {
        if(err) console.log(err);
        return res.status(400).json({msg: "your token is unvalid or has expired. please try Again"});
    }

});

router.get('/auth/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
});


module.exports = router;
