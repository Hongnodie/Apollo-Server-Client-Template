// 0-BEFORE ALL INIT THE PROGRAMME WITH COMMAND: "npm init -y"

// DEPENDENCIES INCLUDE - express, apollo-server-express, path (this one is optional)
// 1-RUN COMMAND: "npm i express apollo-server-express"
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const path = require('path');

// 2-APOLLO SETUP
// Example by apollo official guidebook at https://www.apollographql.com/docs/apollo-server/getting-started/#step-3-define-your-graphql-schema
// 2.1-DEFINE SCHEMA FOR GQL SERVER (GQL IS NOT A LANGUAGE BUT A SERVER THAT FOLLOWS CERTAIN LANGUAGE LOGIC)
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    #   This line is comment

    type User {
        _id: ID!
        username: String!
    }

    #   "Query" is a special term in gql as it defines <function name>(accepted variables) : <return object example> -- alias as "context"
    type Query {
        allUser: [User]
    }
`;

// type Item {
//     _id: ID!
//     itemName: String!
// }

// itemList: [Item]
// matchups(_id: String): [Item]


// 2.2-DEFINE SOME DATASET
const users = [
    { _id: 'idforuser1', username: 'user1' },
    { _id: 'idforuser2', username: 'user2' }
];

// const items = [
//     { _id: 'idforitem1', itemName: 'item1' },
//     { _id: 'idforitem2', itemName: 'item2' },
// ];

// 3-EXPLAIN/DEFINE HOW FUNCTION WORKS
// 3.1-SCHEME DATABASE FIRST
// Example by mongodb official guidebook at https://mongoosejs.com/docs/guide.html#definition
// const { Schema, model } = require('mongoose');

// const ItemSchema = new Schema({
//     _id: { type: String, required: true, },
//     itemName: { type: String, required: true, }
// });
// // Database will be named as "Item" in cloud drive of mongodb
// const ItemDB = model('Item', ItemSchema);

// const UserSchema = new Schema({
//     _id: { type: String, required: true, },
//     username: { type: String, required: true, }
// });
// // Database will be named as "Item" in cloud drive of mongodb
// const UserDB = model('User', UserSchema);

// 2.3-DEFINE WHAT ACTION IS EACH NAMED FUNCTION EXACTLY DOING
const resolvers = {
    Query: {
        allUser: () => users,
        // itemList: async () => {
        //     return ItemDB.find({});
        // },
        // matchups: async (parent, { _id }) => {
        //     const parameters = _id ? { _id } : {};
        //     return UserDB.find(parameters);
        // },
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
// const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    // 3.2-START THE SERVER
    // RUN COMMAND: "node index.js"
    app.listen(()=>console.log(`API server running on port 3000 !`))
}

startApolloServer();

// .then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//     });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });


// Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });
  
//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//     })
//   })
//   };
  
// Call the async function to start the server
//   startApolloServer(typeDefs, resolvers);
 