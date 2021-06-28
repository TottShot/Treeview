import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import sql from"mssql/msnodesqlv8.js";
import { getCharacter } from './server/repository/CharacterRepo.js';


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
