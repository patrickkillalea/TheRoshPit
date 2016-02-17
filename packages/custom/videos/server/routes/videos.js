'use strict';

// Video authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && !req.video.user._id.equals(req.user._id)) {
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

module.exports = function(Videos, app, auth) {

    var videos = require('../controllers/videos')(Videos);

    app.route('/api/videos')
        .get(videos.all)
        .post(auth.requiresLogin, hasPermissions, videos.create);
    app.route('/api/videos/:videoId')
        .get(auth.isMongoId, videos.show)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, videos.update)
        .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, videos.destroy);

    // Finish with setting up the videoId param
    app.param('videoId', videos.video);
};
