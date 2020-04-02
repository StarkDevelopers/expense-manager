function printRoutes (app) {
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            console.log(r.route.path);
        }
    });
}

module.exports = printRoutes;
