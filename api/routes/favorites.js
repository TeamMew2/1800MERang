var express = require('express');
var router = express.Router();
var firebase = require('../config')
var dotenv = require('dotenv');
const fetch = require('node-fetch')

/* GET users listing. */
router.get('/', function(req, res, next) {

    firebase.db.collection('favorites').get()
    .then((querySnapshot) => {
        let returnObj = {}
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            returnObj[doc.id] = doc.data()
        });
        console.log(returnObj)
        res.status(200).send(JSON.stringify(returnObj))
    })
});

module.exports = router;