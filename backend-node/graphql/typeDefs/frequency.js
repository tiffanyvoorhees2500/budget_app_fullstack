const { gql } = require('apollo-server-express');

// No mutations allowed by users, it should be managed by the system
module.exports = gql`
  type Frequency {
    id: ID!
    description: String!
    interval: Int!
    day_of_month: String!
    week_of_month: String
    day_of_week: String
    special_day: String
    callback_func_name: String!
  }

  extend type Query {
    frequencies: [Frequency!]!
    frequency(id: ID!): Frequency
  }

  input CreateFrequencyInput {
    description: String!
    interval: Int!
    day_of_month: String!
    week_of_month: String
    day_of_week: String
    special_day: String
    callback_func_name: String!
  }

  input UpdateFrequencyInput {
    description: String!
    interval: Int!
    day_of_month: String!
    week_of_month: String
    day_of_week: String
    special_day: String
    callback_func_name: String!
  }

  extend type Mutation {
    createFrequency(input: CreateFrequencyInput!): Frequency!
    updateFrequency(id: ID!, input: UpdateFrequencyInput!): Frequency!
    deleteFrequency(id: ID!): DeleteResponse!
  }
`;
