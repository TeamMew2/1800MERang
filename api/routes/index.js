var express = require('express');
var router = express.Router();
var firebase = require('../config')
const fetch = require('node-fetch')

/* GET home page. */
router.get('/', function(req, res, next) {

  const { company, lat, lng } = req.query 
  console.log('company',company)
  console.log(company, lat, lng)
  console.log(process.env.AYE_APP)
  console.log("URL ", "https://maps.googleapis.com/maps/api/place/textsearch/json?query=",company,"&location=",lng,",",lat,"&",process.env.AYE_APP)

  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${company}&location=${lng},${lat}&radius=10000&key=AIzaSyDAa97o9R3dHjlHO6Paj2n-WAEMcWIBYs0`)
  .then(result => result.json())
  .catch(err => console.log(err))
  .then(result => {
      fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.results[0].place_id}&key=AIzaSyDAa97o9R3dHjlHO6Paj2n-WAEMcWIBYs0`)
      .then(result => result.json())
      .then(result => {
        return result.result.formatted_phone_number
      })
      .then(result => res.status(200).send(JSON.stringify({phone_number: result})))
  })
  

   
  // firebase.db.collection("companies").add({
  //    companyName: company,
  //  })
  //  .then((docRef) => {
  //   res.status(200).send(JSON.stringify({message: `Document written with ID: ${docRef.id}`}));
  //  })
  //  .catch((error) => {
  //   res.status(400).send(JSON.stringify({message: `Error adding document: ${error}`}));
  //  });
})


module.exports = router;
