const server = require('server');
const { get, post } = server.router;
const { send } = require('server/reply');
const PORT = 8888;
const Article = require('./db.js');


server({ port: PORT},[
    get('/',  ctx => {
       Article.getArticles().then(articles => {
           console.log(articles);
            console.log(ctx.res);
            ctx.res.send(articles);
           
       });
    }),
    post('/', ctx => {
        console.log(ctx);
        return 'ok';
    })
]);

