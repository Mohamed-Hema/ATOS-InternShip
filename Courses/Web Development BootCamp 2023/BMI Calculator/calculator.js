//Global Variables
const express = require('express');
const bodyParser = require("body-parser");
const { dirname, parse } = require('path');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));


// Start Normal Calculator
//Create a root route get method with app.get()
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){

    //convert text to number with "+" or Number(String)
    var num1 = +req.body.num1;
    var num2 = +req.body.num2;

    var result = num1 + num2;

    res.send("The result of the calculation is "+ result);
})

// Start BMI Calculator

app.get("/bmiCalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/bmiCalculator", function(req, res){
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);

  var bmi = weight / Math.pow(height, 2);

  res.send("Your BMI is "+ bmi);

})

//Spin up our server on port 3000 with app.listen
  app.listen(port, () => {
    console.log(`\Server is running on server ${port}`)
  })

