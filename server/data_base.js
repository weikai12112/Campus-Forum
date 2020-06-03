var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true, useUnifiedTopology: true})

var userSchema = new Schema({
    nickname:{
        type:'string',
        required:true
    },
    phone:{
        type: 'number',
        required: true
    },
    password:{
        type:'string',
        required:true
    },
    number:{
        type:'number',
        required:true
    },
    article:{
        type:'object'
    },
    head:{
        type:'string'
    }


})

module.exports = mongoose.model('User',userSchema)