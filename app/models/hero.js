

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var HeroSchema = new Schema({
	name: String,
	homeCity: String,
	currentLocation: String,
	available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Hero', HeroSchema);