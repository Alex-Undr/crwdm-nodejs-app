const express = require('express');
const fileUpload = require('express-fileupload');
const sequelize = require('./database');
const serverRoutes = require('./routes/servers');

sequelize.sync()
    .then(() => console.log('db is ready'));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(serverRoutes);

const start = () => {
    try{
        app.listen(PORT, () => console.log(`Crowdin apps listening on ${PORT}!`))
    } catch (e) {
        console.log(e);
    }
}

start();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {
    res.render('login');
});

