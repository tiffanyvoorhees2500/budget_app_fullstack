const { gql } = require('apollo-server-express');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const userTypeDefs = require('./user');
const accountTypeDefs = require('./account');
const bankTransactionTypeDefs = require('./bank_transaction');
const expenseTypeDefs = require('./expense');
const frequencyTypeDefs = require('./frequency');
const incomeTypeDefs = require('./income');

const rootTypeDefs = gql`
    type Query
    type Mutation
`;

const typeDefs = mergeTypeDefs([
  rootTypeDefs,
  userTypeDefs,
  accountTypeDefs,
  bankTransactionTypeDefs,
  expenseTypeDefs,
  frequencyTypeDefs,
  incomeTypeDefs,
]);

module.exports = typeDefs;