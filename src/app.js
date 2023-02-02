const express = require('express');
require('./db/conn');
const path = require('path');
const hbs = require('hbs');
const User = require('./models/usermessage');


const app = express();
const port = process.env.PORT || 7130

// Setting path
const staticPath = path.join(__dirname, '../public');
const bootstrapPath = path.join(__dirname, '../node_modules/bootstrap/dist/css');
const jsPath = path.join(__dirname, '../node_modules/bootstrap/dist/js');
const jqueryPath = path.join(__dirname, '../node_modules/jquery/dist');
const templatePath = path.join(__dirname, '../Templates/views');
const partialsPath = path.join(__dirname, '../Templates/partials');


// Middleware
app.use(express.urlencoded({extended: false}));
app.use('/jq',express.static(jqueryPath));
app.use('/css',express.static(bootstrapPath));
app.use('/js',express.static(jsPath));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath)


// Routing

app.get('/',(req, res)=>{
    res.render("index");
})
app.post('/contact', async (req, res)=>{
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(500).send(error);
    }
})

// Server connection

app.listen(port,()=>{
    console.log(`Lsitening on ${port}`);
});