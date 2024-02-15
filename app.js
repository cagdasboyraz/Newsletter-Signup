const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get ("/", function (req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.res.lName;
    const email = req.res.email;
    
    const data = {
        members: [
         {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
         }

    ]
}


const jsonData = JSON.stringify(data);

const url = "https://us10.api.mailchimp.com/3.0/lists/07e4b06e07"

const options ={
    method:"POST",
    auth: "cagdas1:a0fa140f210c4cf25ad62ceb7a8e0bbc-us10"
}

const request = https.request(url, options, function(response){

    if (response.statusCode ===200) {
        res.sendFile (__dirname + "/success.html"); 
        
    } else {
        res.sendFile (__dirname + "/failure.html");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})


request.write(jsonData);
request.end();

});


app.post ("/failure", function(req, res){
    res.redirect("/");
});

app.listen (process.env.PORT || 3000 , function(){
    console.log("server is running on port 3000");
});

//a0fa140f210c4cf25ad62ceb7a8e0bbc-us10
//07e4b06e07