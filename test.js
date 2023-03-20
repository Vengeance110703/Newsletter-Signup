const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4000, () => {
    console.log("Server is listening at port 4000");
})

const apiKey = "e870ac9ab5692fd027a3e632412b35b6-us21";
const options = {
    method: "GET",
    // auth: "anystring:"+apiKey,
    headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
    }
};

const url = "https://us21.api.mailchimp.com/3.0/lists/";

https.request(url, options, (res) => {
    console.log(res.statusCode);
})