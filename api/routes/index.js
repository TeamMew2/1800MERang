var express = require('express');
var router = express.Router();
var firebase = require('../config')
var dotenv = require('dotenv');
const fetch = require('node-fetch')

dotenv.config();


/* GET home page. */
router.get('/', function(req, res, next) {

  const { company, lat, lng } = req.query   
  console.log(company, lat, lng)  
  console.log("URL ", "https://maps.googleapis.com/maps/api/place/textsearch/json?query=",company,"&location=",lng,",",lat,"&",process.env.AYE_APP)

  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${company}&location=${lng},${lat}&radius=10000&key=${process.env.AYE_APP}`)
  .then(result => result.json())
  .catch(err => console.log(err))
  .then(result => {
      fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.results[0].place_id}&key=${process.env.AYE_APP}`)
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

// same route using async await and axios
// router.get('/search', async function (req, res, next) {
//   try { 
//     const placeBasics = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GOOGLE_API_KEY}&input=${req.query.company}&inputtype=textquery&fields=place_id`
//     ); 
//     const placeId = placeBasics.data.candidates[0].place_id;
//     const placeDetails = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_API_KEY}&place_id=${placeId}`
//     );
//   res.send(placeDetails.data.result.formatted_phone_number);
//   } catch(e) {
//     res.send(e);
//   }
  
// });

module.exports = router;
