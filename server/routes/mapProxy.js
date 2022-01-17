const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

const loader = new (require("@googlemaps/js-api-loader").Loader)({
  apiKey: require('../../src/config').maps["google-api-key"],
  version: "weekly",
});

// This section will help you get a list of all the records.
recordRoutes.route("/map-proxy").get(async function (req, res) {
  // Create the script tag, set the appropriate attributes
  // var script = document.createElement('script');
  // script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
  // script.async = true;

  // // Attach your callback function to the `window` object
  // window.initMap = function() {
  //   // JS API is loaded and available
  // };

  // // Append the 'script' element to 'head'
  // document.head.appendChild(script);

  let result = await require('axios').get(`https://maps.googleapis.com/maps/api/js?key=${require('../../src/config').maps["google-api-key"]}&callback=initMap`);
  //console.log(result.data);

  res.json(result.data);

});

module.exports = recordRoutes;
