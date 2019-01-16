const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DuelsSchema = new Schema({
	id:{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique:true
	},
	challenger_rt :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	opponent_rt :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	challenger_tap_count :{
		type: String,
		trim: true
	},
	opponent_tap_count :{
		type: String,
		trim: true
	},
	tap_receive :{
		type: String,
		trim: true
	},
	stake :{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	winner:{
		type: String,
		trim: true	
	}
});
module.exports= mongoose.model('Duel',DuelsSchema);