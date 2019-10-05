const MongoClient = require('mongodb');
const assert = require('assert');



const url = 'mongodb://47.100.53.48:6666';
const dbName = 'blog';

function Db() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            resolve(db);
        })
    })
}



class Article {
    static getArticles() {
        return new Promise((resolve, reject) => {
            Db().then(function (db) {
                db.collection("articles").find({}, { '_id': 0 }).toArray((err, articles) => {
                    if(err){
                        reject(err);
                    }
                    resolve(articles);
                })
            })
        })
    }

    static getArticle(id){
        let _id = MongoClient.ObjectID(id)
        return new Promise((resolve, reject) => {
            Db().then(function (db) {
                db.collection("articles").findOne({_id}, { '_id': 0 },((err, articles) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(articles);
                }))
            })
        })
    }

    static createArticle(data){
        return new Promise((resolve, reject) => {
            Db().then((db) => {
                db.collection('articles').insertOne(data, (err, result) => {
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                })
            })
        })
    }

    static deleteArticle(id){
        let _id = MongoClient.ObjectID(id);
        return new Promise((resolve, reject) => {
            Db().then(db => {
                db.collection('articles').deleteOne({_id}, (err, result) => {
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                })
            })
        });
    }
}


module.exports = Article
