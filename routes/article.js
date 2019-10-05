const Article = require("../db");

module.exports.index = (req, res, next) => {
    Article.getArticles().then((article) => {
        res.send(article);
    });
}

module.exports.create = (req, res, next) => {
    let data = req.body;
    console.log(data);
    Article.createArticle(data).then((result) => {
        res.send(result);
    })
}

module.exports.show =(req, res, next) => {
    let id = req.params.id;
    console.log(id);
    Article.getArticle(id).then((article) => {
        res.send(article);
    });
}

module.exports.delete = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    Article.deleteArticle(id).then((article) => {
        res.send(article);
    });
}

module.exports.createArticle = (req, res, next) => {
    let url = req.body.url;
    fetchArticle(url).then(res => {
        let { content, title, html } = res;
        return { content, title, html };
    }).then(articles => {
        return Article.createArticle(articles);
    }).then(result => {
        res.send(result);
    })
}

module.exports.showArticle = (req, res, next) => {
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
}

module.exports.collectArticle = (req, res, next) => {
    res.render('collect-article');
}
