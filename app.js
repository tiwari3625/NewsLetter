const express = require('express');

const bodyparser = require('body-parser');

const request = require('request');

const app = express();

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));




app.get("/" , function(req , res)
{
  res.sendFile(__dirname + "/signup.html");
});


app.post("/" , function(req , res)
{
   var firstname = req.body.fname;
   var lastname = req.body.lname;
   var email = req.body.email;

   var data = {
     members:[
       {
         email_address: email,
         status: "subscribed",
         merge_fields:
         {
          FNAME: firstname ,
          LNAME: lastname
         }
       }
     ]
   };

   var jsonData = JSON.stringify(data);


   var options = {
     url:"https://us10.api.mailchimp.com/3.0/lists/60f575bc18",
     method:"post",
     headers:{
       "Authorization":"Shivanshu1 802d32b13daef070142ee4ae43d7093e-us10"
     },
      body : jsonData
   };

   request(options , function(error , response , body)
   {
     if (error)
     {
       res.sendFile(__dirname + "/failure.html");
     }
     else
     {
       if(response.statusCode === 200)
       {
         res.sendFile(__dirname + "/success.html");
       }
       else
       {
        res.sendFile(__dirname + "/failure.html");
       }

     }

   });

});


app.post("/failure" ,function(req , res)
{
  res.redirect("/");
});


app.listen(process.env.PORT || 3000 , function()
{
  console.log("Our Server Started at Port 3000");
});

// API Key
// 802d32b13daef070142ee4ae43d7093e-us10


// List-Id
// 60f575bc18
