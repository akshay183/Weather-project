//jshint esversion:6
const bodyParser = require("body-parser");
const express=require("express");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/style.css",function(req,res){
    res.sendFile(__dirname + "/style.css");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const appid="5c075f374cb038ca925e5b08a827c478";
    const unit="metric";
    url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherdiscription=weatherdata.weather[0].description;
            const icon_url=`http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`;
            res.write(`<p>The Weather Currently in `+ query + ` feels like ${weatherdiscription}</p>`);
            res.write("<h1>"+"The temprature in "+query+ " currently is " + temp +" in degree Celsius</h1>");
            res.write("<img src=" + icon_url + ">" );
            res.send();
        });
    })
})

    



app.listen(3000,function(){
    console.log("server started");
});