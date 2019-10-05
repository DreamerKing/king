const redis = require('redis');
const rdb = redis.createClient(6379, "47.100.53.48");

class Entry {
    constructor(config) {
       for (const key in config) {
          this[key] = config[key];
       } 
    }

    static getRanges(from, to, callback) {
        rdb.lrange('entries', from, to, (err, items) => {
            if (err) return callback(err);
            let entries = [];
            items.forEach((item) => {
                entires.push(JSON.stringify(item));
            });
            callback(null, entries);
        });
    }

    save(cb){
        const entry = JSON.stringify(this);
        rdb.lpush('entries', entry, (err) => {
            if(err) return cb(err);
            cb();
        })
    }
}

module.exports = Entry;