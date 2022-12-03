const { request, query } = require('express');
//const e = require('express');
const express = require('express');
const route = express.Router();
const mysqlConnection = require('../Database/connection');

const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
//const session = require('express-session');
const multer = require("multer");
//const Auth = require("../middleware/auth.js");
//const functions = require("../controllers/index");
//images storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./Assests/img") },
    filename: function (req, file, cb) { cb(null, file.originalname) }
})
const upload = multer({ storage: storage });
//for getting data from encrypted sent data
route.use(bodyParser.urlencoded({ extended: false }));
route.use(bodyParser.json());

route.get('/forgot-password', (req, res) => {
	res.render('forgotpass');
})

route.get('/about', (req, res) => {
	res.render('about');
})

route.get('/home', (req, res) => {
	res.render('home');
})

route.get('/dashboard', (req, res) => {
	res.render('dashboard');
})

route.get('/', (req, res) => {
	res.render('home');
})

route.get('/login', (req, res) => {
	res.render('login');
})

route.get('/signup', (req, res) => {
	
    res.render('signup');
})

route.get('/contact', (req, res) => {
	
    res.render('contact_us');
})


route.get('/userview', (req, res) => {
	
	const dataCountQuery = "SELECT COUNT(*) FROM users";
    mysqlConnection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 4;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        // console.log(dataCount, "\n", pageNo, "\n",dataPerPages, "\n",startLimit, "\n",totalPages, "\n");

        const Query = `SELECT * FROM users LIMIT ${startLimit}, ${dataPerPages}`;
        mysqlConnection.query(Query, function (err, result) {
            if (err) throw err;
            // res.send(result);
            res.render("userview",
                {
                    item: result,
                    pages: totalPages,
                    CurrentPage: pageNo,
                    lastPage: totalPages
                }
            );
        })
    });
});

route.post('/', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		mysqlConnection.query('SELECT * FROM easysplit_users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				response.redirect('/dashboard');
			} else {
				response.render('login',{success:false})
			

			}			
			response.end();
		});
	} else {
				response.render('login',{success:false})
		response.end();
	}
});



module.exports = route;
