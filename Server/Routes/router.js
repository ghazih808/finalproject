const { request, query } = require('express');
//const e = require('express');
const express = require('express');
const route = express.Router();
const mysqlConnection = require('../Database/connection');
var nodemailer=require('nodemailer');

const bodyParser = require("body-parser");

const multer = require("multer");
let host_id;
//images storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./Assets/Img") },
    filename: function (req, file, cb) { cb(null, file.originalname) }
})
const upload = multer({ storage: storage });
//for getting data from encrypted sent data
route.use(bodyParser.urlencoded({ extended: false }));
route.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    service: "gmail",
    auth: {
      user: "webkaproject1@gmail.com",
      pass: "nkqopokebwrljmfo",
    },
  });

const forgotpass=(req, res) => {
    const Email = req.body.email;
    const user = {Email:Email};
    //req.session.newUser = user;

    const code = "12asc542@";

    //req.session.code = code;

    let mail = transporter.sendMail({
        from: '"EasySplit" <webkaproject1@gmail>',
        to: `${Email}`,
        subject: "EasySplit SignUp Code",
        text: "Hello world?",
        html: `<h1>Verification Code For EasySplit!</h1>
               <p><b>Your Requested Code is : ${code}</b></p>`
    });
    res.redirect("/codeverify");
}
const codeverification=(req,res)=>
{
    const username = req.body.username;
    const code1 = req.body.code;
    const password = req.body.password;
    const user = {UserName:username,Password:password};
   // req.session.newUser = user;

     const code = "12asc542@";

   // req.session.code = code;
    const Query = `SELECT * from user WHERE username = '${username}'`;
    mysqlConnection.query(Query, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            if (code1!=code){
                res.send('Invalid Verification Code')
            }
        
            else{
                const Query1 = `UPDATE user SET password = '${password}' WHERE username = '${username}'`;
                mysqlConnection.query(Query1, function (err, result) {
                    if (err) throw err;
                    res.redirect("/login");
                })
            }
           
        }
        else{
            res.send('Wrong details')
        }
    })
}

route.get('/forgot-password', (req, res) => {
	res.render('forgotpass');
})
route.get('/feedback', (req, res) => {
	res.render('feedback');
})

route.get('/addexpense', (req, res) => {
	res.render('addexpense');
})
route.get('/addfriend', (req, res) => {
	res.render('addfriend');
})
route.post('/addexpense',(req,res)=>
{
    
    const H_id=req.body.id;
    const Name = req.body.name;
    const amount=req.body.amount;
    const status=req.body.status;

    const Query = `INSERT INTO expense (Host_id,name,amount,status) VALUES ('${H_id}','${Name}','${amount}','${status}')`;
    mysqlConnection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/dashboard");
    })
})
route.post('/addfriend',upload.single("img"),(req,res)=>
{
    
    const H_id=req.body.id;
     const img = req.file.originalname;
     console.log(img);
    const Name = req.body.name;
    const city=req.body.city;
    const Query = `INSERT INTO friend (Host_id,name,city,image) VALUES ('${H_id}','${Name}','${city}','${img}')`;
    mysqlConnection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/dashboard");
    })
})
route.get('/codeverify', (req, res) => {
	res.render('codeverify');
})
route.post("/forgot-password",forgotpass);
route.post("/codeverify",codeverification );


route.get('/about', (req, res) => {
	res.render('about');
})

route.get('/home', (req, res) => {
	res.render('home');
})

route.get('/dashboard', (req, res) => {
    
    let query="select * from expense where Host_id='"+host_id+"';";
    let query2="select * from friend where Host_id='"+host_id+"';";

    mysqlConnection.query(query,(err,result)=>{
        if (err) throw err;
        // res.render('dashboard',{item:result});

   
    mysqlConnection.query(query2,(err,result2)=>{
        console.log(result2);
        if (err) throw err;
        res.render('dashboard',{data:result2,item:result});

    })
})
	// res.render('dashboard');
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



route.post("/signup",upload.single("img"),(req,res)=>{
   

    const pid = req.body.user_id;
    const Name = req.body.username;
    const password = req.body.password;
    const City = req.body.city;
    const img = req.file.originalname;
//console.log(img);
    const Query = `INSERT INTO user  (user_id, username,password,profile,City) VALUES ('${pid}','${Name}','${password}','${img}','${City}' )`;
    mysqlConnection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/userview");
    })
});
route.get('/contact', (req, res) => {
	
    res.render('contact_us');
})




route.get('/userview', (req, res) => {
	
	const dataCountQuery = "SELECT COUNT(*) FROM user";
    mysqlConnection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 4;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        // console.log(dataCount, "\n", pageNo, "\n",dataPerPages, "\n",startLimit, "\n",totalPages, "\n");

        const Query = `SELECT * FROM user LIMIT ${startLimit}, ${dataPerPages}`;
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
		mysqlConnection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
                host_id=results[0].user_id;
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
