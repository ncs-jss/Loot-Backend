const Mission= require('../.././app/models/mission');
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
	.get(authenticate, async function(req,res){
		var mission=await Mission.find();
		res.send(mission);
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
	.get(authenticate, async function(req,res){
		var id=req.params.id;
		var mission=await Mission.findOne({id});
		res.send(mission);
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
	.post(authenticate, function(req,res){
		var id=req.params.id;
		Mission.update({id},req.body).then(function(mission){
			res.send(mission);
		}).catch(function(e){
			res.status(400).send(e);
		})
	});	


router.route('/')

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
	.post(authenticate, function(req,res){
		var mission=new Mission(req.body);
		mission.save().then(function(mission){
			res.status(200).send(mission);
		}).catch(function(e){
			res.status(400).send(e);
		})
	});

module.exports=router;