var express = require('express');
var router = express.Router();
var firebase = require('../config')
var dotenv = require('dotenv');
const fetch = require('node-fetch');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log( 'ID', req.query.id)
    const {id} = req.query;
    firebase.db.collection('favorites').doc(id).delete()
    .then(() => {
      console.log("Document successfully deleted!");
      res.status(200).send(JSON.stringify({message: 'Document successfully delelted'}));
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
  });
});

module.exports = router;