const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: true });

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projet_innovant"
});

/* Store keywords */
router.post('/store_keywords', urlencodedParser, function (req, res) {
    try {

        let keyword = req.query.keyword;
        let tweets = req.body;

        // insert in db
        //check if keyword exists in db
        const checkKeyword = `SELECT * FROM keywords WHERE keyword = ?`;
        con.query(checkKeyword, keyword, (err, result, fields) => {

            if (!result.length) {
                const insertKeyword = `INSERT INTO keywords (keyword) VALUES ( ? )`;
                con.query(
                    insertKeyword, keyword, (err, result, fields) => {
                        if (err) {
                            res.send({ status: 0, data: err });
                        } else {

                            // Get keyword id
                            let keywordId;
                            const keywordIdQuery = `SELECT * FROM keywords WHERE keyword = ?`;
                            con.query(keywordIdQuery, keyword, (err, result, fields) => {
                                keywordId = result[0].id;

                                // Store tweets in database
                                tweets.forEach(tweet => {
                                    const insertTweets = `INSERT INTO results (ref_id, tweet_content, author_username, creation_date, keyword_id) VALUES (?, ?, ?, ?, ?)`;
                                    con.query(insertTweets, [tweet.id, tweet.text, tweet.user.name, tweet.user.created_at, keywordId]);

                                });
                            });
                            res.send({ status: 1, data: result });
                        }

                    });
            } else {
                // If keyword already exists in datbase
                console.log('keyword already exists');

                // Get keyword id
                let keywordId;
                const keywordIdQuery = `SELECT * FROM keywords WHERE keyword = ?`;
                con.query(keywordIdQuery, keyword, (err, result, fields) => {
                    console.log('id keyword : ', result[0].id);
                    keywordId = result[0].id;

                    // Store tweets in database
                    tweets.forEach(tweet => {
                        const insertTweets = `INSERT INTO results (ref_id, tweet_content, author_username, creation_date, keyword_id) VALUES (?, ?, ?, ?, ?)`;
                        con.query(insertTweets, [tweet.id, tweet.text, tweet.user.name, tweet.user.created_at, keywordId]);

                    });
                });

                res.send({ status: 1, data: result });
            }
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
