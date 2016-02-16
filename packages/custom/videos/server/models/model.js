'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Video Schema
 */
var VideoSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    videourl: {
        type: String,
        required: true,
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
VideoSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

VideoSchema.path('content').validate(function(content) {
    return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
VideoSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Video', VideoSchema);
