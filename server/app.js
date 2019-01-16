const path= require('path');
const publicPath = path.join(__dirname,'../public');
const express=require('express');
const helmet=require('helmet');
const  app=express();
const bodyParser=require('body-parser');
const responseTime = require('response-time');
const rateLimit = require('express-rate-limit');
const missionRoutes=require('./routes/missionRoutes');
const userRoutes=require('./routes/userRoutes');
const fcmRoutes=require('./routes/fcmRoutes');
const duelRoutes=require('./routes/duelRoutes');
const router=express.Router();

app.enable("trust proxy");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(publicPath,{
  extensions: ['html']
}));
app.use(helmet());
app.use(responseTime());
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,content-type, Accept , x-auth');
  	res.contentType('text/plain');
	next();
});
router.use('/missions',missionRoutes);
router.use('/users',userRoutes);
router.use('/duels',duelRoutes);
router.use('/fcm',fcmRoutes);
app.use("/api/", limiter);
app.use('/api',router);
module.exports=app;
