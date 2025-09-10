const { gql } = require('apollo-server-express');

module.exports = gql`
  type Account {
    id: ID!
    user_id: ID!
    account_id: String
    nickname: String!
    beg_balance: Float!
    bank_url: String
    target_goal: Float
    goal_date: String
    track_spending: Boolean
    is_active: Boolean

    user: User!
    outgoingTransactions: [BankTransaction!]!
    incomingTransactions: [BankTransaction!]!
    outgoingExpenses: [Expense!]!
    incomingExpenses: [Expense!]!
    plannedExpenses: [Expense!]!
    incomingIncomes: [Income!]!
  }

  extend type Query {
    accounts: [Account!]!
    account(id: ID!): Account
  }

  input CreateAccountInput {
    user_id: ID!
    account_id: String
    nickname: String!
    beg_balance: Float!
    bank_url: String
    target_goal: Float
    goal_date: String
    track_spending: Boolean
  }

  input UpdateAccountInput {
    account_id: String
    nickname: String
    beg_balance: Float
    bank_url: String
    target_goal: Float
    goal_date: String
    track_spending: Boolean
    is_active: Boolean
  }

  extend type Mutation {
    createAccount(input: CreateAccountInput!): Account!
    updateAccount(id: ID!, input: UpdateAccountInput!): Account!
    deleteAccount(id: ID!): DeleteResponse!
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
  }
`;
