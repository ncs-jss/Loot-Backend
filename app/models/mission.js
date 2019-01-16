const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MissionSchema = new Schema({
	mission_name :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	story :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	description :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	geocode :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	answer :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	id :{
		type: Number,
		required: true,
		unique: true
	}
});
module.exports= mongoose.model('Mission',MissionSchema);