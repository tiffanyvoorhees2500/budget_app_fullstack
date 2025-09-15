const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    google_id: String!

    accounts: [Account!]!
    incomes: [Income!]!
    expenses: [Expense!]!
    bankTransactions: [BankTransaction!]!
    importFiles: [ImportFile!]!
    columnMappings: [ColumnMapping!]!
    transactionMatches: [TransactionMatch!]!
    frequencyDetails: [FrequencyDetail!]!
  }

  extend type Query {
    me: User!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    google_id: String
  }

  input UpdateUserInput {
    name: String
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createUser(input: CreateUserInput!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): DeleteResponse!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
  }
`;
