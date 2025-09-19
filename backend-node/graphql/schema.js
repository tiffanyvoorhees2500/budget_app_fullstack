const fs = require('fs');
const { printSchema } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema')

// Import the merged typeDefs and resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Export schema to SDL
fs.writeFileSync('graphql_schema.graphql', printSchema(schema));
console.log('GraphQL schema exported to graphql_schema.graphql');
