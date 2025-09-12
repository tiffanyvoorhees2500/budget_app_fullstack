# Overview

This project is a backend API for a budget management application. It is build with Node.js, Express, Sequalize, GraphQL, and a cloud-hosted PostreSQL database. This backend handles users, transactions, income and expenses while supporting authentication with JWT.

The backend integrates directly with a PostgreSQL database using Sequelize ORM. Models are defined in code and synchronized with the database via migrations. As I already have a good grasp on REST endpoints, I chose to use GraphQL for this project. GraphQL allows for flexible queries and mutations for client applications.

The purpose for writing this software is to start to become familiar with AWS starting with Amazon Relational Database. It will also strengthen my backend development skills, learn to integrate GraphQL with relational data, and practice secure authentication patterns. This project is the foundation for a future full-stack budgeting app.

[Software Demo Video](https://youtu.be/U-_KZ3PYrJs)

# Cloud Database

I am using AWS RDS (Amazon Relational Database)

I have the following tables:

- Users - Authentication/Authorization based on this table
- Income - Linked to Users (using JWT token)
- Expenses - Linked to Users (using JWT token)
- Transactions - Linked to Users (using JWT token)
- Frequencies - Used within Expenses and Income for analytics to be used in Sprint #2

# Development Environment

- Node.js + Express as the server framework
- GraphQL (Apollo Server) for queries and mutations
- Sequelize ORM for models, migrations, and database integration
- PostgreSQL (AWS RDS hosted) as the relational database
- dotenv for environment configuration

Code was written in VS Code, with database management handled through Sequelize CLI and migration

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [AWS Relational Database Service User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.html)
- [AWS Using pgAdmin to connect to RDS for PostgreSQL DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ConnectToPostgreSQLInstance.pgAdmin.html)
- [Microsoft Learn Quickstart for PostgreSQL extension for VS Code](https://learn.microsoft.com/en-us/azure/postgresql/extensions/vs-code-extension/quickstart-connect)
- [Sequalize](https://sequelize.org/docs/v6/getting-started/)
- [Apollo GraphQL Tutorials](https://www.apollographql.com/tutorials/lift-off-part3/06-query-building-in-apollo-sandbox)

# Future Work

This project will be built upon in future sprints.

- Using AI Analytics to track spending patterns, and project future balances
- Create React and React Native Frontend for UI
