const { gql } = require('apollo-server-express');

module.exports = gql`
  type FrequencyDetail {
    id: ID!
    user_id: ID!
    frequency_id: ID!
    expense_id: ID
    income_id: ID
    day_of_month: [Int]
    week_of_month: [Int]
    day_of_week: [Int]
    special_day: String

    user: User!
    frequency: Frequency!
    expense: Expense!
    income: Income!
  }

  extend type Query {
    frequencyDetails: [FrequencyDetail!]!
    frequencyDetail(id: ID!): FrequencyDetail
  }

  input CreateFrequencyDetailInput {
    user_id: ID!
    frequency_id: ID!
    expense_id: ID
    income_id: ID
    day_of_month: [Int]
    week_of_month: [Int]
    day_of_week: [Int]
    special_day: String
  }

  input UpdateFrequencyDetailInput {
    frequency_id: ID!
    expense_id: ID
    income_id: ID
    day_of_month: [Int]
    week_of_month: [Int]
    day_of_week: [Int]
    special_day: String
  }

  extend type Mutation {
    createFrequencyDetail(input: CreateFrequencyDetailInput!): FrequencyDetail!
    updateFrequencyDetail(id: ID!, input: UpdateFrequencyDetailInput!): FrequencyDetail!
    deleteFrequencyDetail(id: ID!): Boolean!
  }
`;
