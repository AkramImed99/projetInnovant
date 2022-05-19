
const needle = require('needle');
const express = require('express')
require('dotenv').config()

const token = process.env.TOKEN;

const endpointURL = "https://api.twitter.com/2/tweets?ids=";

async function getRequest() {

    // These are the parameters for the API request
    // specify Tweet IDs to fetch, and any additional fields that are required
    // by default, only the Tweet ID and text are returned
    const params = {
        "ids": "1278747501642657792,1255542774432063488", // Edit Tweet IDs to look up
        "tweet.fields": "lang,author_id", // Edit optional query parameters here
        "user.fields": "created_at" // Edit optional query parameters here
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
        // Make request
        const response = await getRequest();
        res.json(response)

    } catch (e) {
        console.log(e);

        res.send("Hello")
    }


})

app.listen(3000, () => {
    console.log("Hello");
})