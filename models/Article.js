const mongoose = require('mongoose')
 
const ArticleScheme = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  url: {type: String},
  comments: {type:Array, date:Date}
});

const Article = mongoose.model('Article',ArticleScheme)
module.exports = Article;