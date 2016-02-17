'use strict';

// Fixture authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && !req.fixture.user._id.equals(req.user._id)) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
        var permission = req.body.permissions[i];
        if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        }
    }

    next();
};

module.exports = function(Fixtures, app, auth) {

    var fixtures = require('../controllers/fixtures')(Fixtures);

    app.route('/api/fixtures')
        .get(fixtures.all)
        .post(auth.requiresLogin, hasPermissions, fixtures.create);
    app.route('/api/fixtures/:fixtureId')
        .get(auth.isMongoId, fixtures.show)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, fixtures.update)
        .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, fixtures.destroy);

    // Finish with setting up the fixtureId param
    app.param('fixtureId', fixtures.fixture);
};
