const { gql } = require('apollo-server-express');

module.exports = gql`
  type TransactionMatch {
    id: ID!
    user_id: ID!
    bank_transaction_id: String!
    expense_id: ID!
    income_id: ID!
    match_date: String!
    amount_matched: Float

    user: User!
    bankTransaction: BankTransaction!
    expense: Expense!
    income: Income!
  }

  extend type Query {
    transactionMatches: [TransactionMatch!]!
    transactionMatch(id: ID!): TransactionMatch
  }

  input CreateTransactionMatchInput {
    user_id: ID!
    bank_transaction_id: String!
    expense_id: ID!
    income_id: ID!
    match_date: String!
    amount_matched: Float
  }

  input UpdateTransactionMatchInput {
    bank_transaction_id: String!
    expense_id: ID!
    income_id: ID!
    match_date: String!
    amount_matched: Float
  }

  extend type Mutation {
    createTransactionMatch(input: CreateTransactionMatchInput!): TransactionMatch!
    updateTransactionMatch(id: ID!, input: UpdateTransactionMatchInput!): TransactionMatch!
    deleteTransactionMatch(id: ID!): Boolean!
  }
`;
