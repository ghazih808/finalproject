exports.getHomeView=(req, res) => {
    console.log("from controller")
	res.render('../Views/home');
}
exports.getfeedbackview=(req, res) => {
	res.render('../Views/feedback');
}
exports.postfeedfunk=(req,res)=>
{
    console("feedback posting")
    const H_id=host_id;
    const Name = host_name;
    rating=2;
    console.log(rating);
    // const rating;
    const feedbacks=req.body.comment;
    const Query = `INSERT INTO feedback (Host_id,name,rating,feedback) VALUES ('${H_id}','${Name}','${rating}','${feedbacks}')`;
    console.log('Query');
    mysqlConnection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/dashboard");
    })
}