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





app.get('/database/data/:data/type/:type', async function (req, res) {
    async function Search () {
        const type = req.param("type")
        const data = req.param("data")
        const test = {}
        test[type] = data
        console.log('test Value: ', JSON.stringify(test))
        console.log(type, data)
      const body = await client.search({
        index: 'csv_india_crops',
        body: {
            size: 100,
            query: {
                match: test
            }
        }
      })
      console.log(body)
     return body.hits.hits
    }
    var SearchResult = await Search()
    res.header("Access-Control-Allow-Origin", "*");
    return res.send(SearchResult)
})