# Tiffany Voorhees Budget (Full Stack)
Full-stack budget tracker: Node.js backend, Python analysis, React web, React Native mobile

# Overview
{Important! Do not say in this section that this is college assignment. Talk about what you are trying to accomplish as a software engineer to further your learning.}
This project is a backend API for a budget management application.  It is build with Node.js, Express, Sequalize, GraphQL, and a cloud-hosted PostreSQL database. This backend handles users, transactions, income and expenses while supporting authentication with a combination of Google OAuth and JWT.

{Provide a description of the software that you wrote and how it integrates with a Cloud Database. Describe how to use your program.}
The backend integrates directly with a PostgreSQL database using Sequelize ORM. Models are defined in code and synchronized with the database via migrations. As I already have a good grasp on REST endpoints, I chose to use GraphQL for this project. GraphQL allows for flexible queries and mutations for client applications.

{Describe your purpose for writing this software.}
The purpose for writing this software is to strengthen my backend development skills, learn to integrate GraphQL with relational data, and practice secure authentication patterns.  This project is the foundation for a future full-stack budgeting app.

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running, a walkthrough of the code, and a view of the cloud database.}

[Software Demo Video](http://youtube.link.goes.here)

# Cloud Database

I am using AWS RDS (Amazon Relational Database)

I have the following tables:
Users - Authentication/Authorization based on this table

Income - Linked to Users
Bills - Linked to Users
Transactions - Linked to Users

** Any table linked to Users means that a user will only be able to see the items linked to them (Authorization)

# Development Environment

- Node.js + Express as the server framework
- GraphQL (Apollo Server) for queries and mutations
- Sequelize ORM for models, migrations, and database integration
- PostgreSQL (AWS RDS hosted) as the relational database
- dotenv for environment configuration

Code was written in VS Code, with database management handled through Sequelize CLI and migration

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [Web Site Name](http://url.link.goes.here)
- [Web Site Name](http://url.link.goes.here)

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}

- Item 1
- Item 2
- Item 3