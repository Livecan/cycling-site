import express from "express";
import axios from "axios";

import config from "../../../src/config.json";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This section will help you get a list of all the records.
recordRoutes.route("/map-proxy").get(async function (req, res) {

  res.json({practise: "X"});

});

export default recordRoutes;
