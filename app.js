const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db");
const logger = require('./utils/logger')(module);
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
//initialize express.
const app = express();

//services
require('./services/cache');

//Use Cors
app.use(cors());
//Body Parser
app.use(express.json({ extended: false, limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb' }));

//Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000*60*60*24*30 }
}));


//passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require('./config/passport')(passport);

//public dir
app.use('/public', express.static(__dirname + '/public/'));

//Initialize DB
connectDB();


//Routes
app.use("/api/weather", require("./routes/weather"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/meetup/", require("./routes/meetup"));


app.use(express.static('client/build'));
app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

// Add logger process.on
process.on('unhandledRejection', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason) );
    throw reason;
  });
process.on('unhandledException', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason));
    throw reason;
  });
  
const PORT = process.env.PORT || 5069;
app.listen(PORT, console.log(`server started on ${PORT}`));

