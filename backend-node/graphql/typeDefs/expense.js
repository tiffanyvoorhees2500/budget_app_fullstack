const { gql } = require('apollo-server-express');

module.exports = gql`
  type Expense {
    id: ID!
    user_id: ID!
    from_account_id: ID!
    to_account_id: ID!
    frequency_id: ID!
    plan_account_id: ID!
    plan_frequency_id: ID!
    plan_income_id: ID!
    pay_to: String!
    amount: Float!
    start_date: String!
    next_due_date: String!
    end_date: String!

    user: User!
    fromAccount: Account!
    toAccount: Account!
    frequency: Frequency!
    planningAccount: Account!
    planningFrequency: Frequency!
    planningIncome: Income!

    transactionMatches: [TransactionMatch!]!
    frequencyDetails: [FrequencyDetail!]!
  }

  extend type Query {
    expenses: [Expense!]!
    expense(id: ID!): Expense
  }

  input CreateExpenseInput {
    user_id: ID!
    from_account_id: ID!
    to_account_id: ID!
    frequency_id: ID!
    plan_account_id: ID!
    plan_frequency_id: ID!
    plan_income_id: ID!
    pay_to: String!
    amount: Float!
    start_date: String!
    next_due_date: String!
    end_date: String!
  }

  input UpdateExpenseInput {
    from_account_id: ID!
    to_account_id: ID!
    frequency_id: ID!
    plan_account_id: ID!
    plan_frequency_id: ID!
    plan_income_id: ID!
    pay_to: String!
    amount: Float!
    start_date: String!
    next_due_date: String!
    end_date: String!
  }

  extend type Mutation {
    createExpense(input: CreateExpenseInput!): Expense!
    updateExpense(id: ID!, input: UpdateExpenseInput!): Expense!
    deleteExpense(id: ID!): Boolean!
  }
`;
