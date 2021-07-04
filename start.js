import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import sql from"mssql/msnodesqlv8.js";
import { getCharacter } from './server/repository/CharacterRepo.js';
import { authenticate, restrict} from "./middleware/auth.js";


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    npc: Character
    pc: Character
  }
  type Character {
    name: String
    notes: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  npc: () => {
    return {
      name: 'Kyle',
      notes: 'Most annoying person ever'
    }
  },
  pc: async () => {
    return await getCharacter();
  }
};

var app = express();
app.use(cors());
/* your regular routes go here */
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


// middleware

app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});


app.post('/login', function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
});

app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

app.get('/dbtest', function (req, res) {

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
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

