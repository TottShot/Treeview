import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { getSectionData } from './server/repository/DataRepo.js';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    toc: [SectionData]
    content(id: ID!): SectionData
  }
  type SectionData {
    content: String!
    id: ID!
    title: String!
    parentId: String
    ordering: String!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  content: async ({ id }) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000); /// Simulating a slow database
    return (await getSectionData()).find((value) => value.id === id);
  },
  toc: async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(1000) /// Simulating a slow database
    return await getSectionData();
  }
};

var app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

