var express = require('express');
var router = express.Router();
var firebase = require('../config')
var dotenv = require('dotenv');
const fetch = require('node-fetch')

dotenv.config();


/* GET home page. */
router.get('/', function(req, res, next) {

  const { company, lat, lng } = req.query 
  console.log('company',company)
  console.log(company, lat, lng)
  console.log(process.env.AYE_APP)
  console.log("URL ", "https://maps.googleapis.com/maps/api/place/textsearch/json?query=",company,"&location=",lng,",",lat,"&",process.env.AYE_APP)

  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${company}&location=${lng},${lat}&radius=10000&key=${process.env.AYE_APP}`)
  .then(result => result.json())
  .catch(err => console.log(err))
  .then(result => {      
      fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.results[0].place_id}&key=${process.env.AYE_APP}`)
      .then(result => result.json())
      .then(result => {

        return result.result
      })
      .then(result => res.status(200).send(JSON.stringify({phone_number: result.formatted_phone_number, name: result.name})))
  })  
  
})



module.exports = router;
