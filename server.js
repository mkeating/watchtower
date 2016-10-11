//server.js


//setup

//call packages

var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');


mongoose.connect('mongodb://127.0.0.1/heroes');

var Hero = require('./app/models/hero');

//configure the app to use bodyParser()

app.use(bodyParser.urlencoded({extened: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


//set routes
var router = express.Router();

//middleware for all requests
router.use(function(req, res, next){

	console.log('received request');
	next();
});

//test route
router.get('/', function(req, res){

	res.json({message: 'welcome to our api'});
});

//all heroes
router.route('/heroes')

	//create a new hero
	.post(function(req, res){

		var hero = new Hero();
		hero.name = req.body.name;
		hero.homeCity = req.body.homeCity;
		hero.currentLocation = req.body.homeCity;

		hero.save(function(err){
			if (err)
				res.send(err);

			res.json({message: 'Hero created'});
		});
	})

	.get(function(req, res){
		Hero.find(function(err, heroes){
			if (err)
				res.send(err);

			res.json(heroes);
		});
	});

//single hero
router.route('/heroes/:hero_id')

	.get(function(req, res) {
		Hero.findById(req.params.hero_id, function(err, hero){
			if (err)
				res.send(err);
			res.json(hero);
		});
	})

	//update the hero's name
	.put(function(req, res){

		Hero.findById(req.params.hero_id, function(err, hero){
			if(err)
				res.send(err);

			hero.name = req.body.name;

			hero.save(function(err){
				if (err)
					res.send(err);

				res.json({message: 'Hero updated'});
			});
		});
	})

	.delete(function(req, res) {
		Hero.remove({
			_id: req.params.hero_id
		}, function(err, hero) {
			if(err)
				res.send(err);

			res.json({message: 'Hero deleted'});
		});
	});

//register routes
app.use('/api', router);


//start server
app.listen(port);
console.log('Listening on port '  + port);