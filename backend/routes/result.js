const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projet_innovant"
});

/* Get all results */
router.get('/results', function (req, res) {
    try {
        let userId = req.query.userId;
        let keywords;




        // get results of each keyword


        const getResultsQuery = `SELECT keywords.keyword, results.id, results.tweet_content FROM keywords 
                    INNER JOIN keywords_users ON keywords.id = keywords_users.keyword_id
                    RIGHT JOIN results ON keywords.id = results.keyword_id
                    WHERE keywords_users.user_id = ?`;



        con.query(getResultsQuery, userId, (err, result, fields) => {

            res.send({ status: 1, data: result });
        });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
