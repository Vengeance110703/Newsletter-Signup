const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
const config = require(__dirname + "/config.js")

client.setConfig({
    apiKey: config.apiKey,
    server: config.server,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on 3000");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;

    const run = async () => {
        try {
            const response = await client.lists.batchListMembers(config.listID, {
                members: [
                    {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                            FNAME: fname,
                            LNAME: lname
                        }
                    }
                ],
            });
            // console.log(response);
            res.sendFile(__dirname + "/success.html");
        } catch (e) {
            console.log(response);
            res.sendFile(__dirname + "/failure.html");
        }
    }
    run();
})

app.post("/failure", (req, res) => {
    res.redirect("/");
})
