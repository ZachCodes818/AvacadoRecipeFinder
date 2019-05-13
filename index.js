const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
var path = require('path');
var axios = require('axios');
var ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/search', (req, res) => {
    var apiUrl = `https://api.edamam.com/search?q=avocado+${req.query.foodType}&app_id=5a6621e2&app_key=a1dab622263e25d6b66bb8b4b18e852f&from=0&to=6`
    axios.get(apiUrl)
        .then(function (response) {
            console.log(response.data.hits[0].recipe)
            // var html = ejs.render('<%= recipes.join(", "); %>', {recipes: response.data})
            res.render('pages/results', {
                recipes: response.data.hits,
                searchTerm: req.query.foodType
            });
            res.send(response.data.hits[0].recipe);
        })
        .catch(function (error) {
            res.send(req.query)
        });

})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))

