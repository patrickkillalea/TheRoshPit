'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Video = mongoose.model('Video'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(videos) {

    return {
        /**
         * Find video by id
         */
        video: function(req, res, next, id) {
            Video.load(id, function(err, video) {
                if (err) return next(err);
                if (!video) return next(new Error('Failed to load video ' + id));
                req.video = video;
                next();
            });
        },
        /**
         * Create an video
         */
        create: function(req, res) {
            var video = new Video(req.body);
            video.user = req.user;

            video.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the video'
                    });
                }

                videos.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/videos/' + video._id,
                    name: video.title
                });

                res.json(video);
            });
        },
        /**
         * Update an video
         */
        update: function(req, res) {
            var video = req.video;

            video = _.extend(video, req.body);


            video.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the video'
                    });
                }

                Videos.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: video.title,
                    url: config.hostname + '/videos/' + video._id
                });

                res.json(video);
            });
        },
        /**
         * Delete an video
         */
        destroy: function(req, res) {
            var video = req.video;


            video.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the video'
                    });
                }

                videos.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: video.title
                });

                res.json(video);
            });
        },
        /**
         * Show an video
         */
        show: function(req, res) {

            Videos.events.publish({
                action: 'viewed',
                // user: {
                //     name: req.user.name
                // },
                name: req.video.title,
                url: config.hostname + '/videos/' + req.video._id
            });

            res.json(req.video);
        },
        /**
         * List of videos
         */
        all: function(req, res) {
            var query = req.acl.query('Video');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, videos) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the videos'
                    });
                }

                res.json(videos)
            });

        }
    };
}
