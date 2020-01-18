const express = require('express')
const mongoose = require('mongoose');
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const exphbs  = require('express-handlebars');

const PORT = 3000
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/cryptoNewsScraper', {useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', function(req,res){
  db.Article.find({}).then(function(results){
    console.log({articles:results})
    res.render('index',{articles: results})
  })
})

app.post('/api/comment',function(req,res){
  console.log('textbox: ' + req.body.comment)
})

app.get("/scrape",function(req,res){
  axios.get('https://www.coindesk.com/').then(function(response){
    const $ = cheerio.load(response.data)

    //scrapes a title with a description and a link to the news article
    $('.text-content').each(function(i,element){
        let result = {}
        result.title = $(this).find('.heading').text()
        result.description = $(this).find('.card-text').text()
        result.url = 'https://www.coindesk.com' + $(this).children('a').next().attr('href')
        // resultsArray.push(result)
        db.Article.create(result)
      })
  })
})


app.use(express.static("public"));

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });