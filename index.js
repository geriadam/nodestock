const express = require('express')
const app     = express()
const path    = require('path')
const exphbs  = require('express-handlebars')
const port    = 5000
const request = require('request')
const bodyParser = require('body-parser')

// Secret
// sk_eba0556b6c2a4ba9a819f9deb709b07c
// pk_91f33c5fca1b4d40992546cdabccd0ae

app.use(bodyParser.urlencoded({extended: false}));

function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_91f33c5fca1b4d40992546cdabccd0ae', { json: true }, (err, res, body) => {
        if(err) return console.log(err)
        if(res.statusCode === 200){
            finishedAPI(body);
        }
    });
};

// Set handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home', {
            stocks: doneAPI,
        });
    }, "fb");
});

// Index POST
app.post('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home', {
            stocks: doneAPI,
        });
    }, req.body.stock_ticker);
});

// About
app.get('/about', function (req, res) {
    res.render('about', {
        foo: "Ini Adalah Footer",
    });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
