module.exports = {
    isProduction: false,
    port: process.env.PORT || 3333,
    secret_key: 'my_secret_key',
    protocol: 'http',
    host: 'localhost',
    mongodb: {
        connectionString: 'mongodb+srv://m001-student:Argentina31@mern.o4nah.mongodb.net/video-upload?retryWrites=true&w=majority'
    },
    ffmpegPath: '/usr/bin/ffmpeg'           // This is from Ubuntu v20.04 at my local machine
}

//this is a test