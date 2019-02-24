var express = require("express");
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname ,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
var server  = require("http").Server(app);
var io = require("socket.io")(server);
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Request-With, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        req.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})
server.listen(8084,()=>{console.log("Server start")});
var fetch = require('node-fetch')
app.get("/",function(req1,res){
//     const uri = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=London&sensor=true&language=vi&key=AIzaSyBfQPm46M3j2joTFlHachk4RCXfeR7ZFWE';
//     const url_twitter = "http://localhost:9200/twitter/_search?q=user:Cristiano&pretty";
//     fetch(url_twitter,{
//         method: 'GET',
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Accept": "application/json",
//       },
//       mode: "cors",
//     })  
// .then(  
// function(response) {  
// if (response.status !== 200) {  
// console.log('Looks like there was a problem. Status Code: ' +  
// response.status);  
// return;  
// }

// // Examine the text in the response  
// response.json().then(function(data) {  
// console.log(data);  
// });  
// }  
// )  
// .catch(function(err) {  
// console.log('Fetch Error :-S', err);  
// });
    res.render("start");
})