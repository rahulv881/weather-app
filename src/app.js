const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const pathToPublicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//console.log(pathToPublicDirectory);
//console.log(__filename);

// Setup handlers engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(pathToPublicDirectory));


console.log(pathToPublicDirectory);

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Rahul'
    });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Rahul",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpText",
  });
});

app.get('/weather',(req,res)=>{ 

    address = req.query.address;
    if(!address){
        return res.send({
            error: "Please provide the address parameter in the query"
        })
    }

    geocode(address, (error, { longitude, latitude, location } ={}) => {
      if (error) {
        return res.send({
            error
        });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
              error
            });
        }

        res.send({
           forecast: forecastData,
           location: location,
           address: req.query.address,
        });

        //console.log(location);
        //console.log(forecastData);
        });
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search)
        return res.send({
            error: "You must provide a search term"
        });
    res.send({
        products:[]
    });
});

app.get("/help/*", (req, res) => {
  res.render("404",{
      title: '404',
      err: 'Help article not found',
      name: 'Rahul'
  });
});

app.get("*", (req, res) => {
    res.render("404",{
        title:'404',
        err: 'Page not found',
        name: 'Rahul'
    });
});

app.listen(port,()=>{
    console.log("Server starting on port: 3000");
});

