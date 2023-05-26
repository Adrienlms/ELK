const express = require('express');
const app = express();
const port = 8080;

const { Client } = require('@elastic/elasticsearch')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const client = new Client({ 
    node : "https://localhost:9200",
    auth : {
        username: "elastic",
        password : "e5pzFIlcFKY_fT0VkqEc"
    }
})


app.get('/', (req, res) => {
  res.send('Hello World!dfsf')
});

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`)
});





app.get('/database/:data/pagination/:pagination', async function (req, res) {
    async function Search () {
        const pagination = req.param("pagination")
        const body = await client.search({
            index: 'csv_india_crops',
            body: {
                from: pagination,
                size: 50,
                query: {
                    query_string : {
                        query : "*" + req.param("data") +"*",
                        fields : ["Crop", "District", "Season", "State"]
                    }
                }
            }
        })
     return body.hits.hits
    }
    var SearchResult = await Search()
    res.header("Access-Control-Allow-Origin", "*");
    return res.send(SearchResult)
})
            


app.get('/database/:data/', async function (req, res) {
    async function Search () {
        const pagination = req.param("pagination")
        const body = await client.search({
            index: 'csv_india_crops',
            body: {
                from: pagination,
                size: 10000,
                _source: ["Yield", "Year"],
                query: {
                    query_string : {
                        query : "*" + req.param("data") +"*",
                        fields : ["Crop", "District", "Season", "State"]
                    }
                }
            }
      })
     return body.hits.hits
    }
    var SearchResult = await Search()
    res.header("Access-Control-Allow-Origin", "*");
    return res.send(SearchResult)
})