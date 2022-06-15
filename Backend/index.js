// ADD DATABASE (NO INTERACTION) SERVER (MongoDB)
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
        selfid: String!
        username: String!
    }

    #   "Query" is a special term in gql as it defines <function name>(accepted variables) : <return object example> -- alias as "context"
    type Query {
        allUser: [User]
    }
`;

// 2.2-DEFINE SOME DATASET - BUT HERE WE INTRODUCE IT INTO MONGODB
// TARGET IS TO BRING THE DATA TO THE CLOUD
// Since _id is a special term in mongoDB and not self defined, "_id" is renamed as "selfid"
// const users = [
//     { selfid: 'idforuser1', username: 'user1' },
//     { selfid: 'idforuser2', username: 'user2' }
// ];
// MongoDB requires that to use a model, we need to scheme it first, guide here https://mongoosejs.com/docs/guide.html

// 2.2.1-SCHEME DATABASE FIRST (Same as what you tell to the apollo server in above)
// Example by mongodb official guidebook at https://mongoosejs.com/docs/guide.html#definition
// OF COURSE INSTALL "mongoose" npm package with command "npm i mongoose"
const mongoose = require('mongoose');
// MULTIPLE WAYS OF CALLING FOR "SCHEMA" AVAILABLE: mongoose.Schema() OR {Schema}=mongoose + Schema() as suggested here https://mongoosejs.com/docs/schematypes.html#objectids
const userSchema = new mongoose.Schema({
    // Details of various type definition see https://mongoosejs.com/docs/schematypes.html
    // TODO: gives full list of available types accepted by mongoDB
    selfid: {  
        type: String, 
        required: true,
        unique: true,
    },
    username: {
        type: String,
        default: undefined,
        alias: "nameOfUser",
    },
})

// 2.2.2-FILL SCHEMA TO THE MODEL
// "User" is going to be the name in mongoDB cloud
const userModel = mongoose.model('User', userSchema);
// After this, mongoDB is operatable by calling for "userModel"(self-named)

// 2.2.3-SEND LOCAL MODEL TO THE CLOUD DATABASE SERVER AND STAY CONNECTED
// Example by mongoose official guidebook at https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
// Name database(db)  as "apollo-template"
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apollo-template', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // 2.2.4-SEED THE CLOUD DATABASE
    // Terminology "seed" means put data (requires to be json object) to the place where you try to find it
    .then( async () => {
        // since unique is true delete all the existing data to avoid err
        // Full list of query found here https://mongoosejs.com/docs/api/query.html
        await userModel.deleteMany({});
        
        const userSavedResponse = await userModel.insertMany([
            { selfid: 'idforuser1', username: 'user1' },
            { selfid: 'idforuser2', username: 'user2' }
        ]);
        // console.log(userSavedResponse);
    });

// 2.3-DEFINE WHAT ACTION IS EACH NAMED FUNCTION EXACTLY DOING
// Tell the resolver to find the data from cloud database
const resolvers = {
    Query: {
        allUser: async () => {
            return userModel.find({});
        },
    },
};

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

 