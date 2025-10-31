export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET || 'defaultSecret',
    },
    database: {
        connectionString: process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service-db',
    },
});