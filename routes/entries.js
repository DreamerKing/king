const Entry = require('../redis-db');

exports.form = (req, res) => {
    res.render('entries/post', { title: "Post"});
}

exports.submit = (req, res, next) => {
    const data = req.body.entry;
    const user = res.locals.user;
    const userName = user ? user.name : null;
    const entry = new Entry({
        userName: userName,
        title: data.title,
        body: data.body
    });
    entry.save((err) => {
        if(err) return next(err);
        res.redirect('/');
    });
}

exports.list = (req, res, next) => {
    Entry.getRanges(0, -1, (err, entries) => {
        if(err) return next(err);
        res.render('entries', { title: "Entries", entries });
    })
}