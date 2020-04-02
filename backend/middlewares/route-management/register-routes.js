const path = require('path');

const glob = require('glob');

function registerRoutes (app, rootDirectory) {
    const indexFiles = glob.sync(
        path.join(rootDirectory, 'features/**', '*.index.js')
    );

    indexFiles.forEach((file) => {
        require(file)(app);
    });
}

module.exports = registerRoutes;
