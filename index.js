// Dependencies 
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

// Start an inctance of express
const PORT = 8000
const app = express()

// Initialize array that will contain the data from the response
const articles = []

// Initialize json response
app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API!')
})

app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err) => {console.error(err)})
})

// Define port to listen on
app.listen(PORT, () => console.log('Server is running on port ' + PORT))