const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const port = 3002;
const app = express();

app.use(cors());
app.use(json());
//Build server, use yarn build when total project is ready for implementation
app.use(express.static(`${__dirname}/../../build`));

//Get quote info from API

app.get("/api/getForecast/:id", function(req, res, next) {
  console.log(req);
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${
        req.params.id
      }&appid=39b0a9078bc3441996350bb20ac1bd36`
    )
    .then(response => {
      return res.send(response.data);
    })
    .catch(console.log);
});

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"));
});
app.listen(port, function() {
  console.log("I'm listening at port 3001");
});
