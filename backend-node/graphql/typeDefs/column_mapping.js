const { gql } = require('apollo-server-express');

module.exports = gql`
  type ColumnMapping {
    id: ID!
    user_id: ID!
    import_file_id: ID!
    account_bank_name: String
    column_name: String!
    mapped_to: String!

    user: User!
    importFile: ImportFile!
  }

  extend type Query {
    columnMappings: [ColumnMapping!]!
    columnMapping(id: ID!): ColumnMapping
  }

  input CreateColumnMappingInput {
    user_id: ID!
    import_file_id: ID!
    account_bank_name: String
    column_name: String!
    mapped_to: String!
  }

  input UpdateColumnMappingInput {
    import_file_id: ID!
    account_bank_name: String
    column_name: String!
    mapped_to: String!
  }

  extend type Mutation {
    createColumnMapping(input: CreateColumnMappingInput!): ColumnMapping!
    updateColumnMapping(
      id: ID!
      input: UpdateColumnMappingInput!
    ): ColumnMapping!
    deleteColumnMapping(id: ID!): Boolean!
  }
`;
