var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/article', {useNewUrlParser: true, useUnifiedTopology: true})

var articleSchema = new Schema({
    number:{
        type:'number'
    },
    content:{
        type:'string',
        required:true
    },
    time:{
        type:'string'
    },
    open:{
        default:0
    },
    url:{
      type:'string'
    },
    time:{
        type:"string"
    }


})

module.exports = mongoose.model('Article',articleSchema)