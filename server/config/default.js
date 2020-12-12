module.exports = {
    port: process.env.PORT || 3333,
    secret_key: 'my_secret_key',
    protocol: 'http',
    host: 'localhost',
    mongodb: {
        connectionString: 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
    }
}

//this is a test