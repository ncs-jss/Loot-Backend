const mongoose = require('mongoose');
const config=require('.././config/config');
mongoose.connect(process.env.MONGODB_URI);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
