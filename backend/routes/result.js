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

        // get results of each keyword

        const getResultsQuery = `SELECT keywords.keyword, keywords.search_date, results.keyword_id, results.id, results.tweet_content FROM keywords 
                    INNER JOIN keywords_users ON keywords.id = keywords_users.keyword_id
                    INNER JOIN results ON keywords.id = results.keyword_id
                    WHERE keywords_users.user_id = ?`;

        con.query(getResultsQuery, userId, (err, result, fields) => {

            res.send({ status: 1, data: result });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * Get results by keyword
 */
router.get("/resultsByKeyword", (req, res) => {
    try {
        let keywordId = req.query.keywordId;
        const getResultByKeywordQuery = `SELECT * FROM results WHERE keyword_id = ?`;

        con.query(getResultByKeywordQuery, keywordId, (err, result, fields) => {
            res.send({ status: 1, data: result });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
