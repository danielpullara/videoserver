module.exports = {
    isProduction: true,
    port: process.env.PORT || 3333,
    secret_key: 'my_secret_key',
    protocol: 'https',
    host: 'video-server-drones-in-hawaii.herokuapp.com',
    mongodb: {
        connectionString: 'mongodb+srv://m001-student:Argentina31@mern.o4nah.mongodb.net/video-upload?retryWrites=true&w=majority'
    },
    ffmpegPath: '/usr/local/bin/ffmpeg'           // My guess is this path is from Ubuntu v18.04
}

//this is a test