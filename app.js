const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: "e870ac9ab5692fd027a3e632412b35b6-us21",
    server: "us21",
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
            const response = await client.lists.batchListMembers("82f5f4538f", {
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
            res.sendFile(__dirname + "/success.html");
        } catch (e) {
            res.sendFile(__dirname + "/failure.html");
        }
    }


    run();
})

app.post("/failure", (req, res) => {
    res.redirect("/");
})

//Api Key
//e870ac9ab5692fd027a3e632412b35b6-us21

//List ID
//82f5f4538f





