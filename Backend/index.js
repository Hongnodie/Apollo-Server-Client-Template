// PREDEFINED DATABASE (NO INTERACTION) SERVER
// 0-BEFORE ALL, INIT THE PROGRAMME WITH COMMAND: "npm init -y"

// DEPENDENCIES INCLUDE - apollo-server, graphql
// INSTRUCTION GIVEN HERE: https://www.apollographql.com/docs/apollo-server/getting-started#step-2-install-dependencies
// 1-RUN COMMAND: "npm install apollo-server graphql"
const { ApolloServer, gql } = require('apollo-server');

// 2-APOLLO SETUP
// Example by apollo official guidebook at https://www.apollographql.com/docs/apollo-server/getting-started/#step-3-define-your-graphql-schema
// 2.1-DEFINE SCHEMA FOR GQL SERVER (GQL IS NOT A LANGUAGE BUT A SERVER THAT FOLLOWS CERTAIN LANGUAGE LOGIC)

const typeDefs = gql`
    #   This line is comment

    type User {
        _id: String!
        username: String!
    }

    #   "Query" is a special term in gql as it defines <function name>(accepted variables) : <return object example> -- alias as "context"
    type Query {
        allUser: [User]
    }
`;

// 2.2-DEFINE SOME DATASET
const users = [
    { _id: 'idforuser1', username: 'user1' },
    { _id: 'idforuser2', username: 'user2' }
];

// 3-EXPLAIN/DEFINE HOW FUNCTION WORKS
// 3.1-SCHEME DATABASE FIRST - NEGLECTED HERE
// Example by mongodb official guidebook at https://mongoosejs.com/docs/guide.html#definition

// 2.3-DEFINE WHAT ACTION IS EACH NAMED FUNCTION EXACTLY DOING
const resolvers = {
    Query: {
        allUser: () => users,
    },
};

// UPDATE SELF-DEFINED SCHEMA TO THE CLOUD DATABASE SERVER AND STAY CONNECTED
// Example by mongoose official guidebook at https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
// const mongoose = require('mongoose');

// BY DEFAULT DATABASE(DB) NAMED AS "apollo-template"
// const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apollo-template', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// 3-START THE SERVER
// 3.1-INTRODUCE THE PREREQUISITE FOR GQL SERVER
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

// 3.2-START THE SERVER
// RUN COMMAND: "node index.js" (STOP BY USING "Ctrl"+"C" THEN RESPOND "y", ENTER)
server
    .listen()
    .then(({ url }) => { console.log(` Server ready at ${url}`); });
    // CAN CHECK INTERMINAL WHAT PARAMS RETURNED FROM SERVER BY COMMENTING THE ABOVE AND UN-COMMENT THE FOLLOWING LINE
    // .then((res) => { console.log(res); });

 