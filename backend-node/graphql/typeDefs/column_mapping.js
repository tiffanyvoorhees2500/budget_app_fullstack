const { gql } = require('apollo-server-express');

module.exports = gql`
  enum ColumnMappingType {
    ID
    AMOUNT
    CREDIT
    DEBIT
    TRANSACTION_TYPE
    DATE
    ACCOUNT_NICKNAME
    DESCRIPTION1
    DESCRIPTION2
    DESCRIPTION3
    DESCRIPTION4
    DEFAULT_CATEGORY
  }

  type ColumnMapping {
    id: ID!
    user_id: ID!
    import_file_id: ID!
    column_name: String!
    mapped_to: ColumnMappingType!

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
    column_name: String!
    mapped_to: ColumnMappingType!
  }

  input UpdateColumnMappingInput {
    import_file_id: ID!
    column_name: String!
    mapped_to: ColumnMappingType!
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
