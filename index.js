const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json')
console.log(redditData)

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.get('/', (req, res) =>{
    res.render('home.ejs')
})


app.get('/r/:subreddit', (req, res)=>{
    const { subreddit } = req.params;
    const data = redditData[subreddit]
    if(data){
        res.render('subreddit.ejs', {...data});
    }
    else{
        res.render('unknown.ejs', {subreddit})
    }
})
app.get('/rand', (req, res) => {
    const randNum = Math.floor(Math.random() * 10) + 1;
    res.render('random.ejs', {num: randNum})
})
app.listen(3000, () => {
    console.log("Listening on port: 3000")
})