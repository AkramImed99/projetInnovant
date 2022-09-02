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
        let userId = req.query.userId;
        let keyword = req.query.keyword;
        let tweets = req.body;
        let search_date = new Date().toLocaleDateString();
        console.log(search_date);

        console.log(req.query);

        // insert in db
        //check if keyword exists in db
        const checkKeyword = `SELECT * FROM keywords WHERE keyword = ?`;
        con.query(checkKeyword, keyword, (err, result, fields) => {

            // Check if keyword exists
            if (!result.length) {
                const insertKeyword = `INSERT INTO keywords (keyword) VALUES ( ? )`;
                con.query(
                    insertKeyword, [keyword], (err, result, fields) => {
                        if (err) {
                            res.send({ status: 0, data: err });
                        } else {

                            // Get keyword id
                            let keywordId;
                            const keywordIdQuery = `SELECT * FROM keywords WHERE keyword = ?`;
                            con.query(keywordIdQuery, keyword, (err, result, fields) => {
                                keywordId = result[0].id;

                                // Store keyword id and user id in intermediate table (keywords_users)
                                const storeUserKeywordIds = `INSERT INTO keywords_users (keyword_id, user_id) VALUES (?, ?)`;
                                con.query(storeUserKeywordIds, [keywordId, userId]);

                                // Store tweets in database
                                tweets.forEach(tweet => {
                                    const insertTweets = `INSERT INTO results (ref_id, tweet_content, author_username, creation_date, keyword_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
                                    con.query(insertTweets, [tweet.id, tweet.text, tweet.user.name, tweet.user.created_at, keywordId, userId]);

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
                    keywordId = result[0].id;

                    // Store keyword id and user id in intermediate table (keywords_users)
                    const storeUserKeywordIds = `INSERT INTO keywords_users (keyword_id, user_id) VALUES (?, ?)`;
                    con.query(storeUserKeywordIds, [keywordId, userId]);

                    // Store tweets in database
                    tweets.forEach(tweet => {
                        const insertTweets = `INSERT INTO results (ref_id, tweet_content, author_username, creation_date, keyword_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
                        con.query(insertTweets, [tweet.id, tweet.text, tweet.user.name, tweet.user.created_at, keywordId, userId]);

                    });
                });

                res.send({ status: 1, data: result });
            }
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/delete_keyword", (req, res) => {
    try {
        let keywordId = req.query.keywordId;
        console.log(keywordId);

        const deleteKeywordQuery = `DELETE FROM keywords WHERE keywords.id = ?`;

        con.query(deleteKeywordQuery, keywordId, (err, result, fields) => {

            /*  const deleteResultsQuery = `DELETE FROM results WHERE keyword_id = ?`
              con.query(deleteResultsQuery, keywordId, (err, result, fields) => {
                  console.log('delete results', result);
              });*/

            res.send({ status: 1, data: result });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
