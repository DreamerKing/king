const User = require('../models/user');
// const user = new User({name: "King", pass: "test"});
// user.save(err => {
//     if(err) console.error(err);
//     console.log('user id %d', user.id);
// });

User.getByName('King', (err, user) => {
    if (err) console.error(err);
    console.log(user); 
});