'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Fixture = mongoose.model('Fixture'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Fixtures) {

    return {
        /**
         * Find fixture by id
         */
        fixture: function(req, res, next, id) {
            Fixture.load(id, function(err, fixture) {
                if (err) return next(err);
                if (!fixture) return next(new Error('Failed to load fixture ' + id));
                req.fixture = fixture;
                next();
            });
        },
        /**
         * Create an fixture
         */
        create: function(req, res) {
            var fixture = new Fixture(req.body);
            fixture.user = req.user;

            fixture.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the fixture'
                    });
                }

                fixtures.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/fixtures/' + fixture._id,
                    name: fixture.title
                });

                res.json(fixture);
            });
        },
        /**
         * Update an fixture
         */
        update: function(req, res) {
            var fixture = req.fixture;

            fixture = _.extend(fixture, req.body);


            fixture.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the fixture'
                    });
                }

                Fixtures.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: fixture.title,
                    url: config.hostname + '/fixtures/' + fixture._id
                });

                res.json(fixture);
            });
        },
        /**
         * Delete an fixture
         */
        destroy: function(req, res) {
            var fixture = req.fixture;


            fixture.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the fixture'
                    });
                }

                fixtures.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: fixture.title
                });

                res.json(fixture);
            });
        },
        /**
         * Show an fixture
         */
        show: function(req, res) {

            Fixtures.events.publish({
                action: 'viewed',
                name: req.fixture.title,
                url: config.hostname + '/fixtures/' + req.fixture._id
            });

            res.json(req.fixture);
        },
        /**
         * List of Fixtures
         */
        all: function(req, res) {
            var query = req.acl.query('Fixture');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, fixtures) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the fixtures'
                    });
                }

                res.json(fixtures)
            });

        }
    };
}
