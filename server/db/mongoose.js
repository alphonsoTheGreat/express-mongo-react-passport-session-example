var mongoose = require('mongoose');

// local mongo uri for connection
var mongoApp = 'mongodb://localhost/rapid';

// get collections models
var AppUsers = require('./models/AppUsers');
var Thumbnail = require('./models/thumbnail')

// connect to the local mongo
const connect = (uri) => {
    mongoose.connect(uri, function (err) {
          if (err) throw err;
          console.log('Successfully connected');
       });
}


// fetch all users
const get_users = () => {
    return new Promise((res,rej)=>{
        AppUsers.find({})
        .exec((err,user)=>{
            if(err)
                rej(err);
            res(user);
        })
    })
}

// find user by id
const get_user_by_id = (id) => {
    return new Promise((res,rej)=>{
        AppUsers.findById(id, (err, user) => {
            if(err)
                rej(err);
            res(user);
        });
    })
}

// fetch a user by his email
const get_user_by_email = (email) => {
    return new Promise((res,rej)=>{
        AppUsers.findOne({userEmail : email})
        .exec((err,user)=>{
            if(err)
                rej(err);
            res(user);
        })
    })
}

// fetch user thumbnail by user id
const get_user_thumbnail = (id) => {
    return new Promise((res,rej)=>{
        Thumbnail.findOne({userId:id})
        .exec((err,thumbnail)=>{
            if(err)
                rej(err);
            res(thumbnail);
        })
    })
}

const set_thumbnailPos_by_id = (newX,newY,id) =>{
    return new Promise((res,rej)=>{
        Thumbnail.findOneAndUpdate({userId:id},{x:newX , y:newY}, {new: true})
        .exec((err,thumbnail)=>{
            if(err)
                rej(err);
            res(thumbnail);
        })
    })
}



connect(mongoApp)

module.exports = {
    get_users,get_user_by_email,
    get_user_thumbnail,
    get_user_by_id,
    set_thumbnailPos_by_id
}

