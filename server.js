const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const SQL = require('./sql');

app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

let connectOptions = [
    'localhost',
    'root',
    'doggy101',
    'test_schema'
]

let sql = new SQL(...connectOptions);

app.get('/', (req,res,next) => {
    res.render('index')
})

app.post('/insert', async (req, res, next) => {
    let name = req.body.name;
    let email = req.body.email;
    let telephone = req.body.phoneNumber;
    let password = req.body.password;

    let result = await sql.insert(name, email, telephone, password);

    res.render('index');
});

app.post('/', async (req, res, next) => {
    let email = req.body.email;

    let result = await sql.fetch(email);
    console.log(result);

    res.render('index', {
        name: result.name,
        email: result.email,
        phoneNo: result.phoneNo
    });
})

app.listen(1337, () => {
    console.log("listening on port 1337")
})