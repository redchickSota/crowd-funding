/**
 * Created by swa151 on 6/08/17.
 * 06/08 (sun)
 * Have finished Conversations GET, POST, and DELETE
 * still left Conversations POST, Messages GET, GET, and POST
 */

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 100,
    hots: 'localhost',
    user: 'seng365',
    password: 'secret',
    port: 6033,
    database: 'lab3'
});

function get_users(req, res){
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from Users", function(err, rows){
            connection.release();
            if(!err){
                res.json(rows);
            }
        });

        connection.on('error', function(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        });
    });
}

app.get('/users', function(req, res){
    get_users(req, res);
});

function get_user(req, res){
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        let id = req.params.id;

        connection.query("select * from Users WHERE user_id=" + id, function(err, rows){
            connection.release();
            if(!err){
                res.json(rows);
            }
        });

        connection.on('error', function(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        });
    });
}

app.get('/users/:id', function(req, res){
    get_user(req, res);
});

function post_user(req, res, user_data){
    pool.getConnection(function(err, connection){
        if(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        }
        console.log('connected as id ' + connection.threadId);

        let user = user_data['username'].toString();
        const sql = "INSERT INTO Users (username) VALUES ?";

        console.log(user);

        let values = [
            [user]
        ];

        connection.query(sql, [values], function(err, result){
            connection.release();
            if (!err) {
                res.json({"SUCCESS": "successfully inserted user"});
            } else {
                console.log(err);
                res.json({"ERROR":"Error inserting user"});
            }
        });

        connection.on('error', function(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        });
    });
}

app.post('/users', function(req, res){
    let user_data = {
        "username": req.body.username
    };

    post_user(req, res, user_data);
});

function get_conversations(req, res){
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from Conversations", function(err, rows){
            connection.release();
            if(!err){
                res.json(rows);
            }
        });

        connection.on('error', function(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        });
    });
}

app.get('/conversations', function(req, res){
    get_conversations(req, res);
});

function get_conversation(req, res){
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        let id = req.params.id;

        connection.query("select * from Conversations WHERE convo_id=" + id, function(err, rows){
            connection.release();
            if(!err){
                res.json(rows);
            }
        });

        connection.on('error', function(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        });
    });
}

app.get('/conversations/:id', function(req, res){
    get_conversation(req, res);
});

function post_conversation(req, res, convo_data){
    pool.getConnection(function(err, connection){
        if(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        }
        console.log('connected as id ' + connection.threadId);

        let convo = convo_data['convo_name'].toString();
        const sql = "INSERT INTO Conversations (convo_name) VALUES ?";

        console.log(convo);

        let values = [
            [convo]
        ];

        connection.query(sql, [values], function(err, result){
            connection.release();
            if (!err) {
                res.json({"SUCCESS": "successfully inserted Conversation"});
            } else {
                console.log(err);
                res.json({"ERROR":"Error inserting Conversation"});
            }
        });

        connection.on('error', function(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        });
    });
}

app.post('/conversations', function(req, res){
    let convo_data = {
        "convo_name": req.body.convo_name
    };

    post_conversation(req, res, convo_data);
});

function delete_conversation(req, res){
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        let id = req.params.id;

        connection.query("DELETE FROM Conversations WHERE convo_id=" + id, function(err, rows){
            connection.release();
            if (!err) {
                res.json({"SUCCESS": "successfully deleted conversations"});
            } else {
                console.log(err);
                res.json({"ERROR":"Error deleting conversations"});
            }
        });

        connection.on('error', function(err){
            res.json({"ERROR" : "Error in connection database"});
            return;
        });
    });
}

app.delete('/conversations/:id', function(req, res){
    delete_conversation(req, res);
});

app.listen(3000, function (){
    console.log('Example app listening on port: ' + 3000);
});