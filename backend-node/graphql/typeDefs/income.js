const { gql } = require('apollo-server-express');

module.exports = gql`
  type Income {
    id: ID!
    user_id: ID!
    description: String!
    start_date: String!
    end_date: String
    salary_amount: Float
    num_hours: Int
    rate_per_hour: Float
    set_amount: Float
    frequency_id: ID!
    to_account_id: ID!

    frequency: Frequency!
    toAccount: Account!
    user: User!
    plannedExpenses: [Expense!]!
  }

  extend type Query {
    incomes: [Income!]!
    income(id: ID!): Income
  }

  input CreateIncomeInput {
    user_id: ID!
    description: String!
    start_date: String!
    end_date: String
    salary_amount: Float
    num_hours: Int
    rate_per_hour: Float
    set_amount: Float
    frequency_id: ID!
    to_account_id: ID!
  }

  input UpdateIncomeInput {
    description: String!
    start_date: String!
    end_date: String
    salary_amount: Float
    num_hours: Int
    rate_per_hour: Float
    set_amount: Float
    frequency_id: ID!
    to_account_id: ID!
  }

  extend type Mutation {
    createIncome(input: CreateIncomeInput!): Income!
    updateIncome(id: ID!, input: UpdateIncomeInput!): Income!
    deleteIncome(id: ID!): Boolean!
  }
`;
