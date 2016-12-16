const PORT        = 3000;
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');


app.set('view engine', 'ejs');
// app.set('views', 'public/views');


// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
 res.render('index');
});


app.listen(PORT, () => {
 console.log('App Listening on Port ', PORT);
});




