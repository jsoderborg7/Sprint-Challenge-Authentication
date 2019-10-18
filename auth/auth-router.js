const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(registered =>{
      res.status(200).json(registered)
    })
    .catch(err =>{
      res.status(500).json({Message: "Could not register user"})
    })
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;
  Users.findBy({username})
    .first()
    .then(user =>{
      console.log('user info', user);
      if (user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({message: `${user.username} is logged in!`, token,})
      } else {
        res.status(400).json({message: "Invalid username or password"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not log in user"})
    })
});


function generateToken(user){
  const payload ={
    username: user.username,
    subject: user.id,
  };
  const options ={
    expiresIn: "4h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}
module.exports = router;
