	const Fcm= require('../.././app/models/fcm');
const config=require('.././config/config');
const fcm_node=require('fcm-node');
const express=require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();
var FCM=new fcm_node(process.env.serverKey);

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


router.route('/send')
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
	.post(authenticate, async function(req,res){
		res.set('Content-Type', 'application/json');
		var fcm=new Fcm(req.body);
		await fcm.save();
		var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
	        to: fcm.registration_id, 
	        notification: {
	            title: '', 
	            body: '' 
	        },
	        
	        data: fcm.data_message
    	};
    	console.log(message);
    	console.log(process.env.serverKey);
    
	    FCM.send(message, function(err, response){
	        if (err) {	
	        	res.status(404).send(err);
	            console.log("Something has gone wrong!"+err);
	        } else {
	        	res.send(message);
	            console.log("Successfully sent with response: ", response);
	        }
	    });

	});	
module.exports=router;