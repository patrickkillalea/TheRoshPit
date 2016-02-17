'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Fixture Schema
 */

var FixtureSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },  
    competition: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    team1: {
        type: String,
        required: true,
        trim: true
    },
    team2: {
        type: String,
        required: true,
        trim: true
    },
    team1score: {
        type: String,
        required: false,
        trim: true
    },
    team2score: {
        type: String,
        required: false,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    }
});

/**
 * Validations
 */
FixtureSchema.path('competition').validate(function(competition) {
    return !!competition;
}, 'Title cannot be blank');

FixtureSchema.path('content').validate(function(content) {
    return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
FixtureSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Fixture', FixtureSchema);
