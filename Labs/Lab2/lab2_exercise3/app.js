/**
 * Created by swa151 on 26/07/17.
 */

const express = require('express');
const app = express();

const data = require('./users.json');
const users = data.users;
// console.log(users[0]);

app.get('/users', function(req, res){
    res.send(users);
});

app.get('/users/:id', function(req, res){
    let id = req.params.id;
    let res_data = "No user";

    for(let user of users){
        if(id == user.id){
            res_data = user;
            break;
        }
    }
    res.send(res_data);
});

var bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/users', urlencodedParser, function(req, res){
    let user_data = req.body;

    users.push(user_data);
    res.send(users);
});

app.put('/users/:id', urlencodedParser, function(req, res){
    let id = req.params.id;
    let user_data = req.body;

    for(let user of users){
        if(id == user.id){
            let uid = users.indexOf(user);
            users[uid] = user_data;
            break;
        }
    }

    res.send(user_data);
});

app.delete('/users/:id', function(req, res){
    let id = req.params.id;

    for(let user of users){
        if(id == user.id){
            var uid = users.indexOf(user);
            delete users[uid];
        }
    }

    res.send(users);
});

app.listen(3000, function(){
    console.log("Example app listening on port 3000!");
});

