// 7장 23p 전체코드

const mongoose = require('mongoose');
const readLine = require('readline');
mongoose.set("strictQuery", false);
// const dbURI = 'mongodb://127.0.0.1:27017/Loc8r';
// mongoose.connect(dbURI, {useNewUrlParser: true});

//14장 38p
const dbPassword = process.env.MONGODB_PASSWORD; // .env 파일에서 비밀번호 가져오기
// const dbURI = `mongodb+srv://my_atlas_user:${dbPassword}@cluster0.s6fko.mongodb.net/Loc8r`; // MongoDB URI 설정
const dbURI = "mongodb+srv://my_atlas_user:password@cluster0.rpzomyq.mongodb.net/Loc8r"


mongoose.connect('mongodb://127.0.0.1:27017/Loc8r', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // autoReconnect: true, // 자동 재연결 옵션
  });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

// 7장 34p 리콰이어 로케이션 추가
require('./locations');