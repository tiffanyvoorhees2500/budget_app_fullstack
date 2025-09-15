const { gql } = require('apollo-server-express');

module.exports = gql`
  type Income {
    id: ID!
    user_id: ID!
    frequency_id: ID!
    account_id: ID!
    description: String!
    start_date: String!
    end_date: String
    salary_amount: Float
    num_hours: Int
    rate_per_hour: Float
    set_amount: Float

    user: User!
    frequency: Frequency!
    account: Account!
    plannedExpenses: [Expense!]!
    transactionMatches: [TransactionMatch!]!
    frequencyDetails: [FrequencyDetail!]!
  }

  extend type Query {
    incomes: [Income!]!
    income(id: ID!): Income
  }

  input CreateIncomeInput {
    user_id: ID!
    frequency_id: ID!
    account_id: ID!
    description: String!
    start_date: String!
    end_date: String
    salary_amount: Float
    num_hours: Int
    rate_per_hour: Float
    set_amount: Float
  }

  input UpdateIncomeInput {
    frequency_id: ID!
    account_id: ID!
    description: String!
    start_date: String!
    end_date: String
    salary_amount: Float
    num_hours: Int
    rate_per_hour: Float
    set_amount: Float
  }

  extend type Mutation {
    createIncome(input: CreateIncomeInput!): Income!
    updateIncome(id: ID!, input: UpdateIncomeInput!): Income!
    deleteIncome(id: ID!): Boolean!
  }
`;
