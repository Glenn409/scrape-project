const express = require('express')
const mongoose = require('mongoose');
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const exphbs  = require('express-handlebars');

const PORT = 3000
const db = require("./models");

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/cryptoNewsScraper', {useNewUrlParser: true, useUnifiedTopology: true });


// axios.get('https://www.coindesk.com/').then(function(response){
//     const $ = cheerio.load(response.data)

//     //scrapes a title with a description and a link to the news article
//     $('.text-content').each(function(i,element){
//         let result = {}
//         result.title = $(this).find('.heading').text()
//         result.description = $(this).find('.card-text').text()
//         result.url = 'https://www.coindesk.com' + $(this).children('a').next().attr('href')
//         db.Article.insert({result})
//     })
// })

app.get('/', function(req,res){
  db.Article.find({}).then(function(results){
    console.log({articles:results})
    res.render('index',{articles: results})
  })

})

app.get("/scrape",function(req,res){
  db.Article.create(
    {title:'name',
    description:'aosdifnoadifadoif',
    url:'aoiwnefoawfnoaewufnew'})

  .then(function(result){
    console.log('created\n' + result)
    res.redirect("/")
  })
})


app.use(express.static("public"));

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });