const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./store.db', (err) =>{
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to database')
});

db.run('DELETE FROM slotdata', function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
});