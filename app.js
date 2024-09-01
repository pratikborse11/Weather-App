const { response } = require("express");
const express =require("express");
const https = require("https");

const bodyParser =require("body-parser");

const app =express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
   
    

    res.sendFile(__dirname + "/index.html");
   
});

app.post("/" ,function(req ,res){
   
   
  
    const query=req.body.cityName;
   const apiKey="b0fdbb5164db2ea96c44babc17902879";
   const unit="metric"
   const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey +"&units=" + unit ;

  https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data", function(data){
      const weatherData= JSON.parse(data)
      
      const temp =weatherData.main.feels_like
      console.log(temp);
      

      const weatherDescription=weatherData.weather[0].description
      
      
      res.write("<p>The weather is currently " + weatherDescription +"</p>" );
      res.write("<h1>The temperature in "+ query +" is  "+ temp + " degrees celcius</h1>")
      res.send()
    })
})



})



app.listen(3000,function(){
    console.log("server started");
})
