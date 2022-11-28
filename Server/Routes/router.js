const { request, query } = require('express');
//const e = require('express');
const express = require('express');
const route = express.Router();
const mysqlConnection = require('../Database/connection');



route.get('/', (req, res) => {
    res.render('login',{msg:""});
})
route.get('/abc', (req, res) => {
	
    res.render('abc');
})

// http://localhost:3000/
route.post('/', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		mysqlConnection.query('SELECT * FROM user2 WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				response.redirect('/abc');
			} else {
				response.render('login',{msg:"Incorrect Username and/or Password!",success:false})
				// response.redirect('/');

				// response.send('Incorrect Username and/or Password!');

			}			
			response.end();
		});
	} else {
				response.render('login',{msg:'Please enter Username and Password!',success:false})
		response.end();
	}
});


module.exports = route;
