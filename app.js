const { response } = require("express");
const express = require("express");
const { STATUS_CODES } = require("http");
const bosyparser = require("body-parser");
const app = express();
const https = require("https");
app.use(bosyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
// app.post("/", function (req, res) {
//   var cname = req.body.cityName;
//   https.get(
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//       cname +
//       "&appid=a8a821f55366b9d6318e095bdf38e72a",
//     function (response) {
//       console.log(response.statusCode);
//       response.on("data", function (data) {
//         const weatherData = JSON.parse(data);
//         const temp = weatherData.main.temp;
//         const C = [(temp - 32) * (5 / 9)];
//         const celsius = parseFloat(C[0].toFixed(2));
//         const tempc = celsius + "°C";
//         const buffer = Buffer.from(tempc, "utf8");
//         const description = weatherData.weather[0].description;
//         const icon = weatherData.weather[0].icon;
//         const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

//         // console.log("the temperature is "+temp);
//         // console.log("the cloud nature is "+description);
//         res.write(
//           "<h1>The temp in " +
//             weatherData.name +
//             " is " +
//             buffer.toString("utf8") +
//             "</h1>"
//         );
//         res.write("\n");
//         res.write("<p>the weather condition is " + description + "</p>");
//         res.write("<img src=" + url + ">");
//         res.send();
//       });
//     }
//   );
// });

// app.listen(3000, function () {
//   console.log("started");
// });

app.post("/", function (req, res) {
  var cname = req.body.cityName;
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cname +
      "&appid=a8a821f55366b9d6318e095bdf38e72a&units=metric",
    function (response) {
      console.log(response.statusCode);
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        // const C = [(temp - 32) * (5 / 9)];
        // const celsius = parseFloat(C[0].toFixed(2));
        // const tempc = celsius + "°C";
        // const buffer = Buffer.from(tempc, "utf8");
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        // res.writeHead(200, { "Content-Type": "text/html";charset=utf-8"});
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

        res.write(
          "<h1>The temp in " +
            weatherData.name +
            " is " +
            // buffer.toString("utf8") +
            +temp +
            "°C</h1>"
        );
        res.write("\n");
        res.write("<p>the weather condition is " + description + "</p>");
        res.write("<img src=" + url + ">");
        res.end();
      });
    }
  );
});

app.listen(3000, function () {
  console.log("started");
});
