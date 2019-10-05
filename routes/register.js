exports.form = (req, res) => {
    res.render('register/form', { title: "Register" });
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
        if (err) return next(err);
        res.redirect('/');
    });
}