export default () => ({
  database: {
    connectionString:
      process.env.MONGO_URI || 'mongodb://localhost:27017/post-service-db',
  },
});
