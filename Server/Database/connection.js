const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host: 'containers-us-west-95.railway.app',
    user: 'root',
    password: 'ZXWC4DnYMUKWVJG0lZDx',
    database: 'railway',
    port:'7853'

});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});


module.exports = mysqlConnection