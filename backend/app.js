const mysql = require('mysql');
const needle = require('needle');
const express = require('express');
const indexRouter = require('./routes/index');
const cors = require('cors');

require('dotenv').config()


const app = express()


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projet_innovant'
})

const token = process.env.TOKEN;

// Endpoint to get tweets by keywords
const endpointURL = "https://api.twitter.com/1.1/search/tweets.json?q=";

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use('/', indexRouter);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    if (req.method == "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});


async function getRequest(queryP) {

    const params = {
        "expansions": "author_id",
        "tweet.fields": "lang,author_id,public_metrics", // Edit optional query parameters here
        "user.fields": "name,entities,username,created_at,profile_image_url", // Edit optional query parameters here
        // "entities.field": "hashtags"

        "q": `${queryP}`, // keywords
        "count": "100"

    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}


app.get('/', async (req, res) => {
    try {

        let queryParam = req.query.q
        const response = await getRequest(queryParam);
        res.json(response)

    } catch (e) {
        console.log(e);
        res.send("Catch block")
    }
})




app.listen(3000, () => {
    console.log("Hello");
})