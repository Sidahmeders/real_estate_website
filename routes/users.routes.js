const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


router.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email ||!password) {
        return res.status(400).json({msg: "Please fill in all the required fields"})
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: "this Email Already Exist"});

        const newUser = new User({
            name, email, password
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
                .catch(err => console.log(err)) 
            });
        });
    });

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
           if(!match) return res.status(400).json({msg: "invalid credentials"});

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
    });

});

router.get('/auth/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.status(200).json(user))
});


module.exports = router;
