const express = require('express');
const socketio = require('socket.io');
const cryptoRandomString = require('crypto-random-string')

const app = express()
app.use(express.static('build'));

const port = 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

const io = socketio(server);

const swear = require('swearjar');

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./store.db', (err) =>{
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to database')
});


let userId = "words"


io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    console.log("token is " + token)
    userId = token
    next();
})

let alldata = 'SELECT userId Id, username name, exp num FROM slotdata';
let updateexp = 'UPDATE slotdata SET exp = ? WHERE userId = ?';

io.on('connection', (socket) => {

    if( userId == "noId" ){
        socket.emit("setId",)
    }
    else{
        console.log("user recognised")
        socket.emit('user recognised')
        
    }

    db.all(alldata, [], (err,rows)=>{
        if(err){
            throw err;
        }
        socket.emit('alldata', rows)
    });

    socket.on("usernamein", (uname)=>{
    if(swear.profane(uname)){
        socket.emit('badname')
    }
    else{
    db.serialize(() => {  
        let sqlusernames = `SELECT username name FROM slotdata`;
        let notfound = true
        db.all(sqlusernames, [], (err, rows) => {
          if (err) {
          throw err;
            }
        rows.forEach((row) =>{
            if (uname == row.name){
                console.log('match found')
                socket.emit('nametaken')
                notfound = false
                }
            });
        
        if(notfound == true){
            let Id = cryptoRandomString(16)
            socket.emit('namevalid',(Id))
            console.log(Id)
            db.run('INSERT INTO slotdata(userId,username,exp) VALUES(?,?,?)',[Id,uname,'0'], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log(`A row has been inserted with rowid ${this.lastID}`)
                })
            };
        });
        });}
    });

    socket.on('clientping',(exp, ID)=>{
        if(Number.isInteger(exp)){
            db.run(updateexp,[exp,ID],function(err) {
                if (err) {
                return console.error(err.message);
            }});
        }

    });

    socket.on('newuser',(newusername)=>{
        socket.broadcast.emit('newuserout',(newusername))
    });

});


let daynow = Date.now()
let day = Math.round((daynow - 1637211201491) / (1000 * 60 * 60 * 24));

let pingdata = 'SELECT username name, exp num FROM slotdata'

let leaderdata = 'SELECT username name, exp num FROM slotdata WHERE exp <= ? ORDER BY exp DESC LIMIT 5';

const ping =  setInterval((ping) =>{
    db.all(pingdata, [], (err,rows)=>{
        if(err){
            throw err;
        }
        io.emit('ping', rows)
    })
    db.all(leaderdata,[day*201600],(err, rows) => {
        if (err) {
          throw err;
        }
        io.emit('leaderout',(rows))
      });
}, 1000/10);



