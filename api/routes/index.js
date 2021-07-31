var express = require('express');
var router = express.Router();
var firebase = require('../config')

/* GET home page. */
router.get('/', function(req, res, next) {

  const { company } = req.query 
  firebase.db.collection("companies").add({
     companyName: company,
   })
   .then((docRef) => {
    res.status(200).send(JSON.stringify({message: `Document written with ID: ${docRef.id}`}));
   })
   .catch((error) => {
    res.status(400).send(JSON.stringify({message: `Error adding document: ${error}`}));
   });
})


module.exports = router;
