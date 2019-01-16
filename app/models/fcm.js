const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FCMSchema = new Schema({
	registration_id :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	message_body :{
		type: String,
		trim: true
	},
	message_title :{
		type: String,
		trim: true
	},
	data_message :{
		request_type:String,
		reference_token:String,
		id:String,
		stake:String,
		user:String
	}
});
module.exports= mongoose.model('FCM',FCMSchema);