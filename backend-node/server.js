// Load environment variables
require('dotenv-flow').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { verifyToken } = require('./utils/jwt');
const { sequelize } = require('./models');
const syncFrequencies = require('./utils/syncFrequencies');
const { verify } = require('jsonwebtoken');

const app = express();
const fileImportRoutes = require('./routes/fileImportRoutes');

// Middleware to handle JSON requests 

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Budget App API - Backend-Node server is running',
  });
});
app.use('/api/files', fileImportRoutes);

const PORT = process.env.PORT || 3000;

// Start Apollo Server + Express
const startServer = async () => {
  try {
    // Create the Apollo Server instance
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');
        const user = token ? verifyToken(token) : null;
        return { user }; // Now available in resolvers as context.user
      },
    });

    // Start Apollo server
    await server.start();

    // Apply middleware to express
    server.applyMiddleware({ app, path: '/graphql' });

    // DEV ONLY!!!! & only used when changes with model need updating
    // Sync Sequelize models
    await sequelize.sync({ alter: true });
    // Makes sure frequencies in DB are up-to-date
    await syncFrequencies();
    console.log('Database synced and frequencies synchronized successfully.');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(
        `GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error('Unable to start server:', err);
  }
};

// START EVERYTHING
startServer();

// Graceful shutdown
const shutdown = async () => {
  try {
    console.log('\nShutting down server...');
    await sequelize.close();
    console.log('Sequelize connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error closing Sequelize connection:', err.message);
    process.exit(1);
  }
};

// Listen for termination signals
process.on('SIGINT', shutdown); // CTRL+C
process.on('SIGTERM', shutdown); // kill command or system shutdown
