/**
 * Created by swa151 on 26/07/17.
 */

const express = require('express');
const app = express();

const data = require('./users.json');
const users = data.users;
console.log(users[0]);

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

app.post('/', function(req, res){
    res.send('HTTP request: POST /');
});

app.put('/', function(req, res){
    res.send('HTTP request: PUT /');
});

app.delete('/', function(req, res){
    res.send('HTTP request: DELETE /');
});

app.listen(3000, function(){
    console.log("Example app listening on port 3000!");
});

[
    {
        "users": [
            {
                "id": "1001",
                "age": 35,
                "first_name": "Burch",
                "last_name": "George",
                "gender": "male",
                "email": "burchgeorge@geofarm.com"
            },
            {
                "id": "1002",
                "age": 31,
                "first_name": "Rachelle",
                "last_name": "Chang",
                "gender": "female",
                "email": "rachellechang@geofarm.com"
            },
            {
                "id": "1003",
                "age": 38,
                "first_name": "Sheri",
                "last_name": "Bennett",
                "gender": "female",
                "email": "sheribennett@geofarm.com"
            },
            {
                "id": "1004",
                "age": 32,
                "first_name": "Fisher",
                "last_name": "Dillard",
                "gender": "male",
                "email": "fisherdillard@geofarm.com"
            },
            {
                "id": "1005",
                "age": 20,
                "first_name": "Pope",
                "last_name": "Bailey",
                "gender": "male",
                "email": "popebailey@geofarm.com"
            }
        ]
    }
]