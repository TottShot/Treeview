
export function authenticate(name, pass, fn) {

    // config for your database
    var config = {
        server: 'localhost\\SQLEXPRESS',
        database: 'Palantir',
        driver: "msnodesqlv8",
        options: {
            trustedConnection: true
        }

    };
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Character', function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

        });
    });

    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = users[name];
    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash === user.hash) return fn(null, user)
        fn(new Error('invalid password'));
    });
}

export function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}