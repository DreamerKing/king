const redis = require('redis');
const bcrypt = require('bcrypt');
const rdb = redis.createClient(6379, "47.100.53.48");

class User {
    constructor(config) {
        for (const key in config) {
           this[key] = config[key];
        }
    }

    static getByName(name, cb) {
        User.getId(name, (err, id) => {
            if(err) return cb(err);
            User.get(id, cb);
        });
    }

    static getId(name, cb) {
        rdb.get(`user:id:${name}`, cb);
    }

    static get(id, cb){
        rdb.hgetall(`user:${id}`, (err, user) => {
            if(err) return cb(err);
            cb(null, new User(user));
        });
    }

    static authenticate(name, pass, cb){
        User.getByName(name, (err, user) => {
            if(err) return cb(err);
            if(!user.id) return cb();
            bcrypt.hash(pass, user.salt, (err, hash) => {
                if(err) return cb(err);
                if(hash === user.hash) {
                    return cb(null, user);
                }else {
                    cb();
                }
            });
        });
    }

    save(cb){
        if(this.id){
            this.update(cb);
        } else {
            rdb.incr('user:ids', (err, id) => {
                if(err) return cb(err);
                this.id = id;
                this.hashPassword((err) => {
                    if(err) return cb(err);
                    this.update(cb);
                });
            });
        }
    }

    update(cb){
        const id = this.id;
        rdb.set(`user:id:${this.name}`, id, (err) => {
            if (err) return cb(err);
            rdb.hmset(`user:${id}`, this, (err) => {
                cb(err);
            });
        });
    }

    hashPassword(cb) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return cb(err);
            this.salt = salt;
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) return cb(err);
                this.pass = hash;
                cb();
            }); 
        });
    }
}

module.exports = User;