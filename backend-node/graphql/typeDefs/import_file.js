const { gql } = require('apollo-server-express');

// No mutations allowed by users, it should be managed by the system
module.exports = gql`
  type ImportFile {
    id: ID!
    user_id: ID!
    file_path: String!

    user: User!
    columnMappings: [ColumnMapping!]!
  }

  extend type Query {
    importFiles: [ImportFile!]!
    importFile(id: ID!): ImportFile
  }

  input CreateImportFileInput {
    user_id: ID!
    file_path: String!
  }

  input UpdateImportFileInput {
    file_path: String!
  }

  extend type Mutation {
    createImportFile(input: CreateImportFileInput!): ImportFile!
    updateImportFile(id: ID!, input: UpdateImportFileInput!): ImportFile!
    deleteImportFile(id: ID!): DeleteResponse!
  }
`;
