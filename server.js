var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname ,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
var server  = require("http").Server(app);
var io = require("socket.io")(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
res.render("start"); 
})
app.post("/getData",function(req,res){
  var location = req.body.location;
  var radius = req.body.radius;
 // console.log(place_name)
    const url_twitter = "http://localhost:9200/locationjapan_ls/_search?size=1000&pretty";
    fetch(url_twitter,{
        method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
      },
      mode: "cors",
    })  
.then(  
function(response) {  
if (response.status !== 200) {  
console.log('Looks like there was a problem. Status Code: ' +  
response.status);  
return;  
}

// Examine the text in the response  
response.json().then(function(data) {  
var array = [];
var result_temp = [];
array=toOutput(data.hits.hits)
//console.log(array)
for(var i=0;i<array.length;i++){
if(calculateDistance(radius,location,array[i].place.location))
  result_temp.push(array[i]);
}
var result = [];
var c = 0;

for(var i = 0; i<result_temp.length ; i++){
  if(result.length==0){
    result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
  }else{
    var check = false;
for(var j = 0; j<result.length; j++){
  if(result[j].location.lat == result_temp[i].place.location.lat && result[j].location.lng == result_temp[i].place.location.lng){
    check = true
    result[j].twitter_post.push(result_temp[i]);
  }
}
if(!check){
  result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
}
}
}
res.send(result);
});  
}  
)  
.catch(function(err) {  
console.log('Fetch Error :-S', err);  
})
})


app.post("/getDataFire",function(req,res){
  var location = req.body.location;
  var radius = req.body.radius;
  var keyword = req.body.keyword;
 // console.log(place_name)
    const url_twitter = "http://localhost:9200/locationjapan_ls/_search?size=1000&pretty";
    fetch(url_twitter,{
        method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
      },
      mode: "cors",
    })  
.then(  
function(response) {  
if (response.status !== 200) {  
console.log('Looks like there was a problem. Status Code: ' +  
response.status);  
return;  
}

// Examine the text in the response  
response.json().then(function(data) {  
var array = [];
var result_temp = [];
array=toOutput(data.hits.hits)
//console.log(array)
for(var i=0;i<array.length;i++){
if(calculateDistance(radius,location,array[i].place.location)){
  var check_fire = false;
  var count_check = 0;
  for(var m = 0;m<keyword.length;m++){
    if(array[i].text.indexOf(keyword[m])>-1)
    {
      check_fire = true;
      count_check++;
    }
  }
  if(check_fire)
  result_temp.push(array[i]);
}
}
var result = [];
var c = 0;

for(var i = 0; i<result_temp.length ; i++){
  if(result.length==0){
    result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
  }else{
    var check = false;
for(var j = 0; j<result.length; j++){
  if(result[j].location.lat == result_temp[i].place.location.lat && result[j].location.lng == result_temp[i].place.location.lng){
    check = true
    result[j].twitter_post.push(result_temp[i]);
  }
}
if(!check){
  result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
}
}
}
res.send(result);
});  
}  
)  
.catch(function(err) {  
console.log('Fetch Error :-S', err);  
})
})

app.post("/getDataStore",function(req,res){
  var location = req.body.location;
  var radius = req.body.radius;
  var keyword = req.body.keyword;
 // console.log(place_name)
    const url_twitter = "http://localhost:9200/locationjapan_ls/_search?size=5000&pretty";
    fetch(url_twitter,{
        method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
      },
      mode: "cors",
    })  
.then(  
function(response) {  
if (response.status !== 200) {  
console.log('Looks like there was a problem. Status Code: ' +  
response.status);  
return;  
}

// Examine the text in the response  
response.json().then(function(data) {  
var array = [];
var result_temp = [];
array=toOutput(data.hits.hits)
//console.log(array)
for(var i=0;i<array.length;i++){
if(calculateDistance(radius,location,array[i].place.location)){
  var check_fire = false;
  var count_check = 0;
  for(var m = 0;m<keyword.length;m++){
    if(array[i].text.indexOf(keyword[m])>-1)
    {
      check_fire = true;
      count_check++;
    }
  }
  if(check_fire)
  result_temp.push(array[i]);
}
}
var result = [];
var c = 0;

for(var i = 0; i<result_temp.length ; i++){
  if(result.length==0){
    result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
  }else{
    var check = false;
for(var j = 0; j<result.length; j++){
  if(result[j].location.lat == result_temp[i].place.location.lat && result[j].location.lng == result_temp[i].place.location.lng){
    check = true
    result[j].twitter_post.push(result_temp[i]);
  }
}
if(!check){
  result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
}
}
}
res.send(result);
});  
}  
)  
.catch(function(err) {  
console.log('Fetch Error :-S', err);  
})
})


app.post("/getDataSchool",function(req,res){
  var location = req.body.location;
  var radius = req.body.radius;
  var keyword = req.body.keyword;
 // console.log(place_name)
    const url_twitter = "http://localhost:9200/locationjapan_ls/_search?size=5000&pretty";
    fetch(url_twitter,{
        method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
      },
      mode: "cors",
    })  
.then(  
function(response) {  
if (response.status !== 200) {  
console.log('Looks like there was a problem. Status Code: ' +  
response.status);  
return;  
}

// Examine the text in the response  
response.json().then(function(data) {  
var array = [];
var result_temp = [];
array=toOutput(data.hits.hits)
//console.log(array)
for(var i=0;i<array.length;i++){
if(calculateDistance(radius,location,array[i].place.location)){
  var check_fire = false;
  var count_check = 0;
  for(var m = 0;m<keyword.length;m++){
    if(array[i].text.indexOf(keyword[m])>-1)
    {
      check_fire = true;
      count_check++;
    }
  }
  if(check_fire)
  result_temp.push(array[i]);
}
}
var result = [];
var c = 0;

for(var i = 0; i<result_temp.length ; i++){
  if(result.length==0){
    result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
  }else{
    var check = false;
for(var j = 0; j<result.length; j++){
  if(result[j].location.lat == result_temp[i].place.location.lat && result[j].location.lng == result_temp[i].place.location.lng){
    check = true
    result[j].twitter_post.push(result_temp[i]);
  }
}
if(!check){
  result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
}
}
}
res.send(result);
});  
}  
)  
.catch(function(err) {  
console.log('Fetch Error :-S', err);  
})
})

app.post("/getDataHospital",function(req,res){
  var location = req.body.location;
  var radius = req.body.radius;
  var keyword = req.body.keyword;
 // console.log(place_name)
    const url_twitter = "http://localhost:9200/locationjapan_ls/_search?size=5000&pretty";
    fetch(url_twitter,{
        method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
      },
      mode: "cors",
    })  
.then(  
function(response) {  
if (response.status !== 200) {  
console.log('Looks like there was a problem. Status Code: ' +  
response.status);  
return;  
}

// Examine the text in the response  
response.json().then(function(data) {  
var array = [];
var result_temp = [];
array=toOutput(data.hits.hits)
//console.log(array)
for(var i=0;i<array.length;i++){
if(calculateDistance(radius,location,array[i].place.location)){
  var check_fire = false;
  var count_check = 0;
  for(var m = 0;m<keyword.length;m++){
    if(array[i].text.indexOf(keyword[m])>-1)
    {
      check_fire = true;
      count_check++;
    }
  }
  if(check_fire)
  result_temp.push(array[i]);
}
}
var result = [];
var c = 0;

for(var i = 0; i<result_temp.length ; i++){
  if(result.length==0){
    result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
  }else{
    var check = false;
for(var j = 0; j<result.length; j++){
  if(result[j].location.lat == result_temp[i].place.location.lat && result[j].location.lng == result_temp[i].place.location.lng){
    check = true
    result[j].twitter_post.push(result_temp[i]);
  }
}
if(!check){
  result.push({location: { lat: result_temp[i].place.location.lat, lng: result_temp[i].place.location.lng}, twitter_post: [result_temp[i]]})
}
}
}
res.send(result);
});  
}  
)  
.catch(function(err) {  
console.log('Fetch Error :-S', err);  
})
})

// Distance 2 location
function calculateDistance(radius, location1, location2)
    {
var R = 6371;
var dLat = toRad(location2.lat-location1.lat);
var dLon = toRad(location2.lng-location1.lng);
var dLat1 = toRad(location1.lat);
var dLat2 = toRad(location2.lat);
var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(dLat1) * Math.cos(dLat1) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
      if(d<radius)
      return true;
      return false;     
    }
function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
    }

const toOutput = (hits) => {
  return hits
  .map( ({_source: {id, id_str, lang, user, text, created_at, coordinates, place, entities: {hashtags, urls, media}}}) => {
      return {id, id_str, lang, user, text, created_at, place, coordinates, hashtags, urls, media}
  })
  .map(({id, id_str, lang, user, text, created_at, place: {name}, place: {bounding_box: {coordinates}}, hashtags, urls, media}) => {
    return {
      id: id,
      id_str: id_str,
      // tweet_url: toTwitterStatusUrl(user.screen_name, id_str),
      lang: lang,
      text: text,
      created_at: created_at,
      place: {name: name, location: {lat: coordinates[0][0][1], lng: coordinates[0][0][0]}},
      hashtags: !hashtags ? [] : hashtags.map( ({text}) => { return text}),
      urls: urls,
      media: !media ? [] : media.map(({type, media_url, url}) =>  {return {type, media_url, url}}),
      user: {
        id: user.id,
        name: user.name,
        display_name: user.screen_name,
        description: user.description,
        profile_image_url: user.profile_image_url,
      },
    }
  });
}