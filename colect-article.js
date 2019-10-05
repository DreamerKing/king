const read = require('node-readability');
// let url = 'https://www.jianshu.com/p/50341c4f3519';

function fetchArticle(url){
    return new Promise((resolve, reject) => {
        read(url, (err, result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports = fetchArticle;
