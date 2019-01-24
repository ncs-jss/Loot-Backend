const User= require('../.././app/models/user');
const config=require('.././config/config');
const express=require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();


authenticate=function(req,res,next){
	try{

		decoded= jwt.verify(req.header('x-auth'),process.env.JWT_SECRET);
		if(decoded.username==process.env.USERNAME&&decoded.password==process.env.PASSWORD){

			next();
		}
		else{
			res.status(401).send();	
		}

	}catch(e){
		res.status(401).send();
	}	
};

router.route('/leaderboard')


/**
 * @api {get} /api/user/leaderboard Return leaderboard
 * @apiGroup Users
 * @apiHeader {String} Authorization Token of admin
 * @apiHeaderExample {json} Header
 * {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiSuccess {String[]} users User list
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String[]} users.admission_no User admission_no
 * @apiSuccess {String[]} users.questions_solved User Questions Solved
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 *		[{
 *		        "name": "Shubham",
 *		        "admission_no": "17EC060",
 *		        "questions_solved": 3
 *		}]
 * @apiErrorExample {json} Find error
 * 	HTTP/1.1 401 NOT Authenticated
*/
	.get(authenticate, async function(req,res){
		var users=await User.find().sort({score:-1}).limit(10);
		// users.sort(function (a, b) {
		//   return b.score - a.score;
		// });
		// users=users.map(user=>{
		// 	var json={
		// 		username:user.username,
		// 		score:user.score,
		// 		questions_solved:user.questions_solved.length
		// 	};
		// 	return json;
		// })
		res.send(users);
	});
router.route('/')


/**
 * @api {get} /api/user/leaderboard Return leaderboard
 * @apiGroup Users
 * @apiHeader {String} Authorization Token of admin
 * @apiHeaderExample {json} Header
 * {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiSuccess {String[]} users User list
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String[]} users.admission_no User admission_no
 * @apiSuccess {String[]} users.questions_solved User Questions Solved
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 *		[{
 *		        "name": "Shubham",
 *		        "admission_no": "17EC060",
 *		        "questions_solved": 3
 *		}]
 * @apiErrorExample {json} Find error
 * 	HTTP/1.1 401 NOT Authenticated
*/
	.get(async function(req,res){
			var users=await User.find();
			res.send(users);
			console.log(jwt.sign({username:process.env.USERNAME,password:process.env.PASSWORD},process.env.JWT_SECRET).toString());	
	});

router.route('/:id')


/**
 * @api {get} /api/user/leaderboard Return leaderboard
 * @apiGroup Users
 * @apiHeader {String} Authorization Token of admin
 * @apiHeaderExample {json} Header
 * {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiSuccess {String[]} users User list
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String[]} users.admission_no User admission_no
 * @apiSuccess {String[]} users.questions_solved User Questions Solved
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 *		[{
 *		        "name": "Shubham",
 *		        "admission_no": "17EC060",
 *		        "questions_solved": 3
 *		}]
 * @apiErrorExample {json} Find error
 * 	HTTP/1.1 401 NOT Authenticated
*/
	.get(authenticate,async function(req,res){
		var reference_token=req.params.id;
		console.log(reference_token);
		
			var user=await User.findOne({reference_token});
			res.send(user);
		
	});

	router.route('/:id/edit')


/**
 * @api {get} /api/user/leaderboard Return leaderboard
 * @apiGroup Users
 * @apiHeader {String} Authorization Token of admin
 * @apiHeaderExample {json} Header
 * {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiSuccess {String[]} users User list
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String[]} users.admission_no User admission_no
 * @apiSuccess {String[]} users.questions_solved User Questions Solved
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 *		[{
 *		        "name": "Shubham",
 *		        "admission_no": "17EC060",
 *		        "questions_solved": 3
 *		}]
 * @apiErrorExample {json} Find error
 * 	HTTP/1.1 401 NOT Authenticated
*/
	.post(authenticate,function(req,res){
		var reference_token=req.params.id;
		User.findOneAndUpdate({reference_token:reference_token},req.body,{new: true}).then(function(user){
			res.send(user);
		}).catch(function(e){
			res.status(400).send(e);
		})
	});	


router.route('/register')

/**
 * @api {post} /api/user/login Login Users
 * @apiGroup Users
 * @apiParam {String} username User username
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *		{
 *			"username":"username",
 *			"password":"password"
 *		}
 * @apiSuccess {String} message Login Status
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK Header {"x-auth": "JWT xyz.abc.123.hgf"}
 *		{
 *			"message":"Successful/Invalid Credentials"
 *		}
 * 	
 * @apiErrorExample {json} Find error
 * 	HTTP/1.1 401 Unauthorised
*/

	.post(authenticate,function(req,res){
		var user=new User(req.body);
		user.save().then(function(user){
			res.status(200).send(user);
		}).catch(function(e){
			console.log(e);
			res.status(400).send(e);
		})
	});

module.exports=router;
