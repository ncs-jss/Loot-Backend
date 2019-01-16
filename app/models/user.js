const mongoose = require('mongoose');
const _=require('lodash');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	reference_token :{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique:true
	},
	name :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	admission_no :{
		type: String,
		required: true,
		minlength: 7,
		unique: true
	},
	avatar_id :{
		type: Number,
		required: true
	},
	fcm_token :{
		type: String,
		minlength: 1,
		trim: true
	},
	mission_state :{
		type: Boolean
	},
	score :{
		type: Number,
		default:0
	},
	stage :{
		type: Number,
		default:0
	},
	duel_won :{
		type: Number,
		default:0
	},
	duel_lost :{
		type: Number,
		default:0
	},
	username :{
		type: String,
		required: true,
		minlength: 1
	},
	contact_number :{
		type: Number,
		required: true,
		unique: true
	},
	email :{
		type: String,
		required: true,
		unique: true
	},
	drop_count :{
		type: Number,
		default:0
	},
	payment:Boolean
});




// UserSchema.methods.generateAuthToken=function(){
// 	var user=this;
// 	var access='auth';
// 	var token = jwt.sign({_id:user._id.toHexString(),access},'abcd').toString();
// 	user.tokens.push({access,token});
// 	return user.save().then(function(){
// 		return token;
// 	});
// };




UserSchema.methods.toJSON=function(){
	var user=this;
	var  userObject= user.toObject();

	return _.pick(userObject,['reference_token','name','admission_no','email','contact_number','username','score','stage','mission_state','duel_lost','duel_won','drop_count','avatar_id']); 
}

// UserSchema.statics.findByCredentials=function(phone,password){
// var User=this;
// return User.findOne({phone}).then(function(user){
// 	if(!user){
// 		return Promise.reject();
// 	}
// 	return new Promise(function(resolve,reject){
// 		bcrypt.compare(password,user.password,function(err,res){
// 			if(res){
// 				resolve(user);
// 			}
// 			else{
// 				reject();
// 			}
// 		});
// 	});
// });
// };

// UserSchema.pre('save',function(next){
// var user = this;
// if(user.isModified('password'))
// {
// 	bcrypt.genSalt(10,function(err,salt){
// 		bcrypt.hash(user.password,salt,function(err,hash){
// 			user.password=hash;
// 			next();
// 		});
// 	});
// }
// else
// {
// 	next();
// }
// });


// UserSchema.statics.findByToken = function(token){
// 	var User =this;
// 	var decoded;

// 	try{

// 		decoded= jwt.verify(token,'abcd');

// 	}catch(e){

// 		return new Promise(function(resolve,reject){
// 			reject();
// 		});

// 	}
// 	return User.findOne({
// 		_id : decoded._id,
// 		'tokens.token' : token,
// 		'tokens.access' : 'auth'
// 	});
// };

module.exports= mongoose.model('User',UserSchema);

