var express = require('express');
var router = express.Router();
var firebase = require('../config')
var dotenv = require('dotenv');
const fetch = require('node-fetch')

/* GET users listing. */
router.get('/', function(req, res, next) {

  const { companyName, userId, phoneNumber } = req.query   

   firebase.db.collection("favorites").add({
      companyName: companyName,
      userId: userId,
      phoneNumber: phoneNumber
    })
    .then((docRef) => {
     res.status(200).send(JSON.stringify({message: `Document written with ID: ${docRef.id}`}));
    })
    .catch((error) => {
     res.status(400).send(JSON.stringify({message: `Error adding document: ${error}`}));
    });
});

module.exports = router;
