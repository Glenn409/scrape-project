const mongoose = require('mongoose')
 
const ArticleScheme = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  url: {type: String}
});

const Article = mongoose.model('Article',ArticleScheme)
module.exports = Article;