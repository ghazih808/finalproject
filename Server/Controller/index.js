/*const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
//const cookieParser = require("cookie-parser");
//const session = require('express-session');
//const Auth = require("../middleware/auth.js");
//const pdf = require("html-pdf");
//const fs = require("fs");
//const options = { format: "A4" };
//const nodemailer = require("nodemailer");
//const path = require("path");


//user view
const userview= (req, res) => {
    const dataCountQuery = "SELECT COUNT(*) FROM users";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 3;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        // console.log(dataCount, "\n", pageNo, "\n",dataPerPages, "\n",startLimit, "\n",totalPages, "\n");

        const Query = `SELECT * FROM users LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            // res.send(result);
            res.render("userview",
                {
                    data: result,
                    pages: totalPages,
                    CurrentPage: pageNo,
                    lastPage: totalPages
                }
            );
        })
    });
}
*/