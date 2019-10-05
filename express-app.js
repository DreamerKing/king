const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const path = require('path');

const Article = require("./db");
const fetchArticle = require("./colect-article");
const register = require("./routes/register");
const entries = require("./routes/entries");
const validate = require("./middleware/validate");
const art = require("./routes/article");

app.use(logger('dev'))
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('html', require('ejs').__express);
app.set('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.locals.testAppLocal = "App local";
app.use(express.static('public', {extensions: ['css','js']}));
app.use(
    '/css/bootstrap.css', 
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);
app.use(
    '/js/jquery.min.js',
    express.static('node_modules/jquery/dist/jquery.min.js')
);

app.use(
    '/js/bootstrap.js',
    express.static('node_modules/bootstrap/dist/js/bootstrap.js')
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/article', art.index);
app.post('/api/article', art.create);
app.get('/api/article/:id', art.show);
app.delete('/api/article/:id', art.delete);



/* 

app.get('/article', (req, res, next) => {
    Article.getArticles().then((article) => {
        res.send(article);
    });
});

app.post("/article", (req, res, next) => {
    let data = req.body;
    console.log(data);
    Article.createArticle(data).then((result) => {
        res.send(result);
    })
});

app.get("/article/:id", (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    Article.getArticle(id).then((article) => {
        res.send(article);
    });
});

app.delete("/article/:id", (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    Article.deleteArticle(id).then((article) => {
        res.send(article);
    });
}); */

app.post('/article', art.createArticle);
app.get('/article', art.showArticle);
app.get('/collect-article', art.collectArticle);
/* app.post('/articles', (req, res, next) => {
    let url = req.body.url;
    fetchArticle(url).then(res => {
        let { content, title, html } = res;
        return { content, title, html };
    }).then( articles => {
        return Article.createArticle(articles);
    }).then(result => {
        res.send(result);
    })
})

app.get('/collect-article', (req, res, next) => {
    res.render('collect-article');
});

app.get('/articles', (req, res, next) => {
    Article.getArticles().then((articles) => {
        res.format({
            html: () => {
                res.render('articles', { articles, test: "success" }, (err, html) => {
                    res.send(html);
                });
            },
            json: () => {
                res.send(articles);
            }
        })
       
    });
}); */

app.get('/local', (req, res, next) => {
    res.locals.testResLocal = "response local";
    res.render('local');
});

app.get('/register', register.form);
app.post('/register', register.submit);

app.get('/', entries.list);
app.get('/post', entries.form);
app.post('/post', validate.required('entry[title]'), validate.lengthAbove('entry[title]', 4), entries.submit);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`); 
});
