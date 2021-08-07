var express = require('express');
var router = express.Router();
var firebase = require('../config')
var dotenv = require('dotenv');
const fetch = require('node-fetch')
var admin = require('../firebase.admin-config');

/* GET users listing. */
router.post('/signup', async function (req, res) {
  console.log(req.body)
    const {
          email,
          password,
        } = req.body;

        console.log(email, password)
    
        const user = await admin.auth().createUser({
          email,
          password,
        });
    
        return res.send(user);
});
router.post('/signin', async function (req, res) {
  console.log(req.body)
    const {
          email,
          password,
        } = req.body;

        console.log(email, password)
    
        const user = await admin.auth().createUser({
          email,
          password,
        });
    
        return res.send(user);
});

module.exports = router;