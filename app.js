var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    /* Componentes Adicionais */
    load = require('express-load'),
    mongoose = require('mongoose'),
    flash = require('express-flash'),
    moment = require('moment'),
    expressValidator = require('express-validator');

/*Conexão com o MongoDB
  mongodb://localhost/tegra
  mongodb://ds111851.mlab.com:11851/tegra
*/
mongoose.connect('mongodb://tegra:16marioe@ds111851.mlab.com:11851/tegra', function(err) {
    if (err) {
        console.log("Erro ao conectar o Banco de Dados: " + err);
    } else {
        console.log("Conexão realizada com sucesso!!!");
    }
});

var app = express();

//middleware
var erros = require('./middleware/erros');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: 'tegrainfo951753'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(bodyParser.urlencoded({extended:true}));

//helpers
app.use(function(req, res, next) {
    res.locals.session = req.session.usuario;
    res.locals.isLogged = req.session.usuario ? true : false;
    res.locals.moment = moment;
    next();
});

load('models').then('controllers').then('routes').into(app);

app.use(bodyParser.json());

//middleware
//app.use(erros.notfound);
//app.use(erros.serverError);

app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});
