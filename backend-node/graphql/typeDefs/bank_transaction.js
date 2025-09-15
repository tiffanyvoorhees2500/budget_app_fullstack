const { gql } = require('apollo-server-express');

module.exports = gql`
  type BankTransaction {
    id: ID!
    user_id: ID!
    from_account_id: ID!
    to_account_id: ID!
    date: String!
    amount: Float!
    default_category: String
    description1: String!
    description2: String
    description3: String
    memo: String

    user: User!
    fromAccount: Account!
    toAccount: Account!
    transactionMatches: [TransactionMatch!]!
  }

  extend type Query {
    bankTransactions: [BankTransaction!]!
    bankTransaction(id: ID!): BankTransaction
  }

  input CreateBankTransactionInput {
    user_id: ID!
    from_account_id: ID
    to_account_id: ID
    date: String!
    amount: Float!
    default_category: String
    description1: String!
    description2: String
    description3: String
    memo: String
  }

  input UpdateBankTransactionInput {
    from_account_id: ID
    to_account_id: ID
    date: String!
    amount: Float!
    default_category: String
    description1: String!
    description2: String
    description3: String
    memo: String
  }

  extend type Mutation {
    uploadBankTransactions(transactions: [CreateBankTransactionInput!]!): [BankTransaction!]!
    createBankTransaction(input: CreateBankTransactionInput!): BankTransaction!
    updateBankTransaction(
      id: ID!
      input: UpdateBankTransactionInput!
    ): BankTransaction!
    deleteBankTransaction(id: ID!): Boolean!
  }
`;
