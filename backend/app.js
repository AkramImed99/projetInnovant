
const needle = require('needle');
const express = require('express')
require('dotenv').config()

const token = process.env.TOKEN;

// Endpoint to get tweets by keywords
const endpointURL = "https://api.twitter.com/1.1/search/tweets.json?q=";

// Full archive search 
//const endpointURL = "https://api.twitter.com/2/tweets/search/all";

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

const app = express()


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